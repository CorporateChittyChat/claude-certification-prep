/* Shared site header: brand, certification picker, the per-exam journey links, and the mock-exam button.
   Usage: <header id="siteNav" data-page="learn"></header> then <script src="site-nav.js"></script>.
   data-page: home | journey | learn | videos | flashcards. Built with DOM calls and textContent only. */
(function(){
  // certifications on the way: listed in both dropdowns with a "Coming soon" tag
const SOON = [["CCAR-F", "Claude Certified Architect – Foundations"], ["CCAR-P", "Claude Certified Architect – Professional"],
              ["GITHUB", "GitHub Foundations"], ["PYTHON", "Python – Foundations"]];
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
  :root{--sn-h:64px;}
  .sn{background:#1D242F; color:#fff; position:sticky; top:0; z-index:20; box-shadow:0 1px 0 rgba(255,255,255,.06);}
  .sn-in{position:relative; max-width:1880px; margin:0 auto; padding:0 clamp(16px,2.6vw,48px); height:64px; display:flex; align-items:center; gap:18px;}
  .sn a{color:inherit; text-decoration:none;}
  .sn-brand{display:flex; align-items:center; gap:9px; font-weight:800; font-size:18px; letter-spacing:.2px; white-space:nowrap;}
  .sn-brand svg{width:26px; height:26px; flex:none;}
  .sn-brand .sn-or{color:#EE9D44;}
  .sn-brand .sn-short{display:none;}
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
  .sn-install{font-family:inherit; font-size:15px; font-weight:700; color:#FFD2A6; background:transparent; border:1px solid rgba(255,210,166,.5); border-radius:9px; padding:9px 14px; cursor:pointer; white-space:nowrap;}
  .sn-install:hover{background:rgba(255,210,166,.1); border-color:#FFD2A6;}
  .sn-install[hidden]{display:none;}
  .sn-inst .sn-menu{padding:14px 16px; min-width:300px;}
  .sn-ititle{display:block; font-size:16px; color:#24263A; margin-bottom:8px;}
  .sn-steps{margin:0 0 0 20px; display:grid; gap:6px; font-size:15.5px; line-height:1.45; color:#24263A;}
  .sn-links .sn-menu a{color:#24263A; display:block; padding:10px 12px; border-radius:8px; font-size:15.5px; white-space:normal;}
  .sn-links .sn-menu a:hover{color:#24263A; background:#FFF1DC;}
  .sn-links .sn-menu a b{color:#24263A; font-size:14px; letter-spacing:.8px;}
  .sn-burger{display:none; margin-left:auto; font:inherit; font-size:15px; font-weight:700; background:transparent; color:#fff; border:1px solid #3A4558; border-radius:8px; min-width:44px; height:44px; padding:0 12px; cursor:pointer; align-items:center; gap:8px;}
  .sn-burger[aria-expanded="true"]{border-color:#EE9D44;}
  .sn-burger .sn-ico{font-size:20px; line-height:1;}
  /* Narrow screens: one 56px row (mark, short name, cert picker, menu button). The links open as a panel that
     overlays the page instead of pushing it down. */
  @media (max-width:1020px){
    :root{--sn-h:56px;}
    .sn-in{height:56px; padding:0 12px 0 16px; gap:10px;}
    .sn-burger{display:inline-flex;}
    .sn-pick>button{min-height:44px;}
    .sn-links{display:none; position:absolute; top:56px; left:0; right:0; flex-direction:column; align-items:stretch; gap:2px; background:#1D242F; padding:8px 12px 16px; border-top:1px solid #3A4558; box-shadow:0 18px 30px rgba(0,0,0,.3); max-height:calc(100vh - 56px); max-height:calc(100dvh - 56px); overflow:auto;}
    .sn-links.open{display:flex;}
    .sn-links a{font-size:18px; padding:12px; min-height:48px; display:flex; align-items:center;}
    .sn-links a[aria-current="page"]{box-shadow:inset 3px 0 0 #EE9D44; background:rgba(255,255,255,.05);}
    .sn-sep{display:block; width:auto; height:1px; margin:6px 0;}
    .sn-cta{justify-content:center; margin-top:8px; font-size:17px;}
    .sn-mock .sn-cta{width:100%;}
    .sn-install{width:100%; min-height:48px; font-size:17px; margin-top:8px;}
    .sn-mock .sn-menu{position:static; box-shadow:none; margin-top:8px; min-width:0;}
  }
  @media (max-width:520px){
    .sn-brand{font-size:17px; gap:8px;}
    .sn-brand .sn-long{display:none;}
    .sn-brand .sn-short{display:inline;}
    .sn-burger .sn-lbl{display:none;}
    .sn-menu{position:fixed; left:12px; right:12px; top:62px; min-width:0;}
  }`;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.append(style);

  const el = (tag, cls, text) => { const e = document.createElement(tag); if(cls) e.className = cls; if(text !== undefined) e.textContent = text; return e; };
  const withTrack = (href, t) => href + (href.includes("?") ? "&" : "?") + "track=" + t;

  const bar = el("nav", "sn");
  bar.setAttribute("aria-label", "Site");
  const inner = el("div", "sn-in");

  const brand = el("a", "sn-brand");
  brand.href = "./";
  brand.setAttribute("aria-label", "Cert Prep, home");
  // the site mark: the favicon's orange hexagon with the slate one inside
  const NS = "http://www.w3.org/2000/svg", mark = document.createElementNS(NS, "svg");
  mark.setAttribute("viewBox", "0 0 120 120"); mark.setAttribute("aria-hidden", "true");
  [["60,4 108,32 108,88 60,116 12,88 12,32", "#EE9D44"], ["60,22 92,41 92,79 60,98 28,79 28,41", "#2A3446"]].forEach(([pts, fill]) => {
    const p = document.createElementNS(NS, "polygon"); p.setAttribute("points", pts); p.setAttribute("fill", fill); mark.append(p);
  });
  const words = el("span");
  words.append(el("span", "sn-long", "Cert "), el("span", "sn-short", "Cert "), el("span", "sn-or", "Prep"));
  brand.append(mark, words);

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
  SOON.forEach(([code, name]) => {
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

  // Install app, always visible unless the site already runs as an installed app. When the browser is ready to install,
  // one tap installs; otherwise the button opens the steps for this browser (Chrome waits for some use before offering).
  const standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  if(!standalone){
    const ua = navigator.userAgent;
    const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const android = /Android/.test(ua), edge = /Edg\//.test(ua), firefox = /Firefox\//.test(ua);
    const chromium = !!window.chrome || edge;
    const iw = el("div", "sn-mock sn-inst");
    const ib = el("button", "sn-install", "Install app");
    ib.type = "button"; ib.setAttribute("aria-haspopup", "true"); ib.setAttribute("aria-expanded", "false");
    let deferred = null;
    const im = el("div", "sn-menu");
    const [title, steps] =
      ios ? ["Install on iPhone or iPad", ["Tap the Share button (the square with an arrow).", "Scroll down and choose “Add to Home Screen”.", "Tap Add. The app opens full screen from its icon."]]
      : android && !firefox ? ["Install on Android", ["Tap the ⋮ menu at the top right of the browser.", "Choose “Install app” or “Add to Home screen”.", "Tap Install. The app opens full screen from its icon."]]
      : edge ? ["Install in Edge", ["Click the install icon at the right of the address bar,", "or open the … menu, then Apps, then “Install this site as an app”.", "It opens in its own window, with a Start menu or Dock icon."]]
      : chromium ? ["Install in Chrome", ["Click the install icon at the right of the address bar,", "or open the ⋮ menu, then “Cast, save and share”, then “Install page as app”.", "It opens in its own window, with a desktop or Dock icon."]]
      : ["Install as an app", ["This browser can’t install websites as apps.", "Open certprep.cardzo.co.in in Chrome or Edge on a computer or Android, or in Safari on iPhone or iPad,", "then choose Install app."]];
    im.append(el("b", "sn-ititle", title));
    const ol = el("ol", "sn-steps");
    steps.forEach(t => ol.append(el("li", "", t)));
    im.append(ol);
    window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferred = e; });
    window.addEventListener("appinstalled", () => { iw.remove(); deferred = null; });
    ib.addEventListener("click", e => {
      e.stopPropagation();
      if(deferred){ deferred.prompt(); deferred.userChoice.then(() => { deferred = null; }).catch(() => {}); return; }
      const wasOpen = im.classList.contains("open"); closeAll();
      if(!wasOpen){ im.classList.add("open"); ib.setAttribute("aria-expanded", "true"); }
    });
    iw.append(ib, im);
    links.append(iw);
  }

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
    SOON.forEach(([code, name]) => {
      const sp = el("span", "soon"); sp.setAttribute("aria-disabled", "true");
      const b = el("b", "", code); b.append(el("i", "", "Coming soon"));
      sp.append(b, document.createTextNode(name)); m.append(sp);
    });
    cb.addEventListener("click", e => { e.stopPropagation(); const wasOpen = m.classList.contains("open"); closeAll(); if(!wasOpen){ m.classList.add("open"); cb.setAttribute("aria-expanded", "true"); } });
    wrap.append(cb, m);
    links.append(wrap);
  }

  links.id = "snLinks";
  const burger = el("button", "sn-burger");
  burger.type = "button";
  burger.setAttribute("aria-controls", "snLinks");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Menu");
  const burgerIco = el("span", "sn-ico", "☰");
  burgerIco.setAttribute("aria-hidden", "true");
  burger.append(burgerIco, el("span", "sn-lbl", "Menu"));
  const setLinks = on => {
    links.classList.toggle("open", on);
    burger.setAttribute("aria-expanded", String(on));
    burgerIco.textContent = on ? "✕" : "☰";
  };
  burger.addEventListener("click", e => { e.stopPropagation(); closeAll(); setLinks(!links.classList.contains("open")); });
  // the panel closes on a link, on Esc (focus back to the button) and on a tap outside the header
  links.addEventListener("click", e => { if(e.target.closest("a")) setLinks(false); });
  document.addEventListener("keydown", e => { if(e.key === "Escape" && links.classList.contains("open")){ setLinks(false); burger.focus(); } });
  document.addEventListener("click", e => { if(links.classList.contains("open") && !bar.contains(e.target)) setLinks(false); });

  inner.append(brand, pick, burger, links);
  bar.append(inner);
  host.replaceWith(bar);
})();
