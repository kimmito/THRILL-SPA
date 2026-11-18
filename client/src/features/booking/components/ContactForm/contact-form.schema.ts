import z from 'zod'

const RussianPhoneSchema = z
	.string()
	.trim()
	.refine(
		value => /^\+7(?:[\s()-]*\d){10}$/.test(value),
		{ message: 'Введите номер в формате +7 (900) 000-00-00' }
	)
	.transform(value => `+7${value.replace(/\D/g, '').slice(1)}`)

export const contactSchema = z.object({
	name: z.string().min(2, 'Введите имя'),
	phone: RussianPhoneSchema,
	email: z.email('Введите корректный email'),
	comment: z.string().max(500, 'Максимум 500 символов')
})
