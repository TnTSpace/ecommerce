import nlp from 'compromise';

// export function simplifyProductName(productName: string): string {
//   const doc = nlp(productName);

//   // Extract all nouns and adjectives
//   const allNouns = doc.nouns().out('array');
//   const adjectives = doc.adjectives().out('array');

//   if (allNouns.length === 0) {
//     return productName; // Return original if no nouns are found
//   }

//   // A: First noun
//   const A = allNouns[0];

//   // C: Remaining nouns excluding the first noun
//   const C = allNouns.slice(1);

//   // Construct the simplified name
//   const simplifiedName = [A, ...adjectives, ...C].join(' ');

//   return simplifiedName;
// }

export function simplifyProductName(productName: string, maxKeywords: number = 4) {
  const doc = nlp(productName);

  // Extract nouns and adjectives
  const nouns = doc.nouns().out('array');
  const adjectives = doc.adjectives().out('array');

  // Combine nouns and adjectives, preserving order
  const keywords = [...nouns, ...adjectives];

  // Remove duplicates while preserving order
  const uniqueKeywords = Array.from(new Set(keywords));

  // Return the top 'maxKeywords' keywords
  return uniqueKeywords.slice(0, maxKeywords).join(' ')
}