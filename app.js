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
  try { const t = localStorage.getItem("theme"); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
  $("#theme-btn").addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    toast(next === "light" ? "☀ Light mode" : "☾ Dark mode");
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
          <p class="eyebrow">// ${esc(r.repo)}</p>
          <h2 class="split">${esc(r.name)}</h2>
          <p class="ch-kicker reveal">${esc(r.kicker)}</p>
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
    { t: "Toggle light / dark theme", k: "action", i: "◐", run: () => $("#theme-btn").click() },
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
    if (e.key === "/" && !pal.classList.contains("open") && document.activeElement.tagName !== "INPUT") { e.preventDefault(); setPal(true); return; }
    if (e.key === "Escape") { setPal(false); closeModal(); setMenu(false); }
    kpos = e.key === konami[kpos] ? kpos + 1 : e.key === konami[0] ? 1 : 0;
    if (kpos === konami.length) { kpos = 0; matrix(); }
  });

  function matrix() {
    document.body.classList.toggle("matrix");
    toast(document.body.classList.contains("matrix") ? "Wake up, Neo… matrix mode on" : "Matrix mode off");
  }

  let toastT;
  function toast(msg) {
    const t = $("#toast"); t.textContent = msg; t.classList.add("show");
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove("show"), 2200);
  }
})();
