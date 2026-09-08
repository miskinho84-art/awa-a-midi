/**
 * 🖼️  Optimisation des images — exécuté automatiquement avant `npm run build`
 * (et manuellement via `npm run images`).
 *
 * Lit les photos sources dans  src/assets/images/*.jpg|jpeg|png
 * et écrit des versions légères dans src/assets/images/optimized/ (JPEG progressif).
 *
 * Réglages par image (optionnels) dans la table `presets` ci-dessous.
 * Les images non listées utilisent le réglage par défaut.
 */
import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "src/assets/images");
const outDir = join(srcDir, "optimized");

const DEFAULT = { max: 800, quality: 74 };

/** Réglages spécifiques : `max` = plus grand côté en px, `quality` = qualité JPEG, `square` = recadrage carré centré */
const presets = {
  "hero-plate": { max: 768, quality: 80, square: true, zoom: 0.87 },
  "restaurant-interior": { max: 900, quality: 70 },
  "attieke-poulet": { max: 800, quality: 68 },
};

const isImage = (file) => /\.(jpe?g|png)$/i.test(file);

async function optimize(file) {
  const { name } = parse(file);
  const input = join(srcDir, file);
  const output = join(outDir, `${name}.jpg`);
  const preset = { ...DEFAULT, ...presets[name] };

  // Ne retraite pas si la version optimisée est plus récente que la source
  if (existsSync(output) && statSync(output).mtimeMs >= statSync(input).mtimeMs) {
    return { name, skipped: true };
  }

  let image = sharp(input).rotate();
  const meta = await image.metadata();

  if (preset.square && meta.width && meta.height) {
    const side = Math.round(Math.min(meta.width, meta.height) * (preset.zoom ?? 1));
    image = image.extract({
      left: Math.round((meta.width - side) / 2),
      top: Math.round((meta.height - side) / 2),
      width: side,
      height: side,
    });
  }

  await image
    .resize(preset.max, preset.max, { fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: preset.quality, progressive: true, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toFile(output);

  return { name, size: statSync(output).size };
}

async function main() {
  if (!existsSync(srcDir)) {
    console.log("Aucun dossier d'images, rien à optimiser.");
    return;
  }
  mkdirSync(outDir, { recursive: true });
  const files = readdirSync(srcDir).filter((f) => isImage(f) && statSync(join(srcDir, f)).isFile());

  let total = 0;
  for (const file of files) {
    const result = await optimize(file);
    if (result.skipped) {
      console.log(`  ✓ ${result.name} (à jour)`);
    } else {
      total += result.size;
      console.log(`  ✓ ${result.name} → ${(result.size / 1024).toFixed(0)} Ko`);
    }
  }
  console.log(`🖼️  ${files.length} image(s) optimisée(s)${total ? ` — ${(total / 1024).toFixed(0)} Ko générés` : ""}`);
}

main().catch((error) => {
  console.error("Échec de l'optimisation des images :", error);
  process.exit(1);
});
