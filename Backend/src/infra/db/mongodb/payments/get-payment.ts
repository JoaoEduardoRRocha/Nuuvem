import { PaymentModel } from '../../../../domain/models/payment/payment'
import { PaymentGetter } from '../../../../presentation/protocols/payments/payment-getter'
import { MongoHelper, mongoToPaymentModel } from '../helpers/mongo-helper'

export class GetPaymentMongoRepository implements PaymentGetter {
  async get(id: string): Promise<PaymentModel> {
    const paymentCollection = await MongoHelper.getCollection('payments')
    const payment = await paymentCollection.findOne({ _id: new MongoHelper.ObjectId(id) })
    if (!payment) {
      return null
    }
    return MongoHelper.map(payment, mongoToPaymentModel)
  }
}
