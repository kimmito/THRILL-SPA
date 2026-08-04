import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'

import { errorCatch } from './error.api'
import instance from './interceptors.api'

export const request = async <T>(config: AxiosRequestConfig) => {
	const onSuccess = (response: AxiosResponse<T>) => response.data
	const onError = (error: AxiosError<T>) => {
		toast.error(errorCatch(error))

		return Promise.reject(error)
	}

	return instance(config).then(onSuccess).catch(onError)
}
