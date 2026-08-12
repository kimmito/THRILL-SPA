import { useLocation, useNavigate } from 'react-router'

export const useScrollToSection = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const scrollToSection = (sectionId: string) => {
		if (location.pathname !== '/') {
			navigate('/')
			setTimeout(() => {
				const element = document.getElementById(sectionId)
				if (element) {
					navigate(`/#${sectionId}`)
					element.scrollIntoView({ behavior: 'smooth' })
				}
			}, 100)
		} else {
			const element = document.getElementById(sectionId)
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' })
			}
			navigate(`/#${sectionId}`)
		}
	}

	return { scrollToSection }
}
