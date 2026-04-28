import './global.css'
import { StrictMode } from 'react'
import { ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'
createRoot(document.getElementById('root')!).render(
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
					<BrowserRouter basename={import.meta.env.BASE_URL}>
						<App />
					</BrowserRouter>
			</ConfigProvider>
		</StyleProvider>
	</StrictMode>
)
