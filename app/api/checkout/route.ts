import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const PLANS: Record<string, { name: string; price: number; currency: string }> = {
  starter_setup: { name: 'KirokuFlow Starter Setup', price: 98000, currency: 'jpy' },
  committee_pack: { name: 'KirokuFlow Committee Pack', price: 198000, currency: 'jpy' },
  annual_admin_flow: { name: 'KirokuFlow Annual Admin Flow', price: 480000, currency: 'jpy' }
};

let stripeClient: Stripe | null = null;

function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) return null;
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const plan = PLANS[body.planId];
  const locale = body.locale === 'ja-JP' ? 'ja-JP' : 'zh-TW';
  const stripe = getStripe();

  if (!plan) {
    return NextResponse.json({ error: 'Invalid planId' }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({ error: locale === 'ja-JP' ? 'STRIPE_SECRET_KEY が未設定です。' : '尚未設定 STRIPE_SECRET_KEY。' }, { status: 503 });
  }

  const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL;
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: locale === 'ja-JP' ? 'ja' : 'zh',
    customer_email: body.email,
    line_items: [
      {
        price_data: {
          currency: plan.currency,
          product_data: { name: plan.name },
          unit_amount: plan.price
        },
        quantity: 1
      }
    ],
    metadata: {
      planId: body.planId,
      locale,
      companyName: body.companyName || ''
    },
    success_url: `${origin}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${locale}/pricing?checkout=cancelled`
  });

  return NextResponse.json({ url: session.url });
}
