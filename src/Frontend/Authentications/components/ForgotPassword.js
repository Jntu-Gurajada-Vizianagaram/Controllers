import axios from 'axios';
import React, { useMemo, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import APIs from '../../Main/apis_data/APIs';
import '../css/Login.css';

const ForgotPassword = () => {
  const location = useLocation();
  const token = useMemo(() => new URLSearchParams(location.search).get('token') || '', [location.search]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [devResetLink, setDevResetLink] = useState('');
  const [error, setError] = useState('');

  const requestReset = async () => {
    if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
      setError('Please enter a valid email address.');
      return;
    }

    const response = await axios.post(APIs.admin_apis.password_reset_request, { email });
    setSubmitted(true);
    setMessage(response.data?.message || 'If the email exists, a reset link will be sent.');
    setDevResetLink(response.data?.reset_link || '');
  };

  const confirmReset = async () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const response = await axios.post(APIs.admin_apis.password_reset_confirm, {
      token,
      password,
    });
    setSubmitted(true);
    setMessage(response.data?.message || 'Password updated successfully.');
    setPassword('');
    setConfirmPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setError('');
    setMessage('');
    setDevResetLink('');

    try {
      if (token) {
        await confirmReset();
      } else {
        await requestReset();
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Something went wrong. Please try again.',
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="admin-login-main">
      <section className="password-reset-card">
        <p className="login-eyebrow">Account Recovery</p>
        <h1>{token ? 'Set New Password' : 'Forgot Password'}</h1>
        <p>
          {token
            ? 'Enter a new password for your approved JNTU-GV Admin Console account.'
            : 'Enter your registered admin email address. If it is approved for console access, reset instructions will be sent after verification.'}
        </p>

        <form onSubmit={handleSubmit} autoComplete="off" className="password-reset-form">
          {token ? (
            <>
              <div className="form-group">
                <label htmlFor="password">New password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError('');
                  }}
                  placeholder="Enter at least 8 characters"
                  required
                  disabled={sending || submitted}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setError('');
                  }}
                  placeholder="Re-enter your password"
                  required
                  disabled={sending || submitted}
                />
              </div>
            </>
          ) : (
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
          )}

          <button className="btn-admin-login" type="submit" disabled={sending || submitted}>
            {sending
              ? 'Processing...'
              : submitted
                ? token ? 'Password Updated' : 'Email Sent'
                : token ? 'Update Password' : 'Send Reset Link'}
          </button>
        </form>

        {message && <div className="login-alert login-alert-success">{message}</div>}
        {devResetLink && (
          <a className="forgot-password" href={devResetLink}>
            Open local reset link
          </a>
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
