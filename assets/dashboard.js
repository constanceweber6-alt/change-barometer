/* Change Barometer: dashboard page */
(function () {
  const T = {
    fr: {
      kicker: "Tableau de bord", demoTeams: ["Finance", "Achats", "Supply chain", "Service client", "IT"], noSurvey: "Résultats du baromètre", demoName: "Exemple : déploiement d'un nouvel ERP",
      codes: "Codes de réponse", codesHint: "Collez les codes reçus, ou des mails entiers : les codes sont repérés et analysés automatiquement. Ils restent enregistrés dans ce navigateur.", expand: "Ajouter ou modifier des réponses", loaded: (k) => `${k} réponse${k > 1 ? "s" : ""} chargée${k > 1 ? "s" : ""}`, detail: "Détail par question", low: "point le plus faible", pick: "Ou ouvrez un de vos baromètres :", codesN: (k) => `${k} réponse${k > 1 ? "s" : ""}`,
      analyse: "Analyser", clear: "Tout effacer", cleared: "Données effacées",
      csv: "Ou importez un fichier", csvHint: "Export Microsoft Forms ou Google Forms : une colonne TEAM (ou EQUIPE) et une colonne par question, de A1 à R3, avec des notes de 1 à 5.",
      csvBtn: "Importer un CSV", tpl: "Télécharger le modèle", demoL: "Pas encore de réponses ?", demo: "Charger un exemple",
      ok: (k) => `${k} réponse${k > 1 ? "s" : ""} valide${k > 1 ? "s" : ""}`, bad: (k) => `${k} code${k > 1 ? "s" : ""} illisible${k > 1 ? "s" : ""}`,
      dup: (k) => `${k} doublon${k > 1 ? "s" : ""} ignoré${k > 1 ? "s" : ""}`, other: (k) => `${k} code${k > 1 ? "s" : ""} d'un autre baromètre`,
      csvBad: "Le fichier n'a pas les bonnes colonnes. Téléchargez le modèle pour voir le format attendu.",
      csvRows: (k) => `${k} ligne${k > 1 ? "s" : ""} importée${k > 1 ? "s" : ""}`, csvErr: (k) => `${k} ligne${k > 1 ? "s" : ""} incomplète${k > 1 ? "s" : ""}`,
      mixed: "Les codes viennent de plusieurs baromètres. Ouvrez le tableau de bord depuis le lien de votre baromètre pour les trier.",
      empty: "Collez des codes ou chargez l'exemple pour voir le profil ADKAR de chaque équipe.",
      summary: (n, teams, blocked, idx) => `<strong>${n}</strong> réponses de <strong>${teams}</strong> équipe${teams > 1 ? "s" : ""}. Indice d'adoption global : <strong>${idx}/100</strong>. ${blocked ? `<strong>${blocked}</strong> équipe${blocked > 1 ? "s ont" : " a"} un point de blocage.` : "Aucune équipe n'a de point de blocage."}`,
      all: "Toutes les équipes", team: "Équipe", resist: "Résistance", index: "Indice", resp: (k) => `${k} réponse${k > 1 ? "s" : ""}`,
      adoption: "indice d'adoption", stopLabel: "Blocage", watchLabel: "Point d'attention",
      verdictB: (s) => `L'équipe décroche à l'étape ${s}. Tant que ce point n'est pas réglé, les étapes suivantes progresseront peu.`,
      verdictW: (s) => `Pas de blocage net, mais l'étape ${s} est fragile.`,
      verdictOk: "Toutes les étapes sont acquises. Il reste à ancrer le changement dans la durée.",
      actions: "Actions recommandées", resistance: "Résistance", barrierAt: "Étape à traiter", noneB: "Aucune",
      waiting: (k) => `En attente de réponses (moins de ${k}, masquées pour préserver l'anonymat)`,
      csvOut: "Exporter en CSV", printOut: "Exporter en PDF", printDate: (d) => `Rapport généré le ${d}`,
      collect: "Suivi de la collecte", collectHint: "Indiquez l'effectif de chaque équipe pour suivre le taux de réponse et savoir où relancer.",
      size: "Effectif", of: (n, k) => `${n} sur ${k}`, total: (n, k, p) => `${n} réponses sur ${k} personnes, soit ${p} %`, totalNo: (n) => `${n} réponses reçues`,
      pickHint: "Cochez les actions à retenir dans le plan.", customPh: "Ajouter une action propre à cette équipe", add: "Ajouter",
      owner: "Responsable", due: "Échéance", remove: "Retirer", retained: "Retenue",
      planTitle: "Plan d'action", planEmpty: "Cochez des actions dans les fiches des équipes : elles s'ajoutent ici avec un responsable et une échéance.",
      planCsv: "Exporter le plan (CSV)", planPrint: "Imprimer le plan", colTeam: "Équipe", colStage: "Étape", colAction: "Action", custom: "Action ajoutée",
      share: "Partager le sondage", present: "Présenter",
      qrHint: "Affichez ce QR code en réunion ou sur une affiche : les équipes terrain répondent depuis leur téléphone.", qrPng: "Télécharger le QR code", poster: "Imprimer une affiche", close: "Fermer", copyLink: "Copier le lien", copied: "Copié",
      backup: "Changer d'ordinateur", backupHint: "Les réponses et le plan restent uniquement dans ce navigateur. Une sauvegarde permet de les retrouver ailleurs.",
      backupDl: "Télécharger une sauvegarde", backupUp: "Restaurer", restored: "Sauvegarde restaurée", backupBad: "Ce fichier n'est pas une sauvegarde du baromètre.",
      deckOverview: "Vue d'ensemble", deckPlan: "Plan d'action retenu", deckPrev: "Précédent", deckNext: "Suivant", deckExit: "Quitter", deckRetained: "Actions retenues", deckReco: "Actions recommandées",
      rpTool: "Baromètre du changement", rpResp: "Réponses", rpPart: "Participation", rpTeamsN: "Équipes analysées", rpRef: "Référence",
      rpIndex: "indice d'adoption global",
      rpRead: (b, n, st) => b ? `${b} équipe${b > 1 ? "s" : ""} sur ${n} ${b > 1 ? "ont" : "a"} un point de blocage. L'étape qui bloque le plus souvent : ${st}.` : "Aucune équipe n'a de point de blocage. Les efforts peuvent porter sur l'ancrage du changement dans la durée.",
      rpAll: "Profil ADKAR, toutes équipes confondues", rpTeams: "Équipes", rpProfile: "Profil", rpMore: (k) => `Et ${k} autre${k > 1 ? "s" : ""} équipe${k > 1 ? "s" : ""}, détaillée${k > 1 ? "s" : ""} page suivante.`,
      rpPrio: "Priorités par équipe", rpPrioSub: "Pour chaque équipe, l'étape à traiter et les actions retenues, ou à défaut les actions recommandées.",
      rpHidden: (x) => `Équipes masquées car elles ont moins de 3 réponses : ${x}.`, rpPage: (a, b) => `Page ${a} sur ${b}`,
      rpPlanSub: "Actions retenues, avec leur responsable et leur échéance.",
      rpMethod: "Méthode : 15 affirmations notées de 1 à 5, trois par étape. En dessous de 3, l'étape est bloquante, de 3 à 4 elle est à surveiller, à partir de 4 elle est acquise. Le point de blocage est la première étape bloquante.",
      mTitle: "Comment les résultats sont calculés",
      mBody: [
        "Chaque étape du modèle (Conscience, Désir, Connaissance, Capacité, Renforcement) est mesurée par 3 affirmations notées de 1 à 5. Le score d'une étape est la moyenne de ses réponses.",
        "En dessous de 3, l'étape est bloquante. Entre 3 et 4, elle est à surveiller. À partir de 4, elle est acquise.",
        "Les étapes se suivent : le point de blocage est la première étape bloquante. S'il n'y en a pas, c'est la première étape à surveiller.",
        "La résistance combine le désir (deux tiers) et la conscience (un tiers) : élevée en dessous de 3, modérée en dessous de 3,8.",
        "L'indice d'adoption ramène la moyenne des 5 étapes sur 100. Une équipe n'est affichée qu'à partir de 3 réponses.",
      ],
    },
    en: {
      kicker: "Dashboard", demoTeams: ["Finance", "Procurement", "Supply chain", "Customer service", "IT"], noSurvey: "Barometer results", demoName: "Example: new ERP rollout",
      codes: "Response codes", codesHint: "Paste the codes you received, or whole emails: codes are picked out and analysed automatically. They stay saved in this browser.", expand: "Add or edit answers", loaded: (k) => `${k} answer${k > 1 ? "s" : ""} loaded`, detail: "Detail by statement", low: "weakest point", pick: "Or open one of your barometers:", codesN: (k) => `${k} answer${k > 1 ? "s" : ""}`,
      analyse: "Analyse", clear: "Clear all", cleared: "Data cleared",
      csv: "Or import a file", csvHint: "Microsoft Forms or Google Forms export: a TEAM column and one column per question, from A1 to R3, with ratings from 1 to 5.",
      csvBtn: "Import a CSV", tpl: "Download the template", demoL: "No answers yet?", demo: "Load an example",
      ok: (k) => `${k} valid answer${k > 1 ? "s" : ""}`, bad: (k) => `${k} unreadable code${k > 1 ? "s" : ""}`,
      dup: (k) => `${k} duplicate${k > 1 ? "s" : ""} ignored`, other: (k) => `${k} code${k > 1 ? "s" : ""} from another barometer`,
      csvBad: "The file does not have the right columns. Download the template to see the expected format.",
      csvRows: (k) => `${k} row${k > 1 ? "s" : ""} imported`, csvErr: (k) => `${k} incomplete row${k > 1 ? "s" : ""}`,
      mixed: "The codes come from several barometers. Open the dashboard from your barometer's link to sort them.",
      empty: "Paste codes or load the example to see each team's ADKAR profile.",
      summary: (n, teams, blocked, idx) => `<strong>${n}</strong> answers from <strong>${teams}</strong> team${teams > 1 ? "s" : ""}. Overall adoption index: <strong>${idx}/100</strong>. ${blocked ? `<strong>${blocked}</strong> team${blocked > 1 ? "s have" : " has"} a barrier point.` : "No team has a barrier point."}`,
      all: "All teams", team: "Team", resist: "Resistance", index: "Index", resp: (k) => `${k} answer${k > 1 ? "s" : ""}`,
      adoption: "adoption index", stopLabel: "Barrier", watchLabel: "Watch point",
      verdictB: (s) => `The team gets stuck at the ${s} stage. Until this is resolved, the next stages will make little progress.`,
      verdictW: (s) => `No clear barrier, but the ${s} stage is fragile.`,
      verdictOk: "Every stage is acquired. What remains is to make the change last.",
      actions: "Recommended actions", resistance: "Resistance", barrierAt: "Stage to address", noneB: "None",
      waiting: (k) => `Waiting for answers (fewer than ${k}, hidden to protect anonymity)`,
      csvOut: "Export as CSV", printOut: "Export as PDF", printDate: (d) => `Report generated on ${d}`,
      collect: "Response tracking", collectHint: "Enter the headcount of each team to follow the response rate and see where to send a reminder.",
      size: "Headcount", of: (n, k) => `${n} of ${k}`, total: (n, k, p) => `${n} answers from ${k} people, that is ${p}%`, totalNo: (n) => `${n} answers received`,
      pickHint: "Tick the actions to keep in the plan.", customPh: "Add an action specific to this team", add: "Add",
      owner: "Owner", due: "Due date", remove: "Remove", retained: "Kept",
      planTitle: "Action plan", planEmpty: "Tick actions in the team profiles: they appear here with an owner and a due date.",
      planCsv: "Export the plan (CSV)", planPrint: "Print the plan", colTeam: "Team", colStage: "Stage", colAction: "Action", custom: "Added action",
      share: "Share the survey", present: "Present",
      qrHint: "Show this QR code in a meeting or on a poster: frontline teams answer from their phone.", qrPng: "Download the QR code", poster: "Print a poster", close: "Close", copyLink: "Copy the link", copied: "Copied",
      backup: "Switching computer", backupHint: "Answers and the plan only stay in this browser. A backup file lets you open them somewhere else.",
      backupDl: "Download a backup", backupUp: "Restore", restored: "Backup restored", backupBad: "This file is not a barometer backup.",
      deckOverview: "Overview", deckPlan: "Action plan", deckPrev: "Previous", deckNext: "Next", deckExit: "Exit", deckRetained: "Kept actions", deckReco: "Recommended actions",
      rpTool: "Change Barometer", rpResp: "Answers", rpPart: "Participation", rpTeamsN: "Teams analysed", rpRef: "Reference",
      rpIndex: "overall adoption index",
      rpRead: (b, n, st) => b ? `${b} team${b > 1 ? "s" : ""} out of ${n} ${b > 1 ? "have" : "has"} a barrier point. The stage that blocks most often: ${st}.` : "No team has a barrier point. Efforts can focus on making the change last.",
      rpAll: "ADKAR profile, all teams", rpTeams: "Teams", rpProfile: "Profile", rpMore: (k) => `And ${k} more team${k > 1 ? "s" : ""}, detailed on the next page.`,
      rpPrio: "Priorities by team", rpPrioSub: "For each team, the stage to address and the kept actions, or the recommended ones if none were kept.",
      rpHidden: (x) => `Teams hidden because they have fewer than 3 answers: ${x}.`, rpPage: (a, b) => `Page ${a} of ${b}`,
      rpPlanSub: "Kept actions, with their owner and due date.",
      rpMethod: "Method: 15 statements rated from 1 to 5, three per stage. Below 3 the stage is a barrier, from 3 to 4 it needs watching, from 4 it is acquired. The barrier point is the first barrier stage.",
      mTitle: "How the results are calculated",
      mBody: [
        "Each stage of the model (Awareness, Desire, Knowledge, Ability, Reinforcement) is measured by 3 statements rated from 1 to 5. A stage's score is the average of its answers.",
        "Below 3, the stage is a barrier. Between 3 and 4, it needs watching. From 4, it is acquired.",
        "The stages are sequential: the barrier point is the first barrier stage. If there is none, it is the first stage to watch.",
        "Resistance combines desire (two thirds) and awareness (one third): high below 3, moderate below 3.8.",
        "The adoption index puts the average of the 5 stages on a 100 scale. A team only appears from 3 answers.",
      ],
    },
    ja: {
      kicker: "ダッシュボード", demoTeams: ["経理", "購買", "サプライチェーン", "カスタマーサービス", "IT"], noSurvey: "バロメーターの結果", demoName: "サンプル：新ERPの導入",
      codes: "回答コード", codesHint: "受け取ったコードやメール本文を貼り付けると、コードを自動で読み取って分析します。データはこのブラウザに保存されます。", expand: "回答を追加・編集", loaded: (k) => `回答${k}件を読み込み済み`, detail: "設問ごとの詳細", low: "最も低い項目", pick: "または保存済みのバロメーターを開く：", codesN: (k) => `回答${k}件`,
      analyse: "分析する", clear: "すべて消去", cleared: "データを消去しました",
      csv: "またはファイルを取り込む", csvHint: "Microsoft FormsまたはGoogle Formsのエクスポート：TEAM列と、A1からR3までの設問ごとの列（1〜5の評価）。",
      csvBtn: "CSVを取り込む", tpl: "テンプレートをダウンロード", demoL: "まだ回答がない場合", demo: "サンプルを読み込む",
      ok: (k) => `有効な回答 ${k}件`, bad: (k) => `読み取れないコード ${k}件`,
      dup: (k) => `重複 ${k}件（除外）`, other: (k) => `別のバロメーターのコード ${k}件`,
      csvBad: "ファイルの列が正しくありません。テンプレートで形式を確認してください。",
      csvRows: (k) => `${k}行を取り込みました`, csvErr: (k) => `不完全な行 ${k}件`,
      mixed: "複数のバロメーターのコードが含まれています。該当するバロメーターのリンクからダッシュボードを開いてください。",
      empty: "コードを貼り付けるかサンプルを読み込むと、チームごとのADKARプロファイルが表示されます。",
      summary: (n, teams, blocked, idx) => `<strong>${teams}</strong>チームから<strong>${n}</strong>件の回答。全体の定着度指数：<strong>${idx}/100</strong>。${blocked ? `障壁のあるチーム：<strong>${blocked}</strong>。` : "障壁のあるチームはありません。"}`,
      all: "全チーム", team: "チーム", resist: "抵抗", index: "指数", resp: (k) => `回答${k}件`,
      adoption: "定着度指数", stopLabel: "障壁", watchLabel: "要注意",
      verdictB: (s) => `このチームは「${s}」の段階でつまずいています。ここが解消されるまで、次の段階はあまり進みません。`,
      verdictW: (s) => `明確な障壁はありませんが、「${s}」の段階が不安定です。`,
      verdictOk: "すべての段階が定着しています。あとは変化を長く根付かせることです。",
      actions: "推奨される施策", resistance: "抵抗", barrierAt: "取り組むべき段階", noneB: "なし",
      waiting: (k) => `回答待ち（${k}件未満のため、匿名性保護の観点から非表示）`,
      csvOut: "CSVで出力", printOut: "PDFで出力", printDate: (d) => `レポート作成日：${d}`,
      collect: "回収状況", collectHint: "各チームの人数を入力すると回答率がわかり、どこに催促すべきかが見えます。",
      size: "人数", of: (n, k) => `${k}人中${n}件`, total: (n, k, p) => `${k}人中${n}件の回答（回答率${p}%）`, totalNo: (n) => `回答${n}件`,
      pickHint: "計画に含める施策にチェックを入れてください。", customPh: "このチーム独自の施策を追加", add: "追加",
      owner: "担当者", due: "期限", remove: "削除", retained: "採用",
      planTitle: "アクションプラン", planEmpty: "各チームの施策にチェックを入れると、担当者と期限つきでここに表示されます。",
      planCsv: "プランをCSVで出力", planPrint: "プランを印刷", colTeam: "チーム", colStage: "段階", colAction: "施策", custom: "追加した施策",
      share: "アンケートを共有", present: "プレゼンテーション",
      qrHint: "会議やポスターでこのQRコードを表示すれば、現場のチームもスマートフォンから回答できます。", qrPng: "QRコードをダウンロード", poster: "ポスターを印刷", close: "閉じる", copyLink: "リンクをコピー", copied: "コピーしました",
      backup: "別のパソコンで使う", backupHint: "回答とプランはこのブラウザにのみ保存されます。バックアップファイルを使えば別の環境で開けます。",
      backupDl: "バックアップをダウンロード", backupUp: "復元", restored: "バックアップを復元しました", backupBad: "このファイルはバロメーターのバックアップではありません。",
      deckOverview: "全体像", deckPlan: "アクションプラン", deckPrev: "前へ", deckNext: "次へ", deckExit: "終了", deckRetained: "採用した施策", deckReco: "推奨される施策",
      rpTool: "チェンジ・バロメーター", rpResp: "回答数", rpPart: "回答率", rpTeamsN: "分析対象チーム", rpRef: "コード",
      rpIndex: "全体の定着度指数",
      rpRead: (b, n, st) => b ? `${n}チーム中${b}チームに障壁があります。最も多い障壁の段階：${st}。` : "障壁のあるチームはありません。変化を長く根付かせることに注力できます。",
      rpAll: "ADKARプロファイル（全チーム）", rpTeams: "チーム", rpProfile: "プロファイル", rpMore: (k) => `ほか${k}チームは次のページに掲載しています。`,
      rpPrio: "チーム別の優先事項", rpPrioSub: "各チームについて、取り組むべき段階と採用した施策（なければ推奨施策）を示します。",
      rpHidden: (x) => `回答が3件未満のため非表示のチーム：${x}。`, rpPage: (a, b) => `${b}ページ中${a}ページ`,
      rpPlanSub: "採用した施策と担当者、期限。",
      rpMethod: "算出方法：1〜5で評価する15の設問（各段階3問）。3未満は障壁、3以上4未満は要注意、4以上は定着済み。障壁ポイントは最初の「障壁」の段階です。",
      mTitle: "結果の算出方法",
      mBody: [
        "モデルの各段階（認知、意欲、知識、能力、定着）を、1〜5で評価する3つの設問で測定します。各段階のスコアは回答の平均です。",
        "3未満は障壁、3以上4未満は要注意、4以上は定着済みです。",
        "段階は順番に進みます。障壁ポイントは最初の「障壁」の段階で、なければ最初の「要注意」の段階です。",
        "抵抗は意欲（3分の2）と認知（3分の1）を組み合わせたもので、3未満で高い、3.8未満で中程度です。",
        "定着度指数は5段階の平均を100点満点に換算したものです。チームは回答が3件以上で表示されます。",
      ],
    },
  };

  const $ = (id) => document.getElementById(id);
  const ctx = Page.surveyFromHash();
  const survey = ctx && ctx.survey;
  const isDemo = /demo/.test(location.hash) && !survey;
  const storeKey = survey ? "cb-codes-" + survey.id : null;
  const stateKey = survey ? "cb-state-" + survey.id : isDemo ? "cb-state-demo" : null;
  let data = null;       // { responses: [{team, answers}], report: {...} }
  let csvRows = [];      // rows imported from a CSV file
  let csvReport = null;

  // Local state for this barometer: team headcounts and the action plan. Never leaves the browser.
  // plan[teamKey] = [{ ref: "D.1" } or { text: "..." }, owner, due]
  let state = { sizes: {}, plan: {} };
  try { const raw = stateKey && localStorage.getItem(stateKey); if (raw) state = Object.assign(state, JSON.parse(raw)); } catch (e) { /* ignore */ }
  if (isDemo && !Object.keys(state.sizes).length) {
    state.sizes = { "@demo:0": 12, "@demo:1": 10, "@demo:2": 14, "@demo:3": 9, "@demo:4": 6 };
  }
  const saveState = () => { try { if (stateKey) localStorage.setItem(stateKey, JSON.stringify(state)); } catch (e) { /* ignore */ } };

  // ---------- Demo data (deterministic) ----------
  function demoResponses() {
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const profiles = [
      [0, 9, { A: 3.9, D: 2.5, K: 3.0, B: 2.8, R: 2.6 }],
      [1, 7, { A: 2.6, D: 2.9, K: 2.5, B: 2.7, R: 2.4 }],
      [2, 11, { A: 4.4, D: 4.2, K: 3.3, B: 3.1, R: 3.4 }],
      [3, 8, { A: 4.6, D: 4.4, K: 4.3, B: 4.1, R: 4.0 }],
      [4, 2, { A: 4, D: 4, K: 4, B: 4, R: 4 }],
    ];
    const out = [];
    profiles.forEach(([name, n, p]) => {
      for (let i = 0; i < n; i++) {
        const answers = {};
        CB.QUESTIONS.forEach((q) => {
          const v = Math.round(p[q.stage] + (rnd() - 0.5) * 2.2);
          answers[q.id] = Math.min(5, Math.max(1, v));
        });
        out.push({ team: "@demo:" + name, answers });
      }
    });
    return out;
  }

  // ---------- Reading codes ----------
  function readCodes(text) {
    const found = String(text).toUpperCase().match(/CB1-[0-9A-Z]{4}-[0-9A-Z]{1,2}-[0-9A-Z]{16}/g) || [];
    const loose = String(text).split(/\s+/).filter((w) => /^CB1-/i.test(w)).length;
    const seen = new Set(), responses = [], ids = new Set();
    let bad = Math.max(0, loose - found.length), dup = 0, other = 0;
    for (const c of found) {
      if (seen.has(c)) { dup++; continue; }
      seen.add(c);
      const r = CB.decodeResponse(c);
      if (!r) { bad++; continue; }
      if (survey && r.surveyId !== survey.id) { other++; continue; }
      ids.add(r.surveyId);
      const name = survey && survey.teams[r.team] !== undefined ? survey.teams[r.team] : null;
      responses.push({ team: name || `#${r.team + 1}`, teamIdx: r.team, answers: r.answers });
    }
    return { responses, bad, dup, other, mixed: !survey && ids.size > 1 };
  }

  function build() {
    const text = $("codes").value;
    const r = readCodes(text);
    const responses = r.responses.concat(csvRows.map((x) => ({ team: x.teamName, answers: x.answers })));
    data = responses.length || text.trim() || csvReport ? { responses, report: r } : null;
    if (storeKey) { try { localStorage.setItem(storeKey, text); } catch (e) { /* ignore */ } }
  }

  // ---------- Rendering ----------
  function lineHtml(a, lang, t) {
    return `<div class="line">${CB.STAGES.map((s) => {
      const st = a.status[s], stop = a.barrier && a.barrier.stage === s;
      return `<div class="station${stop ? " stop" : ""}${stop && a.barrier.kind === "watch" ? " watchpt" : ""}" data-s="${st}">
        <span class="dot">${s === "B" ? "A" : s}</span>
        <span class="name">${CB.esc(CB.STAGE_NAMES[lang][s])}</span>
        <span class="score">${a.scores[s] === null ? "" : a.scores[s].toFixed(1)}</span>
        ${stop ? `<span class="stop-label">${CB.esc(a.barrier.kind === "watch" ? t.watchLabel : t.stopLabel)}</span>` : ""}
      </div>`;
    }).join("")}</div>`;
  }

  const label = (key) => key.startsWith("@demo:") ? T[Page.lang].demoTeams[Number(key.slice(6))] : key;
  let current = [];   // groups of the last render, index used in data attributes

  function groups() {
    const map = new Map();
    if (survey) survey.teams.forEach((name) => map.set(name, []));
    if (data) data.responses.forEach((r) => { if (!map.has(r.team)) map.set(r.team, []); map.get(r.team).push(r); });
    return [...map.entries()].map(([key, rs]) => ({ key, name: label(key), rs, a: CB.analyse(rs), size: Number(state.sizes[key]) || 0 }));
  }

  const pct = (n, k) => Math.min(100, Math.round(n / k * 100));
  const actionText = (item, lang) => {
    if (item.text) return item.text;
    const [st, i] = item.ref.split(".");
    return (CB.ACTIONS[st] && CB.ACTIONS[st][lang][Number(i)]) || "";
  };
  const itemStage = (item) => item.ref ? item.ref.split(".")[0] : null;
  const planOf = (key) => state.plan[key] || (state.plan[key] = []);

  function renderReport(t) {
    const out = [];
    if (data) {
      const r = data.report;
      out.push(`<span class="pill pill-ok">${CB.esc(t.ok(data.responses.length))}</span>`);
      if (r.bad) out.push(`<span class="pill pill-barrier">${CB.esc(t.bad(r.bad))}</span>`);
      if (r.dup) out.push(`<span class="pill pill-watch">${CB.esc(t.dup(r.dup))}</span>`);
      if (r.other) out.push(`<span class="pill pill-barrier">${CB.esc(t.other(r.other))}</span>`);
      if (r.mixed) out.push(`<div class="notice" style="width:100%">${CB.esc(t.mixed)}</div>`);
    }
    if (csvReport) {
      if (csvReport.badHeader) out.push(`<div class="error" style="width:100%">${CB.esc(t.csvBad)}</div>`);
      else {
        out.push(`<span class="pill pill-ok">${CB.esc(t.csvRows(csvReport.rows))}</span>`);
        if (csvReport.errors) out.push(`<span class="pill pill-watch">${CB.esc(t.csvErr(csvReport.errors))}</span>`);
      }
    }
    $("report").innerHTML = out.join("");
  }

  function savedHtml(t) {
    if (survey || isDemo) return "";
    let list = [];
    try { list = JSON.parse(localStorage.getItem("cb-surveys-v1")) || []; } catch (e) { /* ignore */ }
    if (!list.length) return "";
    const count = (id) => { try { return ((localStorage.getItem("cb-codes-" + id) || "").match(/CB1-/gi) || []).length; } catch (e) { return 0; } };
    return `<p style="margin-top:28px">${CB.esc(t.pick)}</p><ul class="saved-list">${list.map((x) => `<li><a href="dashboard.html#s=${CB.esc(x.token)}">${CB.esc(x.name)}<span>${CB.esc(t.codesN(count(x.id)))}</span></a></li>`).join("")}</ul>`;
  }

  function questionDetail(rs, lang, t) {
    const avg = CB.QUESTIONS.map((q) => ({ q, v: rs.reduce((a, r) => a + r.answers[q.id], 0) / rs.length }));
    const cut = avg.map((x) => Math.round(x.v * 10) / 10).sort((a, b) => a - b)[2];
    const lowest = avg.filter((x) => Math.round(x.v * 10) / 10 <= cut && x.v < CB.THRESHOLDS.ok).map((x) => x.q.id);
    const color = (v) => v < CB.THRESHOLDS.barrier ? "var(--barrier)" : v < CB.THRESHOLDS.ok ? "var(--watch)" : "var(--ok)";
    const rowHtml = ({ q, v }) => `<li class="qrow${lowest.includes(q.id) ? " low" : ""}"${lowest.includes(q.id) ? ` title="${CB.esc(t.low)}"` : ""}>
        <span>${CB.esc(q[lang])}</span>
        <span class="bar"><i style="width:${(v - 1) / 4 * 100}%;background:${color(v)}"></i></span><b>${v.toFixed(1)}</b></li>`;
    return `<details class="detail no-print"><summary>${CB.esc(t.detail)}</summary>${CB.STAGES.map((st) => `
      <p class="qstage">${CB.esc(CB.STAGE_NAMES[lang][st])}</p>
      <ul class="qrows">${avg.filter((x) => x.q.stage === st).map(rowHtml).join("")}</ul>`).join("")}</details>`;
  }

  function collectHtml(t) {
    const total = current.reduce((a, g) => a + g.a.n, 0);
    const known = current.filter((g) => g.size);
    const totalSize = known.reduce((a, g) => a + g.size, 0);
    const answeredKnown = known.reduce((a, g) => a + g.a.n, 0);
    return `<section class="collect" aria-labelledby="collectTitle">
      <div class="collect-head"><h2 id="collectTitle">${CB.esc(t.collect)}</h2>
        <p class="note" id="collectTotal">${CB.esc(totalSize ? t.total(answeredKnown, totalSize, pct(answeredKnown, totalSize)) : t.totalNo(total))}</p></div>
      <p class="note no-print" style="margin:0 0 14px">${CB.esc(t.collectHint)}</p>
      <div class="collect-rows">${current.map((g, i) => {
        const p = g.size ? pct(g.a.n, g.size) : 0;
        const cls = !g.size ? "" : p >= 60 ? "ok" : p >= 30 ? "watch" : "barrier";
        return `<div class="crow">
          <span class="cname">${CB.esc(g.name)}</span>
          <span class="cbar"><i class="${cls}" id="cbar-${i}" style="width:${p}%"></i></span>
          <span class="crate" id="crate-${i}">${CB.esc(g.size ? `${t.of(g.a.n, g.size)} (${p} %)` : t.resp(g.a.n))}</span>
          <label class="csize no-print"><span class="visually-hidden">${CB.esc(t.size)} ${CB.esc(g.name)}</span>
            <input class="input input-sm" type="number" min="0" max="99999" inputmode="numeric" id="size-${i}" data-size="${i}" value="${g.size || ""}" placeholder="${CB.esc(t.size)}"></label>
        </div>`;
      }).join("")}</div></section>`;
  }

  function planHtml(lang, t) {
    const rows = [];
    current.forEach((g, i) => (state.plan[g.key] || []).forEach((item, j) => rows.push({ g, i, item, j })));
    // Teams whose plan exists but have no data any more are still kept in the plan
    Object.keys(state.plan).forEach((key) => {
      if (!current.some((g) => g.key === key)) (state.plan[key] || []).forEach((item, j) => rows.push({ g: { key, name: label(key) }, i: -1, item, j }));
    });
    return `<section class="plan-section" id="plan" aria-labelledby="planTitle">
      <div class="plan-head"><h2 id="planTitle">${CB.esc(t.planTitle)}</h2>
        ${rows.length ? `<div class="actions-row no-print"><button class="btn btn-secondary btn-sm" type="button" id="planCsv">${CB.esc(t.planCsv)}</button>
        <button class="btn btn-secondary btn-sm" type="button" id="planPrint">${CB.esc(t.planPrint)}</button></div>` : ""}</div>
      ${rows.length ? `<div class="heat-wrap"><table class="plan-table"><thead><tr>
        <th scope="col">${CB.esc(t.colTeam)}</th><th scope="col">${CB.esc(t.colAction)}</th><th scope="col">${CB.esc(t.owner)}</th><th scope="col">${CB.esc(t.due)}</th><th class="no-print"><span class="visually-hidden">${CB.esc(t.remove)}</span></th></tr></thead>
        <tbody>${rows.map(({ g, item, j }) => {
          const k = CB.esc(g.key) + "|" + j, st = itemStage(item);
          return `<tr>
          <td><strong>${CB.esc(g.name)}</strong>${st ? `<span class="n">${CB.esc(CB.STAGE_NAMES[lang][st])}</span>` : `<span class="n">${CB.esc(t.custom)}</span>`}</td>
          <td>${CB.esc(actionText(item, lang))}</td>
          <td><input class="input input-sm" id="own-${k}" data-owner="${k}" value="${CB.esc(item.owner || "")}" aria-label="${CB.esc(t.owner)}"><span class="print-only">${CB.esc(item.owner || "")}</span></td>
          <td><input class="input input-sm" type="date" id="due-${k}" data-due="${k}" value="${CB.esc(item.due || "")}" aria-label="${CB.esc(t.due)}"><span class="print-only">${CB.esc(item.due || "")}</span></td>
          <td class="no-print"><button class="btn btn-quiet btn-sm" type="button" data-rm="${k}">${CB.esc(t.remove)}</button></td></tr>`;
        }).join("")}</tbody></table></div>` : `<p class="note">${CB.esc(t.planEmpty)}</p>`}
    </section>`;
  }

  function teamCard(g, i, lang, t) {
    const a = g.a, bp = a.barrier, stName = bp ? CB.STAGE_NAMES[lang][bp.stage] : null, rz = CB.UI[lang].resist;
    const verdict = !bp ? t.verdictOk : bp.kind === "barrier" ? t.verdictB(stName) : t.verdictW(stName);
    const stage = bp ? bp.stage : "R";
    const plan = state.plan[g.key] || [];
    const reco = CB.ACTIONS[stage][lang].map((txt, n) => {
      const ref = `${stage}.${n}`, on = plan.some((x) => x.ref === ref);
      return `<li><label class="pick"><input type="checkbox" data-team="${i}" data-ref="${ref}"${on ? " checked" : ""}><span>${CB.esc(txt)}</span></label></li>`;
    });
    const extra = plan.map((item, j) => ({ item, j })).filter(({ item }) => item.text || itemStage(item) !== stage)
      .map(({ item, j }) => `<li><label class="pick"><input type="checkbox" checked data-team="${i}" data-drop="${j}"><span>${CB.esc(actionText(item, lang))}</span></label></li>`);
    return `<article class="team" id="team-${i}">
      <div class="team-head"><div><h3>${CB.esc(g.name)}</h3><span class="note">${CB.esc(g.size ? t.of(a.n, g.size) : t.resp(a.n))}</span></div>
        <div class="idx"><b>${a.index}</b><span class="note">${CB.esc(t.adoption)}</span></div></div>
      ${lineHtml(a, lang, t)}
      <div class="facts">
        <div><span>${CB.esc(t.barrierAt)}${CB.esc(CB.UI[lang].sep)}</span><strong>${CB.esc(stName || t.noneB)}</strong></div>
        <div><span>${CB.esc(t.resistance)}${CB.esc(CB.UI[lang].sep)}</span><strong>${CB.esc(rz[a.resistance])}</strong></div>
      </div>
      <p class="verdict">${CB.esc(verdict)}</p>
      <h4 class="label" style="margin:0 0 2px">${CB.esc(t.actions)}</h4>
      <p class="note no-print" style="margin:0 0 8px">${CB.esc(t.pickHint)}</p>
      <ul class="picks">${reco.concat(extra).join("")}</ul>
      <form class="custom-add no-print" data-team="${i}">
        <input class="input input-sm" id="custom-${i}" maxlength="200" placeholder="${CB.esc(t.customPh)}" aria-label="${CB.esc(t.customPh)}">
        <button class="btn btn-secondary btn-sm" type="submit">${CB.esc(t.add)}</button>
      </form>
      ${questionDetail(g.rs, lang, t)}
    </article>`;
  }

  function render(lang) {
    const t = T[lang];
    const focusId = document.activeElement && document.activeElement.id;
    const set = (id, v) => { $(id).textContent = v; };
    set("kicker", t.kicker + (survey ? ` | code ${survey.id}` : ""));
    set("title", survey ? survey.name : isDemo ? t.demoName : t.noSurvey);
    set("codesLabel", t.codes); set("codesHint", t.codesHint); set("expand", t.expand); set("clear", t.clear);
    set("csvLabel", t.csv); set("csvHint", t.csvHint); set("csvBtn", t.csvBtn); set("tpl", t.tpl);
    set("demoLabel", t.demoL); set("demo", t.demo); set("csvOut", t.csvOut); set("printOut", t.printOut);
    set("shareBtn", t.share); set("presentBtn", t.present);
    set("backupLabel", t.backup); set("backupHint", t.backupHint); set("backupDl", t.backupDl); set("backupUpLabel", t.backupUp);
    set("mTitle", t.mTitle);
    $("shareBtn").hidden = !survey;
    $("backupBox").hidden = !survey;
    $("mBody").innerHTML = t.mBody.map((p) => `<p>${CB.esc(p)}</p>`).join("");
    $("printDate").textContent = t.printDate(new Date().toLocaleDateString(lang === "ja" ? "ja-JP" : lang === "fr" ? "fr-FR" : "en-GB"));
    renderReport(t);
    $("loaded").textContent = data ? t.loaded(data.responses.length) : "";

    const res = $("results");
    current = groups();
    const hasData = data && data.responses.length;
    if (!hasData && !survey) {
      $("exports").hidden = true;
      res.innerHTML = `<div class="empty-state"><div class="line">${CB.STAGES.map((s) => `<div class="station"><span class="dot">${s === "B" ? "A" : s}</span><span class="name">${CB.esc(CB.STAGE_NAMES[lang][s])}</span></div>`).join("")}</div><p>${CB.esc(t.empty)}</p>${savedHtml(t)}</div>`;
      return;
    }
    $("exports").hidden = false;
    $("csvOut").hidden = $("printOut").hidden = $("presentBtn").hidden = !hasData;
    const shown = current.filter((g) => g.a.enough);
    const waiting = current.filter((g) => !g.a.enough);
    const shownResponses = shown.flatMap((g) => g.rs);
    const all = CB.analyse(shownResponses);
    const lv = CB.UI[lang].levels, rz = CB.UI[lang].resist;

    const row = (g, label, a, cls, i) => `<tr class="${cls || ""}"><th scope="row">${i >= 0 ? `<a href="#" data-goto="team-${i}">${CB.esc(label)}</a>` : CB.esc(label)}<span class="n">${CB.esc(g && g.size ? t.of(a.n, g.size) : t.resp(a.n))}</span></th>
      ${CB.STAGES.map((s) => { const st = a.status[s]; const first = a.barrier && a.barrier.stage === s;
        return `<td><span class="cell ${st}${first ? " first" : ""}" title="${CB.esc(lv[st])}">${a.scores[s] === null ? "" : a.scores[s].toFixed(1)}</span></td>`; }).join("")}
      <td>${a.resistance ? `<span class="pill pill-${a.resistance === "high" ? "barrier" : a.resistance === "moderate" ? "watch" : "ok"}">${CB.esc(rz[a.resistance])}</span>` : ""}</td>
      <td><strong>${a.index === null ? "" : a.index}</strong></td></tr>`;

    const blocked = shown.filter((g) => g.a.barrier && g.a.barrier.kind === "barrier").length;
    let html = collectHtml(t);
    if (shown.length) {
      html += `<p class="summary">${t.summary(shownResponses.length, shown.length, blocked, all.index)}</p>
      <div class="legend">${["ok", "watch", "barrier"].map((k) => `<span class="pill pill-${k}">${CB.esc(lv[k])}</span>`).join("")}</div>
      <div class="heat-wrap"><table class="heat"><thead><tr><th></th>
        ${CB.STAGES.map((s) => `<th scope="col">${CB.esc(CB.STAGE_NAMES[lang][s])}</th>`).join("")}
        <th scope="col">${CB.esc(t.resist)}</th><th scope="col">${CB.esc(t.index)}</th></tr></thead><tbody>
        ${shown.length > 1 ? row(null, t.all, all, "all", -1) : ""}
        ${shown.map((g) => row(g, g.name, g.a, "", current.indexOf(g))).join("")}
      </tbody></table></div>`;
      html += `<div class="teams">${sorted(shown).map((g) => teamCard(g, current.indexOf(g), lang, t)).join("")}</div>`;
    }
    if (waiting.length) {
      html += `<h3 style="margin:32px 0 0;font-size:17px">${CB.esc(t.waiting(CB.MIN_RESPONSES))}</h3>
        <ul class="waiting">${waiting.map((g) => `<li>${CB.esc(g.name)} (${g.a.n}/${CB.MIN_RESPONSES})</li>`).join("")}</ul>`;
    }
    if (shown.length) html += planHtml(lang, t);
    res.innerHTML = html;
    if (focusId && $(focusId)) { const el = $(focusId); el.focus({ preventScroll: true }); }
  }

  // Teams sorted: barrier first, then watch, then fine; within, lowest index first
  const sorted = (list) => list.slice().sort((x, y) => {
    const r = (g) => (g.a.barrier ? (g.a.barrier.kind === "barrier" ? 0 : 1) : 2) * 1000 + g.a.index;
    return r(x) - r(y);
  });


  // ---------- Printable report (PDF): synthesis first, then priorities by team ----------
  const COLORS = { ok: ["var(--ok)", "#fff"], watch: ["var(--watch-soft)", "#7A4F08"], barrier: ["var(--barrier)", "#fff"], none: ["var(--none)", "var(--muted)"] };
  function buildReport(mode) {
    const lang = Page.lang, t = T[lang], sep = CB.UI[lang].sep, rz = CB.UI[lang].resist;
    const gs = groups(), shown = sorted(gs.filter((g) => g.a.enough)), hidden = gs.filter((g) => !g.a.enough && g.a.n >= 0);
    const all = CB.analyse(shown.flatMap((g) => g.rs));
    const date = new Date().toLocaleDateString(lang === "ja" ? "ja-JP" : lang === "fr" ? "fr-FR" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
    const title = survey ? survey.name : isDemo ? t.demoName : t.noSurvey;
    const top = `<div class="rp-top"><b>${CB.esc(t.rpTool)}</b><span>${CB.esc(date)}</span></div>`;
    const stName = (st) => CB.STAGE_NAMES[lang][st];
    const fmtDate = (d) => d ? new Date(d + "T12:00").toLocaleDateString(lang === "ja" ? "ja-JP" : lang === "fr" ? "fr-FR" : "en-GB") : "";
    const plannedText = (g) => (state.plan[g.key] || []).map((x) => ({ text: actionText(x, lang), owner: x.owner, due: fmtDate(x.due) }));
    const planRows = shown.flatMap((g) => plannedText(g).map((x) => ({ g, ...x })));
    const planTable = planRows.length ? `<table class="rp-table"><thead><tr><th>${CB.esc(t.colTeam)}</th><th>${CB.esc(t.colAction)}</th><th style="width:34mm">${CB.esc(t.owner)}</th><th style="width:24mm">${CB.esc(t.due)}</th></tr></thead>
      <tbody>${planRows.map((r) => `<tr><td><b>${CB.esc(r.g.name)}</b></td><td>${CB.esc(r.text)}</td><td>${CB.esc(r.owner || "")}</td><td>${CB.esc(r.due)}</td></tr>`).join("")}</tbody></table>` : "";
    const fine = `<p class="rp-fine">${CB.esc(t.rpMethod)}</p><p class="rp-fine">${CB.esc(CB.UI[lang].tm)}</p>`;

    if (mode === "plan") {
      $("printDoc").innerHTML = `<section class="rp-flow">${top}<h1 class="rp-title" style="font-size:20pt">${CB.esc(title)}</h1>
        <h2 class="rp-h2">${CB.esc(t.planTitle)}</h2><p class="rp-lead">${CB.esc(t.rpPlanSub)}</p>${planTable || `<p class="rp-empty">${CB.esc(t.planEmpty)}</p>`}</section>`;
      return;
    }

    const known = gs.filter((g) => g.size), totalSize = known.reduce((a, g) => a + g.size, 0), answeredKnown = known.reduce((a, g) => a + g.a.n, 0);
    const nAll = gs.reduce((a, g) => a + g.a.n, 0);
    const blocked = shown.filter((g) => g.a.barrier && g.a.barrier.kind === "barrier");
    const freq = {};
    blocked.forEach((g) => { freq[g.a.barrier.stage] = (freq[g.a.barrier.stage] || 0) + 1; });
    const topStage = Object.keys(freq).sort((a, b) => freq[b] - freq[a])[0];
    const dots = (a) => `<span class="rp-dots">${CB.STAGES.map((s) => { const c = a.status[s] === "watch" ? ["var(--watch)"] : COLORS[a.status[s]]; const stop = a.barrier && a.barrier.stage === s; return `<i class="${stop ? "stop" : ""}" style="background:${c[0]}" title="${CB.esc(stName(s))}"></i>`; }).join("")}</span>`;
    const resPill = (r) => r ? `<span class="rp-tag" style="background:${r === "high" ? "var(--barrier-soft)" : r === "moderate" ? "var(--watch-soft)" : "var(--ok-soft)"};color:${r === "high" ? "#A8321B" : r === "moderate" ? "#8A5A0B" : "#11665A"}">${CB.esc(rz[r])}</span>` : "";
    const firstRows = shown.slice(0, 8), more = shown.length - firstRows.length;
    const multi = shown.length > 0;

    const page1 = `<section class="rp-page">
      ${top}
      <h1 class="rp-title">${CB.esc(title)}</h1>
      <div class="rp-meta">
        <div><span>${CB.esc(t.rpResp)}</span>${nAll}</div>
        <div><span>${CB.esc(t.rpPart)}</span>${totalSize ? `${pct(answeredKnown, totalSize)} %` : "-"}</div>
        <div><span>${CB.esc(t.rpTeamsN)}</span>${shown.length}</div>
        <div><span>${CB.esc(t.rpRef)}</span>${survey ? CB.esc(survey.id) : "-"}</div>
      </div>
      <div class="rp-verdict" style="background:var(--paper)">
        <div class="rp-score">${all.index === null ? "-" : all.index}<small>/100</small></div>
        <div><p class="rp-fine" style="margin:0 0 1.5mm">${CB.esc(t.rpIndex)}</p><p>${CB.esc(t.rpRead(blocked.length, shown.length, topStage ? stName(topStage) : ""))}</p></div>
      </div>
      ${multi ? `<p class="rp-h3">${CB.esc(t.rpAll)}</p>
      <div class="rp-big-line">${CB.STAGES.map((s) => { const c = COLORS[all.status[s]]; const stop = all.barrier && all.barrier.stage === s;
        return `<div class="${stop ? "stop" : ""}" style="background:${c[0]};color:${c[1]}"><b>${all.scores[s] === null ? "" : all.scores[s].toFixed(1)}</b><span>${CB.esc(stName(s))}</span></div>`; }).join("")}</div>
      <p class="rp-h3">${CB.esc(t.rpTeams)}</p>
      <table class="rp-table" style="margin-bottom:3mm"><thead><tr><th>${CB.esc(t.colTeam)}</th><th style="width:30mm">${CB.esc(t.rpProfile)}</th><th style="width:34mm">${CB.esc(t.barrierAt)}</th><th style="width:24mm">${CB.esc(t.resist)}</th><th style="width:13mm;text-align:right">${CB.esc(t.index)}</th></tr></thead>
        <tbody>${firstRows.map((g) => `<tr><td><b>${CB.esc(g.name)}</b><br><span class="rp-fine">${CB.esc(g.size ? t.of(g.a.n, g.size) : t.resp(g.a.n))}</span></td>
          <td>${dots(g.a)}</td><td>${CB.esc(g.a.barrier ? stName(g.a.barrier.stage) : t.noneB)}</td><td>${resPill(g.a.resistance)}</td><td style="text-align:right"><b>${g.a.index}</b></td></tr>`).join("")}</tbody></table>
      ${more > 0 ? `<p class="rp-fine">${CB.esc(t.rpMore(more))}</p>` : ""}
      <p class="rp-fine" style="margin-top:2mm">${["ok", "watch", "barrier"].map((k) => `<span class="rp-dots"><i style="background:${k === "watch" ? "var(--watch)" : COLORS[k][0]}"></i></span> ${CB.esc(CB.UI[lang].levels[k])}`).join("&nbsp;&nbsp;&nbsp;")}</p>` : ""}
      <div class="rp-foot"><span>constanceweber6-alt.github.io/change-barometer</span><span></span></div>
    </section>`;

    const teamBlocks = shown.map((g) => {
      const a = g.a, bp = a.barrier, planned = plannedText(g);
      const acts = planned.length ? planned : CB.ACTIONS[bp ? bp.stage : "R"][lang].slice(0, 2).map((x) => ({ text: x }));
      return `<div class="rp-team"><div><h3>${CB.esc(g.name)}</h3>
          <p class="meta">${CB.esc(t.barrierAt)}${CB.esc(sep)}<b style="color:var(--ink)">${CB.esc(bp ? stName(bp.stage) : t.noneB)}</b></p>
          <p class="meta">${CB.esc(t.adoption)}${CB.esc(sep)}${a.index}</p></div>
        <div><p class="rp-h3" style="margin-bottom:1.5mm">${CB.esc(planned.length ? t.deckRetained : t.deckReco)}</p>
          <ul>${acts.map((x) => `<li>${CB.esc(x.text)}${x.owner || x.due ? ` <span class="owner">(${CB.esc([x.owner, x.due].filter(Boolean).join(", "))})</span>` : ""}</li>`).join("")}</ul></div></div>`;
    }).join("");
    const flow = `<section class="rp-flow">${top}
      <h2 class="rp-h2">${CB.esc(t.rpPrio)}</h2><p class="rp-lead">${CB.esc(t.rpPrioSub)}</p>
      ${teamBlocks}
      ${hidden.length ? `<p class="rp-fine" style="margin-top:4mm">${CB.esc(t.rpHidden(hidden.map((g) => g.name).join(lang === "ja" ? "、" : ", ")))}</p>` : ""}
      ${planTable ? `<div style="break-inside:avoid;margin-top:9mm"><h2 class="rp-h2">${CB.esc(t.planTitle)}</h2><p class="rp-lead">${CB.esc(t.rpPlanSub)}</p>${planTable}</div>` : ""}
      <div style="margin-top:8mm;break-inside:avoid">${fine}</div>
    </section>`;
    $("printDoc").innerHTML = page1 + (shown.length ? flow : "");
  }

  // ---------- Exports ----------
  const fileBase = () => (survey ? survey.name : isDemo ? "example" : "barometer").replace(/[^\wÀ-ɏ぀-ヿ一-鿿-]+/g, "_");
  const csvCell = (v) => `"${String(v).replace(/"/g, '""')}"`;

  function exportCsv() {
    const lang = Page.lang;
    const head = ["team", "responses", "headcount", "response_rate", ...CB.STAGES.map((s) => CB.STAGE_NAMES.en[s].toLowerCase()), "barrier_stage", "barrier_kind", "resistance", "adoption_index"];
    const lines = [head.join(";")];
    const num = (x) => String(x).replace(".", lang === "fr" ? "," : ".");
    groups().filter((g) => g.a.enough).forEach((g) => {
      const a = g.a;
      lines.push([csvCell(g.name), a.n, g.size || "", g.size ? pct(a.n, g.size) : "", ...CB.STAGES.map((s) => num(a.scores[s])),
        a.barrier ? CB.STAGE_NAMES.en[a.barrier.stage] : "", a.barrier ? a.barrier.kind : "", a.resistance || "", a.index].join(";"));
    });
    Page.download(`${fileBase()}_adkar.csv`, lines.join("\r\n"));
  }

  function exportPlanCsv() {
    const lang = Page.lang, t = T[lang];
    const lines = [[t.colTeam, t.colStage, t.colAction, t.owner, t.due].map(csvCell).join(";")];
    Object.keys(state.plan).forEach((key) => (state.plan[key] || []).forEach((item) => {
      const st = itemStage(item);
      lines.push([label(key), st ? CB.STAGE_NAMES[lang][st] : t.custom, actionText(item, lang), item.owner || "", item.due || ""].map(csvCell).join(";"));
    }));
    Page.download(`${fileBase()}_action_plan.csv`, lines.join("\r\n"));
  }

  let printMode = "full";
  function printPlan() {
    printMode = "plan";
    buildReport("plan");
    window.print();
    setTimeout(() => { printMode = "full"; }, 500);
  }

  // ---------- Backup (a file the consultant keeps, nothing is hosted) ----------
  function downloadBackup() {
    const payload = { app: "change-barometer", v: 1, token: ctx.token, codes: $("codes").value, state, saved: new Date().toISOString() };
    Page.download(`${fileBase()}_backup.json`, JSON.stringify(payload, null, 2), "application/json");
  }
  async function restoreBackup(file) {
    const t = T[Page.lang];
    try {
      const o = JSON.parse(await file.text());
      const sv = o && o.app === "change-barometer" && CB.decodeSurvey(o.token);
      if (!sv) throw new Error("bad");
      localStorage.setItem("cb-codes-" + sv.id, String(o.codes || ""));
      localStorage.setItem("cb-state-" + sv.id, JSON.stringify(o.state || {}));
      let list = [];
      try { list = JSON.parse(localStorage.getItem("cb-surveys-v1")) || []; } catch (e) { /* ignore */ }
      if (!list.some((x) => x.id === sv.id)) { list.unshift({ ...sv, token: o.token }); localStorage.setItem("cb-surveys-v1", JSON.stringify(list.slice(0, 30))); }
      Page.toast(t.restored);
      setTimeout(() => { if (location.hash === "#s=" + o.token) location.reload(); else location.hash = "s=" + o.token; }, 500);
    } catch (e) {
      Page.toast(t.backupBad);
    }
  }

  // ---------- Share: link, QR code, poster ----------
  function openShare() {
    const t = T[Page.lang];
    const url = new URL("survey.html", location.href).href.split("#")[0] + "#s=" + ctx.token;
    const qr = QR.encode(url, "M");
    $("shareBody").innerHTML = `
      <div class="share-grid">
        <div class="qr-box" aria-hidden="true">${QR.toSvg(qr, 2)}</div>
        <div>
          <p style="margin-top:0">${CB.esc(t.qrHint)}</p>
          <div class="linkrow"><input class="input input-sm" id="shareLink" readonly value="${CB.esc(url)}" aria-label="URL"><button class="btn btn-secondary btn-sm" type="button" id="shareCopy">${CB.esc(t.copyLink)}</button></div>
          <div class="actions-row" style="margin-top:14px">
            <button class="btn btn-primary btn-sm" type="button" id="qrPng">${CB.esc(t.qrPng)}</button>
            <a class="btn btn-secondary btn-sm" href="poster.html#s=${CB.esc(ctx.token)}" target="_blank" rel="noopener">${CB.esc(t.poster)}</a>
          </div>
        </div>
      </div>`;
    $("shareTitle").textContent = t.share;
    $("shareClose").textContent = t.close;
    $("shareCopy").addEventListener("click", () => Page.copy(url, t.copied));
    $("qrPng").addEventListener("click", () => {
      const a = document.createElement("a");
      a.href = QR.toCanvas(qr, 12, 4).toDataURL("image/png");
      a.download = `${fileBase()}_qr.png`;
      document.body.appendChild(a); a.click(); a.remove();
    });
    $("shareDlg").showModal();
  }

  // ---------- Presentation mode ----------
  let deckIdx = 0, slides = [];
  function buildSlides(lang) {
    const t = T[lang];
    const shown = sorted(current.filter((g) => g.a.enough));
    const all = CB.analyse(shown.flatMap((g) => g.rs));
    const blocked = shown.filter((g) => g.a.barrier && g.a.barrier.kind === "barrier").length;
    const out = [];
    out.push(`<div class="slide slide-overview">
      <p class="slide-kicker">${CB.esc(t.deckOverview)}</p>
      <h2>${CB.esc(survey ? survey.name : isDemo ? t.demoName : t.noSurvey)}</h2>
      <p class="slide-summary">${t.summary(all.n, shown.length, blocked, all.index)}</p>
      <div class="slide-teams">${shown.map((g) => `<div class="mini"><span class="mini-name">${CB.esc(g.name)}</span>${lineHtml(g.a, lang, t)}</div>`).join("")}</div>
    </div>`);
    shown.forEach((g) => {
      const a = g.a, bp = a.barrier, stName = bp ? CB.STAGE_NAMES[lang][bp.stage] : null;
      const verdict = !bp ? t.verdictOk : bp.kind === "barrier" ? t.verdictB(stName) : t.verdictW(stName);
      const plan = state.plan[g.key] || [];
      const acts = plan.length ? plan.map((x) => actionText(x, lang)) : CB.ACTIONS[bp ? bp.stage : "R"][lang].slice(0, 3);
      out.push(`<div class="slide">
        <div class="slide-head"><div><p class="slide-kicker">${CB.esc(g.size ? t.of(a.n, g.size) : t.resp(a.n))}</p><h2>${CB.esc(g.name)}</h2></div>
          <div class="slide-idx"><b>${a.index}</b><span>${CB.esc(t.adoption)}</span></div></div>
        ${lineHtml(a, lang, t)}
        <p class="slide-verdict">${CB.esc(verdict)}</p>
        <h3>${CB.esc(plan.length ? t.deckRetained : t.deckReco)}</h3>
        <ul>${acts.map((x) => `<li>${CB.esc(x)}</li>`).join("")}</ul>
      </div>`);
    });
    const planRows = [];
    shown.forEach((g) => (state.plan[g.key] || []).forEach((x) => planRows.push({ g, x })));
    if (planRows.length) {
      out.push(`<div class="slide">
        <p class="slide-kicker">${CB.esc(t.deckPlan)}</p><h2>${CB.esc(t.planTitle)}</h2>
        <table class="slide-plan"><thead><tr><th>${CB.esc(t.colTeam)}</th><th>${CB.esc(t.colAction)}</th><th>${CB.esc(t.owner)}</th><th>${CB.esc(t.due)}</th></tr></thead>
        <tbody>${planRows.map(({ g, x }) => `<tr><td>${CB.esc(g.name)}</td><td>${CB.esc(actionText(x, lang))}</td><td>${CB.esc(x.owner || "")}</td><td>${CB.esc(x.due || "")}</td></tr>`).join("")}</tbody></table>
      </div>`);
    }
    return out;
  }
  function showSlide(i) {
    const t = T[Page.lang];
    deckIdx = Math.max(0, Math.min(slides.length - 1, i));
    $("deckStage").innerHTML = slides[deckIdx];
    $("deckCount").textContent = `${deckIdx + 1} / ${slides.length}`;
    $("deckPrev").textContent = t.deckPrev; $("deckNext").textContent = t.deckNext; $("deckExit").textContent = t.deckExit;
    $("deckPrev").disabled = deckIdx === 0; $("deckNext").disabled = deckIdx === slides.length - 1;
  }
  function openDeck() {
    slides = buildSlides(Page.lang);
    $("deck").hidden = false;
    document.body.classList.add("deck-open");
    showSlide(0);
    const el = $("deck");
    if (el.requestFullscreen) el.requestFullscreen().catch(() => { /* overlay is enough */ });
    $("deckNext").focus();
  }
  function closeDeck() {
    $("deck").hidden = true;
    document.body.classList.remove("deck-open");
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    $("presentBtn").focus();
  }

  // ---------- Events ----------
  let timer;
  $("codes").addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => { build(); render(Page.lang); }, 350); });
  $("codes").addEventListener("paste", () => setTimeout(() => { build(); render(Page.lang); if (data && data.responses.length) $("report").scrollIntoView({ block: "nearest" }); }, 0));
  $("expand").addEventListener("click", () => { $("inputPanel").classList.remove("collapsed"); $("codes").focus(); });
  $("clear").addEventListener("click", () => {
    $("codes").value = ""; csvRows = []; csvReport = null; $("csvFile").value = ""; build(); data = null; render(Page.lang); Page.toast(T[Page.lang].cleared);
  });
  $("csvFile").addEventListener("change", async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    const parsed = CB.parseCsv(await f.text());
    csvRows = parsed.rows;
    csvReport = { rows: parsed.rows.length, errors: parsed.errors, badHeader: !!parsed.badHeader };
    build(); render(Page.lang);
  });
  $("tpl").addEventListener("click", () => Page.download("change-barometer-template.csv", CB.csvTemplate()));
  $("demo").addEventListener("click", () => { if (!/demo/.test(location.hash)) { location.hash = "demo"; location.reload(); } });
  $("csvOut").addEventListener("click", exportCsv);
  $("printOut").addEventListener("click", () => { printMode = "full"; buildReport("full"); window.print(); });
  window.addEventListener("beforeprint", () => buildReport(printMode));
  $("shareBtn").addEventListener("click", openShare);
  $("shareClose").addEventListener("click", () => $("shareDlg").close());
  $("presentBtn").addEventListener("click", openDeck);
  $("deckPrev").addEventListener("click", () => showSlide(deckIdx - 1));
  $("deckNext").addEventListener("click", () => showSlide(deckIdx + 1));
  $("deckExit").addEventListener("click", closeDeck);
  document.addEventListener("keydown", (e) => {
    if ($("deck").hidden) return;
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { e.preventDefault(); showSlide(deckIdx + 1); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { e.preventDefault(); showSlide(deckIdx - 1); }
    else if (e.key === "Escape") closeDeck();
  });
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement && !$("deck").hidden) closeDeck(); });
  $("backupDl").addEventListener("click", downloadBackup);
  $("backupFile").addEventListener("change", (e) => { if (e.target.files[0]) restoreBackup(e.target.files[0]); e.target.value = ""; });
  window.addEventListener("hashchange", () => location.reload());

  const res = $("results");
  res.addEventListener("click", (e) => {
    const go = e.target.closest("[data-goto]");
    if (go) {
      e.preventDefault();
      const card = $(go.dataset.goto);
      card.scrollIntoView({ block: "start", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      card.classList.add("flash"); setTimeout(() => card.classList.remove("flash"), 1600);
      return;
    }
    const rm = e.target.closest("[data-rm]");
    if (rm) {
      const [key, j] = splitKey(rm.dataset.rm);
      (state.plan[key] || []).splice(j, 1);
      if (state.plan[key] && !state.plan[key].length) delete state.plan[key];
      saveState(); render(Page.lang);
      return;
    }
    if (e.target.id === "planCsv") exportPlanCsv();
    if (e.target.id === "planPrint") printPlan();
  });
  const splitKey = (k) => { const i = k.lastIndexOf("|"); return [k.slice(0, i), Number(k.slice(i + 1))]; };

  res.addEventListener("change", (e) => {
    const el = e.target;
    if (el.dataset.ref !== undefined) {
      const g = current[Number(el.dataset.team)], plan = planOf(g.key);
      const at = plan.findIndex((x) => x.ref === el.dataset.ref);
      if (el.checked && at < 0) plan.push({ ref: el.dataset.ref, owner: "", due: "" });
      if (!el.checked && at >= 0) plan.splice(at, 1);
      if (!plan.length) delete state.plan[g.key];
      saveState(); render(Page.lang);
    } else if (el.dataset.drop !== undefined) {
      const g = current[Number(el.dataset.team)], plan = planOf(g.key);
      plan.splice(Number(el.dataset.drop), 1);
      if (!plan.length) delete state.plan[g.key];
      saveState(); render(Page.lang);
    } else if (el.dataset.size !== undefined) {
      render(Page.lang);
    }
  });
  res.addEventListener("input", (e) => {
    const el = e.target;
    if (el.dataset.size !== undefined) {
      const i = Number(el.dataset.size), g = current[i], t = T[Page.lang];
      const v = Math.max(0, Math.min(99999, parseInt(el.value, 10) || 0));
      if (v) state.sizes[g.key] = v; else delete state.sizes[g.key];
      saveState();
      const p = v ? pct(g.a.n, v) : 0;
      $("cbar-" + i).style.width = p + "%";
      $("cbar-" + i).className = !v ? "" : p >= 60 ? "ok" : p >= 30 ? "watch" : "barrier";
      $("crate-" + i).textContent = v ? `${t.of(g.a.n, v)} (${p} %)` : t.resp(g.a.n);
    } else if (el.dataset.owner !== undefined || el.dataset.due !== undefined) {
      const [key, j] = splitKey(el.dataset.owner !== undefined ? el.dataset.owner : el.dataset.due);
      const item = (state.plan[key] || [])[j];
      if (item) { if (el.dataset.owner !== undefined) item.owner = el.value.slice(0, 80); else item.due = el.value; saveState(); }
    }
  });
  res.addEventListener("submit", (e) => {
    const f = e.target.closest(".custom-add");
    if (!f) return;
    e.preventDefault();
    const i = Number(f.dataset.team), inp = $("custom-" + i), text = inp.value.trim();
    if (!text) { inp.focus(); return; }
    planOf(current[i].key).push({ text: text.slice(0, 200), owner: "", due: "" });
    saveState(); render(Page.lang);
    $("custom-" + i).focus();
  });

  // ---------- Start ----------
  if (isDemo) {
    data = { responses: demoResponses(), report: { bad: 0, dup: 0, other: 0 } };
    $("inputPanel").classList.add("collapsed");
  } else if (storeKey) {
    try { const saved = localStorage.getItem(storeKey); if (saved) { $("codes").value = saved; build(); if (data && data.responses.length) $("inputPanel").classList.add("collapsed"); } } catch (e) { /* ignore */ }
  }
  Page.start(render);
})();
