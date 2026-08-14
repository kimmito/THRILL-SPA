import type { ComponentType } from 'react'

import Home from '@/pages/home/Home'
import Profile from '@/pages/profile/Profile'
import Shop from '@/pages/shop/Shop'
import { ShopItemPage } from '@/pages/shop/catalogSection/shop-item/ShopItemPage'

export interface IRoute {
	path: string
	title: string
	component: ComponentType
}

export const appRoutes: IRoute[] = [
	{
		path: '/',
		title: 'Главная',
		component: Home
	},
	{
		path: '/profile',
		title: 'Профиль',
		component: Profile
	},
	{
		path: '/shop',
		title: 'Магазин',
		component: Shop
	},
	{ path: '/shop/:slug', title: 'Товар', component: ShopItemPage }
]
