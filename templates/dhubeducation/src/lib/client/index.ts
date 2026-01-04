import type { iReferral } from "$lib/interface";
import { slugify } from "@toolsntuts/utils";
import matter from "gray-matter";
import { parse } from "marked";

export const getReferralsByMarkdown = async () => {

  const files = import.meta.glob('/src/lib/content/referrals/*.md', { query: '?raw', import: 'default' });

  const entries = Object.entries(files);

  const referrals = await Promise.all(
    entries.map(async ([path, resolver]) => {
      const rawContent = await resolver();

      // @ts-ignore
      const { data, content: markdownBody } = matter(rawContent);


      const htmlContent = parse(markdownBody);

      return {
        ...data, // frontmatter fields
        content: htmlContent, // HTML content
        slug: slugify(data.type)
      };
    })
  ) as unknown as iReferral[];
  
  return referrals
}