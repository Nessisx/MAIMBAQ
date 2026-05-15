const assert = require("node:assert/strict");
const moderation = require("./usernameModeration.js");

const tests = [];

function test(name, callback) {
  tests.push(
    Promise.resolve()
      .then(callback)
      .then(() => {
        console.log(`✓ ${name}`);
      }),
  );
}

test("normaliza texto con símbolos y leetspeak", () => {
  assert.equal(moderation.normalizeUsername("P*u7A_123"), "puta");
});

test("rechaza caracteres no permitidos", () => {
  const result = moderation.validateCharacters("Ana María");
  assert.equal(result.valid, false);
  assert.equal(result.code, "invalid_characters");
});

test("detecta palabras prohibidas por coincidencia parcial", () => {
  const result = moderation.validateUsername("JuanPutaGamer");
  assert.equal(result.valid, false);
  assert.equal(result.code, "blacklisted");
});

test("acepta nombres limpios", () => {
  const result = moderation.validateUsername("Artista_01");
  assert.equal(result.valid, true);
  assert.equal(result.code, "ok");
});

test("carga blacklist desde JSON", async () => {
  const originalFetch = global.fetch;
  global.fetch = async () => ({
    ok: true,
    json: async () => ({ blacklist: ["malo", "feo"] }),
  });

  try {
    const words = await moderation.loadBlacklistFromJson("/blacklist.json");
    assert.deepEqual(words, ["malo", "feo"]);
  } finally {
    global.fetch = originalFetch;
  }
});

Promise.all(tests)
  .then(() => {
    console.log("All moderation tests passed.");
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });