import { RxAvatar } from 'react-icons/rx'

import type { Report } from '@/data/reports'

type ReportCardProps = {
	report: Report
}

export const ReportCard = ({ report }: ReportCardProps) => {
	return (
		<div className='keen-slider__slide'>
			<div className='container m-15 pr-25'>
				<div className='flex flex-row items-center gap-5'>
					<div className='mt-3'>
						{report.image ? (
							<img
								src={report.image}
								alt={report.author}
								className='w-16 h-16 rounded-full'
							/>
						) : (
							<RxAvatar className='w-16 h-16' />
						)}
					</div>

					<div>
						<p className='font-bold text-[32px] text-head '>{report.author}</p>
						<p className='text-[24px] text-head leading-none'>{report.date}</p>
					</div>
				</div>
				<div className='mb-5'>
					{[...Array(report.stars)].map((_, i) => (
						<span key={i} className='text-yellow-500 text-[32px]'>
							★
						</span>
					))}
					{[...Array(5 - report.stars)].map((_, i) => (
						<span key={i} className='text-gray-300 text-[32px]'>
							★
						</span>
					))}
				</div>
				<p className='font-bold text-2xl text-head'>{report.text}</p>
			</div>
		</div>
	)
}
