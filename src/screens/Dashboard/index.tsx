import React, { useState, useEffect } from 'react';
import { SpotlightCard } from '../../components/SpotlightCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TransactionPropsCard, TransactionCard} from '../../components/TransactionCard';

import * as S from './styles';
import { transactionKey } from '../../constants';

export interface DataListProps extends TransactionPropsCard {
	id: string;
}

export const Dashboard: React.FC = () => {
	const [data, setData] = useState<DataListProps[]>([])

	const loadData = async (key: string) => {
		try {
			const data = await AsyncStorage.getItem(key);
			const currentTransactions = data ? JSON.parse(data) : [];
			const transactionsFormatted: DataListProps[] = currentTransactions.map(
				(transaction: DataListProps) => {
					const amount = Number(transaction.amount)
					.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL'
					});
					const dateFormatted = Intl.DateTimeFormat('pr-BR', {
						day: '2-digit',
						month: '2-digit',
						year: '2-digit'
					}).format(new Date(transaction.date));

					return {
						...transaction,
						date: dateFormatted,
						amount,
					}

			});
			setData(transactionsFormatted);
		} catch (error) {
			console.log(error);
		}
	};


	useEffect(() => {
		loadData(transactionKey);
	}, [data]);


	return (
		<S.Container>
			<S.Header>
				<S.UserWrapper>
					<S.UserInfo>
						<S.Photo source={{uri: 'https://avatars.githubusercontent.com/u/32473182?v=4'}}/>
						<S.User>
							<S.UserGreeting>
								Olá,
							</S.UserGreeting>
							<S.UserName>
								Carlos Daniel
							</S.UserName>
						</S.User>
					</S.UserInfo>
					<S.LogoutButton onPress={() => {}}>
						<S.Icon name="power"/>
					</S.LogoutButton>
				</S.UserWrapper>
			</S.Header>
			
			<S.SpotlightCards>
				<SpotlightCard type="up" title="Entradas" amount="R$ 17.000,00" lastTransaction="Última transação em 16 de julho" />
				<SpotlightCard type="down" title="Saídas" amount="R$ 53,00" lastTransaction="Última saída dia 03 de junho" />
				<SpotlightCard type="total" title="Total" amount="R$ 16.947,00" lastTransaction="01 à 16 de junho" />
			</S.SpotlightCards>

			<S.Transactions>
				<S.Title>
					Listagem
				</S.Title>
				<S.TransactionList
					data={data}
					keyExtractor={(_item, index) => String(index)}
					renderItem={({item}) => (
						<TransactionCard 
							data={item}
						/>
					)}
				/>
			</S.Transactions>
		</S.Container>
	)
}