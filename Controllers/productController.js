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
