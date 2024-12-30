// src/domain/usecases/payment/add-payment.ts

import { PaymentModel } from '../../models/payment/payment';

export interface AddPaymentModel {
  amount: number;
  currency: string;
  items: Array<{
    name: string;
    amount: number;
    currency: string;
    quantity: number;
  }>;
}

export interface AddPayment {
  add: (payment: AddPaymentModel) => Promise<PaymentModel>;
}
