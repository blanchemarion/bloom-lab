import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const feedUrl = "https://bloomlab.substack.com/api/v1/archive?sort=new&search=&offset=0&limit=50";
const outputPath = resolve("src/data/substack-posts.json");

try {
  const response = await fetch(feedUrl, {
    headers: { "User-Agent": "Bloom-Lab-website/1.0" },
  });
  if (!response.ok) throw new Error(`Substack returned ${response.status}`);

  const posts = (await response.json())
    .filter((post) => post.audience === "everyone" && post.canonical_url)
    .map((post) => ({
      id: post.id,
      title: post.title,
      description: post.truncated_body_text || post.description || post.subtitle || "",
      url: post.canonical_url,
      publishedAt: post.post_date,
    }));

  if (!posts.length) throw new Error("Substack returned no public posts");
  await writeFile(outputPath, `${JSON.stringify(posts, null, 2)}\n`);
  console.log(`Synced ${posts.length} Substack posts.`);
} catch (error) {
  try {
    await readFile(outputPath, "utf8");
    console.warn(`Could not refresh Substack posts; using cache. ${error.message}`);
  } catch {
    throw error;
  }
}
