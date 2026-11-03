/* A small, safe Markdown renderer for the repo's own study documents (read.html and inline worked questions).
   Builds DOM nodes with textContent only; raw HTML in the source is never injected. Supports what the docs use:
   headings (GitHub-style ids so existing #anchors work), paragraphs, lists, blockquotes, rules, tables, code fences,
   <details><summary> reveals, and inline bold, italic, code and links. */
(function(){
  const el = (tag, cls, text) => { const e = document.createElement(tag); if(cls) e.className = cls; if(text !== undefined) e.textContent = text; return e; };
  const slug = t => t.toLowerCase().replace(/[^\w\- ]/g, "").replace(/ /g, "-");
  const DOC_RE = /^(ccao-f|ccdv-f|ccar-f|ccar-p)\/[\w\-\/]+\.md$/;
  const REPO = "https://github.com/CorporateChittyChat/claude-certification-prep/";

  /* Turn a link target inside a doc at `base` into a site URL: repo .md files open in the reader, the rest stay as they are. */
  function resolve(href, base){
    if(/^(https?:|mailto:)/.test(href)){
      const m = /^https:\/\/github\.com\/CorporateChittyChat\/claude-certification-prep\/blob\/main\/([^#?]+\.md)(#.*)?$/.exec(href);
      return m && DOC_RE.test(m[1]) ? "read.html?doc=" + m[1] + (m[2] || "") : href;
    }
    if(href.startsWith("#")) return href;
    const [path, hash] = href.split("#");
    const parts = (base ? base.split("/").slice(0, -1) : []);
    path.split("/").forEach(seg => { if(seg === "..") parts.pop(); else if(seg && seg !== ".") parts.push(seg); });
    const full = parts.join("/");
    if(DOC_RE.test(full)) return "read.html?doc=" + full + (hash ? "#" + hash : "");
    if(/\.md$/.test(full) || full.endsWith("/") || !/\.[a-z0-9]+$/i.test(full)) return REPO + "tree/main/" + full;
    return (base && base.split("/").length > 1 ? "" : "") + full + (hash ? "#" + hash : "");
  }

  /* inline: **bold**, *italic*, `code`, [text](url) */
  function inline(text, base){
    const frag = document.createDocumentFragment();
    const re = /(\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\))/g;
    let last = 0, m;
    while((m = re.exec(text))){
      if(m.index > last) frag.append(document.createTextNode(text.slice(last, m.index)));
      if(m[2] !== undefined){ const b = el("strong"); b.append(inline(m[2], base)); frag.append(b); }
      else if(m[3] !== undefined){ const i = el("em"); i.append(inline(m[3], base)); frag.append(i); }
      else if(m[4] !== undefined) frag.append(el("code", "", m[4]));
      else { const a = el("a"); a.href = resolve(m[6], base); if(/^https?:/.test(a.getAttribute("href"))){ a.target = "_blank"; a.rel = "noopener"; } a.append(inline(m[5], base)); frag.append(a); }
      last = re.lastIndex;
    }
    if(last < text.length) frag.append(document.createTextNode(text.slice(last)));
    return frag;
  }

  function render(md, base){
    const root = document.createDocumentFragment();
    const stack = [root];
    const cur = () => stack[stack.length - 1];
    const lines = md.replace(/\r\n?/g, "\n").split("\n");
    let i = 0;
    while(i < lines.length){
      let line = lines[i];
      if(/^\s*$/.test(line)){ i++; continue; }
      // <details><summary>X</summary>  ...  </details>
      let m = /^\s*<details>\s*<summary>(.*?)<\/summary>\s*$/.exec(line);
      if(m){ const d = el("details"), s = el("summary"); s.append(inline(m[1], base)); d.append(s); cur().append(d); stack.push(d); i++; continue; }
      if(/^\s*<\/details>\s*$/.test(line)){ if(stack.length > 1) stack.pop(); i++; continue; }
      if(/^\s*<[^>]+>\s*$/.test(line)){ i++; continue; }           // other raw HTML lines are skipped, never injected
      if(/^```/.test(line)){
        const buf = []; i++;
        while(i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
        i++; cur().append(el("pre", "", buf.join("\n"))); continue;
      }
      if((m = /^(#{1,6})\s+(.*)$/.exec(line))){
        const h = el("h" + m[1].length); h.id = slug(m[2]); h.append(inline(m[2], base)); cur().append(h); i++; continue;
      }
      if(/^(-{3,}|\*{3,}|_{3,})\s*$/.test(line)){ cur().append(el("hr")); i++; continue; }
      if(/^\s*>/.test(line)){
        const buf = [];
        while(i < lines.length && /^\s*>/.test(lines[i])) buf.push(lines[i++].replace(/^\s*>\s?/, ""));
        const q = el("blockquote"); q.append(render(buf.join("\n"), base)); cur().append(q); continue;
      }
      if(/^\s*\|.*\|\s*$/.test(line) && i + 1 < lines.length && /^\s*\|[\s:\-|]+\|\s*$/.test(lines[i + 1])){
        const cells = l => l.trim().replace(/^\||\|$/g, "").split("|").map(c => c.trim());
        const wrap = el("div", "md-table"), t = el("table"), th = el("thead"), hr = el("tr");
        cells(line).forEach(c => { const x = el("th"); x.append(inline(c, base)); hr.append(x); });
        th.append(hr); t.append(th);
        const tb = el("tbody"); i += 2;
        while(i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])){ const tr = el("tr"); cells(lines[i++]).forEach(c => { const x = el("td"); x.append(inline(c, base)); tr.append(x); }); tb.append(tr); }
        t.append(tb); wrap.append(t); cur().append(wrap); continue;
      }
      if((m = /^\s*([-*+]|\d+\.)\s+/.exec(line))){
        const ordered = /\d/.test(m[1]);
        const list = el(ordered ? "ol" : "ul");
        while(i < lines.length && /^\s*([-*+]|\d+\.)\s+/.test(lines[i])){
          let text = lines[i++].replace(/^\s*([-*+]|\d+\.)\s+/, "");
          while(i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^\s*([-*+]|\d+\.)\s+/.test(lines[i])) text += " " + lines[i++].trim();
          const li = el("li"); li.append(inline(text, base)); list.append(li);
        }
        cur().append(list); continue;
      }
      const buf = [line.trim()]; i++;
      while(i < lines.length && !/^\s*$/.test(lines[i]) && !/^(#{1,6}\s|```|\s*>|\s*([-*+]|\d+\.)\s|\s*<\/?details|\s*\|)/.test(lines[i])) buf.push(lines[i++].trim());
      const p = el("p"); p.append(inline(buf.join(" "), base)); cur().append(p);
    }
    return root;
  }

  /* Split a worked-questions file into sections keyed by heading slug: {id, title, stem, options:[[letter,text]], answer, reveal} */
  function questions(md){
    const out = {};
    md.replace(/\r\n?/g, "\n").split(/\n(?=## )/).forEach(chunk => {
      const hm = /^## (.*)\n/.exec(chunk); if(!hm) return;
      const id = slug(hm[1]);
      const body = chunk.slice(hm[0].length);
      const rm = /<details><summary>.*?<\/summary>\s*\n([\s\S]*?)<\/details>/.exec(body);
      const before = rm ? body.slice(0, rm.index) : body;
      const options = [], stem = [];
      before.split("\n").forEach(l => {
        const om = /^\s*-\s+\*\*([A-E])\.\*\*\s+(.*)$/.exec(l);
        if(om) options.push([om[1], om[2]]);
        else if(l.trim() && !/^-{3,}$/.test(l.trim())) stem.push(l);
      });
      const reveal = rm ? rm[1].trim() : "";
      const am = /^\*\*([A-E])\.\*\*/.exec(reveal);
      out[id] = { id, title: hm[1], stem: stem.join("\n"), options, answer: am ? am[1] : null, reveal };
    });
    return out;
  }

  window.MD = { render, inline, slug, resolve, questions, DOC_RE };
})();
