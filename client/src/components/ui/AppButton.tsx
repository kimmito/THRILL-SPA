import { Button } from 'antd'
import type { ButtonProps } from 'antd'
import clsx from 'clsx'

export type AppButtonVariant =
	| 'primary'
	| 'outline'
	| 'active'
	| 'icon'
	| 'link'

type AppButtonProps = ButtonProps & {
	appVariant?: AppButtonVariant
}

const baseClasses =
	'inline-flex items-center justify-center border font-body font-normal shadow-none transition-colors'

const variantClasses: Record<AppButtonVariant, string> = {
	primary:
		'border-line bg-button px-6 py-4 text-[32px] leading-none text-copy uppercase hover:bg-transparent hover:text-accent hover:border-accent',
	outline:
		'border-line bg-transparent px-6 py-4 text-[32px] leading-none text-copy uppercase hover:border-accent hover:text-[#414141] hover:bg-accent',
	active:
		'border-accent bg-transparent px-6 py-4 text-[32px] leading-none text-accent! uppercase',
	icon: 'h-11 w-11 border-icon bg-transparent p-0 text-copy hover:border-accent hover:text-button-hover hover:bg-accent transition-colors duration-200 ease',
	link: 'border-transparent bg-transparent p-0 text-base leading-none text-copy/60 hover:text-accent hover:underline text-xl underline-offset-3'
}

export const AppButton = ({
	appVariant = 'primary',
	className,
	...props
}: AppButtonProps) => {
	return (
		<Button
			{...props}
			className={clsx(baseClasses, variantClasses[appVariant], className)}
		/>
	)
}
