/* Shared site header: brand, certification picker, the per-exam journey links, and the mock-exam button.
   Usage: <header id="siteNav" data-page="learn"></header> then <script src="site-nav.js"></script>.
   data-page: home | journey | learn | videos | flashcards. Built with DOM calls and textContent only. */
(function(){
  const TRACKS = {
    "ccao-f": { code: "CCAO-F", name: "Associate", exam: "ccao-f/practice/mock-exam-player.html" },
    "ccdv-f": { code: "CCDV-F", name: "Developer", exam: "ccdv-f/practice/mock-exam-player.html" }
  };
  const PAGES = [
    ["journey", "Journey", "path.html"],
    ["learn", "Learn", "learn.html"],
    ["videos", "Videos", "videos.html"],
    ["flashcards", "Flashcards", "flashcards.html"]
  ];
  const host = document.getElementById("siteNav");
  if(!host) return;
  const page = host.dataset.page || "";
  const params = new URLSearchParams(location.search);
  let saved = null;
  try{ saved = JSON.parse(localStorage.getItem("fc-track")); }catch(e){}
  /* On the home page no certification is assumed: the picker and the mock-exam button ask. Elsewhere the URL or the
     last-used track decides. */
  const fromDoc = (params.get("doc") || "").split("/")[0];
  const track = TRACKS[params.get("track")] ? params.get("track") : TRACKS[fromDoc] ? fromDoc : (page !== "home" && TRACKS[saved] ? saved : null);
  const shown = track || (TRACKS[saved] ? saved : "ccdv-f");

  const css = `
  .sn{background:#1D242F; color:#fff; position:sticky; top:0; z-index:20; box-shadow:0 1px 0 rgba(255,255,255,.06);}
  .sn-in{max-width:1880px; margin:0 auto; padding:0 clamp(16px,2.6vw,48px); height:64px; display:flex; align-items:center; gap:18px;}
  .sn a{color:inherit; text-decoration:none;}
  .sn-brand{font-weight:800; font-size:18px; letter-spacing:.2px; white-space:nowrap;}
  .sn-brand span{color:#EE9D44;}
  .sn-pick{position:relative;}
  .sn-pick>button{font:inherit; font-size:14px; font-weight:700; letter-spacing:1px; color:#fff; background:transparent; border:1px solid #3A4558; border-radius:8px; padding:7px 12px; cursor:pointer; display:flex; gap:8px; align-items:center;}
  .sn-pick>button:hover, .sn-pick>button[aria-expanded="true"]{border-color:#EE9D44;}
  .sn-menu{position:absolute; top:44px; left:0; min-width:300px; background:#fff; color:#24263A; border-radius:12px; box-shadow:0 16px 40px rgba(0,0,0,.25); padding:6px; display:none;}
  .sn-menu.open{display:block;}
  .sn-menu a{display:block; padding:10px 12px; border-radius:8px; font-size:15.5px;}
  .sn-menu a b{display:block; font-size:14px; letter-spacing:.8px;}
  .sn-menu a:hover, .sn-menu a[aria-current="true"]{background:#FFF1DC;}
  .sn-menu .soon{display:block; padding:10px 12px; font-size:15.5px; color:#5D6078; cursor:default; border-top:1px solid #EADFCF;}
  .sn-menu .soon b{display:flex; gap:8px; align-items:center; font-size:14px; letter-spacing:.8px; color:#24263A;}
  .sn-menu .soon i{font-style:normal; font-size:11px; font-weight:800; letter-spacing:.6px; text-transform:uppercase; background:#FFF1DC; color:#8C5214; border:1px solid #FFD2A6; border-radius:999px; padding:1px 8px;}
  .sn-links{display:flex; align-items:center; gap:4px; flex:1;}
  .sn-links a{font-size:16px; color:#dfe3ee; padding:8px 12px; border-radius:8px; white-space:nowrap;}
  .sn-links a:hover{color:#fff; background:rgba(255,255,255,.06);}
  .sn-links a[aria-current="page"]{color:#fff; box-shadow:inset 0 -2px 0 #EE9D44; border-radius:0;}
  .sn-sep{width:1px; height:22px; background:#3A4558; margin:0 8px;}
  .sn-cta{background:#EE9D44; color:#24263A!important; font-weight:800; font-size:15px; padding:10px 16px; border-radius:9px; white-space:nowrap;}
  .sn-cta:hover{filter:brightness(1.08);}
  button.sn-cta{font-family:inherit; border:0; cursor:pointer;}
  .sn-mock{position:relative;}
  .sn-mock .sn-menu{left:auto; right:0; top:48px;}
  .sn-mock .sn-menu a b{display:block;}
  .sn-links .sn-menu a{color:#24263A; display:block; padding:10px 12px; border-radius:8px; font-size:15.5px; white-space:normal;}
  .sn-links .sn-menu a:hover{color:#24263A; background:#FFF1DC;}
  .sn-links .sn-menu a b{color:#24263A; font-size:14px; letter-spacing:.8px;}
  .sn-burger{display:none; margin-left:auto; font:inherit; font-size:22px; background:transparent; color:#fff; border:1px solid #3A4558; border-radius:8px; width:44px; height:40px; cursor:pointer;}
  @media (max-width:1020px){
    .sn-in{flex-wrap:wrap; height:auto; padding:10px 16px; gap:10px;}
    .sn-burger{display:block;}
    .sn-links{display:none; flex-basis:100%; flex-direction:column; align-items:stretch; padding-bottom:8px;}
    .sn-links.open{display:flex;}
    .sn-sep{display:none;}
    .sn-cta{text-align:center;}
  }`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);

  const el = (tag, cls, text) => { const e = document.createElement(tag); if(cls) e.className = cls; if(text !== undefined) e.textContent = text; return e; };
  const withTrack = (href, t) => href + (href.includes("?") ? "&" : "?") + "track=" + t;

  const bar = el("nav", "sn");
  bar.setAttribute("aria-label", "Site");
  const inner = el("div", "sn-in");

  const brand = el("a", "sn-brand", "Claude Certification ");
  brand.href = "./";
  brand.append(el("span", "", "Prep"));

  // certification picker
  const pick = el("div", "sn-pick");
  const btn = el("button", "", track ? TRACKS[track].code : "Pick cert");
  btn.type = "button";
  btn.setAttribute("aria-haspopup", "true");
  btn.setAttribute("aria-expanded", "false");
  btn.append(el("span", "", "▾"));
  const menu = el("div", "sn-menu");
  Object.entries(TRACKS).forEach(([id, t]) => {
    const a = el("a");
    const target = page && page !== "home" ? PAGES.find(p => p[0] === page) : null;
    a.href = withTrack(target ? target[2] : "path.html", id);
    if(id === track) a.setAttribute("aria-current", "true");
    a.append(el("b", "", t.code), document.createTextNode("Claude Certified " + t.name + " – Foundations"));
    a.addEventListener("click", () => { try{ localStorage.setItem("fc-track", JSON.stringify(id)); }catch(e){} });
    menu.append(a);
  });
  [["CCAR-F", "Claude Certified Architect – Foundations"], ["CCAR-P", "Claude Certified Architect – Professional"]].forEach(([code, name]) => {
    const s = el("span", "soon");
    s.setAttribute("aria-disabled", "true");
    const b = el("b", "", code); b.append(el("i", "", "Coming soon"));
    s.append(b, document.createTextNode(name));
    menu.append(s);
  });
  btn.addEventListener("click", e => { e.stopPropagation(); const wasOpen = menu.classList.contains("open"); document.querySelectorAll(".sn-menu.open").forEach(m => m.classList.remove("open")); if(!wasOpen){ menu.classList.add("open"); btn.setAttribute("aria-expanded", "true"); } else btn.setAttribute("aria-expanded", "false"); });
  const closeAll = () => document.querySelectorAll(".sn-menu.open").forEach(m => { m.classList.remove("open"); const b = m.previousElementSibling; if(b) b.setAttribute("aria-expanded", "false"); });
  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeAll(); });
  pick.append(btn, menu);

  // journey links
  const links = el("div", "sn-links");
  PAGES.forEach(([id, label, href]) => {
    const a = el("a", "", label);
    a.href = withTrack(href, shown);
    if(id === page) a.setAttribute("aria-current", "page");
    links.append(a);
  });
  if(track){
    const mock = el("a", "", "Mock exam");
    mock.href = TRACKS[track].exam;
    links.append(mock);
  }
  links.append(el("span", "sn-sep"));
  const faq = el("a", "", "FAQ"); faq.href = "./#faq";
  const gh = el("a", "", "GitHub"); gh.href = "https://github.com/CorporateChittyChat/claude-certification-prep";
  links.append(faq, gh);
  if(track){
    const cta = el("a", "sn-cta", "Take " + TRACKS[track].code + " mock exam");
    cta.href = TRACKS[track].exam;
    links.append(cta);
  } else {
    // no certification chosen yet: let the learner pick which mock exam
    const wrap = el("div", "sn-mock");
    const cb = el("button", "sn-cta", "Take a mock exam ▾");
    cb.type = "button"; cb.setAttribute("aria-haspopup", "true"); cb.setAttribute("aria-expanded", "false");
    const m = el("div", "sn-menu");
    Object.entries(TRACKS).forEach(([id, t]) => {
      const a = el("a"); a.href = t.exam;
      a.append(el("b", "", t.code + " mock exam"), document.createTextNode("Claude Certified " + t.name + " – Foundations"));
      a.addEventListener("click", () => { try{ localStorage.setItem("fc-track", JSON.stringify(id)); }catch(e){} });
      m.append(a);
    });
    [["CCAR-F", "Architect – Foundations"], ["CCAR-P", "Architect – Professional"]].forEach(([code, name]) => {
      const sp = el("span", "soon"); sp.setAttribute("aria-disabled", "true");
      const b = el("b", "", code); b.append(el("i", "", "Coming soon"));
      sp.append(b, document.createTextNode("Claude Certified " + name)); m.append(sp);
    });
    cb.addEventListener("click", e => { e.stopPropagation(); const wasOpen = m.classList.contains("open"); closeAll(); if(!wasOpen){ m.classList.add("open"); cb.setAttribute("aria-expanded", "true"); } });
    wrap.append(cb, m);
    links.append(wrap);
  }

  const burger = el("button", "sn-burger", "☰");
  burger.type = "button";
  burger.setAttribute("aria-label", "Menu");
  burger.addEventListener("click", () => links.classList.toggle("open"));

  inner.append(brand, pick, burger, links);
  bar.append(inner);
  host.replaceWith(bar);
})();
