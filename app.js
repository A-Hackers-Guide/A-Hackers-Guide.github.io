(() => {
  "use strict";
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const gh = (r) => `https://github.com/${S.user}/${r.repo}`;
  const pad = (n) => String(n).padStart(2, "0");
  const LANG_COLORS = {
    Rust: "#dea584", TypeScript: "#3178c6", CSS: "#a46bff", "C++": "#f34b7d", C: "#8a8a8a", Python: "#3572A5",
    JavaScript: "#f1e05a", "C#": "#178600", HTML: "#e34c26", Shell: "#89e051", Swift: "#F05138", Makefile: "#427819",
    CMake: "#DA3434", PowerShell: "#4fa3ff", Batchfile: "#C1F12E", Kotlin: "#A97BFF", ANTLR: "#9DC3FF",
    OpenSCAD: "#e5cd45", PLpgSQL: "#336790", Dockerfile: "#384d54"
  };

  /* ---------------- theme ---------------- */
  const root = document.documentElement, themeBtn = $("#theme-btn");
  const syncSwitch = () => themeBtn.setAttribute("aria-checked", root.dataset.theme === "light");
  syncSwitch();
  const setTheme = (next, x, y) => {
    const apply = () => { root.dataset.theme = next; syncSwitch(); };
    if (reduce || !document.startViewTransition) { apply(); return; }
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    document.startViewTransition(apply).ready.then(() => {
      root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" });
    }).catch(() => {});
  };
  themeBtn.addEventListener("click", (e) => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const b = themeBtn.getBoundingClientRect();
    setTheme(next, e.clientX || b.left + b.width / 2, e.clientY || b.top + b.height / 2);
    try { localStorage.setItem("theme", next); } catch (err) {}
    toast(next === "light" ? "☀ Light mode" : "☾ Dark mode");
  });
  // follow the system setting until the visitor picks a theme themselves
  matchMedia("(prefers-color-scheme: light)").addEventListener?.("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (err) {}
    if (!saved) setTheme(e.matches ? "light" : "dark", innerWidth - 60, 34);
  });

  /* ---------------- build DOM from data ---------------- */
  // hero title letters
  const h1 = $(".glitch");
  h1.innerHTML = [...h1.textContent].map((c, i) =>
    c === " " ? " " : `<span class="ch" style="transition-delay:${0.25 + i * 0.045}s">${esc(c)}</span>`).join("");

  // orbit planets
  const orbit = $("#orbit");
  S.repos.forEach((r, i) => {
    const a = (i / S.repos.length) * Math.PI * 2;
    const p = document.createElement("span");
    p.className = "planet";
    p.style.setProperty("--c", r.accent);
    p.style.transform = `translate(${Math.cos(a) * 50}%, ${Math.sin(a) * 50}%)`;
    p.style.left = `${50 + Math.cos(a) * 50}%`;
    p.style.top = `${50 + Math.sin(a) * 50}%`;
    p.textContent = r.icon;
    orbit.appendChild(p);
  });

  // manifesto words
  const manifesto = "I make software that runs anywhere. Mac, Windows, Linux and beyond. If a tool only exists on one platform, I want to port it. If a guide is confusing, I want to rewrite it into a better one.";
  const hlWords = new Set(["anywhere.", "port", "better"]);
  $("#big-words").innerHTML = manifesto.split(" ").map((w) => `<span class="w${hlWords.has(w) ? " hl" : ""}">${esc(w)}</span>`).join(" ");

  // stats
  const allLangs = {};
  S.repos.forEach((r) => Object.entries(r.langs).forEach(([k, v]) => (allLangs[k] = (allLangs[k] || 0) + v)));
  const totalBytes = Object.values(allLangs).reduce((a, b) => a + b, 0);
  const stats = [
    [S.repos.length, "", "featured projects"],
    [Object.keys(allLangs).length, "", "programming languages"],
    [Math.round(totalBytes / 1024), " KB", "of source code"],
    [599, "", "porting rules in Crossfire"],
    [4, "", "desktop OSes targeted"]
  ];
  $("#stats").innerHTML = stats.map(([n, suf, l]) => `<div class="stat reveal"><b data-count="${n}" data-suffix="${suf}">0${suf}</b><span>${l}</span></div>`).join("");

  // marquee
  const mq = [...S.platforms, ...Object.keys(allLangs).slice(0, 10)];
  $("#marquee").innerHTML = [...mq, ...mq].map((t) => `<span>${esc(t)}</span>`).join("");

  $("#proj-count").textContent = `// ${pad(S.repos.length)} projects`;

  // horizontal cards
  $("#h-track").innerHTML = S.repos.map((r, i) => `
    <article class="pcard" style="--c:${r.accent}" data-open="${r.id}" tabindex="0" aria-label="Open ${esc(r.name)} details">
      <div class="glare"></div>
      <span class="num">${pad(i + 1)} / ${pad(S.repos.length)}</span>
      <span class="ico">${esc(r.icon)}</span>
      <h3>${esc(r.name)}</h3>
      <p>${esc(r.kicker)}</p>
      <div class="tags">${Object.keys(r.langs).slice(0, 3).map((l) => `<span class="tag">${esc(l)}</span>`).join("")}<span class="tag">${esc(r.release)}</span></div>
      <span class="go">→</span>
    </article>`).join("");

  // chapters
  const langBar = (langs) => {
    const tot = Object.values(langs).reduce((a, b) => a + b, 0);
    const ent = Object.entries(langs);
    return `<div class="lbar">${ent.map(([k, v]) => `<i data-w="${((v / tot) * 100).toFixed(2)}" style="background:${LANG_COLORS[k] || "#888"}" title="${esc(k)}"></i>`).join("")}</div>
      <div class="lkeys">${ent.map(([k, v]) => `<span style="--k:${LANG_COLORS[k] || "#888"}">${esc(k)} ${((v / tot) * 100).toFixed(1)}%</span>`).join("")}</div>`;
  };

  // hands-on demos for a few chapters
  const DEMOS = {
    freemessenger: `<div class="demo fm-demo">
        <div class="fm-grid">
          <div class="fm-side"><b>@alice</b><input id="fm-msg" type="text" value="meet at 6?" maxlength="120" spellcheck="false"><button class="btn primary demo-btn" id="fm-send"><span>Encrypt &amp; send</span></button></div>
          <div class="fm-wire"><span>relay sees</span><code id="fm-cipher">…</code></div>
          <div class="fm-side"><b>@bob</b><p id="fm-plain" class="fm-plain">…</p></div>
        </div>
        <div class="fm-code"><span>Shared key fingerprint</span><b id="fm-fp">generating keys…</b></div>
        <p class="demo-note">Real Web Crypto running in your browser: two ECDH P-256 key pairs, a shared AES-256-GCM key, and live encryption. The 12-digit code here is just a fingerprint for show, not FreeMessenger's exact formula.</p>
      </div>`,
    ocmp: `<div class="demo oc-demo">
        <div class="oc-pick"><label>CPU<select id="oc-cpu"></select></label><label>GPU<select id="oc-gpu"></select></label></div>
        <div id="oc-out" class="oc-out"></div>
        <p class="demo-note">Statuses come from the README's support tables. The app itself detects your real hardware.</p>
      </div>`,
    wiithemer: `<div class="demo wt-demo">
        <div class="oc-pick">
          <label>Theme<select id="wt-theme"><option>Black Pirate</option><option>Matrix</option><option>Matrix Reloaded</option><option>Muse</option><option value="other">Any other theme</option></select></label>
          <label>Spin<select id="wt-spin"><option>nospin</option><option>spin</option><option>fastspin</option><option>transchan</option></select></label>
          <label>Spin first<select id="wt-first"><option>auto</option><option>yes</option><option>no</option></select></label>
        </div>
        <div class="wt-mode" id="wt-mode"></div>
        <pre class="cf-code" id="wt-cmds"></pre>
        <p class="demo-note">The two command lists are WiiThemer's defaults from the README. {appid} and {output} are filled in by the app from your version, region and file name template.</p>
      </div>`,
    apivis: `<div class="demo av-demo">
        <div class="av-bar"><span class="av-get">GET</span><code>https://api.example.com/v1/projects</code><span class="av-ok">200 OK</span></div>
        <div class="av-grid"><pre class="av-json" id="av-json"></pre>
          <div><label class="demo-label" for="av-path">JSON path</label><input id="av-path" type="text" value="$.data.items[0].name" spellcheck="false">
          <div class="av-chips">${["$.data.items[0].name", "$.data.items[-1].lang", "$.data.items[*].name", "$.data.total"].map((x) => `<button data-path="${x}">${x}</button>`).join("")}</div>
          <pre class="av-res" id="av-res"></pre></div></div>
        <p class="demo-note">A sample response. The path filter supports the same subset APIvis does: $.a.b, [0], [-1] and [*].</p>
      </div>`,
    hearth: `<div class="demo ht-demo">
        <div class="ht-dev"><span class="ht-ico">⌨</span><div><b>Office Mac</b><span>paired via RustDesk</span></div><label class="ht-sw"><input type="checkbox" id="ht-ai"><i></i><span>Allow AI control</span></label></div>
        <div class="ht-btns"><button data-ht="view">“Hey Hearth, show me the office Mac”</button><button data-ht="click">“Hey Hearth, click the send button”</button></div>
        <pre class="cf-code ht-log" id="ht-log"></pre>
        <p class="demo-note">Simulates the README's permission model: view-only by default, AI control opt-in per device, every session logged.</p>
      </div>`,
    crossfire: `<div class="demo cf-demo">
        <div class="demo-head"><span>main.cpp</span><button class="btn primary demo-btn" data-cf><span>Convert ⇄</span></button></div>
        <pre class="cf-code"></pre>
        <p class="demo-note">Illustration of the rule-based rewrites the README lists. Real Crossfire output depends on your project.</p>
      </div>`,
    numberlock: `<div class="demo nl-demo">
        <label for="nl-in" class="demo-label">Type anything</label>
        <textarea id="nl-in" rows="2" spellcheck="false">Hello from A Hacker's Guide</textarea>
        <div class="nl-out" id="nl-out" aria-live="polite"></div>
        <p class="demo-note">Toy illustration only: plain UTF-8 bytes as digits. The real NumberLock compresses and encrypts first, with a password.</p>
      </div>`,
    archaeologist: `<div class="demo da-demo">
        <label class="da-drop" id="da-drop"><input type="file" id="da-file" hidden><b>Drop any file here</b><span>or click to choose one. It's read in your browser and never uploaded.</span></label>
        <div class="da-out" id="da-out"></div>
        <p class="demo-note">A tiny in-browser sample of the kind of report the real CLI makes.</p>
      </div>`
  };
  $("#chapters").innerHTML = S.repos.map((r, i) => `
    <section class="chapter" id="${r.id}" style="--accent:${r.accent}" data-section="${esc(r.name)}">
      <div class="ch-banner" aria-hidden="true">
        <div class="ch-curtain"></div>
        <div class="ch-giant"><span>${esc(r.name)} ${esc(r.icon)} ${esc(r.name)} ${esc(r.icon)} ${esc(r.name)}</span></div>
        <div class="ch-giant rev"><span>${esc(r.kicker)} — ${esc(r.kicker)} —</span></div>
      </div>
      <div class="ch-grid">
        <aside class="ch-side">
          <div class="ch-index">${pad(i + 1)}</div>
          <p class="eyebrow">// ${esc(r.repo)} <span class="live-pill" data-live="${esc(r.repo)}"></span></p>
          <h2 class="split">${esc(r.name)}</h2>
          <p class="ch-kicker reveal" data-decode>${esc(r.kicker)}</p>
          <p class="ch-sum reveal">${esc(r.summary)}</p>
          <div class="ch-links reveal">
            <a class="btn primary magnetic" href="${gh(r)}" target="_blank" rel="noopener"><span>View repo ↗</span></a>
            ${r.live ? `<a class="btn ghost magnetic" href="${r.live}" target="_blank" rel="noopener"><span>Open live ↗</span></a>` : ""}
            <button class="btn ghost magnetic" data-open="${r.id}"><span>Deep dive</span></button>
          </div>
          <div class="ch-mini stagger">${r.stats.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>
        </aside>
        <div class="ch-body">
          <div><h3>How it works</h3>
            <ol class="steps"><span class="fill"></span>${r.pipeline.map(([b, p], j) => `<li data-n="${pad(j + 1)}"><b>${esc(b)}</b><p>${esc(p)}</p></li>`).join("")}</ol>
          </div>
          ${DEMOS[r.id] ? `<div class="reveal"><h3>Play with it</h3>${DEMOS[r.id]}</div>` : ""}
          <div><h3>Features</h3>
            <div class="feat-grid stagger">${r.features.map(([b, p]) => `<div class="feat"><b>${esc(b)}</b><p>${esc(p)}</p></div>`).join("")}</div>
          </div>
          <div class="reveal"><h3>Try it</h3>
            <div class="term"><div class="term-bar"><i></i><i></i><i></i><em>${esc(r.repo)}</em><button class="copy" data-copy="${esc(r.terminal.filter((l) => !l.startsWith("#")).map((l) => l.replace(/^[$>] /, "")).join("\n"))}">copy</button></div>
            <pre data-type="${esc(JSON.stringify(r.terminal))}"></pre></div>
          </div>
          <div><h3>Inside the repo</h3>
            <ul class="tree stagger">${r.architecture.map(([c, s]) => `<li><code>${esc(c)}</code><span>${esc(s)}</span></li>`).join("")}</ul>
          </div>
          <div class="reveal"><h3>Get it</h3>
            <div class="dl">${r.downloads.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>
          </div>
          <div class="reveal"><h3>Languages</h3>${langBar(r.langs)}</div>
          <div class="reveal"><h3>Honest limits</h3>
            <details class="acc"><summary>${r.limits.length} things to know before you use it</summary><ul>${r.limits.map((l) => `<li>${esc(l)}</li>`).join("")}</ul></details>
          </div>
        </div>
      </div>
    </section>`).join("");

  // languages donut + list
  const langSorted = Object.entries(allLangs).sort((a, b) => b[1] - a[1]);
  const C = 2 * Math.PI * 80;
  let off = 0;
  $("#donut").innerHTML = langSorted.map(([k, v]) => {
    const len = (v / totalBytes) * C;
    const el = `<circle r="80" cx="100" cy="100" stroke="${LANG_COLORS[k] || "#888"}" data-lang="${esc(k)}" data-len="${len}" stroke-dasharray="0 ${C}" stroke-dashoffset="${-off}"></circle>`;
    off += len;
    return el;
  }).join("");
  const setCenter = (k) => {
    const v = k ? allLangs[k] : totalBytes;
    $("#donut-center").innerHTML = `<div><b>${k ? ((v / totalBytes) * 100).toFixed(1) + "%" : (totalBytes / 1048576).toFixed(2) + " MB"}</b><span>${k ? esc(k) : "across " + langSorted.length + " languages"}</span></div>`;
  };
  setCenter();
  $("#lang-list").innerHTML = langSorted.map(([k, v]) => `<li data-lang="${esc(k)}"><span>${esc(k)}</span><div class="bar"><i style="background:${LANG_COLORS[k] || "#888"}" data-w="${((v / langSorted[0][1]) * 100).toFixed(2)}"></i></div><em>${(v / 1024).toFixed(0)} KB</em></li>`).join("");
  const hlLang = (k) => {
    $$("#donut circle, #lang-list li").forEach((e) => e.classList.toggle("hl", e.dataset.lang === k));
    setCenter(k);
  };
  $$("#donut circle, #lang-list li").forEach((e) => {
    e.addEventListener("mouseenter", () => hlLang(e.dataset.lang));
    e.addEventListener("mouseleave", () => hlLang(null));
  });

  // timeline
  const byDate = [...S.repos].sort((a, b) => a.created.localeCompare(b.created));
  $("#tl").insertAdjacentHTML("beforeend", byDate.map((r) => {
    const d = new Date(r.created + "T12:00:00");
    return `<div class="tl-item reveal" style="--c:${r.accent}"><time>${d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time><h4 data-goto="${r.id}">${esc(r.name)}</h4><p>${esc(r.kicker)}</p></div>`;
  }).join(""));

  $("#foot-quote").textContent = `“${S.quote}”`;

  // split text into word masks
  $$(".split").forEach((el) => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map((w, i) => `<span class="wd"><span style="transition-delay:${i * 0.06}s">${esc(w)}</span></span>`).join(" ");
  });

  // section dots + menu entries
  const sections = $$("[data-section]");
  $("#dots").innerHTML = sections.map((s, i) => `<a href="#" data-i="${i}" aria-label="${esc(s.dataset.section)}"><span>${esc(s.dataset.section)}</span></a>`).join("");
  $$("#dots a").forEach((a) => a.addEventListener("click", (e) => { e.preventDefault(); sections[+a.dataset.i].scrollIntoView({ behavior: "smooth" }); }));

  const menuItems = [["Home", "#top", null], ["Projects", "#projects", null], ...S.repos.map((r) => [r.name, "#" + r.id, r]), ["Languages", "#languages", null], ["Timeline", "#timeline", null]];
  $("#menu-list").innerHTML = menuItems.map(([t, h], i) => `<li><a href="${h}" data-mi="${i}" style="transition-delay:${0.15 + i * 0.04}s">${esc(t)}</a></li>`).join("");

  /* ---------------- boot sequence ---------------- */
  const bootLines = [
    "[ 0.000] A-Hackers-Guide kernel loading…",
    `[ 0.041] mounting github.com/${S.user}`,
    ...S.repos.map((r, i) => `[ 0.${pad(10 + i * 9)}] loaded ${r.repo} <span class="ok">ok</span>`),
    `[ 0.090] ${Object.keys(allLangs).length} languages · ${(totalBytes / 1048576).toFixed(2)} MB of code`,
    "[ 0.099] starting interface <span class=\"ok\">ready</span>"
  ];
  const boot = $("#boot"), bootLog = $("#boot-log"), bootBar = $(".boot-bar span");
  let seenBoot = false;
  try { seenBoot = sessionStorage.getItem("booted") === "1"; } catch (e) {}
  const finishBoot = () => {
    boot.classList.add("done");
    document.body.classList.add("ready");
    try { sessionStorage.setItem("booted", "1"); } catch (e) {}
    setTimeout(glitchOnce, 1400);
    startTyping();
  };
  // finishBoot runs after the rest of this script has set everything up
  if (reduce || seenBoot) { bootLog.innerHTML = bootLines.join("\n"); setTimeout(finishBoot, 0); }
  else {
    let i = 0;
    const step = () => {
      bootLog.innerHTML += (i ? "\n" : "") + bootLines[i];
      bootBar.style.width = `${((i + 1) / bootLines.length) * 100}%`;
      if (++i < bootLines.length) setTimeout(step, 70 + Math.random() * 90); else setTimeout(finishBoot, 350);
    };
    setTimeout(step, 200);
    boot.addEventListener("click", finishBoot, { once: true });
  }

  /* ---------------- typed hero line ---------------- */
  const phrases = [S.tagline, "Cross-platform ports · native apps · dev tools", "Rust · Swift · C++ · Python · JavaScript", "If it only runs on one OS, it isn't finished yet."];
  function startTyping() {
    const el = $("#typed");
    if (reduce) { el.textContent = phrases[0]; return; }
    let p = 0, c = 0, del = false;
    const tick = () => {
      const s = phrases[p];
      el.textContent = s.slice(0, c);
      if (!del && c < s.length) { c++; setTimeout(tick, 34 + Math.random() * 40); }
      else if (!del) { del = true; setTimeout(tick, 2200); }
      else if (c > 0) { c--; setTimeout(tick, 16); }
      else { del = false; p = (p + 1) % phrases.length; setTimeout(tick, 300); }
    };
    tick();
  }
  function glitchOnce() {
    h1.classList.remove("glitching"); void h1.offsetWidth; h1.classList.add("glitching");
    setTimeout(() => h1.classList.remove("glitching"), 400);
  }
  if (!reduce) setInterval(() => { if (scrollY < innerHeight) glitchOnce(); }, 4200);
  h1.addEventListener("mouseenter", glitchOnce);

  /* ---------------- background canvas: constellation ---------------- */
  const cv = $("#bg"), ctx = cv.getContext("2d");
  let W, H, pts = [], mouse = { x: -999, y: -999 }, bgRun = true;
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  const resize = () => {
    W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr;
    const n = Math.min(70, Math.floor((innerWidth * innerHeight) / 22000));
    pts = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.25 * dpr, vy: (Math.random() - 0.5) * 0.25 * dpr }));
  };
  resize();
  addEventListener("resize", resize);
  addEventListener("pointermove", (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
  document.addEventListener("visibilitychange", () => { bgRun = !document.hidden; if (bgRun) requestAnimationFrame(drawBg); });
  function drawBg() {
    if (!bgRun) return;
    ctx.clearRect(0, 0, W, H);
    const col = getComputedStyle(document.body).getPropertyValue("--brand").trim() || "#8b5cf6";
    const par = scrollY * 0.15 * dpr;
    const link = 140 * dpr;
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      const dx = p.x - mouse.x, dy = (p.y - par % H) - mouse.y, d = Math.hypot(dx, dy);
      if (d < 120 * dpr) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }
    }
    ctx.strokeStyle = col; ctx.fillStyle = col;
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], ay = ((a.y - par) % H + H) % H;
      ctx.globalAlpha = 0.55; ctx.beginPath(); ctx.arc(a.x, ay, 1.4 * dpr, 0, 7); ctx.fill();
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j], by = ((b.y - par) % H + H) % H, d = Math.hypot(a.x - b.x, ay - by);
        if (d < link) { ctx.globalAlpha = (1 - d / link) * 0.22; ctx.beginPath(); ctx.moveTo(a.x, ay); ctx.lineTo(b.x, by); ctx.stroke(); }
      }
    }
    ctx.globalAlpha = 1;
    if (!reduce) requestAnimationFrame(drawBg);
  }
  requestAnimationFrame(drawBg);

  /* ---------------- cursor + magnetic ---------------- */
  if (fine && !reduce) {
    document.body.classList.add("has-cursor");
    const cur = $("#cursor"), dot = $("#cursor-dot");
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
    addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; dot.style.transform = `translate(${tx}px,${ty}px)`; });
    (function loop() { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; cur.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("a, button, .pcard, [data-goto], summary, #donut circle, input");
      cur.classList.toggle("hover", !!t && !t.matches("input"));
      cur.classList.toggle("text", !!t && t.matches("input"));
    });
    document.addEventListener("pointerdown", () => cur.animate([{ scale: 1 }, { scale: 0.7 }, { scale: 1 }], { duration: 300 }));

    $$(".magnetic").forEach((m) => {
      m.addEventListener("pointermove", (e) => {
        const r = m.getBoundingClientRect();
        m.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      });
      m.addEventListener("pointerleave", () => { m.style.transform = ""; });
    });

    // 3D tilt on project cards
    $$(".pcard").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.transform = `perspective(900px) rotateY(${(x - 0.5) * 16}deg) rotateX(${(0.5 - y) * 14}deg) translateZ(10px)`;
        c.style.setProperty("--gx", `${x * 100}%`); c.style.setProperty("--gy", `${y * 100}%`);
      });
      c.addEventListener("pointerleave", () => { c.style.transform = ""; });
    });
    // hero letters lean toward the pointer
    const heroChars = $$(".glitch .ch");
    $(".hero").addEventListener("pointermove", (e) => {
      if (!document.body.classList.contains("ready")) return;
      heroChars.forEach((ch) => {
        const r = ch.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        const f = Math.max(0, 1 - Math.hypot(dx, dy) / 260);
        ch.style.transition = "transform .25s ease-out";
        ch.style.transform = `translate(${dx * f * 0.12}px, ${dy * f * 0.18 - f * 18}px) rotate(${dx * f * 0.04}deg) scale(${1 + f * 0.12})`;
      });
    });
    $(".hero").addEventListener("pointerleave", () => heroChars.forEach((ch) => { ch.style.transition = "transform .8s var(--ease)"; ch.style.transform = ""; }));

    // click sparks
    document.addEventListener("pointerdown", (e) => {
      const col = getComputedStyle(e.target.closest?.("[style*='--accent'], [style*='--c']") || document.body).getPropertyValue("--accent").trim() || "#8b5cf6";
      for (let i = 0; i < 12; i++) {
        const s = document.createElement("i"), a = (i / 12) * Math.PI * 2, d = 40 + Math.random() * 40;
        s.className = "spark"; s.style.left = e.clientX + "px"; s.style.top = e.clientY + "px"; s.style.background = col;
        document.body.appendChild(s);
        s.animate([{ transform: "translate(-50%,-50%) scale(1)", opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(0)`, opacity: 0 }], { duration: 600 + Math.random() * 300, easing: "cubic-bezier(.22,1,.36,1)" }).onfinish = () => s.remove();
      }
    });

    // spotlight on stat tiles and feature cards
    $$(".stat, .feat").forEach((s) => s.addEventListener("pointermove", (e) => {
      const r = s.getBoundingClientRect();
      s.style.setProperty("--mx", `${e.clientX - r.left}px`); s.style.setProperty("--my", `${e.clientY - r.top}px`);
    }));
  }

  /* ---------------- text scramble on hover ---------------- */
  const glyphs = "!<>-_\\/[]{}—=+*^?#01";
  $$("[data-scramble]").forEach((el) => {
    const orig = el.textContent; let raf;
    el.addEventListener("mouseenter", () => {
      let f = 0; cancelAnimationFrame(raf);
      const run = () => {
        el.textContent = [...orig].map((c, i) => (i < f / 2 || c === " " ? c : glyphs[(Math.random() * glyphs.length) | 0])).join("");
        if (f++ < orig.length * 2) raf = requestAnimationFrame(run); else el.textContent = orig;
      };
      run();
    });
  });

  /* ---------------- reveal observers ---------------- */
  const typed = new WeakSet();
  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in");
    if (el.classList.contains("stagger")) [...el.children].forEach((c, i) => (c.style.transitionDelay = `${i * 0.07}s`));
    $$("[data-count]", el).forEach(countUp);
    if (el.matches("[data-count]")) countUp(el);
    $$(".lbar i", el).forEach((i) => (i.style.width = i.dataset.w + "%"));
    $$("pre[data-type]", el).forEach(typeTerm);
    if (el.classList.contains("donut-wrap")) $$("#donut circle").forEach((c, i) => setTimeout(() => (c.style.strokeDasharray = `${c.dataset.len} ${C}`), i * 80));
    if (el.classList.contains("ch-banner")) el.classList.add("hit");
    if (el.matches("[data-decode]")) decode(el);
    io.unobserve(el);
  }), { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
  $$(".reveal, .split, .stagger, .donut-wrap, .ch-banner").forEach((e) => io.observe(e));
  const lio = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (e.isIntersecting) { $$("#lang-list .bar i").forEach((b, i) => setTimeout(() => (b.style.width = b.dataset.w + "%"), i * 60)); lio.disconnect(); }
  }), { threshold: 0.2 });
  lio.observe($("#lang-list"));

  function countUp(el) {
    if (el.dataset.done) return; el.dataset.done = 1;
    const end = +el.dataset.count, suf = el.dataset.suffix || "", t0 = performance.now(), dur = reduce ? 1 : 1800;
    const f = (t) => { const k = Math.min(1, (t - t0) / dur), v = Math.round(end * (1 - Math.pow(1 - k, 4))); el.textContent = v.toLocaleString() + suf; if (k < 1) requestAnimationFrame(f); };
    requestAnimationFrame(f);
  }
  function typeTerm(pre) {
    if (typed.has(pre)) return; typed.add(pre);
    const lines = JSON.parse(pre.dataset.type);
    const fmt = (l) => l.startsWith("#") ? `<span class="c">${esc(l)}</span>` : `<span class="p">${esc(l.slice(0, 1))}</span>${esc(l.slice(1))}`;
    if (reduce) { pre.innerHTML = lines.map(fmt).join("\n"); return; }
    let li = 0, ci = 0, done = [];
    const t = () => {
      if (li >= lines.length) { pre.innerHTML = done.map(fmt).join("\n"); return; }
      const cur = lines[li].slice(0, ++ci);
      pre.innerHTML = [...done.map(fmt), fmt(cur) + '<span class="caret">▍</span>'].join("\n");
      if (ci >= lines[li].length) { done.push(lines[li]); li++; ci = 0; setTimeout(t, 260); } else setTimeout(t, 18 + Math.random() * 24);
    };
    t();
  }

  /* ---------------- scroll-driven effects ---------------- */
  const tint = $("#tint");
  const prog = $("#progress"), nav = $("#nav"), topBtn = $("#top-btn");
  const words = $$("#big-words .w"), manSec = $("#manifesto");
  const pinWrap = $("#pin-wrap"), track = $("#h-track"), hBar = $("#h-bar");
  const steps = $$(".steps");
  const banners = $$(".ch-banner");
  const cards = $$(".pcard");
  const tlFill = $("#tl-fill"), tl = $("#tl");
  const heroInner = $(".hero-inner");
  const dots = $$("#dots a"), navLinks = $$(".nav-links a");
  let lastY = 0, ticking = false;

  const sizePin = () => {
    const extra = Math.max(0, track.scrollWidth - innerWidth);
    pinWrap.style.height = `${innerHeight + extra}px`;
  };
  sizePin(); addEventListener("resize", sizePin); addEventListener("load", sizePin);

  function onScroll() {
    const y = scrollY, vh = innerHeight, max = document.documentElement.scrollHeight - vh;
    prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    nav.classList.toggle("hidden", y > lastY && y > 300 && !document.body.classList.contains("menu-open"));
    topBtn.classList.toggle("show", y > vh);
    lastY = y;

    if (!reduce && y < vh) { heroInner.style.transform = `translateY(${y * 0.35}px) scale(${1 - y / vh * 0.12})`; heroInner.style.opacity = 1 - y / vh * 1.1; }

    // manifesto words light up one by one
    const mr = manSec.getBoundingClientRect();
    const mk = Math.min(1, Math.max(0, (vh * 0.6 - mr.top) / (mr.height - vh * 0.4)));
    const on = Math.floor(mk * words.length * 1.05);
    words.forEach((w, i) => w.classList.toggle("on", i < on));

    // horizontal pinned gallery
    const pr = pinWrap.getBoundingClientRect(), dist = pinWrap.offsetHeight - vh;
    const pk = dist > 0 ? Math.min(1, Math.max(0, -pr.top / dist)) : 0;
    track.style.transform = `translateX(${-pk * Math.max(0, track.scrollWidth - innerWidth)}px)`;
    hBar.style.transform = `scaleX(${pk})`;
    // cards bend away from the centre of the screen like a coverflow
    if (!reduce && pr.top < vh && pr.bottom > 0) cards.forEach((c) => {
      if (c.matches(":hover")) return;
      const r = c.getBoundingClientRect(), d = (r.left + r.width / 2 - innerWidth / 2) / innerWidth;
      c.style.transform = `perspective(1000px) rotateY(${d * -28}deg) scale(${1 - Math.min(0.14, Math.abs(d) * 0.18)})`;
      c.style.opacity = 1 - Math.min(0.5, Math.abs(d) * 0.55);
    });

    // chapter banners: giant names slide sideways
    banners.forEach((b) => {
      const r = b.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const k = (vh - r.top) / (vh + r.height);
      const [g1, g2] = b.querySelectorAll(".ch-giant span");
      g1.style.transform = `translateX(${(0.2 - k) * 60}%)`;
      g2.style.transform = `translateX(${(k - 0.9) * 50}%)`;
      b.style.setProperty("--k", Math.max(0, Math.min(1, k * 1.6)).toFixed(3));
    });

    // pipeline steps light up as you pass them
    steps.forEach((ol) => {
      const r = ol.getBoundingClientRect();
      const k = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      ol.querySelector(".fill").style.transform = `scaleY(${k})`;
      $$("li", ol).forEach((li) => li.classList.toggle("on", li.getBoundingClientRect().top < vh * 0.62));
    });

    // timeline line
    const tr = tl.getBoundingClientRect();
    tlFill.style.transform = `scaleY(${Math.min(1, Math.max(0, (vh * 0.6 - tr.top) / tr.height))})`;

    // active section
    let act = 0;
    sections.forEach((s, i) => { if (s.getBoundingClientRect().top < vh * 0.45) act = i; });
    dots.forEach((d, i) => d.classList.toggle("active", i === act));
    const accent = sections[act].style.getPropertyValue("--accent");
    $("#dots").style.setProperty("--accent", accent || "var(--brand)");
    tint.style.backgroundColor = accent || "transparent";
    const id = sections[act].id;
    navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id || (a.getAttribute("href") === "#projects" && S.repos.some((r) => r.id === id))));
    ticking = false;
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- menu ---------------- */
  const menuBtn = $("#menu-btn"), preview = $("#menu-preview");
  const setMenu = (open) => {
    document.body.classList.toggle("menu-open", open);
    document.body.classList.toggle("locked", open);
    menuBtn.setAttribute("aria-expanded", open);
    $("#menu").setAttribute("aria-hidden", !open);
    if (!open) preview.classList.remove("show");
  };
  menuBtn.addEventListener("click", () => setMenu(!document.body.classList.contains("menu-open")));
  $$("#menu-list a").forEach((a) => {
    a.addEventListener("click", () => setMenu(false));
    a.addEventListener("mouseenter", () => {
      const r = menuItems[+a.dataset.mi][2];
      if (!r) { preview.classList.remove("show"); return; }
      preview.style.setProperty("--accent", r.accent);
      preview.style.background = `linear-gradient(160deg, ${r.accent}33, transparent 70%)`;
      preview.innerHTML = `<span class="mp-icon" style="color:${r.accent}">${esc(r.icon)}</span><p class="eyebrow">// ${esc(r.repo)}</p><h4>${esc(r.name)}</h4><p class="muted">${esc(r.kicker)}</p>`;
      preview.classList.add("show");
    });
  });

  /* ---------------- command palette ---------------- */
  const pal = $("#palette"), pin = $("#palette-input"), plist = $("#palette-list");
  const cmds = [
    ...S.repos.map((r) => ({ t: r.name, k: "jump", i: r.icon, run: () => go("#" + r.id) })),
    ...S.repos.map((r) => ({ t: `${r.name}: deep dive`, k: "open", i: "⤢", run: () => openModal(r.id) })),
    ...S.repos.map((r) => ({ t: `${r.name} on GitHub`, k: "link", i: "↗", run: () => open(gh(r), "_blank", "noopener") })),
    { t: "Projects gallery", k: "jump", i: "▦", run: () => go("#projects") },
    { t: "Languages", k: "jump", i: "◔", run: () => go("#languages") },
    { t: "Timeline", k: "jump", i: "⌇", run: () => go("#timeline") },
    { t: "Toggle light / dark mode", k: "action", i: "☀", run: () => $("#theme-btn").click() },
    { t: "Matrix mode", k: "action", i: "01", run: matrix },
    { t: "Back to top", k: "action", i: "↑", run: () => go("#top") },
    { t: "Open GitHub profile", k: "link", i: "↗", run: () => open(`https://github.com/${S.user}`, "_blank", "noopener") }
  ];
  let sel = 0, shown = cmds;
  const go = (h) => document.querySelector(h).scrollIntoView({ behavior: "smooth" });
  const renderPal = () => {
    const q = pin.value.toLowerCase().trim();
    shown = cmds.filter((c) => !q || q.split(/\s+/).every((w) => (c.t + " " + c.k).toLowerCase().includes(w)));
    sel = Math.min(sel, Math.max(0, shown.length - 1));
    plist.innerHTML = shown.length ? shown.map((c, i) => `<li class="${i === sel ? "sel" : ""}" data-i="${i}"><span class="pi">${esc(c.i)}</span><span class="pt">${esc(c.t)}</span><span class="pk">${c.k}</span></li>`).join("") : `<li><span class="pt muted">No matches</span></li>`;
    plist.querySelector(".sel")?.scrollIntoView({ block: "nearest" });
  };
  const setPal = (o) => {
    pal.classList.toggle("open", o); pal.setAttribute("aria-hidden", !o);
    if (o) { pin.value = ""; sel = 0; renderPal(); setTimeout(() => pin.focus(), 50); }
  };
  const runSel = () => { const c = shown[sel]; if (c) { setPal(false); c.run(); } };
  pin.addEventListener("input", () => { sel = 0; renderPal(); });
  pin.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { sel = (sel + 1) % shown.length; renderPal(); e.preventDefault(); }
    if (e.key === "ArrowUp") { sel = (sel - 1 + shown.length) % shown.length; renderPal(); e.preventDefault(); }
    if (e.key === "Enter") runSel();
  });
  plist.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) { sel = +li.dataset.i; runSel(); } });
  pal.addEventListener("click", (e) => { if (e.target === pal) setPal(false); });
  $("#palette-btn").addEventListener("click", () => setPal(true));

  /* ---------------- modal ---------------- */
  const modal = $("#modal"), mbox = $("#modal-box");
  function openModal(id) {
    const r = S.repos.find((x) => x.id === id); if (!r) return;
    const tabs = [
      ["Overview", `<p class="ch-kicker">${esc(r.kicker)}</p><p class="muted">${esc(r.summary)}</p><div class="ch-mini">${r.stats.map(([b, s]) => `<div><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>`],
      ["Pipeline", `<ol class="steps static">${r.pipeline.map(([b, p], j) => `<li class="on" data-n="${pad(j + 1)}"><b>${esc(b)}</b><p>${esc(p)}</p></li>`).join("")}</ol>`],
      ["Features", `<div class="feat-grid">${r.features.map(([b, p]) => `<div class="feat"><b>${esc(b)}</b><p>${esc(p)}</p></div>`).join("")}</div>`],
      ["Structure", `<ul class="tree">${r.architecture.map(([c, s]) => `<li><code>${esc(c)}</code><span>${esc(s)}</span></li>`).join("")}</ul>`],
      ["Limits", `<ul class="muted">${r.limits.map((l) => `<li style="margin-bottom:10px">${esc(l)}</li>`).join("")}</ul>`]
    ];
    mbox.style.setProperty("--accent", r.accent);
    mbox.innerHTML = `<button class="m-close" aria-label="Close">✕</button>
      <div class="m-head"><span class="ico">${esc(r.icon)}</span><p class="eyebrow">// ${esc(r.repo)} · ${esc(r.release)} · ${esc(r.license)}</p><h2>${esc(r.name)}</h2>
      <div class="ch-links"><a class="btn primary" href="${gh(r)}" target="_blank" rel="noopener"><span>View repo ↗</span></a>${r.live ? `<a class="btn ghost" href="${r.live}" target="_blank" rel="noopener"><span>Open live ↗</span></a>` : ""}<button class="btn ghost" data-goto="${r.id}"><span>Jump to chapter</span></button></div></div>
      <div class="tabs" role="tablist">${tabs.map(([t], i) => `<button role="tab" class="${i ? "" : "on"}" data-t="${i}">${t}</button>`).join("")}<span class="ink"></span></div>
      <div class="tab-panels">${tabs.map(([, h], i) => `<div class="tab-panel ${i ? "" : "on"}">${h}</div>`).join("")}</div>`;
    const ink = $(".ink", mbox);
    const moveInk = (b) => { ink.style.left = b.offsetLeft + "px"; ink.style.width = b.offsetWidth + "px"; };
    $$(".tabs button", mbox).forEach((b) => b.addEventListener("click", () => {
      $$(".tabs button", mbox).forEach((x) => x.classList.toggle("on", x === b));
      $$(".tab-panel", mbox).forEach((p, i) => p.classList.toggle("on", i === +b.dataset.t));
      moveInk(b);
    }));
    $(".m-close", mbox).addEventListener("click", closeModal);
    modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); document.body.classList.add("locked");
    requestAnimationFrame(() => moveInk($(".tabs button", mbox)));
    $(".m-close", mbox).focus();
  }
  function closeModal() { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("locked"); }
  $(".modal-bg").addEventListener("click", closeModal);

  /* ---------------- global clicks & keys ---------------- */
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]"); if (o) { openModal(o.dataset.open); return; }
    const g = e.target.closest("[data-goto]"); if (g) { closeModal(); go("#" + g.dataset.goto); return; }
    const c = e.target.closest("[data-copy]");
    if (c) { navigator.clipboard?.writeText(c.dataset.copy).then(() => toast("Copied to clipboard"), () => toast("Couldn't copy")); }
  });
  $$(".pcard").forEach((c) => c.addEventListener("keydown", (e) => { if (e.key === "Enter") openModal(c.dataset.open); }));

  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  let kpos = 0;
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setPal(!pal.classList.contains("open")); return; }
    if (e.key === "/" && !pal.classList.contains("open") && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); setPal(true); return; }
    if (e.key === "Escape") { setPal(false); closeModal(); setMenu(false); }
    kpos = e.key === konami[kpos] ? kpos + 1 : e.key === konami[0] ? 1 : 0;
    if (kpos === konami.length) { kpos = 0; matrix(); }
  });

  function matrix() {
    document.body.classList.toggle("matrix");
    toast(document.body.classList.contains("matrix") ? "Wake up, Neo… matrix mode on" : "Matrix mode off");
  }



  /* ---------------- demo logic ---------------- */
  const CF = [
    ["#include <windows.h>", '#include "crossfire/cf_platform.h"'],
    ["__declspec(align(16)) struct Vec4 { float x, y, z, w; };", "struct alignas(16) Vec4 { float x, y, z, w; };"],
    ["LARGE_INTEGER t; QueryPerformanceCounter(&t);", "auto t = std::chrono::steady_clock::now();"],
    ["Sleep(16);", "std::this_thread::sleep_for(std::chrono::milliseconds(16));"],
    ['FILE* f = fopen("assets\\\\level1.dat", "rb");', 'FILE* f = fopen("assets/level1.dat", "rb");']
  ];
  const cfPre = $(".cf-code");
  if (cfPre) {
    let state = 0;
    const draw = (rows, mark) => (cfPre.innerHTML = rows.map((l, i) => `<span class="${mark && mark[i] ? "new" : ""}">${esc(l)}</span>`).join("\n"));
    draw(CF.map((r) => r[0]));
    $("[data-cf]").addEventListener("click", (e) => {
      const btn = e.currentTarget; btn.disabled = true;
      const from = state ? 1 : 0, to = 1 - from, rows = CF.map((r) => r[from]), mark = [];
      CF.forEach((pair, i) => setTimeout(() => {
        const target = pair[to]; let f = 0;
        const step = () => {
          rows[i] = [...target].map((c, j) => (j < f ? c : c === " " ? " " : glyphs[(Math.random() * glyphs.length) | 0])).join("");
          mark[i] = to === 1; draw(rows, mark);
          if ((f += 2) <= target.length + 1) requestAnimationFrame(step); else { rows[i] = target; draw(rows, mark); }
        };
        reduce ? ((rows[i] = target), (mark[i] = to === 1), draw(rows, mark)) : step();
      }, reduce ? 0 : i * 260));
      setTimeout(() => { state = to; btn.disabled = false; $("span", btn).textContent = to ? "Undo ⇄" : "Convert ⇄"; }, reduce ? 0 : CF.length * 260 + 600);
    });
  }

  const nlIn = $("#nl-in"), nlOut = $("#nl-out");
  if (nlIn) {
    const enc = new TextEncoder();
    const render = () => {
      const digits = [...enc.encode(nlIn.value)].map((b) => String(b).padStart(3, "0")).join("");
      nlOut.innerHTML = [...digits.slice(0, 600)].map((d, i) => `<span style="animation-delay:${Math.min(i, 120) * 6}ms">${d}</span>`).join("") + (digits.length > 600 ? "…" : "");
      nlOut.dataset.total = `${digits.length.toLocaleString()} digits`;
    };
    nlIn.addEventListener("input", render); render();
  }

  const daFile = $("#da-file"), daDrop = $("#da-drop"), daOut = $("#da-out");
  if (daFile) {
    const SIGS = [
      [[0x89, 0x50, 0x4e, 0x47], "PNG image"], [[0xff, 0xd8, 0xff], "JPEG image"], [[0x47, 0x49, 0x46, 0x38], "GIF image"],
      [[0x25, 0x50, 0x44, 0x46], "PDF document"], [[0x50, 0x4b, 0x03, 0x04], "ZIP archive (or docx/xlsx/jar/apk)"],
      [[0x1f, 0x8b], "GZIP archive"], [[0x42, 0x5a, 0x68], "BZIP2 archive"], [[0xfd, 0x37, 0x7a, 0x58, 0x5a, 0x00], "XZ archive"],
      [[0x37, 0x7a, 0xbc, 0xaf, 0x27, 0x1c], "7z archive"], [[0x52, 0x61, 0x72, 0x21], "RAR archive"],
      [[0x7f, 0x45, 0x4c, 0x46], "ELF executable"], [[0x4d, 0x5a], "PE / Windows executable"],
      [[0xcf, 0xfa, 0xed, 0xfe], "Mach-O executable (64-bit)"], [[0xca, 0xfe, 0xba, 0xbe], "Mach-O universal binary (or Java class)"],
      [[0x53, 0x51, 0x4c, 0x69, 0x74, 0x65], "SQLite database"], [[0x49, 0x44, 0x33], "MP3 audio (ID3)"],
      [[0x52, 0x49, 0x46, 0x46], "RIFF container (WAV/AVI/WebP)"], [[0x4f, 0x67, 0x67, 0x53], "Ogg media"], [[0x66, 0x4c, 0x61, 0x43], "FLAC audio"]
    ];
    const run = async (file) => {
      daOut.innerHTML = `<p class="muted">Reading ${esc(file.name)}…</p>`;
      const head = new Uint8Array(await file.slice(0, 65536).arrayBuffer());
      const sig = SIGS.find(([m]) => m.every((b, i) => head[i] === b));
      const counts = new Array(256).fill(0); head.forEach((b) => counts[b]++);
      const entropy = counts.reduce((e, c) => (c ? e - (c / head.length) * Math.log2(c / head.length) : e), 0);
      const printable = head.filter((b) => (b >= 32 && b < 127) || b === 9 || b === 10 || b === 13).length / (head.length || 1);
      let hash = "file over 64 MB, skipped";
      if (file.size <= 67108864 && crypto.subtle) {
        const h = new Uint8Array(await crypto.subtle.digest("SHA-256", await file.arrayBuffer()));
        hash = [...h].map((b) => b.toString(16).padStart(2, "0")).join("");
      }
      const hex = [...head.slice(0, 64)].map((b) => b.toString(16).padStart(2, "0")).join(" ");
      const guess = sig ? sig[1] : printable > 0.95 ? "Text" : entropy > 7.5 ? "Unknown, high entropy (compressed or encrypted?)" : "Unknown binary";
      daOut.innerHTML = `
        <div class="da-row"><span>File</span><b>${esc(file.name)} · ${file.size.toLocaleString()} bytes</b></div>
        <div class="da-row"><span>Signature</span><b>${esc(guess)}</b></div>
        <div class="da-row"><span>Entropy</span><b>${entropy.toFixed(3)} bits/byte <em class="ent"><i style="width:${(entropy / 8) * 100}%"></i></em></b></div>
        <div class="da-row"><span>Printable</span><b>${(printable * 100).toFixed(1)}%</b></div>
        <div class="da-row"><span>SHA-256</span><b class="mono">${hash}</b></div>
        <div class="da-row"><span>First 64 bytes</span><b class="mono">${hex}</b></div>`;
    };
    daFile.addEventListener("change", () => daFile.files[0] && run(daFile.files[0]));
    ["dragenter", "dragover"].forEach((t) => daDrop.addEventListener(t, (e) => { e.preventDefault(); daDrop.classList.add("over"); }));
    ["dragleave", "drop"].forEach((t) => daDrop.addEventListener(t, () => daDrop.classList.remove("over")));
    daDrop.addEventListener("drop", (e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) run(f); });
  }


  // FreeMessenger: real ECDH + AES-GCM between two in-page users
  if ($("#fm-send") && crypto.subtle) (async () => {
    const gen = () => crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, false, ["deriveKey", "deriveBits"]);
    const [a, b] = await Promise.all([gen(), gen()]);
    const derive = (priv, pub) => crypto.subtle.deriveKey({ name: "ECDH", public: pub }, priv, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"]);
    const [ka, kb] = await Promise.all([derive(a.privateKey, b.publicKey), derive(b.privateKey, a.publicKey)]);
    const fingerprint = async (priv, pub) => {
      const bits = await crypto.subtle.deriveBits({ name: "ECDH", public: pub }, priv, 256);
      const h = new Uint8Array(await crypto.subtle.digest("SHA-256", bits));
      return [...h.slice(0, 6)].map((x) => String(x % 100).padStart(2, "0")).join("").replace(/(\d{4})(?=\d)/g, "$1 ");
    };
    const [fa, fb] = await Promise.all([fingerprint(a.privateKey, b.publicKey), fingerprint(b.privateKey, a.publicKey)]);
    $("#fm-fp").textContent = fa === fb ? `${fa}  ✓ alice and bob match` : `alice ${fa} ≠ bob ${fb}`;
    const send = async () => {
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, ka, new TextEncoder().encode($("#fm-msg").value)));
      const hex = [...ct].map((x) => x.toString(16).padStart(2, "0")).join("");
      const el = $("#fm-cipher"); el.textContent = ""; el.classList.remove("fly"); void el.offsetWidth; el.classList.add("fly");
      el.textContent = hex;
      const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, kb, ct);
      setTimeout(() => { const p = $("#fm-plain"); p.textContent = new TextDecoder().decode(pt); p.animate([{ opacity: 0, transform: "translateX(-20px)" }, { opacity: 1, transform: "none" }], { duration: 500, easing: "ease-out" }); }, reduce ? 0 : 700);
    };
    $("#fm-send").addEventListener("click", send);
    $("#fm-msg").addEventListener("keydown", (e) => { if (e.key === "Enter") send(); });
    send();
  })().catch(() => { $("#fm-fp").textContent = "Web Crypto unavailable in this browser"; });

  // OpenCore Modernity Patcher: support lookup from the README tables
  const OC_CPU = [
    ["Intel Haswell → Comet Lake (4th–10th gen)", "ok", "Desktop and laptop supported."],
    ["Intel Rocket Lake (11th gen desktop)", "dgpu", "Needs a dGPU; iGPU unsupported. CPU spoofed as Comet Lake."],
    ["Intel Alder / Raptor / Arrow Lake (12th–15th)", "dgpu", "Needs a dGPU. Spoofed as Comet Lake with ProvideCurrentCpuInfo and CpuTopologyRebuild. Disabling E-cores helps."],
    ["Intel Ice Lake laptop", "ok", "Iris Plus iGPU supported."],
    ["Intel HEDT (Haswell-E → Cascade Lake-X)", "dgpu", "Needs a dGPU. iMacPro1,1 / MacPro7,1."],
    ["Intel Ivy Bridge or older", "no", "Too old for any targeted macOS."],
    ["AMD Ryzen / Threadripper (Zen → Zen 5)", "dgpu", "Needs a supported dGPU. AMD_Vanilla patches with your core count."],
    ["AMD FX / Athlon (15h/16h)", "warn", "No AVX2. Ventura+ needs CryptexFixup, and some apps won't run."]
  ];
  const OC_GPU = [
    ["AMD Polaris (RX 460–590) / Vega", "ok", "High Sierra → Tahoe."],
    ["AMD Navi 10/14/21/23 (RX 5000, 6600, 6800/6900)", "ok", "Catalina/Big Sur/Monterey → Tahoe, agdpmod=pikera added automatically."],
    ["AMD Navi 22 (RX 6700/6750)", "ok", "Monterey 12.1 → Tahoe."],
    ["AMD Navi 24, RDNA 3 (RX 7000), RDNA 4 (RX 9000)", "no", "No drivers; disabled automatically."],
    ["NVIDIA Kepler (GTX 600/700)", "warn", "Up to Big Sur natively; Monterey+ needs root patching from macOS."],
    ["NVIDIA Maxwell / Pascal (GTX 900/1000)", "warn", "High Sierra only (Web Drivers)."],
    ["NVIDIA Turing and newer (GTX 16, RTX 20–50)", "no", "No drivers; disabled automatically."],
    ["Intel iGPU only (Haswell → Comet Lake, Ice Lake)", "ok", "Framebuffer set automatically."]
  ];
  const ocCpu = $("#oc-cpu"), ocGpu = $("#oc-gpu");
  if (ocCpu) {
    ocCpu.innerHTML = OC_CPU.map((c, i) => `<option value="${i}">${esc(c[0])}</option>`).join("");
    ocGpu.innerHTML = OC_GPU.map((g, i) => `<option value="${i}">${esc(g[0])}</option>`).join("");
    ocGpu.value = "0";
    const label = { ok: "✅ Supported", dgpu: "✅ With a dGPU", warn: "⚠️ Limited", no: "❌ Not supported" };
    const show = () => {
      const c = OC_CPU[ocCpu.value], g = OC_GPU[ocGpu.value];
      const igpuOnly = +ocGpu.value === OC_GPU.length - 1;
      let verdict = c[1] === "no" || g[1] === "no" ? "no" : c[1] === "dgpu" && igpuOnly ? "no" : c[1] === "warn" || g[1] === "warn" ? "warn" : "ok";
      const why = c[1] === "dgpu" && igpuOnly ? "This CPU needs a supported dedicated GPU." : g[1] === "no" ? "With no usable GPU left, the build stops with a clear message." : "";
      $("#oc-out").innerHTML = `<div class="oc-row oc-${c[1]}"><span>CPU</span><b>${label[c[1]]}</b><p>${esc(c[2])}</p></div>
        <div class="oc-row oc-${g[1]}"><span>GPU</span><b>${label[g[1]]}</b><p>${esc(g[2])}</p></div>
        <div class="oc-verdict oc-${verdict}">${verdict === "no" ? "Won't build a working EFI" : verdict === "warn" ? "Works, with caveats" : "Looks good to build"}${why ? `<small>${esc(why)}</small>` : ""}</div>`;
    };
    ocCpu.addEventListener("change", show); ocGpu.addEventListener("change", show); show();
  }

  // WiiThemer: which pipeline runs
  const WT = {
    normal: ["{themewii} {appid} {key}", "{themewii} {theme} {appid} 000000{appid}.app {key}", "{themewii} {spin} {appid}.app {output} {key}"],
    run_first: ["{themewii} {appid} {key}", "{themewii} {spin} {appid} 000000{appid}.app {key}", "{themewii} {theme} {appid}.app {output} {key}"]
  };
  const wtT = $("#wt-theme");
  if (wtT) {
    const show = () => {
      const theme = wtT.value, spin = $("#wt-spin").value, mode = $("#wt-first").value;
      const first = mode === "yes" || (mode === "auto" && theme !== "other");
      const file = theme === "other" ? "your_theme.mym" : theme.toLowerCase().replace(/ /g, "_") + ".mym";
      $("#wt-mode").innerHTML = `Pipeline: <b>${first ? "run_first" : "normal"}</b> ${mode === "auto" ? `· auto rule says ${theme === "other" ? "this theme applies the spin after" : `${esc(theme)} applies the spin first`}` : "· forced"}`;
      $("#wt-cmds").innerHTML = WT[first ? "run_first" : "normal"].map((l, i) =>
        `<span class="new" style="animation-delay:${i * 0.1}s">${esc(l.replace("{theme}", file).replace("{spin}", spin + ".mym"))}</span>`).join("\n");
      $$("#wt-cmds span").forEach((x) => x.classList.add("wt-in"));
    };
    ["#wt-theme", "#wt-spin", "#wt-first"].forEach((q) => $(q).addEventListener("change", show)); show();
  }

  // APIvis: JSON path subset
  const AV = { data: { total: 3, items: [{ name: "crossfire", lang: "Rust", stars: 0 }, { name: "numberlock", lang: "Rust", stars: 0 }, { name: "apivis", lang: "Swift", stars: 0 }] } };
  const avPath = $("#av-path");
  if (avPath) {
    $("#av-json").textContent = JSON.stringify(AV, null, 2);
    const query = (path) => {
      if (!/^\$/.test(path)) throw new Error("Paths start with $");
      const toks = path.slice(1).match(/\.[A-Za-z_][\w-]*|\[-?\d+\]|\[\*\]/g) || [];
      if (toks.join("") !== path.slice(1)) throw new Error("Only $.a.b, [0], [-1] and [*] are supported");
      let cur = [AV];
      for (const t of toks) {
        cur = cur.flatMap((v) => {
          if (t === "[*]") return Array.isArray(v) ? v : [];
          if (t[0] === "[") { const n = +t.slice(1, -1); return Array.isArray(v) ? [v[n < 0 ? v.length + n : n]] : []; }
          return v && typeof v === "object" && t.slice(1) in v ? [v[t.slice(1)]] : [];
        }).filter((v) => v !== undefined);
      }
      return toks.includes("[*]") ? cur : cur[0];
    };
    const run = () => {
      const out = $("#av-res");
      try { const r = query(avPath.value.trim()); out.className = "av-res ok"; out.textContent = r === undefined ? "no match" : JSON.stringify(r, null, 2); }
      catch (e) { out.className = "av-res err"; out.textContent = e.message; }
    };
    avPath.addEventListener("input", run);
    $$(".av-chips button").forEach((b) => b.addEventListener("click", () => { avPath.value = b.dataset.path; run(); }));
    run();
  }

  // HearthOS: permission model
  const htLog = $("#ht-log");
  if (htLog) {
    const lines = [];
    const log = (l, cls) => { lines.push(`<span class="${cls}">${esc(l)}</span>`); htLog.innerHTML = lines.slice(-6).join("\n"); };
    log("# remote_sessions log", "c");
    $$("[data-ht]").forEach((b) => b.addEventListener("click", () => {
      const t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      if (b.dataset.ht === "view") log(`${t}  voice  view   office-mac  → 200 live view on nearest TV`, "new");
      else if ($("#ht-ai").checked) log(`${t}  voice  click  office-mac  → 200 click sent (input logged)`, "new");
      else log(`${t}  voice  click  office-mac  → 403 AI control not allowed`, "bad");
    }));
    $("#ht-ai").addEventListener("change", (e) => log(`# AI control ${e.target.checked ? "granted" : "revoked"} for office-mac`, "c"));
  }

  /* ---------------- round three ---------------- */
  // decode text from random glyphs into the real words
  function decode(el) {
    if (reduce || el.dataset.decoded) return; el.dataset.decoded = 1;
    const orig = el.textContent; let f = 0;
    const run = () => {
      el.textContent = [...orig].map((c, i) => (c === " " || i < f ? c : glyphs[(Math.random() * glyphs.length) | 0])).join("");
      f += Math.max(1, orig.length / 40);
      if (f < orig.length) requestAnimationFrame(run); else el.textContent = orig;
    };
    run();
  }

  // live numbers straight from the GitHub API, cached per visit
  const ago = (iso) => {
    const s = (Date.now() - new Date(iso)) / 1000;
    for (const [n, u] of [[31536000, "y"], [2592000, "mo"], [86400, "d"], [3600, "h"], [60, "m"]]) if (s >= n) return Math.floor(s / n) + u + " ago";
    return "just now";
  };
  const paintLive = (repo, d) => $$(`[data-live="${repo}"]`).forEach((el) => {
    el.innerHTML = `<i></i>live${d.stargazers_count ? ` · ★ ${d.stargazers_count}` : ""} · pushed ${ago(d.pushed_at)}`;
    el.classList.add("on");
  });
  S.repos.forEach((r, i) => {
    let cached = null;
    try { cached = JSON.parse(sessionStorage.getItem("gh:" + r.repo)); } catch (e) {}
    if (cached) { paintLive(r.repo, cached); return; }
    setTimeout(() => fetch(`https://api.github.com/repos/${S.user}/${r.repo}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((d) => {
        const keep = { stargazers_count: d.stargazers_count, pushed_at: d.pushed_at };
        try { sessionStorage.setItem("gh:" + r.repo, JSON.stringify(keep)); } catch (e) {}
        paintLive(r.repo, keep);
      }).catch(() => {}), 600 + i * 120);
  });

  // type "sudo" anywhere
  let typedKeys = "";
  document.addEventListener("keydown", (e) => {
    if (/INPUT|TEXTAREA/.test(document.activeElement.tagName) || e.key.length !== 1) return;
    typedKeys = (typedKeys + e.key.toLowerCase()).slice(-4);
    if (typedKeys === "sudo") {
      toast("“Always use sudo.” · Evi Nemeth");
      if (!reduce) document.body.animate([{ filter: "hue-rotate(0)" }, { filter: "hue-rotate(360deg)" }], { duration: 1200 });
    }
  });

  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }
})();
