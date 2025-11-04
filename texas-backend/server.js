// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

// Create Newsletter Subscriber Schema
const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// API Routes
app.post('/api/newsletter/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    let subscriber = await Subscriber.findOne({ email });
    
    if (subscriber) {
      // If subscriber exists but is inactive, reactivate
      if (!subscriber.active) {
        subscriber.active = true;
        await subscriber.save();
        return res.status(200).json({ message: 'Subscription reactivated successfully' });
      }
      return res.status(400).json({ message: 'Email already subscribed' });
    }
    
    // Create new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();
    
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/newsletter/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find and update subscriber (soft delete by setting active to false)
    const result = await Subscriber.findOneAndUpdate(
      { email },
      { active: false },
      { new: true }
    );
    
    if (!result) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    
    res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/newsletter/update', async (req, res) => {
  try {
    const { oldEmail, newEmail } = req.body;
    
    // Check if new email already exists
    const existingSubscriber = await Subscriber.findOne({ email: newEmail });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'New email already subscribed' });
    }
    
    // Find and update subscriber
    const result = await Subscriber.findOneAndUpdate(
      { email: oldEmail },
      { email: newEmail },
      { new: true }
    );
    
    if (!result) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }
    
    res.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Update email error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
