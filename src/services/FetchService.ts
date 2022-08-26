import { Request } from "../types/Request";

export class FetchService {
	static async get<T>(url: string): Promise<T> {
		const request: Request = {
			method: "GET",
			url: url
		}

		const response = await http<T>(request);
		return response;
	}
}

const http = async <T>(request: Request): Promise<T> => {
	try {
        let responseBody;
		const response = await fetch(request.url, request)

		try { responseBody = await response.json() } 
		catch(error) { console.error(error) }

		return responseBody;
	} catch (error: any) {
        throw new Error(error)
    }
}