const Auth = require('../models/user')
const Token = require('../models/resetToken')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { createTransport } = require('nodemailer')
const randomString = require('randomstring')
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, password, email } = req.body;
        const found = await Auth.findOne({ email })
        if (found) {
            res.status(400).json({ message: 'A user with this email already exist!' });
        } else {
            const hash = await bcrypt.hash(password, 10);
            const code = Math.floor(Math.random() * 903192) + 100000
            await Auth.create({
                firstName,
                lastName,
                email,
                password: hash,
                confirmationCode: code
            });
            const transporter = createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
            await transporter.sendMail({
                from: '"Aymen Boauzra" <aymenbouazra994@gmail.com>',
                to: "aymenbouazra994@gmail.com",
                subject: "Account created ✔",
                html: `
        <b>Your account was created successfully, please verify your account</b>
        <p>Verification code: <h2><strong>${code}</strong></h2></p>
        `,
            });
            res.send({ message: 'You have been registered successfully!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error server' })
    }
}

exports.login = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await Auth.findOne({ email });
        if (user) {
            if (user.confirmed) {
                const validPassword = bcrypt.compareSync(password, user.password)
                if (validPassword) {
                    const token = await jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
                    res.send({ token, message: 'Welcome to dashboard ' + user.nom + ' ' + user.prenom });
                }
                else {
                    res.status(400).json({ message: 'Email or password incorrect!' });
                }
            } else {
                res.status(400).json({ message: 'Please check your mailbox to verify your account!' });
            }
        } else {
            res.status(400).json({ message: 'Email or password incorrect' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Error server' })
    }
}

exports.confirmAccount = async (req, res) => {
    try {
        const { confirmationCode, email } = req.body;
        const user = await Auth.findOne({ email });
        if (user) {
            if (user.confirmationCode !== confirmationCode) {
                res.status(400).json({
                    message: 'Incorrect code, please enter the code provided in the email!'
                });
            }
            await Auth.findByIdAndUpdate(user._id, { confirmed: true }, { new: true });
            const transporter = createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            await transporter.sendMail({
                from: '"Aymen Boauzra" <aymenbouazra994@gmail.com>',
                to: email,
                subject: "Account confirmed ✔",
                html: `
        <b>Account confirmed successfully</b>
        `,
            });
            res.status(200).json({ message: 'Account confirmed!' })
        } else {
            res.status(500).json({ message: error.message || 'Internal server error!' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error!' })
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Auth.findOne({ email });
        if (user) {
            const resetToken = randomString.generate(30)
            await Token.create({
                resetToken: resetToken,
                userId: user._id
            });
            const transporter = createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });

            await transporter.sendMail({
                from: `"Aymen Boauzra" ${process.env.EMAIL}`,
                to: email,
                subject: "Account confirmation ✔",
                html: ` 
            <h2>Reset password</h2><br>
            <a href='${process.env.HOST}reset-password/${resetToken}'>Reset password link</a>
            <b style='color:red'>This link will expire after 15 minutes </b>
            `,
            });
            res.json({ message: 'Please check your mailbox to reset your account\'s password!' })
        } else {
            res.status(400).json({ message: 'Cannot find any user wih this email, try again with an existing e-mail account!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error!' })
    }
}

exports.resendCode = async (req, res) => {
    try {
        const { email } = req.body;
        const code = Math.floor(Math.random() * 903192)
        await Auth.findByIdAndUpdate(user._id, { confirmationCode: code }, { new: true });
        const transporter = createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        await transporter.sendMail({
            from: '"Aymen Boauzra" <aymenbouazra994@gmail.com>',
            to: email,
            subject: "Account confirmation ✔",
            html: ` 
          <b>Account confirmation code</b><br>
          <h2><strong>${code}</strong></h2>
        `,
        });
        res.json({ message: 'Confirmation code resent, please check your mailbox to verify your account!' })
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error!' })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const tokenFound = await Token.findOne({ resetToken: req.params.token });
        if (tokenFound) {
            const user = await Auth.findById(tokenFound.userId);
            if (user) {
                const hash = await bcrypt.hash(password, 10);
                await Auth.findByIdAndUpdate(tokenFound.userId, { password: hash }, { new: true });
                const transporter = createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                });

                await transporter.sendMail({
                    from: `"Aymen Boauzra" ${process.env.EMAIL}`,
                    to: user.email,
                    subject: "Account confirmation ✔",
                    html: ` 
            <b>Your password has been reset successfully</b><br>
          `,
                });
                res.send({ message: 'Password has been reset!' })
            } else {
                res.status(400).json({ message: 'Password reset link expired or invalid, create a new password reset!' });
            }
        } else {
            res.status(400).json({ message: 'Password reset link expired or invalid, create a new password reset!' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || 'Internal server error!' })
    }
}



exports.logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.json({ message: "Disconnected successfully." })
    });
};