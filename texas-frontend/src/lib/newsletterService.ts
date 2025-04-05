// src/lib/newsletterService.ts
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const subscribeNewsletter = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/newsletter/subscribe`, { email });
    return response.data;
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    throw error;
  }
};

export const unsubscribeNewsletter = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/newsletter/unsubscribe`, { email });
    return response.data;
  } catch (error) {
    console.error('Error unsubscribing from newsletter:', error);
    throw error;
  }
};

export const updateNewsletterEmail = async (oldEmail: string, newEmail: string) => {
  try {
    const response = await axios.put(`${API_URL}/newsletter/update`, { oldEmail, newEmail });
    return response.data;
  } catch (error) {
    console.error('Error updating newsletter email:', error);
    throw error;
  }
};

export const getNewsletterStatus = async () => {
  try {
    // This would typically check local storage or cookies first
    // Then verify with the server if needed
    const storedEmail = localStorage.getItem('newsletter_email');
    if (storedEmail) {
      return { subscribed: true, email: storedEmail };
    }
    return { subscribed: false, email: null };
  } catch (error) {
    console.error('Error checking newsletter status:', error);
    return { subscribed: false, email: null };
  }
};
