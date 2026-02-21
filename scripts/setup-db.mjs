import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://mxledzesrwvfmftldmmv.supabase.co";
const SERVICE_ROLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im14bGVkemVzcnd2Zm1mdGxkbW12Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTY0NjgzMiwiZXhwIjoyMDg3MjIyODMyfQ.FeewYb8ke7WEbYCkK9LQ-s8fI3C2ejtXgyqp64oBSlo";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

// ============ STEP 1: Create storage bucket ============
async function createBucket() {
  console.log("1. Creating product-images bucket...");

  const { data: buckets } = await supabase.storage.listBuckets();
  if (buckets?.some((b) => b.name === "product-images")) {
    console.log("  Bucket already exists, skipping...");
    return;
  }

  const { error } = await supabase.storage.createBucket("product-images", {
    public: true,
    fileSizeLimit: 5 * 1024 * 1024,
    allowedMimeTypes: ["image/png", "image/jpeg", "image/svg+xml", "image/webp"],
  });

  if (error) throw new Error(`Bucket creation: ${error.message}`);
  console.log("  Bucket created!");
}

// ============ STEP 2: Upload placeholder SVG images ============
function generateSVG(name, c1, c2) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${c1}"/>
      <stop offset="100%" style="stop-color:${c2}"/>
    </linearGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <text x="300" y="280" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="20" font-weight="bold" opacity="0.9">QINMU</text>
  <text x="300" y="320" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="16" opacity="0.7">${name}</text>
</svg>`;
}

const imageData = [
  { file: "serum-1.svg", name: "Glow Serum", c1: "#E91E63", c2: "#9C27B0" },
  { file: "cream-1.svg", name: "Moisture Cream", c1: "#2196F3", c2: "#00BCD4" },
  { file: "lip-1.svg", name: "Velvet Lip Tint", c1: "#F44336", c2: "#E91E63" },
  { file: "ampoule-1.svg", name: "Vitamin C Ampoule", c1: "#FF9800", c2: "#FFC107" },
  { file: "sun-1.svg", name: "Sun Essence", c1: "#FFEB3B", c2: "#FF9800" },
  { file: "body-1.svg", name: "Rose Body Lotion", c1: "#E91E63", c2: "#F48FB1" },
  { file: "mask-1.svg", name: "Cica Mask", c1: "#4CAF50", c2: "#8BC34A" },
  { file: "hair-1.svg", name: "Hair Oil Serum", c1: "#795548", c2: "#D4AF37" },
];

async function uploadImages() {
  console.log("2. Uploading placeholder images...");
  for (const p of imageData) {
    const svg = generateSVG(p.name, p.c1, p.c2);
    const { error } = await supabase.storage
      .from("product-images")
      .upload(p.file, Buffer.from(svg, "utf-8"), {
        contentType: "image/svg+xml",
        upsert: true,
      });
    if (error) {
      console.error(`  Upload ${p.file}: ${error.message}`);
    } else {
      const { data } = supabase.storage.from("product-images").getPublicUrl(p.file);
      console.log(`  Uploaded ${p.file} → ${data.publicUrl}`);
    }
  }
}

// ============ STEP 3: Insert products ============
async function insertProducts() {
  console.log("3. Inserting products...");
  const storageBase = `${SUPABASE_URL}/storage/v1/object/public/product-images`;

  // Clear existing
  const { error: delErr } = await supabase
    .from("products")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) console.log("  Clear existing:", delErr.message);

  const rows = [
    { category_id: "1", name: { ko: "글로우 세럼 에센스", en: "Glow Serum Essence", "zh-CN": "光彩精华液", "zh-TW": "光彩精華液" }, description: { ko: "히알루론산과 나이아신아마이드가 함유된 고보습 세럼", en: "High-moisture serum with hyaluronic acid and niacinamide", "zh-CN": "含透明质酸和烟酰胺的高保湿精华", "zh-TW": "含透明質酸和菸鹼醯胺的高保濕精華" }, price: 48000, sale_price: 35000, images: [`${storageBase}/serum-1.svg`], rating: 4.8, review_count: 2847, is_best: true, is_new: false, created_at: "2026-01-01T00:00:00Z" },
    { category_id: "1", name: { ko: "퓨어 모이스처 크림", en: "Pure Moisture Cream", "zh-CN": "纯净保湿霜", "zh-TW": "純淨保濕霜" }, description: { ko: "시어버터와 세라마이드로 깊은 보습을 선사하는 데일리 크림", en: "Daily cream with deep moisture from shea butter and ceramide", "zh-CN": "含乳木果油和神经酰胺的深层保湿日霜", "zh-TW": "含乳木果油和神經醯胺的深層保濕日霜" }, price: 52000, sale_price: null, images: [`${storageBase}/cream-1.svg`], rating: 4.7, review_count: 1923, is_best: true, is_new: false, created_at: "2026-01-05T00:00:00Z" },
    { category_id: "2", name: { ko: "벨벳 립 틴트", en: "Velvet Lip Tint", "zh-CN": "丝绒唇釉", "zh-TW": "絲絨唇釉" }, description: { ko: "부드러운 벨벳 텍스처의 고발색 립 틴트", en: "High-pigment lip tint with soft velvet texture", "zh-CN": "柔软丝绒质地的高显色唇釉", "zh-TW": "柔軟絲絨質地的高顯色唇釉" }, price: 22000, sale_price: 17600, images: [`${storageBase}/lip-1.svg`], rating: 4.9, review_count: 3521, is_best: true, is_new: false, created_at: "2026-01-10T00:00:00Z" },
    { category_id: "1", name: { ko: "비타민C 브라이트닝 앰플", en: "Vitamin C Brightening Ampoule", "zh-CN": "维C亮白安瓶", "zh-TW": "維C亮白安瓶" }, description: { ko: "순수 비타민C 15% 함유 브라이트닝 앰플", en: "Brightening ampoule with 15% pure vitamin C", "zh-CN": "含15%纯维C的亮白安瓶", "zh-TW": "含15%純維C的亮白安瓶" }, price: 38000, sale_price: 28500, images: [`${storageBase}/ampoule-1.svg`], rating: 4.6, review_count: 1456, is_best: true, is_new: false, created_at: "2026-01-15T00:00:00Z" },
    { category_id: "6", name: { ko: "데일리 선 에센스 SPF50+", en: "Daily Sun Essence SPF50+", "zh-CN": "日常防晒精华 SPF50+", "zh-TW": "日常防曬精華 SPF50+" }, description: { ko: "가벼운 텍스처의 자외선 차단 에센스", en: "Lightweight UV protection essence", "zh-CN": "轻盈质地的防紫外线精华", "zh-TW": "輕盈質地的防紫外線精華" }, price: 28000, sale_price: null, images: [`${storageBase}/sun-1.svg`], rating: 4.7, review_count: 2134, is_best: false, is_new: true, created_at: "2026-02-01T00:00:00Z" },
    { category_id: "3", name: { ko: "로즈 바디 로션", en: "Rose Body Lotion", "zh-CN": "玫瑰身体乳", "zh-TW": "玫瑰身體乳" }, description: { ko: "다마스크 로즈 오일이 함유된 보습 바디 로션", en: "Moisturizing body lotion with damask rose oil", "zh-CN": "含大马士革玫瑰油的保湿身体乳", "zh-TW": "含大馬士革玫瑰油的保濕身體乳" }, price: 32000, sale_price: 25600, images: [`${storageBase}/body-1.svg`], rating: 4.5, review_count: 987, is_best: false, is_new: true, created_at: "2026-02-05T00:00:00Z" },
    { category_id: "7", name: { ko: "시카 진정 마스크팩", en: "Cica Soothing Mask Pack", "zh-CN": "积雪草舒缓面膜", "zh-TW": "積雪草舒緩面膜" }, description: { ko: "민감한 피부를 위한 시카 진정 시트 마스크", en: "Cica soothing sheet mask for sensitive skin", "zh-CN": "敏感肌肤专用积雪草舒缓面膜", "zh-TW": "敏感肌膚專用積雪草舒緩面膜" }, price: 3000, sale_price: null, images: [`${storageBase}/mask-1.svg`], rating: 4.8, review_count: 4521, is_best: false, is_new: true, created_at: "2026-02-10T00:00:00Z" },
    { category_id: "4", name: { ko: "실크 헤어 오일 세럼", en: "Silk Hair Oil Serum", "zh-CN": "丝滑护发精油", "zh-TW": "絲滑護髮精油" }, description: { ko: "아르간 오일과 카멜리아 오일로 만든 헤어 세럼", en: "Hair serum made with argan oil and camellia oil", "zh-CN": "摩洛哥坚果油和山茶花油制成的护发精华", "zh-TW": "摩洛哥堅果油和山茶花油製成的護髮精華" }, price: 26000, sale_price: 20800, images: [`${storageBase}/hair-1.svg`], rating: 4.6, review_count: 876, is_best: false, is_new: true, created_at: "2026-02-15T00:00:00Z" },
  ];

  const { data, error } = await supabase.from("products").insert(rows).select();
  if (error) throw new Error(`Insert: ${error.message}`);
  console.log(`  Inserted ${data.length} products!`);
  data.forEach((p) => console.log(`    ${p.id}: ${p.name.en}`));
}

// ============ STEP 4: Verify ============
async function verify() {
  console.log("4. Verifying...");
  const { data, error } = await supabase.from("products").select("id, name, images").limit(3);
  if (error) throw new Error(`Verify: ${error.message}`);
  console.log(`  Found ${data.length} products. First 3:`);
  data.forEach((p) => console.log(`    ${p.name.en}: ${p.images[0]}`));
}

async function main() {
  await createBucket();
  await uploadImages();
  await insertProducts();
  await verify();
  console.log("\nDone!");
}

main().catch((e) => {
  console.error("Error:", e.message);
  process.exit(1);
});
