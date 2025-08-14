import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '400px',
    margin: '60px auto',
    padding: '32px 24px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    background: '#fafbfc',
    boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '18px',
    color: '#222',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#444',
    fontWeight: '500',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    marginBottom: '18px',
    border: '1px solid #bbb',
    borderRadius: '4px',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border 0.2s',
  },
  button: {
    width: '100%',
    padding: '10px 0',
    background: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  buttonDisabled: {
    background: '#90caf9',
    cursor: 'not-allowed',
  },
  message: {
    marginTop: '18px',
    textAlign: 'center',
    color: '#388e3c',
    fontWeight: '500',
  },
  error: {
    marginTop: '18px',
    textAlign: 'center',
    color: '#d32f2f',
    fontWeight: '500',
  }
};

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError('');
    setSubmitted(false);

    // Simulate API call
    try {
      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      // You can add email validation here if needed
      if (!email.match(/^[^@]+@[^@]+\.[^@]+$/)) {
        setError('Please enter a valid email address.');
        setSending(false);
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
    <div style={styles.container}>
      <div style={styles.title}>Forgot Password</div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="email" style={styles.label}>
          Enter your registered email address
        </label>
        <input
          id="email"
          type="email"
          style={styles.input}
          value={email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          disabled={sending || submitted}
        />
        <button
          type="submit"
          style={{
            ...styles.button,
            ...(sending || submitted ? styles.buttonDisabled : {})
          }}
          disabled={sending || submitted}
        >
          {sending ? 'Sending...' : submitted ? 'Email Sent' : 'Send Reset Link'}
        </button>
      </form>
      {submitted && (
        <div style={styles.message}>
          If an account with that email exists, a password reset link has been sent.
        </div>
      )}
      {error && <div style={styles.error}>{error}</div>}
    </div>
  );
};

export default ForgotPassword;