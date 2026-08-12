import { MutatingDots } from 'react-loader-spinner'

export const Loader = () => {
	return (
		<div className='flex justify-center items-center w-full  h-[400px]'>
			<MutatingDots
				visible={true}
				height='100'
				width='100'
				color='#ffe476'
				secondaryColor='#ffe476'
				radius='12.5'
				ariaLabel='mutating-dots-loading'
				wrapperStyle={{}}
				wrapperClass=''
			/>
		</div>
	)
}
