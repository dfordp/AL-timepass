/* eslint-disable */

import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import stripeConfig from '../config/stripe.config';
import Stripe from 'stripe';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(
        @Inject(stripeConfig.KEY) config: ConfigType<typeof stripeConfig>,
        private readonly redisService: RedisService
      ) {
        this.stripe = new Stripe(config.secretKey, { apiVersion: '2024-06-20' });
      }

      async createPaymentIntent(amount: number) {
        return await this.stripe.paymentIntents.create({
          amount,
          currency: 'usd',
        });
      }

      async handleWebhook(event: Stripe.Event) {
        let paymentData;
        switch (event.type) {
          case 'payment_intent.succeeded':
            paymentData = event.data.object as Stripe.PaymentIntent;
            await this.redisService.setValuePair(`paymentIntent:${paymentData.id}`, {
              ...paymentData,
              status: 'succeeded',
            });
            console.log('PaymentIntent succeeded:', paymentData);
            break;
          case 'payment_intent.payment_failed':
            paymentData = event.data.object as Stripe.PaymentIntent;
            await this.redisService.setValuePair(`paymentIntent:${paymentData.id}`, {
              ...paymentData,
              status: 'failed',
            });
            console.log('PaymentIntent failed:', paymentData);
            break;
          // Handle other events if necessary
          default:
            console.warn(`Unhandled event type ${event.type}`);
        }
      }
}
