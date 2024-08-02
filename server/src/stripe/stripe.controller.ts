/* eslint-disable */
import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import {CreatePaymentIntentDto} from "../dto"

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}
  
    @Post('create-payment-intent')
    async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentDto) {
      const { amount } = createPaymentIntentDto;
      const paymentIntent = await this.stripeService.createPaymentIntent(amount);
      return { clientSecret: paymentIntent.client_secret };
    }
  
    @Post('webhook')
  async handleWebhook(@Req() request: Request) {
    const buf = await rawBody(request);
    const sig = request.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
      event = this.stripeService.stripe.webhooks.constructEvent(
        buf,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    await this.stripeService.handleWebhook(event);
  }
  }
