import { FaGoogle, FaYandex } from 'react-icons/fa'

export const AuthSocial = () => {
	return (
		<>
			<div className='flex flex-row justify-between gap-4'>
				<button className='flex flex-1 hover:shadow-md transition-all ease-in-out duration-200 items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50/5 cursor-pointer'>
					<FaGoogle />
					<span className='font-sans font-semibold ml-2'>Войти с Google</span>
				</button>
				<button className='flex flex-1 hover:shadow-md transition-all ease-in-out duration-200 items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50/5 cursor-pointer'>
					<FaYandex />
					<span className='font-sans font-semibold ml-2'>Войти с Яндекс</span>
				</button>
			</div>
		</>
	)
}
