/* Change Barometer: shared page shell (navigation, language switch, footer, toast) */
(function () {
  const CB = window.CB;
  const state = { lang: CB.detectLang(), render: null };

  function shell() {
    const page = document.body.dataset.page;
    const u = CB.UI[state.lang];
    const hash = location.hash.match(/s=[^&]+/);
    const keep = hash ? "#" + hash[0] : "";
    const nav = document.getElementById("nav");
    const link = (href, key, label) =>
      `<a href="${href}${key === "home" ? "" : keep}"${page === key ? ' aria-current="page"' : ""}>${CB.esc(label)}</a>`;
    nav.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>${CB.esc(u.brand)}</a>
      <nav class="nav-links" aria-label="Menu">
        ${link("index.html", "home", u.navHome)}
        ${link("survey.html", "survey", u.navSurvey)}
        ${link("dashboard.html", "dash", u.navDash)}
      </nav>
      <div class="lang" role="group" aria-label="Language">
        ${[["fr", "FR"], ["en", "EN"], ["ja", "日本語"]].map(([k, l]) =>
          `<button type="button" data-lang="${k}" class="${k === state.lang ? "on" : ""}" aria-pressed="${k === state.lang}">${l}</button>`).join("")}
      </div>
    </div>`;
    nav.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));
    const foot = document.getElementById("footer");
    foot.innerHTML = `<div class="wrap">
      <div class="row"><span>${CB.esc(u.footer)}</span><a href="https://github.com/constanceweber6-alt/change-barometer">GitHub</a></div>
      <p class="note" style="margin:0">${CB.esc(u.tm)}</p>
    </div>`;
    document.documentElement.lang = state.lang;
  }

  function setLang(lang) {
    state.lang = lang;
    CB.saveLang(lang);
    shell();
    if (state.render) state.render(lang);
  }

  let toastTimer;
  function toast(msg) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
  }

  async function copy(text, okMsg) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (err) { /* ignore */ }
      ta.remove();
    }
    toast(okMsg);
  }

  function download(name, text, type) {
    const blob = new Blob(["﻿" + text], { type: type || "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function surveyFromHash() {
    const m = location.hash.match(/s=([A-Za-z0-9_-]+)/);
    return m ? { token: m[1], survey: CB.decodeSurvey(m[1]) } : null;
  }

  window.Page = {
    get lang() { return state.lang; },
    start(render) { state.render = render; shell(); render(state.lang); },
    refreshShell: shell,
    toast, copy, download, surveyFromHash,
  };
})();
