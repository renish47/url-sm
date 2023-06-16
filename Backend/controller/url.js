const Url = require("../model/url")
const User = require("../model/user")
const { nanoid } = require("nanoid")
const validUrl = require('valid-url');

exports.getUserUrls = async (req, res, next) => {
    const _id = req.userId;
    const userData = await User.findOne({ _id }).populate({ path: "urls", select: " originalUrl shortUrlId clicks createdAt" })
    res.status(200).json({
        message: "Urls fetched successfully",
        urls: userData.urls
    })
}

exports.createShortUrlId = async (req, res, next) => {
    let originalUrl = req.body.url;
    let userId = req.userId;

    try {
        const pastUrl = await Url.findOne({ userId, originalUrl })
        if (pastUrl) {
            const error = new Error("You've already created a short url for this Url");
            error.status = 400;
            throw error;
        }

        if (!(validUrl.isUri(originalUrl))) {
            const error = new Error("Invalid Original Url");
            error.status = 400;
            throw error;
        }

        let shortUrlId = nanoid(7);
        let url = new Url({
            originalUrl,
            userId,
            shortUrlId
        });

        url = await url.save()

        const userData = await User.findOne({ _id: userId })
        userData.urls.push(url._id)
        await User.findOneAndUpdate({ _id: userId }, { ...userData })

        res.status(201).json({
            message: "Short url id created successfully",
            shortUrlId
        })

    } catch (error) {
        next(error);
    }
}

exports.fetchUrlByShortId = async (req, res, next) => {
    const userId = req.userId;
    const shortUrlId = req.body.shortUrlId;

    try {
        const urlData = await Url.findOneAndUpdate({ userId, shortUrlId }, { $inc: { clicks: 1 } })
        if (!urlData) {
            const error = new Error("Invalid shortUrl ID");
            error.status = 400;
            throw error;
        }
        res.status(200).json({
            message: "original url fetched successfully",
            originalUrl: urlData.originalUrl
        })
    } catch (error) {
        next(error);
    }
}

exports.DeleteUrlByShortId = async (req, res, next) => {
    const urlId = req.params.id;
    const userId = req.userId;
    try {
        await Url.findByIdAndDelete(urlId)

        const userData = await User.findOne({ _id: userId })
        userData.urls = userData.urls.filter((url) => url != urlId)
        await User.findOneAndUpdate({ _id: userId }, { ...userData })

        res.status(200).json({
            message: "Url deleted successfully"
        })
    } catch (error) {
        next(error);
    }
}