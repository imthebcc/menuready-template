import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key === 'sk_test_placeholder') {
      throw new Error('Stripe not configured');
    }
    stripeInstance = new Stripe(key, {
      apiVersion: '2026-01-28.clover',
    });
  }
  return stripeInstance;
}

// Keep backward compatibility
export const stripe = {
  checkout: {
    sessions: {
      create: (params: Stripe.Checkout.SessionCreateParams) =>
        getStripe().checkout.sessions.create(params),
      retrieve: (id: string) =>
        getStripe().checkout.sessions.retrieve(id),
    },
  },
  webhooks: {
    constructEvent: (body: string | Buffer, sig: string, secret: string) =>
      getStripe().webhooks.constructEvent(body, sig, secret),
  },
};
