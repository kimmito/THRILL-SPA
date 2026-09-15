import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import toast from 'react-hot-toast'

import { AppButton } from '@/components/ui/appButton/AppButton'

import { AuthWrapper } from '../AuthWrapper'

import { useLoginMutation } from './useLoginMutation'

type TypeLoginForm = {
	email: string
	password: string
}

export const LoginForm = () => {
	const [form] = Form.useForm<TypeLoginForm>()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)

	const { login, isLoadingLogin } = useLoginMutation()

	const recaptchaSiteKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY

	const onFinish = (values: TypeLoginForm) => {
		if (!recaptchaValue) {
			toast('Пожалуйста, завершите проверку reCAPTCHA', {
				icon: '⚠️',
				style: { fontFamily: "'Arsenal SC', sans-serif" }
			})
			return
		}

		login({ data: values, recaptcha: recaptchaValue })
	}

	return (
		<AuthWrapper
			heading='Войти'
			description='Чтобы войти в аккаунт введите ваш email и пароль'
			backButtonLabel='Еще нет аккаунта? Зарегистрироваться'
			backButtonHref='/auth/register'
			isShowSocial={true}
		>
			<Form
				form={form}
				onFinish={onFinish}
				layout='vertical'
				size='large'
				style={{ width: '100%', marginTop: -10 }}
				validateTrigger='onBlur'
				variant='outlined'
				requiredMark={false}
				disabled={isLoadingLogin}
			>
				<Form.Item
					name='email'
					label='Email'
					rules={[
						{ required: true, message: 'Введите email' },
						{ type: 'email', message: 'Введите корректный email' }
					]}
					style={{ marginBottom: 16 }}
				>
					<Input
						prefix={
							<MailOutlined style={{ color: '#bfbfbf', marginRight: 8 }} />
						}
						placeholder='example@gmail.com'
						type='email'
						autoComplete='email'
						size='large'
						className='bg-transparent p-2 pl-3 -mt-2 text-[16px] border border-button/30'
					/>
				</Form.Item>

				<Form.Item
					name='password'
					label='Пароль'
					rules={[
						{ required: true, message: 'Введите пароль' },
						{ min: 6, message: 'Минимум 6 символов' }
					]}
					extra='Минимум 6 символов'
					style={{ marginBottom: 34 }}
				>
					<Input.Password
						prefix={
							<LockOutlined style={{ color: '#bfbfbf', marginRight: 8 }} />
						}
						placeholder='Введите пароль'
						autoComplete='new-password'
						size='large'
						className='bg-transparent p-2 pl-3 -mt-2 text-[16px] border border-button/30'
					/>
				</Form.Item>

				<div className='flex justify-center mb-4'>
					<ReCAPTCHA
						theme='dark'
						sitekey={recaptchaSiteKey}
						onChange={setRecaptchaValue}
					/>
				</div>

				<Form.Item style={{ marginBottom: 20 }}>
					<AppButton
						appVariant='primary'
						htmlType='submit'
						block
						size='large'
						className='text-copy! text-[18px]! hover:bg-button-hover! hover:text-accent!'
						style={{
							height: 48,
							fontSize: 16,
							fontWeight: 500
						}}
					>
						{isLoadingLogin ? 'Вход...' : 'Войти'}
					</AppButton>
				</Form.Item>
			</Form>
		</AuthWrapper>
	)
}
