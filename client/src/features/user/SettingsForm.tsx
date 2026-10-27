import { MailOutlined, UserOutlined } from '@ant-design/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, Input } from 'antd'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Loader } from '@/components/ui/Loader'
import { AppButton } from '@/components/ui/appButton/AppButton'

import type { IUser } from '@/types/user.types'

import { useUpdateProfileMutation } from './hooks/useUpdateProfileMutation'
import { SettingsSchema, type TypeSettingsSchema } from './settings.schema'

interface SettingsFormProps {
	user: IUser
	isLoading: boolean
	isEditing: boolean
	onCancel?: () => void
}

export const SettingsForm = ({
	user,
	isLoading,
	isEditing,
	onCancel
}: SettingsFormProps) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting }
	} = useForm<TypeSettingsSchema>({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			name: user.displayName || '',
			email: user.email || ''
		}
	})

	useEffect(() => {
		reset({
			name: user.displayName || '',
			email: user.email || ''
		})
	}, [user, reset])

	const { update, isLoadingUpdate } = useUpdateProfileMutation()
	const onSubmit = (values: TypeSettingsSchema) => {
		update(values, {
			onSuccess: () => onCancel?.()
		})
	}

	if (!user || isLoading) return <Loader />

	return (
		<div>
			<Form
				onFinish={handleSubmit(onSubmit)}
				layout='vertical'
				size='large'
				style={{ width: '100%', marginTop: -10 }}
				validateTrigger='onBlur'
				variant='outlined'
				requiredMark={false}
				disabled={!isEditing || isSubmitting || isLoadingUpdate}
			>
				<Form.Item
					label='Имя'
					validateStatus={errors.name ? 'error' : undefined}
					help={errors.name?.message}
					style={{ marginBottom: 16 }}
				>
					<Controller
						control={control}
						name='name'
						render={({ field }) => (
							<Input
								{...field}
								prefix={
									<UserOutlined style={{ color: '#bfbfbf', marginRight: 8 }} />
								}
								placeholder='Введите имя'
								type='text'
								autoComplete='name'
								size='large'
								disabled={!isEditing || isSubmitting}
								className='bg-transparent p-2 pl-3 -mt-2 text-[16px] opacity-100 text-copy/75 border border-button/30 cursor-default! disabled:bg-transparent disabled:cursor-default!'
							/>
						)}
					/>
				</Form.Item>

				<Form.Item
					label='Email'
					validateStatus={errors.email ? 'error' : undefined}
					help={errors.email?.message}
					style={{ marginBottom: 34 }}
				>
					<Controller
						control={control}
						name='email'
						render={({ field }) => (
							<Input
								{...field}
								prefix={
									<MailOutlined style={{ color: '#bfbfbf', marginRight: 8 }} />
								}
								placeholder='example@gmail.com'
								type='email'
								autoComplete='email'
								size='large'
								disabled={!isEditing || isSubmitting}
								className='bg-transparent p-2 pl-3 -mt-2 text-[16px] border border-button/30 cursor-default! disabled:bg-transparent text-copy/75 disabled:cursor-default!'
							/>
						)}
					/>
				</Form.Item>

				{isEditing && (
					<div className='flex gap-3'>
						<Form.Item style={{ marginBottom: 0, flex: 1 }}>
							<AppButton
								appVariant='primary'
								htmlType='submit'
								block
								disabled={isSubmitting || isLoadingUpdate}
								size='large'
								className='text-copy! text-[18px]! hover:bg-button-hover! hover:text-accent!'
								style={{
									height: 48,
									fontSize: 16,
									fontWeight: 500
								}}
							>
								{isSubmitting ? 'Сохранение...' : 'Сохранить'}
							</AppButton>
						</Form.Item>

						{onCancel && (
							<Form.Item style={{ marginBottom: 0, flex: 1 }}>
								<AppButton
									appVariant='primary'
									htmlType='button'
									block
									size='large'
									onClick={onCancel}
									style={{
										height: 48,
										fontSize: 16,
										fontWeight: 500
									}}
								>
									Отмена
								</AppButton>
							</Form.Item>
						)}
					</div>
				)}
			</Form>
		</div>
	)
}
