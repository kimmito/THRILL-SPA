import { Modal } from 'antd'
import type { ModalProps } from 'antd'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'

import './AppModal.css'

export const AppModal = ({
	className,
	width = '33.33%',
	footer = null,
	children,
	open,
	onCancel,
	...props
}: ModalProps) => {
	const scrollYRef = useRef(0)

	useEffect(() => {
		if (open) {
			scrollYRef.current = window.scrollY

			document.body.style.position = 'fixed'
			document.body.style.top = `-${scrollYRef.current}px`
			document.body.style.width = '100%'
			document.body.style.overflow = 'hidden'
		} else {
			const scrollY = scrollYRef.current

			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflow = ''

			window.scrollTo({
				top: scrollY,
				behavior: 'instant'
			})
		}

		return () => {
			document.body.style.position = ''
			document.body.style.top = ''
			document.body.style.width = ''
			document.body.style.overflow = ''
		}
	}, [open])

	const handleCancel = (
		e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLElement>
	) => {
		if (onCancel) {
			onCancel(e)
		}
	}

	return (
		<Modal
			{...props}
			open={open}
			onCancel={handleCancel}
			className={clsx('app-modal', className)}
			classNames={{
				wrapper: 'app-modal__wrapper',
				container: 'app-modal__container',
				body: 'app-modal__body'
			}}
			footer={footer}
			width={width}
			centered
			getContainer={false}
			style={{ top: 0 }}
		>
			{children}
		</Modal>
	)
}
