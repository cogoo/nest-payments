import { Controller, Module, Post, Body, Get, Param } from '@nestjs/common';
import { PaymentIntentsService } from './payment-intents.service';
import { PaymentIntentsDto } from './payment-intents.dto';
import { Stripe } from '../core/stripe/stripe.iterface';
import { PaymentIntentResponse } from './payment-intents.interface';

@Controller('payment_intents')
export class PaymentIntentsController {
  constructor(private readonly paymentIntentsService: PaymentIntentsService) {}

  @Post()
  async createPaymentIntents(
    @Body() paymentIntentDto: PaymentIntentsDto
  ): Promise<PaymentIntentResponse> {
    const paymentIntent = await this.paymentIntentsService.createPaymentsIntent(
      paymentIntentDto
    );

    return paymentIntent;
  }

  @Get(':id')
  async retrievePaymentIntents(
    @Param('id') paymentIntentID: string
  ): Promise<Stripe.PaymentIntents> {
    return this.paymentIntentsService.retrievePaymentIntents(paymentIntentID);
  }
}

@Module({
  controllers: [PaymentIntentsController],
  providers: [PaymentIntentsService],
})
export class PaymentIntentsModule {}
