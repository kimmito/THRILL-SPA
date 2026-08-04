import { MutatingDots } from 'react-loader-spinner'

export const Loader = () => {
	return (
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
	)
}
