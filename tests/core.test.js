// Run with: node --test tests/
const test = require("node:test");
const assert = require("node:assert");
const CB = require("../assets/core.js");

const all = (v) => Object.fromEntries(CB.QUESTIONS.map((q) => [q.id, v]));

test("15 questions, 3 per stage, in 3 languages", () => {
  assert.strictEqual(CB.QUESTIONS.length, 15);
  for (const s of CB.STAGES) assert.strictEqual(CB.QUESTIONS.filter((q) => q.stage === s).length, 3);
  for (const q of CB.QUESTIONS) for (const l of ["fr", "en", "ja"]) assert.ok(q[l], `${q.id} ${l}`);
});

test("every stage has 4 actions in every language", () => {
  for (const s of CB.STAGES) for (const l of ["fr", "en", "ja"]) assert.strictEqual(CB.ACTIONS[s][l].length, 4);
});

test("UI texts have the same keys in every language", () => {
  const keys = (o) => Object.keys(o).sort().join();
  assert.strictEqual(keys(CB.UI.fr), keys(CB.UI.en));
  assert.strictEqual(keys(CB.UI.fr), keys(CB.UI.ja));
});

test("survey link round trip, with accents and Japanese", () => {
  const s = { id: "K7Q2", name: "Déploiement ERP 日本", teams: ["Finance", "Achats & logistique", "営業"] };
  assert.deepStrictEqual(CB.decodeSurvey(CB.encodeSurvey(s)), s);
  assert.strictEqual(CB.decodeSurvey("not-a-token"), null);
});

test("response code round trip", () => {
  const answers = { A1: 4, A2: 5, A3: 3, D1: 3, D2: 4, D3: 2, K1: 1, K2: 1, K3: 5, B1: 5, B2: 2, B3: 3, R1: 4, R2: 4, R3: 1 };
  const code = CB.encodeResponse("K7Q2", 11, answers);
  assert.match(code, /^CB1-K7Q2-B-453342115523441[0-9A-Z]$/);
  const d = CB.decodeResponse(code.toLowerCase());
  assert.deepStrictEqual(d, { surveyId: "K7Q2", team: 11, answers });
});

test("a typo in a response code is rejected", () => {
  const code = CB.encodeResponse("K7Q2", 0, all(4));
  const broken = code.slice(0, 12) + (code[12] === "4" ? "3" : "4") + code.slice(13);
  assert.strictEqual(CB.decodeResponse(broken), null);
  assert.strictEqual(CB.decodeResponse("hello"), null);
});

test("incomplete answers cannot be encoded", () => {
  assert.throws(() => CB.encodeResponse("K7Q2", 0, { A1: 4 }));
});

test("scores, statuses and barrier point follow the ADKAR order", () => {
  const r1 = { answers: { ...all(5), K1: 2, K2: 2, K3: 2, R1: 1, R2: 1, R3: 1 } };
  const a = CB.analyse([r1, r1, r1]);
  assert.strictEqual(a.scores.A, 5);
  assert.strictEqual(a.scores.K, 2);
  assert.deepStrictEqual(a.barrier, { stage: "K", kind: "barrier" });
  assert.strictEqual(a.status.R, "barrier");
  assert.strictEqual(a.resistance, "low");
  assert.strictEqual(a.enough, true);
});

test("watch stage is reported when there is no barrier", () => {
  const a = CB.analyse([{ answers: { ...all(5), D1: 3, D2: 4, D3: 4 } }]);
  assert.deepStrictEqual(a.barrier, { stage: "D", kind: "watch" });
  assert.strictEqual(a.enough, false);
});

test("resistance levels and adoption index", () => {
  assert.strictEqual(CB.analyse([{ answers: all(1) }]).resistance, "high");
  assert.strictEqual(CB.analyse([{ answers: all(3) }]).resistance, "moderate");
  assert.strictEqual(CB.analyse([{ answers: all(1) }]).index, 0);
  assert.strictEqual(CB.analyse([{ answers: all(5) }]).index, 100);
  assert.strictEqual(CB.analyse([{ answers: all(3) }]).index, 50);
  assert.strictEqual(CB.analyse([]).index, null);
});

test("CSV template can be imported back", () => {
  const { rows, errors } = CB.parseCsv(CB.csvTemplate());
  assert.strictEqual(errors, 0);
  assert.strictEqual(rows.length, 2);
  assert.strictEqual(rows[0].teamName, "Finance");
  assert.strictEqual(rows[0].answers.K2, 2);
});

test("CSV with a wrong header or a bad value is reported", () => {
  assert.strictEqual(CB.parseCsv("foo;bar\n1;2").badHeader, true);
  const bad = CB.csvTemplate().replace("Support;5", "Support;9");
  assert.strictEqual(CB.parseCsv(bad).errors, 1);
});
