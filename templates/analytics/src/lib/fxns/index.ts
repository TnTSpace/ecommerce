import { get, type Writable } from 'svelte/store';
import type { iFlattenedSKU, iGenericCompetitor, iOption, iSection, iSKU, iSKUStore } from '../interface/index';

export const createWhatsAppUrl = (msg: string, phone: string) => {
	const url = new URL('https://api.whatsapp.com/send/');
	url.searchParams.set('phone', phone);
	url.searchParams.set('text', msg);
	return url.href;
};

export function camelToNormalCase(input: string): string {
	if (!input) return '';

	// Insert space before capital letters, then capitalize the first letter
	const result = input
		.replace(/([a-z])([A-Z])/g, '$1 $2') // split camelCase
		.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // handle PascalCase acronyms like "HTMLParser"
		.replace(/^./, (str) => str.toUpperCase()); // capitalize first letter

	return result;
}

export function capitalize(word: string) {
	if (!word) return '';
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function convertHtmlToSections(htmlString: string): iSection[] {
	const sections: iSection[] = [];
	const regex = /<(h[1-6])>(.*?)<\/\1>/gi;
	let match;
	let lastIndex = 0;

	while ((match = regex.exec(htmlString)) !== null) {
		let [fullMatch, , title] = match;
		title = title.replace(/<strong>(.*?)<\/strong>/gi, '$1'); // Remove <strong> tags in headings
		const id = title
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '');
		const contentStart = match.index + fullMatch.length;

		if (sections.length > 0) {
			sections[sections.length - 1].content = htmlString
				.substring(lastIndex, match.index)
				.replace(/<strong>(.*?)<\/strong>/gi, '$1') // Remove <strong> tags
				.replace(/\*\*|\*/g, '') // Remove markdown bold/italic symbols
				.trim();
		}

		sections.push({ id, title, content: '' });
		lastIndex = contentStart;
	}

	if (sections.length > 0) {
		sections[sections.length - 1].content = htmlString
			.substring(lastIndex)
			.replace(/<strong>(.*?)<\/strong>/gi, '$1') // Remove <strong> tags
			.replace(/\*\*|\*/g, '') // Remove markdown bold/italic symbols
			.trim();
	}

	return sections;
}

export function toDatetimeLocal(dateString: string): string {
	const date = new Date(dateString);
	const pad = (n: number) => n.toString().padStart(2, '0');

	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1); // Months are 0-indexed
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());

	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function generateSectionsFromHtmlString(
	html: string
): { id: string; title: string; content: string }[] {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = html;

	const sections: { id: string; title: string; content: string }[] = [];
	let currentSection: { id: string; title: string; contentNodes: Node[] } | null = null;

	const flushCurrentSection = () => {
		if (currentSection) {
			const sectionWrapper = document.createElement('section');
			sectionWrapper.id = currentSection.id;
			currentSection.contentNodes.forEach((node) =>
				sectionWrapper.appendChild(node.cloneNode(true))
			);
			sections.push({
				id: currentSection.id,
				title: currentSection.title,
				content: sectionWrapper.outerHTML
			});
			currentSection = null;
		}
	};

	for (const node of Array.from(wrapper.childNodes)) {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const element = node as HTMLElement;

			// Skip empty tags
			if (element.innerHTML.trim() === '') continue;

			// If it's a heading tag, start a new section
			if (/^H[1-6]$/i.test(element.tagName)) {
				flushCurrentSection(); // finalize the previous section

				const title = stripHtmlTags(element.outerHTML);
				const id = slugify(title);

				element.id = id; // Assign ID to heading
				currentSection = {
					id,
					title,
					contentNodes: [element]
				};
			} else if (currentSection) {
				currentSection.contentNodes.push(element);
			}
		}
	}

	// Final section flush
	flushCurrentSection();

	return sections;
}

export function extractTopLevelTagsWithSlugIds(html: string): string[] {
	const result: string[] = [];
	const wrapper = document.createElement('div');
	wrapper.innerHTML = html;

	for (const node of Array.from(wrapper.childNodes)) {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const element = node as HTMLElement;

			// Skip empty tags
			if (element.innerHTML.trim() === '') continue;

			// If it's a heading tag, slugify the text and add an id
			if (/^H[1-6]$/.test(element.tagName)) {
				const slug = slugify(element.textContent || '');
				element.id = slug;
			}

			result.push(element.outerHTML);
		}
	}

	return result;
}

// Slugify function: converts "My Heading!" -> "my-heading"
export function slugify(text: string): string {
	return text
		.toLowerCase()
		.trim()
		.replace(/[\s\W-]+/g, '-')
		.replace(/^-+|-+$/g, ''); // remove leading/trailing hyphens
}

export function slugifyUrl(url: string) {
  return url
    .toString()                  // Ensure it's a string
    .trim()                       // Remove leading/trailing spaces
    .toLowerCase()                // Lowercase
    .replace(/^https?:\/\//, '')   // Remove http:// or https://
    .replace(/www\./, '')          // Remove www.
    .replace(/[^\w\s-]/g, '')      // Remove non-word characters except spaces/hyphens
    .replace(/\s+/g, '_')          // Replace spaces with underscores
    .replace(/-+/g, '_')           // Collapse multiple underscores
    .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
}

export function extractHeadingTagsOnly(htmlArray: string[]): string[] {
	return htmlArray.filter((html) => /^<h[1-6]\b[^>]*>.*<\/h[1-6]>$/i.test(html.trim()));
}
export function stripHtmlTags(html: string): string {
	const tempEl = document.createElement('div');
	tempEl.innerHTML = html;
	return tempEl.textContent?.trim() || '';
}

export const convertArrayOfObjectsToCSV = (data: Record<string, any>[]) => {
	const separator = ','
	const keys = Object.keys(data[0])

	const csvContent =
		keys.join(separator) +
		'\n' +
		data.map(row => {
			return keys.map(key => {
				return '"' + (row[key] || '') + '"';
			}).join(separator);
		}).join('\n');

	return 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
}

export const downloadCSV = (data: Record<string, any>[], filename: string) => {
	const csvData = convertArrayOfObjectsToCSV(data)
	const link = document.createElement('a')
	link.setAttribute('href', csvData)
	link.setAttribute('download', `${filename}.csv`)
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
}

export const flatten = (product: iSKU): iFlattenedSKU => {
	let json: Record<string, any> = {};

	const competition = product.competition as Record<string, any>;
	if (competition) {
		Object.keys(competition).forEach((key) => {
			const list = competition[key] as iGenericCompetitor[];
			// const prices = list.map((item) => item.price as number).filter((price) => Number(price) > 0);
			// const minPrice = Math.min(...prices);
			// json[key] = minPrice;

			const minCompetitor = list.sort((a: iGenericCompetitor, b: iGenericCompetitor) => {
				const aPrice = Number(a.price)
				const bPrice = Number(b.price)
				return aPrice - bPrice
			})[0]

			json[`${key}Price`] = minCompetitor?.price ?? 0
			json[`${key}Url`] = minCompetitor?.href ?? ''
			json[`${key}Image`] = minCompetitor?.image ?? ''
		});
	}
	const category = product.categories.join('>>');
	return {
		sku: product.sku,
		name: product.displayName,
		brand: product.brand,
		isShopExpress: product.isShopExpress,
		category,
		image: product.image,
		url: product.url,
		discount: product.prices.discount,
		averageRatings: product.rating?.average,
		totalRatings: product.rating?.totalRatings,
		campaignBadge: product?.badges?.campaign ? true : false,
		campaignBadgeName: product?.badges?.campaign ? product?.badges?.campaign.name : '',
		campaignBadgeImage: product?.badges?.campaign ? product?.badges?.campaign.image : '',
		campaignBadgeBgColor: product?.badges?.campaign ? product?.badges?.campaign.bgColor : '',
		campaignBadgeTextColor: product?.badges?.campaign ? product?.badges?.campaign.txtColor : '',
		mainBadge: product?.badges?.main ? true : false,
		mainBadgeName: product?.badges?.main ? product?.badges?.main.name : '',
		isBuyable: product?.isBuyable,
		shopExpress: product.shopExpress?.title,
		shopGlobal: product?.shopGlobal ? true : false,
		shopGlobalName: product?.shopGlobal ? product.shopGlobal.name : '',
		oldPrice: product.prices.oldPrice,
		price: product.prices.price,
		...json
	};
};

export const getUrl = (name: string) => {
	const search = 'https://www.amazon.eg/s';
	const url = new URL(search);
	url.searchParams.set('k', `${name}`);
	url.searchParams.set('language', 'en_AE')
	return url.href
}

export const getSKUs = (store: Record<string, iSKU>) => {
	const products = Object.values(store)
	return products
}


export const getOptions = (store: Record<string, iSKU>) => {
	const products = getSKUs(store)
	let categoryStr: string[] = []
	let categories: iOption[] = []

	let tagStr: string[] = []
	let tags: iOption[] = []

	let brandStr: string[] = []
	let brands: iOption[] = []

	products.forEach(product => {
		categoryStr = [...categoryStr, product.categories[0]]
		
		const pieces = product?.tags?.split("|")
		if (pieces) {
			tagStr = [...tagStr, ...pieces]
		}

		brandStr = [...brandStr, product.brand]
	})

	categories = [...new Set(categoryStr)].map(category => ({ label: category, value: category }))

	tags = [...new Set(tagStr)].map(tag => ({ label: tag, value: tag }))

	brands = [...new Set(brandStr)].map(brand => ({ label: brand, value: brand }))

	return { categories, tags, brands }
}

export const getCompetitorKey = (competitor: iGenericCompetitor) => `${competitor.sku}-${slugifyUrl(competitor.url)}`