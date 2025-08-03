export type InfoApi<T> = {
	info: {
		count: number;
		next: string | null;
		pages: number;
		prev: string | null;
	};
	results: T;
};
