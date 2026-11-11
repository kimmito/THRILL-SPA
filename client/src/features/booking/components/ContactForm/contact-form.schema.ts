import z from 'zod'

export const contactSchema = z.object({
	name: z.string().min(2, 'Введите имя'),
	phone: z.string().min(5, 'Введите номер телефона'),
	email: z.email('Введите корректный email'),
	comment: z.string().max(500, 'Максимум 500 символов')
})
