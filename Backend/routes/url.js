const express = require('express');
const urlController = require("../controller/url");
const auth = require('../middleware/auth');

const router = express.Router();

router.get("/get-user-urls", auth, urlController.getUserUrls)
router.post("/create-shorturl-id", auth, urlController.createShortUrlId);
router.post("/fetch", auth, urlController.fetchUrlByShortId);
router.delete("/delete/:id", auth, urlController.DeleteUrlByShortId);

module.exports = router;