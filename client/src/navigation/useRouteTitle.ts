import { useEffect } from 'react'
import { useLocation } from 'react-router'

import type { IRoute } from './routes.config'

export const useRouteTitle = (routes: IRoute[]) => {
	const location = useLocation()

	useEffect(() => {
		const currentRoute = routes.find(route => route.path === location.pathname)
		document.title = currentRoute
			? `Салон красоты THRILL | ${currentRoute.title}`
			: 'Салон красоты THRILL'
	}, [location.pathname, routes])
}
