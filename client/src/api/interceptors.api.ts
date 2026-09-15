import axios from 'axios'

import { API_URL } from '@/config/api.config'

const instance = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
})
instance.interceptors.response.use(
	config => config,
	async error => {
		return Promise.reject(error)
	}
)

export default instance
