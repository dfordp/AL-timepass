import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import stripeConfig from './config/stripe.config';
import { ConfigModule } from '@nestjs/config';
import { StripeController } from './stripe/stripe.controller';
import { StripeService } from './stripe/stripe.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [stripeConfig],
    }),
  ],
  controllers: [AppController, StripeController],
  providers: [AppService, StripeService],
})
export class AppModule {}
