const supabase = require("../db");

// List all categories
exports.listCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .order("id", { ascending: true });

    if (error) return res.status(500).json({ error });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Get a single category by id
exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) return res.status(500).json({ error });
    if (!data) return res.status(404).json({ message: "Category not found" });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching category" });
  }
};

// 🔍 Search categories by name
exports.searchCategories = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Search query is required" });

  try {
    const { data, error } = await supabase
      .from("category")
      .select("*")
      .ilike("name", `%${q}%`); // case-insensitive

    if (error) return res.status(500).json({ error });

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error searching categories" });
  }
};
