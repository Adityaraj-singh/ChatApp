const express = require("express");
const ConversationModel = require("../modules/Conversation");

const router = express.Router();
const cors = require("cors");
router.use(cors());

router.post("/", async (req, res) => {
  const newConversation = new ConversationModel({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const conversations = await ConversationModel.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(conversations);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
