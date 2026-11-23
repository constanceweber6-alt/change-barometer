/* Change adoption barometer: content, encoding and scoring.
 * Runs in the browser (window.CB) and in Node for tests (module.exports).
 * No server: survey settings and answers travel in links and short codes.
 */
(function (root) {
  "use strict";

  const STAGES = ["A", "D", "K", "B", "R"]; // B = Ability (A is already Awareness)

  const STAGE_NAMES = {
    fr: { A: "Conscience", D: "Désir", K: "Connaissance", B: "Capacité", R: "Renforcement" },
    en: { A: "Awareness", D: "Desire", K: "Knowledge", B: "Ability", R: "Reinforcement" },
    ja: { A: "認識", D: "意欲", K: "知識", B: "能力", R: "定着" },
  };

  const STAGE_HINTS = {
    fr: {
      A: "Comprendre pourquoi le changement est nécessaire",
      D: "Vouloir y participer et le soutenir",
      K: "Savoir comment changer concrètement",
      B: "Être capable de mettre en pratique au quotidien",
      R: "Ancrer le changement pour qu'il dure",
    },
    en: {
      A: "Understanding why the change is needed",
      D: "Wanting to take part and support it",
      K: "Knowing how to change in practice",
      B: "Being able to apply it day to day",
      R: "Making the change stick",
    },
    ja: {
      A: "なぜ変革が必要なのかを理解している",
      D: "変革に参加し、支持したいと思っている",
      K: "具体的にどう変わればよいかを知っている",
      B: "日々の業務で実践できる",
      R: "変革を定着させ、継続できる",
    },
  };

  // 3 statements per stage, answered from 1 (strongly disagree) to 5 (strongly agree).
  // Written for this tool; not taken from any proprietary assessment.
  const QUESTIONS = [
    { id: "A1", stage: "A", fr: "Je comprends pourquoi ce changement est nécessaire.", en: "I understand why this change is needed.", ja: "この変革がなぜ必要なのかを理解している。" },
    { id: "A2", stage: "A", fr: "Je sais ce qui risque de se passer si nous ne changeons pas.", en: "I know what could happen if we do not change.", ja: "変わらなかった場合に何が起こりうるかを知っている。" },
    { id: "A3", stage: "A", fr: "La direction a expliqué clairement les objectifs du changement.", en: "Leadership has clearly explained the goals of the change.", ja: "経営層は変革の目的をわかりやすく説明している。" },
    { id: "D1", stage: "D", fr: "Je suis personnellement favorable à ce changement.", en: "I personally support this change.", ja: "私は個人的にこの変革に賛成している。" },
    { id: "D2", stage: "D", fr: "Je vois ce que ce changement m'apporte dans mon travail.", en: "I can see what this change brings to my work.", ja: "この変革が自分の仕事にもたらすメリットがわかる。" },
    { id: "D3", stage: "D", fr: "Mon manager soutient activement ce changement.", en: "My manager actively supports this change.", ja: "上司はこの変革を積極的に支持している。" },
    { id: "K1", stage: "K", fr: "Je sais ce qui va changer concrètement dans mon travail.", en: "I know what will change in practice in my work.", ja: "自分の仕事で具体的に何が変わるのかを知っている。" },
    { id: "K2", stage: "K", fr: "J'ai reçu les formations et informations nécessaires, ou je sais où les trouver.", en: "I have received the training and information I need, or I know where to find them.", ja: "必要な研修や情報を受けている、またはどこで得られるかを知っている。" },
    { id: "K3", stage: "K", fr: "Je sais à qui m'adresser si j'ai une question.", en: "I know who to turn to if I have a question.", ja: "質問があるときに誰に相談すればよいかを知っている。" },
    { id: "B1", stage: "B", fr: "Je me sens capable de travailler avec les nouveaux outils ou processus.", en: "I feel able to work with the new tools or processes.", ja: "新しいツールやプロセスを使って仕事ができると感じている。" },
    { id: "B2", stage: "B", fr: "J'ai le temps et les ressources pour m'adapter.", en: "I have the time and resources to adapt.", ja: "適応するための時間とリソースがある。" },
    { id: "B3", stage: "B", fr: "Je peux m'entraîner et faire des erreurs sans crainte.", en: "I can practise and make mistakes without fear.", ja: "失敗を恐れずに練習することができる。" },
    { id: "R1", stage: "R", fr: "Les progrès et les réussites liés au changement sont reconnus.", en: "Progress and successes linked to the change are recognised.", ja: "変革に関する進捗や成果が認められている。" },
    { id: "R2", stage: "R", fr: "Les nouvelles pratiques sont suivies et intégrées au quotidien.", en: "The new practices are monitored and built into daily work.", ja: "新しいやり方が確認され、日々の業務に組み込まれている。" },
    { id: "R3", stage: "R", fr: "Je pense que nous ne reviendrons pas aux anciennes façons de faire.", en: "I believe we will not go back to the old ways of working.", ja: "以前のやり方に戻ることはないと思う。" },
  ];

  const SCALE = {
    fr: ["Pas du tout d'accord", "Plutôt pas d'accord", "Neutre", "Plutôt d'accord", "Tout à fait d'accord"],
    en: ["Strongly disagree", "Disagree", "Neutral", "Agree", "Strongly agree"],
    ja: ["まったくそう思わない", "あまりそう思わない", "どちらともいえない", "ややそう思う", "とてもそう思う"],
  };

  // Recommended actions when a stage is the barrier point or needs attention.
  const ACTIONS = {
    A: {
      fr: [
        "Faire porter le message par le sponsor : pourquoi maintenant, et ce qui se passe si l'on ne change pas.",
        "Partager des faits concrets (clients, chiffres, concurrence) plutôt que des slogans.",
        "Organiser un temps de questions-réponses par équipe, avec les managers.",
        "Répéter le message sur plusieurs canaux : une seule annonce ne suffit pas.",
      ],
      en: [
        "Have the sponsor carry the message: why now, and what happens if we do not change.",
        "Share concrete facts (customers, figures, competition) rather than slogans.",
        "Hold a Q&A session per team, together with managers.",
        "Repeat the message across several channels: one announcement is never enough.",
      ],
      ja: [
        "スポンサーが自らメッセージを伝える：なぜ今なのか、変わらなければ何が起きるのか。",
        "スローガンではなく、顧客、数字、競合などの具体的な事実を共有する。",
        "管理職と一緒に、チームごとの質疑応答の場を設ける。",
        "複数のチャネルで繰り返し伝える。一度の発表では十分ではない。",
      ],
    },
    D: {
      fr: [
        "Expliquer à chacun ce que le changement lui apporte concrètement, au niveau de son poste.",
        "Équiper les managers pour qu'ils portent le changement auprès de leurs équipes.",
        "Identifier des relais volontaires (ambassadeurs) dans chaque équipe.",
        "Écouter les inquiétudes et y répondre de façon visible.",
      ],
      en: [
        "Explain to each person what the change brings them concretely, in their role.",
        "Equip managers to champion the change with their teams.",
        "Identify volunteer champions in each team.",
        "Listen to concerns and respond to them visibly.",
      ],
      ja: [
        "変革が一人ひとりの業務に具体的に何をもたらすのかを説明する。",
        "管理職がチーム内で変革を推進できるよう支援する。",
        "各チームで自発的に協力してくれる推進役（アンバサダー）を見つける。",
        "不安の声に耳を傾け、目に見える形で対応する。",
      ],
    },
    K: {
      fr: [
        "Construire un plan de formation adapté à chaque profil, au plus près de la mise en service.",
        "Mettre à disposition des supports simples : guides pas à pas, vidéos courtes, FAQ.",
        "Désigner un point de contact clair pour les questions.",
        "Montrer le nouveau fonctionnement en situation réelle (démonstrations).",
      ],
      en: [
        "Build a training plan tailored to each profile, close to go-live.",
        "Provide simple materials: step-by-step guides, short videos, FAQ.",
        "Appoint a clear point of contact for questions.",
        "Show the new way of working in real situations (demos).",
      ],
      ja: [
        "利用開始のタイミングに合わせて、役割ごとの研修計画を立てる。",
        "手順書、短い動画、FAQなどのわかりやすい資料を用意する。",
        "質問の窓口を明確に決める。",
        "実際の業務場面で新しいやり方を見せる（デモンストレーション）。",
      ],
    },
    B: {
      fr: [
        "Prévoir du temps dédié pour s'entraîner, en allégeant temporairement la charge.",
        "Proposer un accompagnement au poste (coaching, binômes, permanences).",
        "Créer un environnement de test où l'on peut se tromper sans conséquence.",
        "Lever les obstacles pratiques remontés par les équipes (accès, outils, processus).",
      ],
      en: [
        "Set aside dedicated practice time, temporarily reducing the workload.",
        "Offer on-the-job support (coaching, buddies, drop-in sessions).",
        "Create a test environment where mistakes have no consequences.",
        "Remove the practical obstacles raised by teams (access, tools, processes).",
      ],
      ja: [
        "一時的に業務量を減らし、練習のための時間を確保する。",
        "現場でのサポート（コーチング、バディ制度、相談会）を提供する。",
        "失敗しても影響のないテスト環境を用意する。",
        "チームから挙がった実務上の障害（アクセス、ツール、プロセス）を取り除く。",
      ],
    },
    R: {
      fr: [
        "Célébrer les premières réussites et remercier les équipes publiquement.",
        "Suivre quelques indicateurs d'adoption et les partager régulièrement.",
        "Intégrer les nouvelles pratiques dans les processus, les objectifs et les rituels.",
        "Recueillir les retours après la mise en service et corriger rapidement.",
      ],
      en: [
        "Celebrate early wins and thank teams publicly.",
        "Track a few adoption KPIs and share them regularly.",
        "Build the new practices into processes, objectives and team rituals.",
        "Gather feedback after go-live and fix issues quickly.",
      ],
      ja: [
        "最初の成功を祝い、チームに公の場で感謝を伝える。",
        "いくつかの定着指標を追跡し、定期的に共有する。",
        "新しいやり方をプロセス、目標、定例会議に組み込む。",
        "利用開始後にフィードバックを集め、すばやく改善する。",
      ],
    },
  };

  const THRESHOLDS = { barrier: 3.0, ok: 4.0 }; // score < 3 = barrier, 3 to 4 = watch, >= 4 = acquired
  const MIN_RESPONSES = 3; // team results hidden below this number, to protect anonymity

  // ---------- Encoding ----------
  const B36 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  function randomId() {
    let s = "";
    for (let i = 0; i < 4; i++) s += B36[Math.floor(Math.random() * 36)];
    return s;
  }

  function toBase64Url(str) {
    const bytes = new TextEncoder().encode(str);
    let bin = "";
    bytes.forEach((b) => { bin += String.fromCharCode(b); });
    const b64 = typeof btoa === "function" ? btoa(bin) : Buffer.from(bin, "binary").toString("base64");
    return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }

  function fromBase64Url(s) {
    const b64 = s.replace(/-/g, "+").replace(/_/g, "/");
    const bin = typeof atob === "function" ? atob(b64) : Buffer.from(b64, "base64").toString("binary");
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function encodeSurvey(survey) {
    return toBase64Url(JSON.stringify({ v: 1, id: survey.id, n: survey.name, t: survey.teams }));
  }

  function decodeSurvey(token) {
    try {
      const o = JSON.parse(fromBase64Url(token));
      if (o.v !== 1 || !/^[0-9A-Z]{4}$/.test(o.id) || !Array.isArray(o.t) || !o.t.length || o.t.length > 60) return null;
      return { id: o.id, name: String(o.n || "").slice(0, 120), teams: o.t.map((x) => String(x).slice(0, 60)) };
    } catch (e) {
      return null;
    }
  }

  // Response code: 10 characters, e.g. 7KQ2M-9XA4T
  // 9 characters carry the team and the 15 answers (base 32), the last one is a check
  // character that also depends on the barometer, so a code from another barometer is refused.
  // Crockford alphabet: no I, L, O or U, so the code is easy to read and type.
  const C32 = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
  const CODE_RE = /^([0-9A-HJKMNP-TV-Z]{5})-?([0-9A-HJKMNP-TV-Z]{5})$/;

  function normalizeCode(code) {
    return String(code).trim().toUpperCase().replace(/\s+/g, "").replace(/O/g, "0").replace(/[IL]/g, "1");
  }

  // The payload is mixed with an invertible step (odd multiplier modulo 2^45, plus an offset
  // that depends on the barometer) so that codes look different even for the same team.
  const M45 = 1n << 45n, MIX_A = 0x1B873593A5n;
  const MIX_INV = (() => { let x = MIX_A; for (let i = 0; i < 6; i++) x = (x * (2n - MIX_A * x)) % M45; return ((x % M45) + M45) % M45; })();
  const mixOffset = (surveyId) => { let h = 0n; for (const c of surveyId) h = (h * 37n + BigInt(B36.indexOf(c) + 1)) % M45; return (h * 0x9E3779B1n) % M45; };
  const mix = (n, surveyId) => Number((BigInt(n) * MIX_A + mixOffset(surveyId)) % M45);
  const unmix = (n, surveyId) => Number((((BigInt(n) - mixOffset(surveyId)) % M45 + M45) % M45 * MIX_INV) % M45);

  function check32(payload, surveyId) {
    let sum = 0;
    for (let i = 0; i < payload.length; i++) sum += C32.indexOf(payload[i]) * (2 * i + 1);
    for (let i = 0; i < surveyId.length; i++) sum += B36.indexOf(surveyId[i]) * (2 * i + 3) * 5;
    return C32[sum % 32];
  }

  function encodeResponse(surveyId, teamIndex, answers) {
    const digits = QUESTIONS.map((q) => answers[q.id]).join("");
    if (!/^[1-5]{15}$/.test(digits)) throw new Error("incomplete answers");
    if (!(teamIndex >= 0 && teamIndex < 1000)) throw new Error("team out of range");
    let n = teamIndex;
    for (const d of digits) n = n * 5 + (Number(d) - 1);
    n = mix(n, surveyId);
    let payload = "";
    for (let i = 0; i < 9; i++) { payload = C32[n % 32] + payload; n = Math.floor(n / 32); }
    const code = payload + check32(payload, surveyId);
    return code.slice(0, 5) + "-" + code.slice(5);
  }

  // Older long format, still accepted: CB1-K7Q2-3-453342115523441X
  function decodeLegacy(code) {
    const m = String(code).trim().toUpperCase().match(/^CB1-([0-9A-Z]{4})-([0-9A-Z]{1,2})-([1-5]{15})([0-9A-Z])$/);
    if (!m) return null;
    const [, id, teamB36, digits, check] = m;
    const team = parseInt(teamB36, 36);
    let sum = team * 7;
    for (const c of id) sum += B36.indexOf(c) * 3;
    for (let i = 0; i < digits.length; i++) sum += Number(digits[i]) * (i + 1);
    if (B36[sum % 36] !== check) return null;
    const answers = {};
    QUESTIONS.forEach((q, i) => { answers[q.id] = Number(digits[i]); });
    return { surveyId: id, team, answers };
  }

  // Returns { surveyId, team, answers }, or null if the code is not valid for this barometer.
  function decodeResponse(code, surveyId) {
    if (/^\s*CB1-/i.test(code)) {
      const r = decodeLegacy(code);
      return r && (!surveyId || r.surveyId === surveyId) ? r : null;
    }
    const m = normalizeCode(code).match(CODE_RE);
    if (!m || !surveyId) return null;
    const full = m[1] + m[2], payload = full.slice(0, 9);
    if (check32(payload, surveyId) !== full[9]) return null;
    let n = 0;
    for (const c of payload) n = n * 32 + C32.indexOf(c);
    n = unmix(n, surveyId);
    if (n >= 1000 * 5 ** 15) return null;
    const digits = [];
    for (let i = 0; i < 15; i++) { digits.unshift(n % 5 + 1); n = Math.floor(n / 5); }
    const answers = {};
    QUESTIONS.forEach((q, i) => { answers[q.id] = digits[i]; });
    return { surveyId, team: n, answers };
  }

  // Finds response codes in any pasted text (one per line, or a whole email).
  // "strict" candidates have the dash, so a failed check means a typo; others are only kept if valid.
  function findCodes(text) {
    const up = String(text).toUpperCase();
    const legacy = up.match(/CB1-[0-9A-Z]{4}-[0-9A-Z]{1,2}-[0-9A-Z]{16}/g) || [];
    const rest = up.replace(/CB1-[0-9A-Z-]+/g, " ");
    const out = legacy.map((c) => ({ code: c, strict: true }));
    const re = /(^|[^0-9A-Z])([0-9A-Z]{5})(-?)([0-9A-Z]{5})(?![0-9A-Z])/g;
    let m;
    while ((m = re.exec(rest))) {
      const raw = m[2] + m[4], norm = normalizeCode(raw);
      if (!/^[0-9A-HJKMNP-TV-Z]{10}$/.test(norm)) continue;
      out.push({ code: norm.slice(0, 5) + "-" + norm.slice(5), strict: m[3] === "-" });
    }
    return out;
  }

  // Number of distinct valid codes for a barometer in a stored text
  function countCodes(text, surveyId) {
    return new Set(findCodes(text).map((c) => c.code).filter((c) => decodeResponse(c, surveyId))).size;
  }

  // ---------- CSV import ----------
  function parseCsv(text) {
    const lines = String(text).replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) return { rows: [], errors: 0 };
    const sep = (lines[0].match(/;/g) || []).length >= (lines[0].match(/,/g) || []).length ? ";" : ",";
    const split = (l) => l.split(sep).map((c) => c.trim().replace(/^"|"$/g, ""));
    const head = split(lines[0]).map((h) => h.toUpperCase());
    const teamCol = head.findIndex((h) => ["TEAM", "EQUIPE", "ÉQUIPE", "チーム"].includes(h));
    const cols = QUESTIONS.map((q) => head.indexOf(q.id));
    if (teamCol < 0 || cols.some((c) => c < 0)) return { rows: [], errors: lines.length - 1, badHeader: true };
    const rows = [];
    let errors = 0;
    for (const line of lines.slice(1)) {
      const cells = split(line);
      const answers = {};
      let ok = !!cells[teamCol];
      QUESTIONS.forEach((q, i) => {
        const v = Number(cells[cols[i]]);
        if (!(v >= 1 && v <= 5 && Number.isInteger(v))) ok = false;
        answers[q.id] = v;
      });
      if (ok) rows.push({ teamName: cells[teamCol].slice(0, 60), answers }); else errors++;
    }
    return { rows, errors };
  }

  function csvTemplate() {
    const head = ["TEAM", ...QUESTIONS.map((q) => q.id)].join(";");
    const ex1 = ["Finance", 4, 4, 3, 3, 2, 3, 3, 2, 4, 3, 2, 2, 3, 2, 3].join(";");
    const ex2 = ["Support", 5, 4, 4, 4, 4, 5, 4, 4, 5, 4, 3, 4, 3, 3, 4].join(";");
    return [head, ex1, ex2].join("\r\n");
  }

  // ---------- Scoring ----------
  const round1 = (x) => Math.round(x * 10) / 10;

  function stageScores(responses) {
    const out = {};
    for (const s of STAGES) {
      const qs = QUESTIONS.filter((q) => q.stage === s);
      if (!responses.length) { out[s] = null; continue; }
      const total = responses.reduce((sum, r) => sum + qs.reduce((a, q) => a + r.answers[q.id], 0) / qs.length, 0);
      out[s] = round1(total / responses.length);
    }
    return out;
  }

  function statusOf(score) {
    if (score === null || score === undefined) return "none";
    if (score < THRESHOLDS.barrier) return "barrier";
    if (score < THRESHOLDS.ok) return "watch";
    return "ok";
  }

  // ADKAR is sequential: the barrier point is the first stage that is not acquired.
  function barrierPoint(scores) {
    for (const s of STAGES) if (statusOf(scores[s]) === "barrier") return { stage: s, kind: "barrier" };
    for (const s of STAGES) if (statusOf(scores[s]) === "watch") return { stage: s, kind: "watch" };
    return null;
  }

  // Resistance mostly reflects a lack of desire, and partly a lack of awareness.
  function resistance(scores) {
    if (scores.A === null) return null;
    const r = (scores.A + 2 * scores.D) / 3;
    if (r < 3) return "high";
    if (r < 3.8) return "moderate";
    return "low";
  }

  function adoptionIndex(scores) {
    const vals = STAGES.map((s) => scores[s]).filter((v) => v !== null);
    if (!vals.length) return null;
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length - 1) / 4 * 100);
  }

  function analyse(responses) {
    const scores = stageScores(responses);
    return {
      n: responses.length,
      scores,
      status: Object.fromEntries(STAGES.map((s) => [s, statusOf(scores[s])])),
      barrier: barrierPoint(scores),
      resistance: resistance(scores),
      index: adoptionIndex(scores),
      enough: responses.length >= MIN_RESPONSES,
    };
  }

  // ---------- Interface texts ----------
  const UI = {
    fr: {
      brand: "Baromètre du changement",
      navHome: "Créer un baromètre", navSurvey: "Répondre", navDash: "Tableau de bord",
      tm: "ADKAR® est une marque déposée de Prosci, Inc. Cet outil indépendant s'inspire du modèle et n'est ni affilié à Prosci ni approuvé par Prosci. Les questions ont été rédigées pour cet outil.",
      footer: "Projet réalisé par Constance Weber.",
      sep: " : ",
      levels: { ok: "Acquis", watch: "À surveiller", barrier: "Bloquant", none: "Pas de données" },
      resist: { low: "Faible", moderate: "Modérée", high: "Élevée" },
    },
    en: {
      brand: "Change Barometer",
      navHome: "Create a barometer", navSurvey: "Answer", navDash: "Dashboard",
      tm: "ADKAR® is a registered trademark of Prosci, Inc. This independent tool is inspired by the model and is neither affiliated with nor endorsed by Prosci. The questions were written for this tool.",
      footer: "Project by Constance Weber.",
      sep: ": ",
      levels: { ok: "Acquired", watch: "Watch", barrier: "Barrier", none: "No data" },
      resist: { low: "Low", moderate: "Moderate", high: "High" },
    },
    ja: {
      brand: "チェンジ・バロメーター",
      navHome: "バロメーターを作成", navSurvey: "回答する", navDash: "ダッシュボード",
      tm: "ADKAR®はProsci, Inc.の登録商標です。本ツールはこのモデルを参考にした独立したツールであり、Prosciとは提携しておらず、Prosciの承認も受けていません。質問は本ツールのために作成したものです。",
      footer: "制作：コンスタンス・ウェベール",
      sep: "：",
      levels: { ok: "定着済み", watch: "要注意", barrier: "障壁", none: "データなし" },
      resist: { low: "低い", moderate: "中程度", high: "高い" },
    },
  };

  function detectLang() {
    let saved = null;
    try { saved = localStorage.getItem("cb-lang"); } catch (e) { /* storage unavailable */ }
    if (saved && UI[saved]) return saved;
    const nav = (typeof navigator !== "undefined" && navigator.language || "fr").toLowerCase();
    return nav.startsWith("fr") ? "fr" : nav.startsWith("ja") ? "ja" : "en";
  }

  function saveLang(lang) {
    try { localStorage.setItem("cb-lang", lang); } catch (e) { /* storage unavailable */ }
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const api = {
    STAGES, STAGE_NAMES, STAGE_HINTS, QUESTIONS, SCALE, ACTIONS, THRESHOLDS, MIN_RESPONSES, UI,
    randomId, encodeSurvey, decodeSurvey, encodeResponse, decodeResponse, findCodes, countCodes, parseCsv, csvTemplate,
    stageScores, statusOf, barrierPoint, resistance, adoptionIndex, analyse, detectLang, saveLang, esc,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.CB = api;
})(typeof window !== "undefined" ? window : globalThis);
