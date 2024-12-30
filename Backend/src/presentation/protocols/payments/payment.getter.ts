import { PaymentModel } from '../../../domain/models/payment/payment'
import { GetPayment } from '../../../domain/usecases/payment/get-payment'

export interface PaymentGetter extends GetPayment {
  get (payment: string): Promise<PaymentModel>
}
