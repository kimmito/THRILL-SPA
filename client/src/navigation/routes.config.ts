import type { ComponentType } from 'react'

import type { UserRole } from '@/types/user.types'

import { Login } from '@/pages/auth/Login'
import { Register } from '@/pages/auth/Register'
import Cart from '@/pages/cart/Cart'
import { Forbidden } from '@/pages/forbidden/Forbidden'
import Home from '@/pages/home/Home'
import Profile from '@/pages/profile/Profile'
import Shop from '@/pages/shop/Shop'
import { ShopItemPage } from '@/pages/shop/catalogSection/shop-item/ShopItemPage'

export interface IRoute {
	path: string
	title: string
	component: ComponentType
	layout?: boolean
	protected?: boolean
	guestOnly?: boolean
	roles?: UserRole[]
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
		component: Profile,
		protected: true
	},
	{
		path: '/auth/login',
		title: 'Вход',
		component: Login,
		layout: false,
		guestOnly: true
	},
	{
		path: '/auth/register',
		title: 'Регистрация',
		component: Register,
		layout: false,
		guestOnly: true
	},
	{
		path: '/shop',
		title: 'Магазин',
		component: Shop
	},
	{ path: '/shop/:slug', title: 'Товар', component: ShopItemPage },

	{ path: '/cart', title: 'Корзина', component: Cart, protected: true },
	{ path: '/forbidden', title: 'Доступ запрещен', component: Forbidden }
]
