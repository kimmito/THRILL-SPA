import { useKeenSlider } from 'keen-slider/react'
import { FaChevronLeft, FaChevronRight} from "react-icons/fa";
import { AppButton } from '@/components/ui/AppButton'

import { ReportCard } from './ReportCard'
import { reports } from '@/data/reports'

const ReportsSection = () => {
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		loop: true,
		drag: true,
		slides: {
			perView: 1,
			origin: 'center',
			spacing: 48
		}
	})
	return (
		<section className='mt-20 flex flex-row items-center'>
			<h2 className='w-1/8 color-head font-bold text-center text-[96px] [writing-mode:vertical-rl] rotate-180 flex items-end justify-center'>
				Отзывы
			</h2>
			<div
				ref={sliderRef}
				className='keen-slider w-3/8 mr-0 bg-[#5F5F5F] h-[clamp(400px,60vh,700px)]! overflow-hidden relative'
			>
				{reports.map(report => (
					<ReportCard key={report.id} report={report} />
				))}
				<div className='keep-slider-controls absolute left-15 bottom-10 z-10 flex items-center gap-12'>
					<AppButton
						aria-label='Предыдущий отзыв'
						appVariant='icon'
						className='group h-12! w-12! min-w-12! rounded-none! border-line/55! bg-base/70! p-0! text-line! hover:border-accent! hover:bg-base/90! hover:text-accent!'
						onClick={() => instanceRef.current?.prev()}
					>
						<FaChevronLeft className='text-[28px] transition-colors duration-200 ease' />
					</AppButton>
					<AppButton
						aria-label='Следующий отзыв'
						appVariant='icon'
						className='group h-12! w-12! min-w-12! rounded-none! border-line/55! bg-base/70! p-0! text-line! hover:border-accent! hover:bg-base! hover:text-accent!'
						onClick={() => instanceRef.current?.next()}
					>
						<FaChevronRight className='text-[28px] transition-colors duration-200 ease' />
					</AppButton>
				</div>
			</div>
			<img
				src='./src/assets/images/posing.jpg'
				className='w-3/8 object-contain'
				alt=''
			/>
		</section>
	)
}
export default ReportsSection
