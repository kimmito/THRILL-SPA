export const UserRole = {
	Regular: 'REGULAR',
	Admin: 'ADMIN'
} as const
export type UserRole = (typeof UserRole)[keyof typeof UserRole]

export const AuthMethod = {
	Credentials: 'CREDENTIALS',
	Google: 'GOOGLE',
	Yandex: 'YANDEX'
} as const

export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod]

export interface IAccount {
	id: string
	createdAt: string
	updatedAt: string
	type: string
	provider: string
	refreshToken: string
	accessToken: string
	expiresIn: number
	userId: string
}

export interface IUser {
	id: string
	createdAt: string
	updatedAt: string
	email: string
	password: string
	displayName: string
	picture: string
	role: UserRole
	isVerified: boolean
	isTwoFactorEnabled: boolean
	method: AuthMethod
	accounts: IAccount[]
}
