module.exports = {	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--color-primary)',
				'primary-light': 'var(--color-primary-light)',
				accent: 'var(--color-accent)',
				'bg-main': 'var(--color-bg-main)',
				'text-dark': 'var(--color-text-dark)',
				'text-muted': 'var(--color-text-muted)',
				white: 'var(--color-white)',
				brand: {
					DEFAULT: '#0ea5a4',
					50: '#ecfeff'
				}
			},
			fontFamily: {
				title: ['var(--font-title)'],
				body: ['var(--font-body)']
			},
			spacing: {
				72: '18rem'
			}
		}
	},
	plugins: []
	
}
