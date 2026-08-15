import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import '../css/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setError('');
    setSubmitted(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        setError('Please enter a valid email address.');
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="admin-login-main">
      <section className="password-reset-card">
        <p className="login-eyebrow">Account Recovery</p>
        <h1>Forgot Password</h1>
        <p>
          Enter your registered admin email address. If it is approved for console access,
          reset instructions will be sent after verification.
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="password-reset-form">
          <div className="form-group">
            <label htmlFor="email">Registered email address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError('');
              }}
              placeholder="you@jntugv.edu.in"
              required
              disabled={sending || submitted}
            />
          </div>
          <button className="btn-admin-login" type="submit" disabled={sending || submitted}>
            {sending ? 'Sending...' : submitted ? 'Email Sent' : 'Send Reset Link'}
          </button>
        </form>

        {submitted && (
          <div className="login-alert login-alert-success">
            If an account with that email exists, a password reset link has been sent.
          </div>
        )}
        {error && <div className="login-alert login-alert-error">{error}</div>}

        <RouterLink to="/login" className="forgot-password">
          Back to Login
        </RouterLink>
      </section>
    </main>
  );
};

export default ForgotPassword;
