import React from 'react';

import * as S from './styles';

type Category = {
	icon: string
	name: string
}

export type TransactionPropsCard = {
	transactionType: 'up' | 'down'
	name: string
	amount: string
	category: Category
	date: string
}

interface TransactionCardProps {
	data: TransactionPropsCard
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ data }) => {

	return (
		<S.Container>
			<S.Title>
				{data?.name}
			</S.Title>
			<S.Amount type={data.transactionType}>
				{data?.transactionType === 'down' && '- '}
				{data?.amount}
			</S.Amount>
			<S.Footer>
				<S.Category>
					<S.Icon name={data?.category?.icon}/>
					<S.CategoryName>
						{data?.category?.name}
					</S.CategoryName>
				</S.Category>
				<S.Date>
					{data?.date}
				</S.Date>
			</S.Footer>
		</S.Container>
	);
}
