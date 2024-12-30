import { PaymentModel } from '../../../../domain/models/payment/payment';
import { AddPayment, AddPaymentModel } from '../../../../domain/usecases/payment/add-payment';
import { MongoHelper, mongoToPaymentModel } from '../helpers/mongo-helper';

export class AddPaymentMongoRepository implements AddPayment {
  async add(paymentData: AddPaymentModel): Promise<PaymentModel> {
    const paymentCollection = await MongoHelper.getCollection('payments');
    try {
      const result = await paymentCollection.insertOne({
        ...paymentData,
        createdAt: new Date(),
      });
      return MongoHelper.map(
        { _id: result.insertedId, ...paymentData },
        mongoToPaymentModel
      );
    } catch (error) {
      throw new Error(`Failed to add payment: ${error.message}`);
    }
  }
}
