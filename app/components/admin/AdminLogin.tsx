'use client';

import { useState } from 'react';

export function AdminLogin() {
  const [message, setMessage] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: form.get('password') })
    });
    const data = await response.json();
    if (data.ok) {
      window.location.reload();
      return;
    }
    setMessage(data.error || 'Login failed');
  }

  return (
    <main className="admin-login">
      <form className="form-panel form-grid" onSubmit={submit}>
        <h1>KirokuFlow Admin</h1>
        <p>Enter ADMIN_PASSWORD to access the content generator MVP.</p>
        <label>
          Password
          <input name="password" type="password" required />
        </label>
        {message ? <div className="notice">{message}</div> : null}
        <button className="button primary" type="submit">
          Login
        </button>
      </form>
    </main>
  );
}
