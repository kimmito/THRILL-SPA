export type OfferType = 'repeat-visit' | 'gift-certificate'

interface OfferBase {
	id: string
	type: OfferType
	title: string
}

export interface RepeatVisitOffer extends OfferBase {
	type: 'repeat-visit'
	items: {
		id: string
		title: string
		value: string
	}[]
}

export interface GiftCertificateOffer extends OfferBase {
	type: 'gift-certificate'
	description1?: string
	description2?: string
	items: {
		id: string
		value: string
	}[]
}

export type Offer = RepeatVisitOffer | GiftCertificateOffer

export const tempOffers: Offer[] = [
	{
		id: 'repeat-visits',
		type: 'repeat-visit',
		title: 'Скидки на повторные посещения',
		items: [
			{
				id: 'repeat-visits-1',
				title: '1 посещение',
				value: '-1000 руб.'
			},
			{
				id: 'repeat-visits-2',
				title: '2 посещение',
				value: '-800 руб.'
			},
			{
				id: 'repeat-visits-3',
				title: '3 посещение',
				value: '-500 руб.'
			}
		]
	},
	{
		id: 'certificates',
		type: 'gift-certificate',
		title: 'Подарочные сертификаты',
		description1:
			'Электронный сертификат - универсальный подарок для близких, который не будет пылиться на полке. Получатель сам решает, на что потратить сертификат, а значит подарок точно понравится.',
		description2: 'Действует на все услуги и товары. Отображается в личном кабинете.',
		items: [
			{
				id: 'certificates-1',
				value: '3 000 руб.'
			},
			{
				id: 'certificates-2',
				value: '5 000 руб.'
			}
		]
	}
]
