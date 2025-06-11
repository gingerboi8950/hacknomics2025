import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Step 1: Redirect user to Google
router.get('/google', (req, res) => {
  const redirectUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&scope=openid%20email%20profile`;
  res.redirect(redirectUrl);
});

// Step 2: Handle callback and exchange code
router.get('/google/callback', async (req, res) => {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token } = tokenRes.data;

    const userRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const user = userRes.data; // contains name, email, picture, etc.

    // Here you'd create a session or JWT
    console.log('Authenticated user:', user);

    // For now, just redirect to frontend
    res.redirect('http://localhost:3001/dashboard');
  } catch (err) {
    console.error('OAuth error:', err.response?.data || err.message);
    res.status(500).send('Authentication failed');
  }
});

export default router;
