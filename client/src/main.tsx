import './global.css'
import { StrictMode } from 'react'
import { ConfigProvider } from 'antd'
import { StyleProvider } from '@ant-design/cssinjs'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'

import App from './App.tsx'
import { store } from './store/store'

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
				<Provider store={store}>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</Provider>
			</ConfigProvider>
		</StyleProvider>
	</StrictMode>
)
