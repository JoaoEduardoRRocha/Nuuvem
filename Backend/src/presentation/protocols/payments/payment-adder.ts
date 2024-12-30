import { AddPayment, AddPaymentModel } from '../../../domain/usecases/payment/add-payment';
import { PaymentModel } from '../../../domain/models/payment/payment';

export interface PaymentAdder extends AddPayment{
  add: (payment: AddPaymentModel) => Promise<PaymentModel>;
}
