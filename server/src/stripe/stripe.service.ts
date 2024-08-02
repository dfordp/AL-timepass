/* eslint-disable */

import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import stripeConfig from '../config/stripe.config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(
        @Inject(stripeConfig.KEY) config: ConfigType<typeof stripeConfig>,
      ) {
        this.stripe = new Stripe(config.secretKey, { apiVersion: '2024-06-20' });
      }

      async createPaymentIntent(amount: number) {
        return await this.stripe.paymentIntents.create({
          amount,
          currency: 'usd',
        });
      }
}
