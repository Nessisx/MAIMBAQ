(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  root.UsernameModeration = api;
})(typeof globalThis !== "undefined" ? globalThis : window, function () {
  const DEFAULT_MIN_LENGTH = 3;
  const DEFAULT_MAX_LENGTH = 20;
  const ALLOWED_CHARACTERS = /^[A-Za-z0-9_]+$/;

  const LEET_MAP = Object.freeze({
    0: "o",
    1: "i",
    3: "e",
    4: "a",
    5: "s",
    7: "t",
  });

  const HOMOGLYPHS = Object.freeze({
    "@": "a",
    "$": "s",
    "!": "i",
    "|": "i",
    "¡": "i",
    "§": "s",
    "€": "e",
    "£": "l",
    "¥": "y",
    ß: "ss",
    æ: "ae",
    œ: "oe",
    ø: "o",
    ç: "c",
    ñ: "n",
    а: "a",
    е: "e",
    і: "i",
    о: "o",
    р: "p",
    с: "s",
    у: "y",
    х: "x",
    к: "k",
    м: "m",
    т: "t",
    в: "b",
    н: "h",
    Α: "a",
    Β: "b",
    Ε: "e",
    Η: "h",
    Ι: "i",
    Κ: "k",
    Μ: "m",
    Ν: "n",
    Ο: "o",
    Ρ: "p",
    Τ: "t",
    Υ: "y",
    Χ: "x",
    Ζ: "z",
  });

  const DEFAULT_BLACKLIST = Object.freeze([
  "puta",
  "puto",
  "mierda",
  "sexo",
  "sexual",
  "porn",
  "porno",
  "xxx",
  "nude",
  "naked",
  "violence",
  "violento",
  "kill",
  "matar",
  "asesinar",
  "bomba",
  "terror",
  "terrorista",
  "racista",
  "nazi",
  "nazis",
  "odio",
  "hate",
  "abuse",
  "abuso",
  "drugs",
  "drogas",
  "suicide",
  "suicidio",
  "weapon",
  "weapons",
  "arma",
  "armas",
  "gore",
  "bully",
  "bullying",
  "idiota",
  "estupido",
  "stupid",

  // COSTEÑAS / COLOMBIANAS
  "monda",
  "monda",
  "mondae",
  "mondaita",
  "mondacá",
  "caremonda",
  "caremonda",
  "caremondae",
  "careverga",
  "careculo",
  "carechimba",

  "malparido",
  "malpario",
  "malparida",
  "malparia",
  "malparidos",
  "malparidas",

  "hijueputa",
  "hijuepta",
  "hijuemadre",
  "hpta",
  "hp",
  "hijodeputa",
  "hijoeputa",
  "hijuputa",
  "ijueputa",
  "ijuepucha",
  "hijuemilputa",

  "gonorrea",
  "gonorreita",
  "gonorreica",
  "gono",
  "gonorri",
  "gonorreon",
  "gonorriento",

  "marica",
  "marik",
  "maricon",
  "mariconazo",
  "maricota",
  "maricueca",
  "mariquita",
  "marikito",

  "pirobo",
  "piroba",
  "pirobito",
  "pirovo",

  "jueputa",
  "jueputica",
  "juemadre",
  "jueperra",

  "cule",
  "culiao",
  "culiado",
  "culicagado",
  "culicagao",
  "culicagada",
  "culito",
  "culo",
  "culazo",

  "verga",
  "vergon",
  "vergona",
  "vergonazo",
  "verguero",
  "valeverga",

  "chimba",
  "chimbo",
  "chimbita",
  "chimbada",
  "chimbazo",
  "chimbon",
  "chimbona",
  "achimbado",
  "enchimbado",

  "mierdita",
  "mierdero",
  "mierdoso",
  "comemierda",
  "comemonda",
  "comeverga",

  "mamaburra",
  "mamaguevo",
  "mamaguevo",
  "mamagüebo",
  "mamador",
  "mamon",
  "mamonazo",

  "perra",
  "perrita",
  "zorra",
  "zorruda",
  "zunga",

  "putita",
  "putazo",
  "puteria",
  "putiadero",
  "puton",
  "putona",
  "putica",

  "cacorro",
  "cacorrota",
  "cacorron",

  "nojoda",
  "nojueputa",
  "joda",
  "jodete",
  "jodase",
  "jodienda",
  "joputa",

  "arrecho",
  "arrechera",
  "arrechisimo",
  "arrechohp",

  "triplehijueputa",
  "setentahijueputa",
  "catrehijueputa",
  "veneco hijueputa",  //Insulto mayor papito
  "hdp",
  "hijueputa de la gran puta",


  "mojon",
  "mojonero",
  "cagada",
  "cagao",
  "cagon",
  "cagona",
  "cagar",

  "soplamonda",
  "lambemonda",
  "lambon",
  "lameculo",
  "lambeverga",
  "soplaverga",

  "careculo",
  "careverga",
  "careperra",
  "caregorro",
  "carejopo",

  "jopo",
  "jopito",
  "jopazo",

  "pichurria",
  "picha",
  "pichurriento",

]);

  function normalizeForComparison(value) {
    const normalized = String(value ?? "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const tokens = normalized.split(/[^a-z0-9]+/g).filter(Boolean);
    const cleaned = [];

    for (const token of tokens) {
      if (!/[a-z]/.test(token)) {
        continue;
      }

      let compact = "";
      for (const character of token) {
        compact += LEET_MAP[character] ?? HOMOGLYPHS[character] ?? character;
      }
      cleaned.push(compact);
    }

    return cleaned.join("");
  }

  function normalizeUsername(value) {
    return normalizeForComparison(value);
  }

  function validateCharacters(value, options = {}) {
    const minLength = options.minLength ?? DEFAULT_MIN_LENGTH;
    const maxLength = options.maxLength ?? DEFAULT_MAX_LENGTH;
    const candidate = String(value ?? "").trim();

    if (!candidate) {
      return {
        valid: false,
        code: "empty",
        reason: "Escribe un nombre de usuario.",
      };
    }

    if (candidate.length < minLength) {
      return {
        valid: false,
        code: "too_short",
        reason: `El nombre debe tener al menos ${minLength} caracteres.`,
      };
    }

    if (candidate.length > maxLength) {
      return {
        valid: false,
        code: "too_long",
        reason: `El nombre debe tener máximo ${maxLength} caracteres.`,
      };
    }

    if (!ALLOWED_CHARACTERS.test(candidate)) {
      return {
        valid: false,
        code: "invalid_characters",
        reason: "Solo se permiten letras, números y guion bajo.",
      };
    }

    return {
      valid: true,
      code: "ok",
      reason: "",
      value: candidate,
    };
  }

  function normalizeBlacklist(blacklist) {
    return Array.from(
      new Set(
        (Array.isArray(blacklist) ? blacklist : [])
          .map((word) => normalizeForComparison(word))
          .filter(Boolean)
          .sort((left, right) => right.length - left.length),
      ),
    );
  }

  function containsBadWords(value, blacklist = DEFAULT_BLACKLIST) {
    const normalized = normalizeUsername(value);

    if (!normalized) {
      return {
        valid: true,
        code: "ok",
        reason: "",
        normalized,
        matchedWord: "",
      };
    }

    const normalizedBlacklist = normalizeBlacklist(blacklist);
    const matchedWord = normalizedBlacklist.find((word) =>
      normalized.includes(word),
    );

    if (matchedWord) {
      return {
        valid: false,
        code: "blacklisted",
        reason:
          "Ese nombre no está permitido para una app infantil. Prueba otro más amigable.",
        normalized,
        matchedWord,
      };
    }

    return {
      valid: true,
      code: "ok",
      reason: "",
      normalized,
      matchedWord: "",
    };
  }

  function validateUsername(value, options = {}) {
    const characterResult = validateCharacters(value, options);

    if (!characterResult.valid) {
      return {
        ...characterResult,
        normalized: normalizeUsername(value),
      };
    }

    const blacklistResult = containsBadWords(value, options.blacklist);

    if (!blacklistResult.valid) {
      return blacklistResult;
    }

    return {
      valid: true,
      code: "ok",
      reason: "",
      normalized: blacklistResult.normalized,
      value: characterResult.value,
    };
  }

  async function loadBlacklistFromJson(url) {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`No se pudo cargar la blacklist desde ${url}`);
    }

    const data = await response.json();
    const source = Array.isArray(data)
      ? data
      : Array.isArray(data.blacklist)
        ? data.blacklist
        : Array.isArray(data.words)
          ? data.words
          : [];

    return source.filter((word) => typeof word === "string" && word.trim());
  }

  return {
    DEFAULT_BLACKLIST,
    DEFAULT_MIN_LENGTH,
    DEFAULT_MAX_LENGTH,
    normalizeUsername,
    validateCharacters,
    containsBadWords,
    validateUsername,
    loadBlacklistFromJson,
  };
});