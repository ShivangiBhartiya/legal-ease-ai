import Waitlist from "../models/Waitlist.js";

export const joinWaitlist = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email, and phone are required." });
    }

    // Check if email already exists
    const existing = await Waitlist.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(409).json({ message: "This email is already on the waitlist!" });
    }

    const entry = new Waitlist({ name, email, phone });
    await entry.save();

    return res.status(201).json({ message: "You've been added to the waitlist!", data: entry });
  } catch (error) {
    console.error("Waitlist error:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
