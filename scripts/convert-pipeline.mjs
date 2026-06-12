// One-off: convert transparent mockup PNGs to 900px WebP (alpha preserved).
import sharp from 'sharp';
import {mkdirSync} from 'node:fs';
import path from 'node:path';

const SRC = 'C:/Users/emila/Downloads/mockups_actual_transparent_backgrounds';
const OUT = 'C:/Users/emila/pulasepedagogies-site/public/pipeline';

const MAP = {
  'modern_cpq_eligibility_review_dashboard_actual_transparent.png': 'cpq',
  'adjacent_central_dashboard_ui_overview_actual_transparent.png': 'adjunct-central',
  'saas_dashboard_with_gamified_recognition_system_actual_transparent.png': 'signet',
  'vitae_dashboard_ui_for_cv_reviews_actual_transparent.png': 'vitae',
  'focusbridge_classroom_dashboard_design_actual_transparent.png': 'focusbridge',
  'skillvault_dashboard_gamified_education_in_neon_actual_transparent.png': 'skillvault',
  'a_clean_modern_neon_accented_ui_mockup_app_das_actual_transparent.png': 'clearear',
  'a_clean_modern_ui_mockup_screenshot_of_a_web_app_actual_transparent.png': 'fieldnote',
  'a_digital_mockup_of_meridian_a_web_based_platform_actual_transparent.png': 'meridian',
};

mkdirSync(OUT, {recursive: true});
for (const [file, id] of Object.entries(MAP)) {
  const out = path.join(OUT, `${id}.webp`);
  const info = await sharp(path.join(SRC, file))
    .resize({width: 900, withoutEnlargement: true})
    .webp({quality: 82, alphaQuality: 90})
    .toFile(out);
  console.log(`${id}.webp  ${(info.size / 1024).toFixed(0)} KB`);
}
