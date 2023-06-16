const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sgMail = require('@sendgrid/mail')


const User = require("../model/user");

// const baseUrl = "http://localhost:5173"
const baseUrl = "https://url-sm.netlify.app"

async function sendOtpMail(user) {

    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: user.email,
            from: 'urlsm.official@gmail.com',
            subject: 'Email Verification',
            html: `
        <div style="max-width: 600px; margin: 0px auto; padding: 20px; background-color: #f7f7f7; text-align: left; color: #000000; border-radius: 10px;">
        <h1><span style="color: rgb(10, 23, 78); font-size: 18pt;">OTP Verification for Email</span></h1>
        <p>Dear ${user.name},</p>
        <p>Thank you for creating an account with URL-SM. To complete the registration process, please enter the following One-Time Password (OTP) in the verification form:</p>
        <div class="otp-container">
        <h2 id="otp" class="otp" style="text-align: center;"><span style="color: rgb(10, 23, 78); font-size: 24pt;">${user.otp}</span></h2>
        </div>
        <p>Please note that this OTP is valid for a limited time and can only be used once. If you didn't request this&nbsp;</p>
        <p>verification,&nbsp;you can safely ignore this email.</p>
        <p>&nbsp;</p>
        <p>Thank you,<span style="color: rgb(10, 23, 78);"> </span></p>
        <p><span style="color: rgb(10, 23, 78);">URL-SM Team</span></p>
        </div>
        `,
        }
        await sgMail.send(msg)

    } catch (error) {
        throw error
    }
}

async function sendResetPassswordLink(user) {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: user.email,
            from: 'urlsm.official@gmail.com',
            subject: 'Reset Password',
            html: `
        <div style="max-width: 600px; margin: 0px auto; padding: 20px; background-color: #f7f7f7; border-radius: 10px;">
        <h2 style="color: rgb(10, 23, 78); margin-bottom: 20px;">Reset Password</h2>
        <p style="margin-bottom: 10px; color: #000000;">Dear ${user.name},</p>
        <p style="margin-bottom: 10px; color: #000000;">We received a request to reset your password. To proceed with the password reset, please click the button below:</p>
        <p style="margin-bottom: 10px;">&nbsp;</p>
        <p style="text-align: center;"><a style="display: inline-block; padding: 10px 20px; background-color: #0a174e; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; transition: background-color 0.3s ease; cursor: pointer;" href=${user.resetLink} target="_blank" rel="noopener">Reset Password</a></p>
        <p style="text-align: center;">&nbsp;</p>
        <p style="margin-bottom: 10px; color: #000000;">If the Reset Pasword Button doesn't work, copy the link below and paste it in the browser to get redirected to reset password page:</p>
        <p style="margin-bottom: 10px;">${user.resetLink}</p>
        <p style="margin-bottom: 10px;">&nbsp;</p>
        <p style="margin-bottom: 10px; color: #000000;">Best regards,</p>
        <p style="margin-bottom: 0px; color: #000000;">url-sm</p>
        </div>
        `,
        }
        await sgMail.send(msg)

    } catch (error) {
        throw error
    }
}

function generateRandomNumber() {
    var minm = 100000;
    var maxm = 999999;
    return Number(Math.floor(Math
        .random() * (maxm - minm + 1)) + minm);
}

exports.createUser = async (req, res, next) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let unhashedPassword = req.body.password;
    const otp = generateRandomNumber()

    try {
        const pastUser = await User.findOne({ email });
        if (pastUser && pastUser.isActivated === true) {
            const error = new Error("User with this email already exists");
            error.status = 403
            throw error
        }

        let newUser;
        let hashedPassword = await bcrypt.hash(unhashedPassword, 10);
        if (pastUser) {
            await User.updateOne({ _id: pastUser._id }, {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                otp
            })
        }
        else {
            newUser = new User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                otp
            })
            await newUser.save()
        }

        const response = await sendOtpMail({ name: firstName, email, otp })
        res.status(201).json({
            message: "User created Successfully"
        })
    } catch (error) {
        next(error);
    }
}

exports.getUser = async (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            const error = new Error("No user found with this Email Address")
            error.status = 404;
            throw error;
        }

        let isCorrectPassword = await bcrypt.compare(password, userData.password);
        if (!isCorrectPassword) {
            const error = new Error("Wrong Password");
            error.status = 401;
            throw error
        }

        const token = jwt.sign(
            {
                userEmail: email,
                userId: userData._id
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1h" }
        )
        res.status(200).json({
            message: "Logged in Successfully",
            token
        })

    } catch (error) {
        next(error);
    }
}

exports.resendOtp = async (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const otp = generateRandomNumber()

    try {
        const response = await sendEmail({ name, email, otp }, "template_addvp4m")
        if (response.status !== 200) {
            const error = new Error(response.text)
            error.status = response.status;
            throw error
        }

        await User.updateOne({ email }, { $set: { otp } })
        res.status(200).json({
            message: "OTP sent Successfully"
        })

    } catch (error) {
        next(error)
    }
}


exports.checkOtp = async (req, res, next) => {
    const email = req.body.email
    const otp = Number(req.body.otp)
    try {
        const userData = await User.findOne({ email });
        if (userData.otp !== otp) {
            const error = new Error("Wrong OTP");
            error.status = 400
            throw error
        }
        userData.otp = null;
        userData.isActivated = true;

        await User.findByIdAndUpdate({ _id: userData._id }, { ...userData });
        res.status(200).json({
            message: "Email Verified Successfully"
        })

    } catch (error) {
        next(error);
    }
}

exports.checkUserToken = (req, res, next) => {
    res.status(200).json({ message: "User Authenticated" });
}

exports.sendResetPasswordMail = async (req, res, next) => {
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            const error = new Error("No user found with this Email Address")
            error.status = 404;
            throw error;
        }

        let resetID = generateRandomNumber()

        let resetLink = `${baseUrl}/reset-password/${String(userData._id)}-${resetID}`
        userData.isResetPasswordEnabled = true;
        userData.resetId = resetID;
        await User.findOneAndUpdate({ email }, { ...userData })
        await sendResetPassswordLink({ email, resetLink, name: userData.firstName })
        res.status(200).json({ message: "reset link sent" })


    } catch (error) {
        next(error);
    }
}

exports.resetPassword = async (req, res, next) => {
    if (req.body.userId.includes("-")) {
        let _id = req.body.userId.split("-")[0];
        let password = req.body.password;

        try {
            const userData = await User.findOne({ _id })
            let hashedPassword = await bcrypt.hash(password, 10);
            userData.password = hashedPassword
            userData.isResetPasswordEnabled = false;
            userData.resetId = null;
            await User.findOneAndUpdate({ _id }, { ...userData })
            res.status(200).json({ message: "Password Changed Successfully" })

        } catch (error) {
            next(error);
        }
    }
}

exports.checkUrlValidity = async (req, res, next) => {
    if (req.body.userId.includes("-")) {
        let _id = req.body.userId.split("-")[0];
        let resetId = req.body.userId.split("-")[1];

        try {
            const userData = await User.findOne({ _id })
            if (!(userData.isResetPasswordEnabled) || userData.resetID === resetId) {
                const error = new Error("Link Expired")
                error.status = 498;
                throw error;
            }
            res.status(200).json({ message: "link hasn't expired" })

        } catch (error) {
            next(error);
        }
    }
}




