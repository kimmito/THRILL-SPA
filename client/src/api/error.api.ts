import type { AxiosError } from 'axios'

export const errorCatch = (error: AxiosError): string => {
	if (error.response?.data && typeof error.response.data === 'object') {
		const data = error.response.data as { message?: string }

		if (data.message) return data.message
	}

	if (error.message) return error.message

	return 'Произошла ошибка при запросе'
}
