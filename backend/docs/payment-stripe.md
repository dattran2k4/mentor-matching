# Payment And Stripe Context

## Current Goal

The payment module supports Stripe Checkout for MVP payment testing.

## Current Payment Flow

```text
student creates booking
-> student requests payment for booking
-> backend validates booking belongs to payer and booking is PENDING
-> backend creates/reuses Payment
-> backend creates Stripe Checkout Session
-> backend stores checkoutUrl and providerReferenceId
-> frontend redirects user to checkoutUrl
-> Stripe sends webhook after payment
-> backend marks Payment as PAID
```

## Provider Field Mapping For Stripe

For Stripe Checkout:

- `providerReferenceId` = Stripe Checkout Session id, for example `cs_test_...`
- `providerTransactionId` = Stripe PaymentIntent id, for example `pi_...`
- `checkoutUrl` = hosted Stripe Checkout URL
- `expiresAt` = checkout session expiration time

## Current Application Pieces

Application/domain pieces:

- `Payment` domain behavior:
  - `attachCheckout(...)`
  - `markPaid(...)`
  - `markFailed(...)`
  - `cancel(...)`
- `CreatePaymentUseCase`
- `HandleStripeWebhookUseCase`
- `HandleStripeWebhookCommand`
- `PaymentRepositoryPort.findByProviderReferenceId(...)`
- `PaymentService.handleWebhookStripe(...)`

Infrastructure/presentation pieces:

- `PaymentCheckoutPort`
- `StripeCheckoutAdapter`
- `NoOpPaymentCheckoutAdapter` for test profile
- `StripeWebhookController`

## Webhook Direction

Recommended webhook flow:

```text
StripeWebhookController
-> receive raw payload and Stripe-Signature header
-> infrastructure Stripe handler verifies signature using app.stripe.webhook-secret
-> parse Stripe event
-> if checkout.session.completed:
   - get session.id
   - get session.paymentIntent
   - create HandleStripeWebhookCommand
   - call HandleStripeWebhookUseCase.handleWebhookStripe(...)
-> return 200 after successful processing
```

Application should not depend on Stripe SDK classes. Stripe SDK parsing belongs in infrastructure or presentation-adjacent infrastructure.

## Event Priority

Handle first:

```text
checkout.session.completed
```

Useful later:

```text
checkout.session.expired
payment_intent.payment_failed
charge.refunded
```

## Local Testing With Stripe CLI

Typical local command:

```bash
stripe listen --forward-to localhost:8080/api/v1/payments/stripe/webhook
```

Use the webhook secret printed by Stripe CLI as `STRIPE_WEBHOOK_SECRET` in local env.

Test card:

```text
4242 4242 4242 4242
```

Use any future expiry date, any CVC, and any name.
