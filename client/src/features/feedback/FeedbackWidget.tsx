import { useEffect, useState } from 'react'

import { FeedbackButton } from './FeedbackButton'
import { FeedbackModal } from './FeedbackModal'

export const FeedbackWidget = () => {
	const [isOpen, setIsOpen] = useState(false)

	const openModal = () => {
		setIsOpen(true)
	}
	const closeModal = () => {
		setIsOpen(false)
	}

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
			document.body.style.position = 'fixed'
			document.body.style.width = '100%'
		} else {
			document.body.style.overflow = ''
			document.body.style.position = ''
			document.body.style.width = ''
		}

		return () => {
			document.body.style.overflow = ''
			document.body.style.position = ''
			document.body.style.width = ''
		}
	}, [isOpen])

	useEffect(() => {
		const alreadyShown = sessionStorage.getItem('feedback-modal-shown')
		if (alreadyShown) return

		const timerId = window.setTimeout(() => {
			setIsOpen(true)
			sessionStorage.setItem('feedback-modal-shown', 'true')
		}, 20000)

		return () => window.clearTimeout(timerId)
	}, [])

	return (
		<>
			<FeedbackButton onClick={openModal} />
			<FeedbackModal open={isOpen} onClose={closeModal} />
		</>
	)
}
