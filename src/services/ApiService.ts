import { FetchService } from "./FetchService";

export class ApiService {
	static async get<T>(lat: number, lon: number): Promise<T> {
		const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=${import.meta.env.VITE_API_KEY}`
		const response = await FetchService.get<any>(url);
		return response;
	}
}