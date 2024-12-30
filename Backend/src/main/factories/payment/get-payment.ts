import { GetPaymentMongoRepository } from '../../../infra/db/mongodb/payments/get-payment';
import { GetUserMongoRepository } from '../../../infra/db/mongodb/user/get-user';
import { GetPaymentController } from '../../../presentation/controllers/payment/get-payment';
import { UserDecoderAdapter } from '../../../utils/user';

export const makeGetPaymentController = (): GetPaymentController => {
  const jwtSecret = process.env.JWT_SECRET;
  const userGetter = new GetUserMongoRepository();
  const userDecoder = new UserDecoderAdapter(jwtSecret);
  const paymentGetter = new GetPaymentMongoRepository();

  return new GetPaymentController(userGetter, userDecoder, paymentGetter);
};
