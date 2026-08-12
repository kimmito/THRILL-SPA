import { AppButton } from '@/components/ui/appButton/AppButton'

import type { Service } from '@/types/service.type'

import { useServicesByCategoryId } from './hooks/useService'
import { Loader } from '@/components/ui/Loader'

type ServicesPriceTableProps = {
	ref: React.RefObject<HTMLDivElement | null>
	categoryId: number | null
}
export const ServicesPriceTable = ({
	ref,
	categoryId
}: ServicesPriceTableProps) => {
	const {
		services,
		isLoading
	}: { services: Service[] | null; isLoading: boolean } =
		useServicesByCategoryId(categoryId ?? 0)
	return (
		<div id='services-price' ref={ref} className='mt-20'>
			<table className='w-1/2 mb-10 ml-10 border-collapse [&_td]:border-b [&_td]:border-line/35 [&_td]:py-4 [&_td:last-child]:text-center [&_td:last-child]:pl-40 [&_tr:last-child_td]:border-b-0'>
				<tbody>
					{isLoading ? (
						<Loader />
					) : (
						services?.map(service => (
							<tr key={service.id}>
								<td className='text-2xl max-w-100'>{service.name}</td>
								<td className='text-[32px] font-bold text-center'>
									{service.price} ₽
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
			<div className='flex flex-row gap-3 ml-10 w-1/2 *:flex *:px-20 *:py-6 *:text-2xl'>
				<AppButton
					className='flex-2 hover:bg-transparent hover:text-accent! hover:border-accent'
					appVariant='primary'
				>
					Онлайн-запись
				</AppButton>
				<AppButton className='flex-1' appVariant='outline'>
					Портфолио
				</AppButton>
			</div>
		</div>
	)
}
