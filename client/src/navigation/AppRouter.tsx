import NotFound from '@screens/not-found/NotFound'
import { Navigate, Route, Routes } from 'react-router'

import { Layout } from '@/components/Layout'

import { appRoutes } from './routes.config'

export const AppRouter = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				{appRoutes.map(({ path, component: Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
			</Route>
			<Route path='/not-found' element={<NotFound />} />
			<Route path='*' element={<Navigate replace to='/not-found' />} />
		</Routes>
	)
}
