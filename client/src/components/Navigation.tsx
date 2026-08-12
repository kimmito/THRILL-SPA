import { useScrollToSection } from '@/hooks/useScrollToSection'

import { AppButton } from './ui/appButton/AppButton'

interface NavLink {
	to: string
	label: string
}

export const Navigation = () => {
	const navLinks: NavLink[] = [
		{ to: '/#about', label: 'О нас' },
		{ to: '/#services', label: 'Услуги' },
		{ to: '/#portfolio', label: 'Портфолио' }
	]

	const { scrollToSection } = useScrollToSection()

	const handleNavClick = (to: string) => {
		const sectionId = to.replace('/#', '')
		scrollToSection(sectionId)
	}

	return (
		<nav>
			<ul className='flex gap-2'>
				{navLinks.map(link => (
					<li key={link.to}>
						<AppButton
							appVariant='outline'
							className='text-[14px]! p-4!'
							onClick={() => handleNavClick(link.to)}
						>
							{link.label}
						</AppButton>
					</li>
				))}
			</ul>
		</nav>
	)
}
