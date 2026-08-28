const express = require('express');
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const router = express.Router();

// POST /api/messages - PUBLIC. The "text me" contact form on the site.
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: 'All fields required' });

    const saved = await Message.create({ name, email, message });

    // Optional: email notification (skipped silently if SMTP env vars aren't set)
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
          subject: `New portfolio message from ${name}`,
          text: `From: ${name} (${email})\n\n${message}`,
        });
      } catch (mailErr) {
        console.error('Email notify failed (message still saved):', mailErr.message);
      }
    }

    res.status(201).json({ message: 'Sent!', id: saved._id });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/messages - PROTECTED. Dashboard inbox.
router.get('/', auth, async (req, res) => {
  const messages = await Message.find({}).sort({ createdAt: -1 });
  res.json(messages);
});

// PATCH /api/messages/:id/read - PROTECTED. Mark as read.
router.patch('/:id/read', auth, async (req, res) => {
  const msg = await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  res.json(msg);
});

// DELETE /api/messages/:id - PROTECTED.
router.delete('/:id', auth, async (req, res) => {
  await Message.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
});

module.exports = router;
