import { IoClose } from 'react-icons/io5'

type PortfolioImageModalProps = {
	image: string
	onClose: () => void
  alt: string
}

const PortfolioImageModal = ({ image, onClose, alt }: PortfolioImageModalProps) => {
	return (
		<div
			className='fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-8'
			role='dialog'
			aria-modal='true'
			onPointerDown={() => onClose()}
		>
			<button
				type='button'
				className='fixed right-5 top-5 z-[10000] flex size-11 items-center justify-center rounded-full bg-white/90 text-3xl text-black transition hover:bg-white'
				aria-label='Закрыть фото'
				onPointerDown={event => {
					event.stopPropagation()
					onClose()
				}}
			>
				<IoClose aria-hidden='true' />
			</button>
			<img
				src={image}
				alt={alt}
				className='relative z-0 max-h-[88vh] max-w-[92vw] object-contain shadow-2xl'
				onPointerDown={event => event.stopPropagation()}
			/>
		</div>
	)
}

export default PortfolioImageModal
