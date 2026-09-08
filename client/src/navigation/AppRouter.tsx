import { Route, Routes } from 'react-router'

import { Layout } from '@/components/Layout'

import { appRoutes } from './routes.config'
import NotFound from '@/pages/not-found/NotFound'

export const AppRouter = () => {
	const layoutRoutes = appRoutes.filter(route => route.layout !== false)
	const standaloneRoutes = appRoutes.filter(route => route.layout === false)

	return (
		<Routes>
			<Route element={<Layout />}>
				{layoutRoutes.map(({ path, component: Component }) =>
					path === '/' ? (
						<Route key={path} index element={<Component />} />
					) : (
						<Route key={path} path={path.replace(/^\//, '')} element={<Component />} />
					)
				)}
			</Route>
			{standaloneRoutes.map(({ path, component: Component }) => (
				<Route key={path} path={path.replace(/^\//, '')} element={<Component />} />
			))}
			<Route path='not-found' element={<NotFound />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
