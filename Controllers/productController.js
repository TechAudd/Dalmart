const supabase = require("../db");

exports.listProducts = async (req, res) => {
  const { data, error } = await supabase.from("product").select("*");
  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;

  const { data: product, error: productError } = await supabase
    .from("product")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (productError) return res.status(500).json({ productError });
  if (!product) return res.status(404).json({ message: "Product not found" });

  const { data: variants } = await supabase
    .from("variant")
    .select("*")
    .eq("product_id", id);

  res.json({ ...product, variants });
};

exports.getProductsByCategory = async (req, res) => {
  const { category_id } = req.params;
  try {
    const { data: products, error } = await supabase
      .from("product")
      .select("*")
      .eq("category_id", category_id);

    if (error) return res.status(500).json({ error });

    // Fetch variants for each product
    for (let product of products) {
      const { data: variants } = await supabase
        .from("variant")
        .select("*")
        .eq("product_id", product.id);
      product.variants = variants;
    }

    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// 🔍 Search products by name/description
exports.searchProducts = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Search query is required" });

  try {
    const { data, error } = await supabase
      .from("product")
      .select("*")
      .or(
        `name.ilike.%${q}%,description.ilike.%${q}%`
      ); // matches name OR description

    if (error) return res.status(500).json({ error });

    // Attach variants
    for (let product of data) {
      const { data: variants } = await supabase
        .from("variant")
        .select("*")
        .eq("product_id", product.id);
      product.variants = variants;
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error searching products" });
  }
};
