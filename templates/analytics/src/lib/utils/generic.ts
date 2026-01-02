import { get, writable, type Writable } from 'svelte/store';
// import type { FormatToken, iResult } from "./interface/index.js";
import { BROWSER } from 'esm-env';
import { toast } from 'svelte-sonner';
import type { FormatToken, iResult } from '../interface/index';

/**
 * Returns how long in seconds, minutes, hours, days, weeks, months an event occurred
 * @param timestamp moment the event occurred
 * @returns how long the event occurred
 */
export const timeAgo = (timestamp: number): string => {
	const now = new Date().getTime();
	const seconds = Math.floor((now - timestamp) / 1000);

	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const weeks = Math.floor(days / 7);
	const months = Math.floor(days / 30);
	const years = Math.floor(days / 365);

	switch (true) {
		case seconds < 60:
			return seconds <= 0 ? 'just now' : `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
		case minutes === 1:
			return '1 minute ago';
		case minutes < 60:
			return `${minutes} minutes ago`;
		case hours === 1:
			return '1 hour ago';
		case hours < 24:
			return `${hours} hours ago`;
		case days === 1:
			return '1 day ago';
		case days < 7:
			return `${days} days ago`;
		case weeks === 1:
			return '1 week ago';
		case weeks < 4:
			return `${weeks} weeks ago`;
		case months === 1:
			return '1 month ago';
		case months < 12:
			return `${months} months ago`;
		case years === 1:
			return '1 year ago';
		default:
			return new Date(timestamp).toLocaleDateString('en-US', {
				weekday: 'long',
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
	}
};

/**
 * Formats the given Date
 * @param date date to be formatted
 * @param format format of the date to be returned
 * @returns formatted date
 */
export function formatDate(date: Date, format: string): string {
	const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	const months: string[] = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	const tokens: Record<FormatToken, string> = {
		YYYY: date.getFullYear().toString(),
		MMMM: months[date.getMonth()],
		MMM: months[date.getMonth()],
		DD: String(date.getDate()).padStart(2, '0'),
		HH: String(date.getHours()).padStart(2, '0'),
		hh: String(date.getHours() % 12).padStart(2, '0'),
		mm: String(date.getMinutes()).padStart(2, '0'),
		ss: String(date.getSeconds()).padStart(2, '0'),
		a: date.getHours() < 12 ? 'AM' : 'PM',
		dddd: daysOfWeek[date.getDay()],
		ddd: daysOfWeek[date.getDay()].substring(0, 3)
	};

	// Ensure `MMMM` is processed before `MMM` to avoid partial replacements
	return format.replace(
		/YYYY|MMMM|MMM|DD|HH|hh|mm|ss|a|dddd|ddd/g,
		(match) => tokens[match as FormatToken]
	);
}

/**
 * Creates slug from string
 * @param str string to be converted to slug. e.g Non Word
 * @returns slug of the given string e.g. non-word
 */
export const slugify = (str: string) => {
	return str
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-') // Convert to lowercase and replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove non-word characters except -
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Remove leading -
		.replace(/-+$/, ''); // Remove trailing -
};

/**
 * Creates a folder name from email
 * @param email e.g. example@gmail.com
 * @returns example
 */
export const getFolderName = (email: string) => slugify(email);

/**
 * Converts email to tag
 * @param email email to be converted to tag e.g. -example@gmail.com
 * @returns converted email e.g. @-example
 */
export const emailToTag = (email: string) => {
	// Extract the part before the "@" symbol
	const localPart = email.split('@')[0];

	// Create the tag by prepending "@" to the local part
	const tag = `@${localPart}`;

	return tag;
};

/**
 * Obtains the format of a given media url
 * @param url the url of the media given e.g. https://www.toolsntuts.com/bg.webp
 * @returns the media format of the given url e.g webp
 */
export const mediaUrlFormat = (url: string) => {
	const pieces = url.split('.');
	return pieces[pieces.length - 1].toLowerCase();
};

/**
 * Purifies the strings by converting to lowercase and trimming white spaces
 * @param str example string to be converted e.g Tsa
 * @returns the purified form of the given string e.g. tsa
 */
export const purify = (str: string) => str.toLowerCase().trim();

/**
 * Removes the ring on shadcn input fields
 * @returns classes to remove ring
 */
export const removeRingClasses = () =>
	'focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:ring-offset-0 ring-0 ring-offset-0';

/**
 * Formats long digit numbers (millions) to their short form
 * @param number number to be formatted e.g. 2455523
 * @returns the short form of the numbers given as input 2M4, 5k2
 */
export function formatNumber(number: number): string {
	if (number < 1000) {
		return number.toString();
	} else if (number < 1000000) {
		return (number / 1000).toFixed(1) + 'k';
	} else {
		return (number / 1000000).toFixed(1) + 'M';
	}
}

/**
 * Formats long digit numbers (millions) to their short form
 * @param num number to be formatted e.g. 2455, 5256
 * @returns the short form of the numbers given as input 2k4, 5k2
 */
export const formatNumberShort = (num: number): string => {
	const value = Math.round(num);
	if (value >= 1_000_000_000) {
		return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
	} else if (value >= 1_000_000) {
		return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
	} else if (value >= 1_000) {
		return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
	}
	return value.toString();
};

/**
 * Creates a persistent store in svelte on browser's localStorage
 * @param key the unique identifier in localStorage
 * @param initialValue the initial value of the store
 * @returns the initial value if nothing exists in localStorage or the localStorage data
 */
export const createPersistentStore = <T>(key: string, initialValue: T) => {
	const getInitialValue = (): T => {
		if (BROWSER) {
			const storedValue = localStorage.getItem(key);
			return storedValue ? (JSON.parse(storedValue) as T) : initialValue;
		}
		return initialValue;
	};

	const store = writable<T>(getInitialValue());

	store.subscribe((value) => {
		if (BROWSER) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});

	return store;
};

/**
 * Obtains the age of a person when given the birth date as input
 * @param birthdate string in this format 2015-08-20 or August 20, 2015
 * @returns the numeric age of the person
 */
export function getAge(birthdate: string): number {
	// Parse the input birthdate string into a Date object
	const birthDate = new Date(birthdate);
	const today = new Date();

	// Calculate the age in years
	let age = today.getFullYear() - birthDate.getFullYear();

	// Adjust the age if the birthdate hasn't occurred yet this year
	const birthMonthDayPassed =
		today.getMonth() > birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

	if (!birthMonthDayPassed) {
		age--;
	}

	return age;
}

/**
 * Returns an error object
 * @param message The error message
 * @param data The data to be returned if any
 * @returns The result data in this format { status: "error" | "success", message: string, data?: any }
 */
export const onError = (message: string, data?: any) => {
	const result: iResult = { status: 'error', message, data };
	return result;
};

/**
 * Returns a success object
 * @param data The data to be returned on success
 * @returns The result data in this format { status: "error" | "success", message: string, data?: any }
 */
export const onSuccess = (data: any) => {
	const result: iResult = { status: 'success', message: 'Successful', data };
	return result;
};

/**
 * Returns the html style to cover a div with a background image
 * @param image The image to be used
 * @returns the inline style that creates the background image
 */
export const getStyle = (image: string) => {
	return `background-image: url("${image}");background-repeat: no-repeat;background-position: center; background-size:cover`;
};

/**
 * Copies text to clipboard
 * @param description text to copy
 */
export const onCopy = async (description: string) => {
	try {
		await navigator.clipboard.writeText(description);
		toast.success('Copied to the clipboard');
	} catch (error: any) {
		try {
			const textArea = document.createElement('textarea');
			textArea.value = description;
			document.body.appendChild(textArea);
			textArea.select();
			try {
				document.execCommand('copy');
				console.log('Copied to clipboard!');
			} catch (err) {
				console.error('Failed to copy:', err);
			}
			document.body.removeChild(textArea);
		} catch (error: any) {
			toast.error(error.message);
		}
	}
};

/**
 * Function to share content from a source to other applications
 * @param data The data to be shared to other applications
 */
export const onShare = async (data: ShareData) => {
	try {
		await navigator.share(data);
	} catch (error: any) {
		toast.error(error.message);
	}
};

/**
 * A function that should be used in the client side to check if current display is mobile or desktop
 * @returns boolean true if it is mobile, false if it is desktop
 */
export const checkMobile = () => {
	return window.matchMedia('(max-width: 768px)').matches;
};

type FetchResult<T> = {
	records: T[];
	total: number;
};

type RecursiveFetchOptions<T> = {
	/**
	 * The API endpoint to fetch paginated data from.
	 * Example: `/api/sermons`
	 */
	endpoint: string;

	/**
	 * A Svelte writable store where the fetched records will be appended.
	 */
	store: Writable<T[]>;

	/**
	 * A function that returns the total number of records expected from the API.
	 */
	getTotal: () => number;

	/**
	 * A function to parse the API response into `{ records, total }`.
	 */
	parseResult: (res: any) => FetchResult<T>;

	/**
	 * (Optional) A function returning additional query parameters (e.g., search terms).
	 */
	getParams?: () => Record<string, string>;
};

/**
 * Recursively fetches paginated data from a backend API and appends it to a Svelte store.
 *
 * @template T The type of each record being fetched.
 * @param options An object containing all necessary configuration for the recursive fetch operation.
 */
export const recursiveFetch = async <T>(options: RecursiveFetchOptions<T>) => {
	const { endpoint, store, getTotal, parseResult, getParams = () => ({}) } = options;

	let offset = get(store).length;
	const total = getTotal();
	const params = getParams();

	while (offset < total) {
		const searchParams = new URLSearchParams({
			...params,
			offset: offset.toString()
		});

		const response = await fetch(`${endpoint}/?${searchParams.toString()}`);
		const result = parseResult(await response.json());

		if (result.records.length === 0) break;

		store.update((existing) => [...existing, ...result.records]);
		offset = get(store).length;

		console.log({ updated: get(store) });
	}
};
