export class ImageUpload {
	#previewUrl = $state<null | string>(null);
	#fileName = $state<null | string>(null);
	#fileInput = $state<HTMLInputElement | null>(null);
	#files = $state<FileList | null>(null);
	#file = $state<File | null>(null);
	#onUpload?: (url: string) => void;

	constructor(options: { initialImage?: string; onUpload?: (url: string) => void } = {}) {
		this.#onUpload = options.onUpload;

		if (options.initialImage) {
			this.#previewUrl = options.initialImage;
			const fileName = this.extractFileName(options.initialImage);
			this.urlToFile(options.initialImage, fileName)
				.then((file) => (this.#file = file))
				.catch((err) => console.log(err.message));
		}
	}

	get previewUrl() {
		return this.#previewUrl;
	}

	get fileName() {
		return this.#fileName;
	}

	get fileInput() {
		return this.#fileInput;
	}

	setFile(file: File) {
		this.#file = file;
		this.#fileName = file.name;
		const url = URL.createObjectURL(file);
		if (this.#previewUrl) {
			URL.revokeObjectURL(this.#previewUrl);
		}
		this.#previewUrl = url;
		this.#onUpload?.(url);
	}

	set fileInput(input: HTMLInputElement | null) {
		this.#fileInput = input;
	}

	get files() {
		return this.#files;
	}

	get file() {
		return this.#file;
	}

	set files(files: FileList | null) {
		this.#files = files;
		const file = files?.[0];
		this.#file = file as File;
		if (file) {
			this.#fileName = file.name;
			const url = URL.createObjectURL(file);
			if (this.#previewUrl) {
				URL.revokeObjectURL(this.#previewUrl);
			}
			this.#previewUrl = url;
			this.#onUpload?.(url);
		}
	}
	extractFileName(filePath: string): string {
		const match = filePath.match(/\/([^\/]+)$/);
		return match ? match[1] : '';
	}

	async urlToFile(url: string, fileName: string): Promise<File> {
		// Fetch the URL
		const response = await fetch(url);

		// Get the blob from the response
		const blob = await response.blob();

		// Create and return a File object
		return new File([blob], fileName, { type: blob.type });
	}
	handleThumbnailClick = () => {
		this.#fileInput?.click();
	};

	reset() {
		this.handleRemove();
		this.destroy();
	}

	handleRemove = () => {
		if (this.#previewUrl) {
			URL.revokeObjectURL(this.#previewUrl);
		}
		this.#previewUrl = null;
		this.#fileName = null;
		if (this.#fileInput) {
			this.#fileInput.value = '';
		}
		this.#files = null;
	};

	destroy() {
		if (this.#previewUrl) {
			URL.revokeObjectURL(this.#previewUrl);
		}
	}
}

export function useImageUpload(options?: {
	initialImage?: string;
	onUpload?: (url: string) => void;
}) {
	return new ImageUpload(options);
}
