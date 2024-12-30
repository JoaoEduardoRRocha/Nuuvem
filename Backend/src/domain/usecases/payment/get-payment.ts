import { PaymentModel } from '../../models/payment/payment'

export interface GetPayment {
  get: (id: string) => Promise<PaymentModel>
}