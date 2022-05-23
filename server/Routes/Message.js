const express = require("express");
const MessageModel = require("../modules/Message");
const router = express.Router();
const cors = require("cors");
router.use(cors());

//Sending...
router.post("/send", async (req, res, next) => {
  const newMessage = new MessageModel(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/show/:conversationId", async (req, res, next) => {
  try {
    const message = await MessageModel.find({
      conversationId: req.params.conversationId,
    });
    /*  console.log('messages',req.params.conversationId)
         console.log(message) */
    res.status(200).json(message);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
