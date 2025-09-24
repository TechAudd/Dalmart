const supabase = require("../db");

exports.listAddresses = async (req, res) => {
  const user_id = req.user.user_id;
  const { data, error } = await supabase.from("address").select("*").eq("user_id", user_id);
  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.addAddress = async (req, res) => {
  const user_id = req.user.user_id;
  const address = req.body;

  const { data, error } = await supabase.from("address").insert([{ ...address, user_id }]);
  if (error) return res.status(500).json({ error });
  res.json(data[0]);
};
