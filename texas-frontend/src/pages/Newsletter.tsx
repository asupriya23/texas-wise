// src/pages/Newsletter.tsx
import { useState, useEffect } from 'react';
import { getNewsletterStatus, subscribeNewsletter, unsubscribeNewsletter, updateNewsletterEmail } from '../lib/newsletterService';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is already subscribed
    const checkSubscriptionStatus = async () => {
      const status = await getNewsletterStatus();
      if (status.subscribed) {
        setIsSubscribed(true);
        setSubscribedEmail(status.email);
      }
    };
    
    checkSubscriptionStatus();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      await subscribeNewsletter(email);
      setIsSubscribed(true);
      setSubscribedEmail(email);
      setEmail('');
      setMessage('Successfully subscribed to the newsletter!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      await unsubscribeNewsletter(subscribedEmail);
      setIsSubscribed(false);
      setSubscribedEmail('');
      setMessage('Successfully unsubscribed from the newsletter');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    if (!newEmail || !/^\S+@\S+\.\S+$/.test(newEmail)) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      await updateNewsletterEmail(subscribedEmail, newEmail);
      setSubscribedEmail(newEmail);
      setNewEmail('');
      setIsChangingEmail(false);
      setMessage('Email updated successfully!');
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Monthly Newsletter</h1>
      <p className="mb-6 text-gray-600">
        Stay updated with the latest news, tips, and exclusive content delivered directly to your inbox.
      </p>

      {message && (
        <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
          {message}
        </div>
      )}

      {!isSubscribed ? (
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="your@email.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Subscribe to Newsletter
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Currently subscribed with:</p>
            <p className="font-medium">{subscribedEmail}</p>
          </div>

          {isChangingEmail ? (
            <form onSubmit={handleChangeEmail} className="space-y-3">
              <div>
                <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
                  New Email Address
                </label>
                <input
                  type="email"
                  id="newEmail"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update Email
                </button>
                <button
                  type="button"
                  onClick={() => setIsChangingEmail(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsChangingEmail(true)}
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Change Email
              </button>
              <button
                onClick={handleUnsubscribe}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Unsubscribe
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
