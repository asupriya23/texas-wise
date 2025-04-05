// server/mailing.js
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Subscriber Schema (must match the one in your main server file)
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

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Sample data for the newsletter
const newsletterData = {
  date: new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }),
  codeforces: {
    accuracy: 78.5,
    problems_solved: 5,
    contests_attempted: 3,
    rating_increase: 250,
    rating_histogram: {
      '1200': 1,
      '1500': 1,
      '2600': 1,
      '2900': 2
    }
  },
  codechef: {
    accuracy: 82.3,
    problems_solved: 12,
    contests_attempted: 2,
    rating_increase: 125
  },
  leetcode: {
    accuracy: 90.1,
    problems_solved: 45,
    contests_attempted: 4,
    rating_increase: 180
  }
};

// Function to send newsletter to all active subscribers
async function sendNewsletterToAllSubscribers() {
  try {
    // Get all active subscribers
    const activeSubscribers = await Subscriber.find({ active: true });
    
    if (activeSubscribers.length === 0) {
      console.log('No active subscribers found');
      mongoose.disconnect();
      return;
    }
    
    console.log(`Found ${activeSubscribers.length} active subscribers`);
    
    // Setup email options
    const mailOptions = {
      from: `"Competitive Programming Newsletter" <${process.env.EMAIL_USER}>`,
      subject: 'Your Monthly Competitive Programming Update',
      html: htmlContent,
      attachments: [
        {
          filename: 'codeforces_histogram.png',
          path: path.join(__dirname, './public/images/codeforces_histogram.png'),
          cid: 'codeforces_histogram'
        },
        {
          filename: 'codechef_histogram.png',
          path: path.join(__dirname, './public/images/codechef_histogram.png'),
          cid: 'codechef_histogram'
        },
        {
          filename: 'leetcode_histogram.png',
          path: path.join(__dirname, './public/images/leetcode_piechart.png'),
          cid: 'leetcode_histogram'
        }
      ]
    };
    
    // Send emails to all subscribers
    let successCount = 0;
    let failureCount = 0;
    
    for (const subscriber of activeSubscribers) {
      try {
        mailOptions.to = subscriber.email;
        await transporter.sendMail(mailOptions);
        console.log(`Newsletter sent successfully to ${subscriber.email}`);
        successCount++;
      } catch (error) {
        console.error(`Failed to send newsletter to ${subscriber.email}:`, error);
        failureCount++;
      }
    }
    
    console.log(`Newsletter sending complete. Success: ${successCount}, Failed: ${failureCount}`);
  } catch (error) {
    console.error('Error in sendNewsletterToAllSubscribers:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Create a simple HTML template file (newsletter-template.html)
const templateHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Competitive Programming Newsletter</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #4f46e5;
      margin-bottom: 5px;
    }
    .platform-section {
      margin-bottom: 30px;
      padding: 15px;
      border-radius: 8px;
    }
    .codeforces {
      background-color: #f0f4ff;
    }
    .codechef {
      background-color: #fff0f0;
    }
    .leetcode {
      background-color: #fffbf0;
    }
    .platform-section h2 {
      margin-top: 0;
      color: #4f46e5;
    }
    .metrics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 15px;
    }
    .metric {
      background: white;
      padding: 10px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .metric-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }
    .metric-value {
      font-size: 20px;
      font-weight: bold;
    }
    .positive {
      color: #16a34a;
    }
    .negative {
      color: #dc2626;
    }
    .histogram {
      margin-top: 15px;
    }
    .histogram img {
      max-width: 100%;
      border-radius: 6px;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      font-size: 14px;
      color: #666;
    }
    .unsubscribe {
      text-align: center;
      margin-top: 20px;
      font-size: 12px;
      color: #999;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Competitive Programming Newsletter</h1>
    <p>{{date}}</p>
  </div>
  
  <p>Here's your monthly summary of competitive programming progress across Codeforces, CodeChef, and LeetCode.</p>
  
  <!-- Codeforces Section -->
  <div class="platform-section codeforces">
    <h2>Codeforces</h2>
    <div class="metrics-grid">
      <div class="metric">
        <div class="metric-label">Accuracy</div>
        <div class="metric-value">{{codeforces.accuracy}}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Problems Solved</div>
        <div class="metric-value">{{codeforces.problems_solved}}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Contests Attempted</div>
        <div class="metric-value">{{codeforces.contests_attempted}}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Rating Increase</div>
        <div class="metric-value {{#if (gt codeforces.rating_increase 0)}}positive{{else}}negative{{/if}}">
          {{#if (gt codeforces.rating_increase 0)}}+{{/if}}{{codeforces.rating_increase}}
        </div>
      </div>
    </div>
    <div class="histogram">
      <h3>Problems by Rating</h3>
      <img src="cid:codeforces_histogram" alt="Codeforces problems by rating">
    </div>
  </div>
  
  <!-- CodeChef Section -->
  <div class="platform-section codechef">
    <h2>CodeChef</h2>
    <div class="metrics-grid">
      <div class="metric">
        <div class="metric-label">Accuracy</div>
        <div class="metric-value">{{codechef.accuracy}}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Problems Solved</div>
        <div class="metric-value">{{codechef.problems_solved}}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Contests Attempted</div>
        <div class="metric-value">{{codechef.contests_attempted}}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Rating Increase</div>
        <div class="metric-value {{#if (gt codechef.rating_increase 0)}}positive{{else}}negative{{/if}}">
          {{#if (gt codechef.rating_increase 0)}}+{{/if}}{{codechef.rating_increase}}
        </div>
      </div>
    </div>
    <div class="histogram">
      <h3>Problems by Rating</h3>
      <img src="cid:codechef_histogram" alt="CodeChef problems by rating">
    </div>
  </div>
  
  <!-- LeetCode Section -->
  <div class="platform-section leetcode">
    <h2>LeetCode</h2>
    <div class="metrics-grid">
      <div class="metric">
        <div class="metric-label">Accuracy</div>
        <div class="metric-value">{{leetcode.accuracy}}%</div>
      </div>
      <div class="metric">
        <div class="metric-label">Problems Solved</div>
        <div class="metric-value">{{leetcode.problems_solved}}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Contests Attempted</div>
        <div class="metric-value">{{leetcode.contests_attempted}}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Rating Increase</div>
        <div class="metric-value {{#if (gt leetcode.rating_increase 0)}}positive{{else}}negative{{/if}}">
          {{#if (gt leetcode.rating_increase 0)}}+{{/if}}{{leetcode.rating_increase}}
        </div>
      </div>
    </div>
    <div class="histogram">
      <h3>Problems by Rating</h3>
      <img src="cid:leetcode_histogram" alt="LeetCode problems by rating">
    </div>
  </div>
  
  <div class="footer">
    <p>Keep coding and improving! See you next month.</p>
  </div>
  
  <div class="unsubscribe">
    <p>To unsubscribe from this newsletter, please visit our website and update your preferences.</p>
  </div>
</body>
</html>
`;
// Write the template to a file
fs.writeFileSync(path.join(__dirname, 'newsletter-template.html'), templateHTML);

// Register handlebars helper for comparison
handlebars.registerHelper('gt', function(a, b) {
  return a > b;
});

// Read and compile the template
const templatePath = path.join(__dirname, 'newsletter-template.html');
const templateSource = fs.readFileSync(templatePath, 'utf8');
const template = handlebars.compile(templateSource);

// Generate HTML content with the data
const htmlContent = template(newsletterData);

// Fix the image CID in mailOptions attachments
// In the original code, the template uses "cid:leetcode_histogram" but the attachment uses "leetcode_piechart"
// Either update the HTML template or change the CID in the attachment configuration

// Execute the function
sendNewsletterToAllSubscribers();

