const supabase = require("../db");

exports.listProducts = async (req, res) => {
  const { search_query, organic, processing_type, category_id } = req.query;

  try {
    // Start building the product query
    let productQuery = supabase.from("product").select("*");

    // Search by name or description if search_query provided
    if (search_query) {
      productQuery = productQuery.or(
        `name.ilike.%${search_query}%,description.ilike.%${search_query}%`
      );
    }

    // Filter by category if provided
    if (category_id) {
      productQuery = productQuery.eq("category_id", category_id);
    }

    // Filter by organic attribute inside attributes JSONB column
    if (organic === "true" || organic === "false") {
      productQuery = productQuery.eq("attributes->>organic", organic);
    }

    // Fetch products matching filter criteria
    const { data: products, error: productError } = await productQuery;

    if (productError) {
      return res.status(500).json({ error: productError });
    }

    if (!products || products.length === 0) {
      return res.json([]);
    }

    // If processing_type filter is NOT provided, fetch all variants for each product
    if (!processing_type) {
      for (let product of products) {
        const { data: variants, error: variantError } = await supabase
          .from("variant")
          .select("*")
          .eq("product_id", product.id);

        if (variantError) {
          return res.status(500).json({ error: variantError });
        }

        product.variants = variants;
      }

      return res.json(products);
    }

    // If processing_type filter is provided, fetch only variants matching processing_type and attach to products
    const filteredProducts = [];

    for (let product of products) {
      const { data: variants, error: variantError } = await supabase
        .from("variant")
        .select("*")
        .eq("product_id", product.id)
        .ilike("processing_type", `%${processing_type}%`);

      if (variantError) {
        return res.status(500).json({ error: variantError });
      }

      if (variants && variants.length > 0) {
        product.variants = variants;
        filteredProducts.push(product);
      }
    }

    res.json(filteredProducts);
  } catch (err) {
    console.error("Error listing products:", err);
    res.status(500).json({ message: "Server error" });
  }
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
