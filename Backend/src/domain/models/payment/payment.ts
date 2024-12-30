export interface PaymentModel {
  id: string;
  amount: number;
  currency: string;
  clientSecret: string;
  createdAt: Date;
}
