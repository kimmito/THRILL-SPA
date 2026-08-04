import { StyleProvider } from '@ant-design/cssinjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'
import './global.css'

const basename =
	import.meta.env.BASE_URL === '/'
		? undefined
		: import.meta.env.BASE_URL.replace(/\/$/, '')

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<QueryClientProvider client={queryClient}>
		<StrictMode>
			<StyleProvider layer>
				<ConfigProvider
					theme={{
						token: {
							colorPrimary: '#3B3658',
							colorBorder: '#786A99',
							colorText: '#CCCCCC',
							colorTextBase: '#CCCCCC',
							borderRadius: 0,
							fontFamily: "'Arsenal SC', sans-serif"
						},
						components: {
							Button: {
								borderRadius: 0,
								primaryShadow: 'none',
								defaultShadow: 'none'
							}
						}
					}}
				>
					<BrowserRouter basename={basename}>
						<App />
						<Toaster position='bottom-right' />
					</BrowserRouter>
				</ConfigProvider>
			</StyleProvider>
		</StrictMode>
	</QueryClientProvider>
)
