// src/presentation/controllers/payment/add-payment.ts

import { HttpRequest, HttpResponse } from '../../protocols/http';
import { UserDecoder } from '../../protocols/user/user-decoder';
import { UserGetter } from '../../protocols/user/user-getter';
import { badRequest, ok, serverError } from '../../helpers/http-helpers';
import { MissingParamError } from '../../errors/missing-param-error';
import { UserNotFoundError } from '../../errors/user-not-found-error';
import { PaymentAdder } from '../../protocols/payments/payment-adder';

export class AddPaymentController {
  constructor(
    private readonly userDecoder: UserDecoder,
    private readonly userGetter: UserGetter,
    private readonly paymentAdder: PaymentAdder
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { amount, currency, items } = httpRequest.body;

      if (!httpRequest.headers) {
        return badRequest(new MissingParamError('access-token'));
      }

      const accessToken = httpRequest.headers['access-token'];
      if (!accessToken) {
        return badRequest(new MissingParamError('access-token'));
      }

      console.log('Access Token:', accessToken);

      if (!amount || typeof amount !== 'number' || amount <= 0) {
        return badRequest(new MissingParamError('amount must be a positive number'));
      }

      if (!currency || typeof currency !== 'string') {
        return badRequest(new MissingParamError('currency must be a string'));
      }

      if (!items || !Array.isArray(items) || items.length === 0) {
        return badRequest(new MissingParamError('items must be a non-empty array'));
      }

      const userId = this.userDecoder.decode(accessToken);
      console.log('Decoded UserId:', userId);
      const user = await this.userGetter.getByEmail(userId);
      console.log('Retrieved User:', user);

      if (!user) {
        return badRequest(new UserNotFoundError());
      }

      const payment = await this.paymentAdder.add({
        amount,
        currency,
        items,
      });

      console.log('Payment Created:', payment);

      return ok(payment);
    } catch (error) {
      console.error('Error in AddPaymentController:', error);
      return serverError(error);
    }
  }
}
