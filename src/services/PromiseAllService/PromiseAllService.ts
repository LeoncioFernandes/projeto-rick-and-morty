import axios from "axios";

export async function PromisseAll<T>(urls: string[] | null) {
	if (urls && urls.length > 0) {
		try {
			const promises = urls.map((url) => axios.get<T>(url));
			const responses = await Promise.all(promises);
			const data = responses.map((res) => res.data);
			return data;
		} catch (error) {
			console.error("Erro ao buscar os dados", error);
			return [];
		}
	}
	return [];
}
