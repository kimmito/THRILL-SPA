import type { PropsWithChildren } from 'react'

import Grainient from '@/components/ui/Gradient'

import { AuthSocial } from './AuthSocial'

interface AuthWrapperProps extends PropsWithChildren {
	heading: string
	description?: string
	backButtonLabel?: string
	backButtonHref?: string
	isShowSocial?: boolean
}

export const AuthWrapper = ({
	children,
	heading,
	description,
	backButtonLabel,
	backButtonHref,
	isShowSocial
}: AuthWrapperProps) => {
	return (
		<>
			<div className='w-130 mx-auto my-20 p-10 bg-panel shadow-xl'>
				<h2 className='text-3xl text-head'>{heading}</h2>
				<p className='mb-5'>{description}</p>
				{isShowSocial && <AuthSocial />}
				<div className='relative my-5'>
				
          <div className="absolute inset-0 flex items-center">
            <span className='w-full border-t'></span>
          </div>
          <div className='relative flex justify-center text-md inset-0 uppercase'>
            <span className='bg-panel px-2'>или</span>
          </div>
				</div>

				{children}
				{backButtonLabel && backButtonHref && (
					<a className='hover:text-accent text-center block' href={backButtonHref}>
						{backButtonLabel}
					</a>
				)}
			</div>
			<div className='absolute top-0 left-0 w-full h-full -z-100000'>
				<Grainient
					color1='#1c162e'
					color2='#191526'
					color3='#100d1a'
					timeSpeed={2}
					colorBalance={0.26}
					warpStrength={1.05}
					warpFrequency={4.1}
					warpSpeed={2}
					warpAmplitude={50}
					blendAngle={32}
					blendSoftness={0.9}
					rotationAmount={810}
					noiseScale={0.8}
					grainAmount={0}
					grainScale={0.3}
					grainAnimated={false}
					contrast={1}
					gamma={1}
					saturation={1}
					centerX={-0.2}
					centerY={0}
					zoom={0.3}
				/>
			</div>
		</>
	)
}
