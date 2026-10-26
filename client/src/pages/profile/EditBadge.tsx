import { FaPencilAlt } from "react-icons/fa"

export const EditBadge = () => {
	return (
		<span className='absolute -bottom-1 -right-2 bg-base p-2 rounded-full opacity-0 group-hover:opacity-100 duration-150'>
			{' '}
			<FaPencilAlt className='text-xs text-head' />
		</span>
	)
}
