import { Route, Routes } from 'react-router'

import { Layout } from '@/components/Layout'

import { appRoutes } from './routes.config'
import NotFound from '@/pages/not-found/NotFound'

export const AppRouter = () => {
	return (
		<Routes>
			<Route element={<Layout />}>
				{appRoutes.map(({ path, component: Component }) =>
					path === '/' ? (
						<Route key={path} index element={<Component />} />
					) : (
						<Route key={path} path={path.replace(/^\//, '')} element={<Component />} />
					)
				)}
			</Route>
			<Route path='not-found' element={<NotFound />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
