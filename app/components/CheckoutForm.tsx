'use client';

import { useState } from 'react';
import { Locale, siteContent } from '@/src/lib/siteContent';

export function CheckoutForm({ locale, selectedPlan }: { locale: Locale; selectedPlan?: string }) {
  const t = siteContent[locale];
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus('');

    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        locale,
        planId: form.get('planId'),
        email: form.get('email'),
        companyName: form.get('companyName'),
        note: form.get('note')
      })
    });

    const data = await response.json();
    setIsLoading(false);

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setStatus(data.error || t.checkout.missingStripe);
  }

  return (
    <form className="form-panel form-grid" onSubmit={submit}>
      <label>
        {t.checkout.name}
        <input name="companyName" required />
      </label>
      <label>
        {t.checkout.email}
        <input name="email" type="email" required />
      </label>
      <label>
        {t.checkout.plan}
        <select name="planId" defaultValue={selectedPlan || 'starter_setup'}>
          {t.plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} · {plan.price}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t.checkout.note}
        <textarea name="note" />
      </label>
      {status ? <div className="notice">{status}</div> : null}
      <button className="button primary" type="submit" disabled={isLoading}>
        {isLoading ? '...' : t.checkout.submit}
      </button>
    </form>
  );
}
