import { eTransactionType } from '../enums';

export interface ITransaction {
  imageUrl: string;
  title: string;
  amount: number;
  transactionType: eTransactionType;
  date: string;
  info: string;
}
