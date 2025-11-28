/**
 * REAL WHATSAPP BOT SERVER - Koddz Empire
 * 
 * This file is for your BACKEND server (e.g., Heroku, Render, Railway).
 * It will not run in the browser.
 * 
 * Dependencies needed: npm install express body-parser @google/genai dotenv
 */

import express from 'express';
import bodyParser from 'body-parser';
import { GoogleGenAI } from '@google/genai';

// --- CONFIGURATION ---
const app = express();
app.use(bodyParser.json());

// Load from environment variables (Set these in your cloud host)
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY; // Gemini API Key
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN; // Meta Cloud API Access Token
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'koddz_verify_token'; // Custom token you set in Meta App Dashboard

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: API_KEY });

// System Instruction
const SYSTEM_INSTRUCTION = `
You are "Koddz Assistant", the AI Sales Rep for Koddz Empire.
Services: AI Chatbots, Websites, Video Ads, FB Ads, Lead Automation.
Goal: Qualify leads and get them to hire Koddz Empire.
Tone: Professional, concise, using emojis.
Contact: +2348089498920.
Constraint: Keep answers short (under 50 words) suitable for WhatsApp.
`;

// --- ROUTES ---

// 1. Health Check & Root
app.get('/', (req, res) => {
  res.send('✅ Koddz Empire Bot is Running! The Webhook URL is /webhook');
});

// 2. META WEBHOOK VERIFICATION (GET)
// This is what you need to pass the "Verify and Save" step in the Meta Dashboard.
app.get('/webhook', (req, res) => {
  console.log("Incoming Webhook Verification Request...");
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ WEBHOOK_VERIFIED');
      // Respond with the challenge token from the request
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      console.error('❌ Verification failed. Token mismatch.');
      res.sendStatus(403);
    }
  } else {
    res.sendStatus(400);
  }
});

// 3. RECEIVE MESSAGES (POST)
// This is where incoming WhatsApp messages arrive.
app.post('/webhook', async (req, res) => {
  const body = req.body;

  console.log('Incoming Webhook Event:', JSON.stringify(body, null, 2));

  // Check if this is an event from a WhatsApp page subscription
  if (body.object) {
    if (
      body.entry &&
      body.entry[0].changes &&
      body.entry[0].changes[0].value.messages &&
      body.entry[0].changes[0].value.messages[0]
    ) {
      const entry = body.entry[0].changes[0].value;
      const messageObj = entry.messages[0];
      const phoneNumberId = entry.metadata.phone_number_id;
      const from = messageObj.from; // The user's phone number
      const messageBody = messageObj.text?.body;

      if (messageBody) {
        console.log(`📩 Message from ${from}: ${messageBody}`);
        
        // Acknowledge receipt immediately to avoid timeouts
        // res.sendStatus(200); // Moved to end of function, but okay to send early if processing is slow.

        try {
          // 1. Mark message as read (Optional UX improvement)
          // await markAsRead(phoneNumberId, messageObj.id);

          // 2. Get AI Response
          const aiResponse = await getGeminiResponse(messageBody);
          
          // 3. Send Response back to WhatsApp
          console.log(`🤖 Sending reply: ${aiResponse}`);
          await sendWhatsAppMessage(phoneNumberId, from, aiResponse);
        } catch (error) {
          console.error('Error processing message flow:', error);
        }
      }
    }
    // Return a '200 OK' response to all requests
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }
});

// --- HELPER FUNCTIONS ---

async function getGeminiResponse(userMessage) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 150, 
      },
    });
    return response.text;
  } catch (err) {
    console.error('Gemini API Error:', err);
    return "I'm having a little trouble connecting right now. Please message our admin directly at +2348089498920.";
  }
}

async function sendWhatsAppMessage(phoneId, to, text) {
  const url = `https://graph.facebook.com/v17.0/${phoneId}/messages`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: to,
        type: 'text',
        text: { body: text },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('WhatsApp API Error:', JSON.stringify(errorData, null, 2));
    }
  } catch (err) {
    console.error('Network Error sending message:', err);
  }
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Webhook Endpoint: /webhook`);
});
