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
	provider: string
	userId: string
}

export interface IUser {
	id: string
	createdAt: string
	updatedAt: string
	email: string
	displayName: string
	picture: string
	role: UserRole
	isVerified: boolean
	method: AuthMethod
	accounts: IAccount[]
}
