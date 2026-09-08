import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Form, Input } from 'antd'
import { Controller, useForm } from 'react-hook-form'

import { AuthWrapper } from '../AuthWrapper'
import {
	RegisterSchema,
	type TypeRegisterSchema
} from '../schemes/register.schema'
import { AppButton } from '@/components/ui/appButton/AppButton'


export const RegisterForm = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError
	} = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

	const onSubmit = async (values: TypeRegisterSchema) => {
		try {
			console.log(values)
			// await authService.register(values)

			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error) {
			setError('root', {
				message: 'Ошибка регистрации. Попробуйте позже.'
			})
		}
	}

	return (
		<AuthWrapper
			heading='Регистрация'
			description='Для регистрации введите ваш email и пароль'
			backButtonLabel='Уже есть аккаунт? Войти'
			backButtonHref='/auth/login'
			isShowSocial
		>
			<Form
				onFinish={handleSubmit(onSubmit)}
				layout='vertical'
				size='large'
				style={{ width: '100%', marginTop: -10 }}
				validateTrigger='onBlur'
				variant='outlined'
				requiredMark={false}
			>
				{errors.root && (
					<Form.Item>
						<Alert
							title={errors.root.message}
							type='error'
							showIcon
							closable
							style={{ marginBottom: 16 }}
						/>
					</Form.Item>
				)}

				<Controller
					name='name'
					control={control}
					render={({ field }) => (
						<Form.Item
							label={'Имя'}
							validateStatus={errors.name ? 'error' : ''}
							help={errors.name?.message}
							required
							style={{ marginBottom: 5 }}
						>
							<Input
								{...field}
								prefix={
									<UserOutlined style={{ color: '#bfbfbf', marginRight: 8 }} />
								}
								placeholder='Введите ваше имя'
								size='large'
								status={errors.name ? 'error' : ''}
								className='bg-transparent p-2 pl-3 -mt-2 text-[16px] border border-button/30'
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name='email'
					control={control}
					render={({ field }) => (
						<Form.Item
							label={'Email'}
							validateStatus={errors.email ? 'error' : ''}
							help={errors.email?.message}
							required
							style={{ marginBottom: 4 }}
						>
							<Input
								{...field}
								prefix={
									<MailOutlined style={{ color: '#bfbfbf', marginRight: 8 }} />
								}
								placeholder='example@gmail.com'
								type='email'
								autoComplete='email'
								size='large'
								status={errors.email ? 'error' : ''}
								className='bg-transparent p-2 pl-3 -mt-2 text-[16px] border border-button/30'
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name='password'
					control={control}
					render={({ field }) => (
						<Form.Item
							label={'Пароль'}
							validateStatus={errors.password ? 'error' : ''}
							help={errors.password?.message}
							required
							style={{ marginBottom: 0 }}
							extra={
								'Минимум 6 символов'
							}
						>
							<Input.Password
								{...field}
								prefix={
									<LockOutlined style={{ color: '#bfbfbf', marginRight: 8 }} />
								}
								placeholder='Введите пароль'
								autoComplete='new-password'
								size='large'
								status={errors.password ? 'error' : ''}
								className='bg-transparent p-2 pl-3 -mt-2 text-[16px] border border-button/30'
							/>
						</Form.Item>
					)}
				/>

				<Controller
					name='passwordRepeat'
					control={control}
					render={({ field }) => (
						<Form.Item
							label={'Подтверждение пароля'}
							validateStatus={errors.passwordRepeat ? 'error' : ''}
							help={errors.passwordRepeat?.message}
							required
							style={{ marginBottom: 34 }}
						>
							<Input.Password
								{...field}
								prefix={
									<LockOutlined style={{ color: '#bfbfbf', marginRight: 8 }} />
								}
								placeholder='Повторите пароль'
								autoComplete='new-password'
								size='large'
								status={errors.passwordRepeat ? 'error' : ''}
								className='bg-transparent p-2 pl-3 -mt-2 text-[16px] border border-button/30'
							/>
						</Form.Item>
					)}
				/>

				<Form.Item style={{ marginBottom: 34 }}>
					<AppButton
						appVariant='primary'
						htmlType='submit'
						block
						size='large'
						loading={isSubmitting}
						className='text-copy! text-[18px]! hover:bg-button-hover! hover:text-accent!'
						style={{
							height: 48,
							fontSize: 16,
							fontWeight: 500,
						}}
					>
						{isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
					</AppButton>
				</Form.Item>
			</Form>
		</AuthWrapper>
	)
}
