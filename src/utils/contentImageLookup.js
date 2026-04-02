const DEFAULT_IMAGE_DIR_PREFIX = "../assets/images/";

const stripExtension = value => value.replace(/\.[^/.]+$/, "");

const normalizeLookupPath = value => value.replaceAll("\\", "/").replace(/^\/+/, "");

const createKeyRecord = asset => ({ kind: "asset", asset });

const addUniqueKey = (map, key, modulePath) => {
  if (!key) return;

  const existing = map.get(key);

  if (!existing) {
    map.set(key, createKeyRecord(modulePath));
    return;
  }

  if (existing.kind === "asset" && existing.asset !== modulePath) {
    map.set(key, {
      kind: "ambiguous",
      matches: [existing.asset, modulePath].sort(),
    });
    return;
  }

  if (existing.kind === "ambiguous" && !existing.matches.includes(modulePath)) {
    existing.matches.push(modulePath);
    existing.matches.sort();
  }
};

const createAmbiguousLookupError = (lookup, matches) =>
  new Error(
    `Image "${lookup}" is ambiguous in src/assets/images. Matches: ${matches.join(", ")}. Use a folder-qualified path or an explicit relative path instead.`,
  );

export function buildContentImageIndex(modules) {
  const byExactPath = new Map();
  const byPathStem = new Map();
  const byExactBasename = new Map();
  const byBasenameStem = new Map();

  for (const [modulePath, asset] of Object.entries(modules)) {
    const relativePath = modulePath.replace(DEFAULT_IMAGE_DIR_PREFIX, "");
    const basename = relativePath.split("/").pop();

    if (!basename) continue;

    byExactPath.set(relativePath, asset.default);
    addUniqueKey(byPathStem, stripExtension(relativePath), relativePath);
    addUniqueKey(byExactBasename, basename, relativePath);
    addUniqueKey(byBasenameStem, stripExtension(basename), relativePath);
  }

  return {
    byExactPath,
    byPathStem,
    byExactBasename,
    byBasenameStem,
  };
}

function getUniqueAsset(modules, record, lookup) {
  if (!record) return undefined;
  if (record.kind === "asset") return modules[`${DEFAULT_IMAGE_DIR_PREFIX}${record.asset}`]?.default;
  throw createAmbiguousLookupError(lookup, record.matches);
}

export function findDefaultImageAsset(index, modules, pathOrName) {
  const normalizedLookup = normalizeLookupPath(pathOrName);
  const hasNestedPath = normalizedLookup.includes("/");
  const hasExtension = normalizedLookup.split("/").pop()?.includes(".") ?? false;

  if (hasNestedPath) {
    if (hasExtension) {
      return index.byExactPath.get(normalizedLookup);
    }

    return getUniqueAsset(modules, index.byPathStem.get(normalizedLookup), normalizedLookup);
  }

  if (hasExtension) {
    return getUniqueAsset(modules, index.byExactBasename.get(normalizedLookup), normalizedLookup);
  }

  return getUniqueAsset(modules, index.byBasenameStem.get(normalizedLookup), normalizedLookup);
}
