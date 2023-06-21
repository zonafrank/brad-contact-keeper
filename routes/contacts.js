const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

// @route GET /api/contacts
// @desc Get all user's contacts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route POST /api/contacts
// @desc Get new contacts
// @access Private
router.post(
  "/",
  auth,
  body("name").trim().notEmpty().withMessage("name is required"),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const contact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const savedContact = await contact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route PUT /api/contacts/:id
// @desc Update contact
// @access Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

// @route DELETE /api/contacts/:id
// @desc Delete contact
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    contact = await Contact.findByIdAndRemove(req.params.id);
    res.json({ message: "Contact removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
