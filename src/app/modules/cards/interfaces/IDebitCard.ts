export interface IDebitCard {
  cardNumber: string[];
  expiry: string;
  cvv: string;
  customerName: string;
  isFreezed?: boolean;
}
