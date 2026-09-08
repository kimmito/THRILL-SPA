import type { ComponentType } from 'react'

import { Login } from '@/pages/auth/login/Login'
import { Register } from '@/pages/auth/register/Register'
import Cart from '@/pages/cart/Cart'
import Home from '@/pages/home/Home'
import Profile from '@/pages/profile/Profile'
import Shop from '@/pages/shop/Shop'
import { ShopItemPage } from '@/pages/shop/catalogSection/shop-item/ShopItemPage'

export interface IRoute {
	path: string
	title: string
	component: ComponentType
	layout?: boolean
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
		path: '/auth/login',
		title: 'Вход',
		component: Login,
		layout: false
	},
	{
		path: '/auth/register',
		title: 'Регистрация',
		component: Register,
		layout: false
	},
	{
		path: '/shop',
		title: 'Магазин',
		component: Shop
	},
	{ path: '/shop/:slug', title: 'Товар', component: ShopItemPage },

	{ path: '/cart', title: 'Корзина', component: Cart }
]
