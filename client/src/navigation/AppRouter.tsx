import { Route, Routes } from 'react-router'

import { Layout } from '@/components/Layout'

import { ProtectedRoute } from './ProtectedRoute'
import { type IRoute, appRoutes } from './routes.config'
import NotFound from '@/pages/not-found/NotFound'
import { GuestRoute } from './GuestRoute'

export const AppRouter = () => {
	const layoutRoutes = appRoutes.filter(route => route.layout !== false)
	const standaloneRoutes = appRoutes.filter(route => route.layout === false)

	const renderRoute = (route: IRoute) => {
		const {
			path,
			component: Component,
			protected: isProtected,
			guestOnly,
			roles
		} = route
		const element = <Component />

		return isProtected ? (
			<Route element={<ProtectedRoute roles={roles} />}>
				<Route path={path.replace(/^\//, '')} element={element} />
			</Route>
		) : guestOnly ? (
			<Route element={<GuestRoute />}>
				<Route path={path.replace(/^\//, '')} element={element} />
			</Route>
		) : (
			<Route path={path.replace(/^\//, '')} element={element} />
		)
	}	

	return (
		<Routes>
			<Route element={<Layout />}>
				{layoutRoutes.map(route => renderRoute(route))}
			</Route>
			{standaloneRoutes.map(route => renderRoute(route))}
			<Route path='not-found' element={<NotFound />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}
