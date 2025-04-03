const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Login
async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Utilisateur non trouvé');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send('Mot de passe incorrect');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
}

// Register
async function registerUser(req, res) {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Utilisateur déjà existant');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });

  await newUser.save();
  res.status(201).send('Utilisateur créé');
}

// Forgot password
async function forgotPassword(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Utilisateur non trouvé');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 heure d'expiration
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const resetUrl = `http://localhost:4200/reset-password/${resetToken}`;

  const mailOptions = {
    to: user.email,
    from: process.env.EMAIL_USER,
    subject: 'Réinitialisation du mot de passe',
    text: `Cliquez sur ce lien pour réinitialiser votre mot de passe: ${resetUrl}`
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) {
      console.error('Erreur d\'envoi d\'email', err);
      return res.status(500).send('Erreur d\'envoi d\'email');
    }
    res.send('Un email de réinitialisation a été envoyé');
  });
}

module.exports = { loginUser, registerUser, forgotPassword };
