import toast from 'react-hot-toast'

export const toastMessageHandler = (error: Error) => {
	if (error.message) {
		const errorMessage = error.message
		const firstDotIndex = errorMessage.indexOf('.')

		if (firstDotIndex !== -1) {
			toast.error(errorMessage.slice(0, firstDotIndex))
			toast.error(errorMessage.slice(firstDotIndex + 1))
		} else {
			toast.error(errorMessage)
		}
	} else {
		toast.error('Ошибка со стороны сервера. Пожалуйста, попробуйте позже.')
	}
}
