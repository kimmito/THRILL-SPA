import { z } from 'zod'

const RussianPhoneSchema = z
	.string()
	.trim()
	.refine(
		value => /^\+7(?:[\s()-]*\d){10}$/.test(value),
		{ message: 'Введите номер в формате +7 (900) 000-00-00' }
	)
	.transform(value => `+7${value.replace(/\D/g, '').slice(1)}`)

export const SettingsSchema = z.object({
	name: z.string().min(1, { message: 'Введите имя' }),
	email: z.string().email({ message: 'Введите корректный email' }),
	phoneNumber: RussianPhoneSchema
})

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>
