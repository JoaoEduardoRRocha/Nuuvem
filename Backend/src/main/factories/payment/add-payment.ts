import { AddPaymentMongoRepository } from '../../../infra/db/mongodb/payments/add-payment';
import { AddPaymentController } from '../../../presentation/controllers/payment/add-payment';
import { UserDecoderAdapter } from '../../../utils/user';
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user';

export const makeAddPaymentController = (): AddPaymentController => {
  const userDecoder = new UserDecoderAdapter(process.env.JWT_SECRET);
  const userGetter = new GetUserMongoRepository();
  const paymentAdder = new AddPaymentMongoRepository();
  return new AddPaymentController(userDecoder, userGetter, paymentAdder);
};
