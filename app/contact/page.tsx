"use client";

import { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Handle form submission logic (e.g., send an API request)
    setSubmitted(true);

    // Clear form after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      {submitted ? (
        <p className="text-green-600">Thank you! Your message has been sent.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
};

export default Contact;
