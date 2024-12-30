// src/infra/payment/stripe-checkout-adapter.ts

import Stripe from 'stripe';
import config from '../../main/config/env';
import { PaymentAdder } from '../../presentation/protocols/payments/payment-adder';
import { AddPaymentModel } from '../../domain/usecases/payment/add-payment';
import { PaymentModel } from '../../domain/models/payment/payment';

export class StripeCheckoutAdapter implements PaymentAdder {
  private readonly stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(config.stripeKey, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  async add(payment: AddPaymentModel): Promise<PaymentModel> {
    const session = await this.stripe.checkout.sessions.create({
      line_items: payment.items.map(item => ({
        price_data: {
          currency: item.currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.amount,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: config.successUrl,
      cancel_url: config.cancelUrl,
    });

    return {
      id: session.id,
      amount: payment.amount,
      currency: payment.currency,
      clientSecret: session.url!,
      createdAt: new Date(),
    };
  }
}
