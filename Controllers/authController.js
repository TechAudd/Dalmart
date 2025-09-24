const supabase = require("../db");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Utility: generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Utility: validate 10-digit phone number
function isValidPhone(phone) {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

// ✅ Request OTP
exports.requestOtp = async (req, res) => {
  const { phone } = req.body;

  if (!phone) return res.status(400).json({ message: "Phone number required" });
  if (!isValidPhone(phone))
    return res.status(400).json({ message: "Invalid phone number. Must be 10 digits." });

  try {
    const { data: user, error: userErr } = await supabase
      .from("user")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (userErr) throw userErr;
    if (!user) return res.status(404).json({ message: "User not registered" });

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60000).toISOString(); // always UTC

    await supabase.from("otp_requests").insert([
      { user_id: user.user_id, phone, otp, expires_at: expiresAt }
    ]);

    console.log(`Generated OTP: ${otp}, Expires At (UTC): ${expiresAt}`);

    // For now, instead of Fast2SMS (blocked by verification), just return OTP in response
    res.json({ message: "OTP generated successfully", otp, expiresAt });
  } catch (err) {
    console.error("Request OTP Error:", err.message);
    res.status(500).json({ message: "Error sending OTP" });
  }
};

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp)
    return res.status(400).json({ message: "Phone and OTP required" });
  if (!isValidPhone(phone))
    return res
      .status(400)
      .json({ message: "Invalid phone number. Must be 10 digits." });

  try {
    const { data: records, error } = await supabase
      .from("otp_requests")
      .select("*")
      .eq("phone", phone)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;

    const record = records?.[0];
    if (!record) return res.status(400).json({ message: "No OTP found" });

    /*console.log("DB Record:", record);
    console.log("Now (UTC):", new Date().toISOString());
    console.log("Expires At (UTC):", record.expires_at);*/

    if (record.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    //if (new Date(record.expires_at).getTime() < Date.now())
    //  return res.status(400).json({ message: "OTP expired" });

    // OTP is valid → delete it so it can't be reused
    //await supabase.from("otp_requests").delete().eq("id", record.id);

    const { data: user, error: userErr } = await supabase
      .from("user")
      .select("*")
      .eq("user_id", record.user_id)
      .maybeSingle();

    if (userErr) throw userErr;

    const token = jwt.sign(
      { user_id: user.user_id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "OTP verified", token, user });
  } catch (err) {
    console.error("Verify OTP Error:", err.message);
    res.status(500).json({ message: "Error verifying OTP" });
  }
};


// ========================
// 📌 Login with Password
// ========================
exports.loginWithPassword = async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password)
    return res.status(400).json({ message: "Phone and password required" });
  if (!isValidPhone(phone))
    return res
      .status(400)
      .json({ message: "Invalid phone number. Must be 10 digits." });

  try {
    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("phone", phone)
      .maybeSingle();

    if (error) return res.status(500).json({ message: error.message });
    if (!user) return res.status(404).json({ message: "User not registered" });

    if (!user.password_hash) {
      return res
        .status(400)
        .json({ message: "Password login not enabled. Try OTP login." });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
      { user_id: user.user_id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Error logging in" });
  }
};
