const Razorpay = require("razorpay");

const supabase = require("../db");

// Get Cart
exports.getCart = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const { data: cartData, error } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user_id)
      .maybeSingle();

    if (error) return res.status(500).json({ message: error.message });

    res.json(cartData || { items: [], total_amount: 0 });
  } catch (err) {
    console.error("Get Cart Error:", err.message);
    res.status(500).json({ message: "Error fetching cart" });
  }
};

// Update Cart
exports.updateCart = async (req, res) => {
  const user_id = req.user.user_id;
  const { items } = req.body; // items from frontend: [{ sku_id, qty, price }]

  if (!items || !items.length) {
    return res.status(400).json({ message: "Cart items required" });
  }

  try {
    let total_amount = 0;
    const cartItems = [];
    const outOfStock = [];

    for (let item of items) {
      const { data: variantData, error: variantErr } = await supabase
        .from("variant")
        .select("*")
        .eq("sku_id", item.sku_id)
        .maybeSingle();

      if (variantErr)
        return res.status(500).json({ message: variantErr.message });
      if (!variantData) {
        outOfStock.push({ sku_id: item.sku_id, message: "Variant not found" });
        continue;
      }

      if (item.qty > variantData.stock_qty) {
        outOfStock.push({
          sku_id: item.sku_id,
          product_id: variantData.product_id,
          requested: item.qty,
          available: variantData.stock_qty,
          message: `Only ${variantData.stock_qty} items in stock`,
        });
        // Skip adding out-of-stock item
        continue;
      }

      // Fetch product details
      const { data: product, error: prodErr } = await supabase
        .from("product")
        .select("*")
        .eq("id", variantData.product_id)
        .maybeSingle();

      if (prodErr) return res.status(500).json({ message: prodErr.message });

      cartItems.push({
        sku_id: variantData.sku_id,
        product_id: variantData.product_id,
        name: product?.name || "Product",
        images: product?.images || [],
        qty: item.qty,
        price: item.price, // Use frontend price if trusted
      });

      total_amount += item.qty * item.price;
    }

    // Check if cart exists
    const { data: existingCart } = await supabase
      .from("cart")
      .select("*")
      .eq("user_id", user_id)
      .maybeSingle();

    if (existingCart) {
      const { data, error } = await supabase
        .from("cart")
        .update({ items: cartItems, total_amount })
        .eq("user_id", user_id);
      if (error) return res.status(500).json({ message: error.message });
    } else {
      const { data, error } = await supabase
        .from("cart")
        .insert([{ user_id, items: cartItems, total_amount }]);
      if (error) return res.status(500).json({ message: error.message });
    }

    res.json({ items: cartItems, total_amount, outOfStock });
  } catch (err) {
    console.error("Update Cart Error:", err.message);
    res.status(500).json({ message: "Error updating cart" });
  }
};

const instance = new Razorpay({
  key_id: "rzp_test_RLuthCgwOgOOwE",
  key_secret: "fiIWmGiO4cTRPxQ32v0s7iov",
});

exports.rzpOrderCreation = async (req, res) => {
  try {
    console.log(req.body);
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
      payment_capture: true,
    };
    const rzpOrder = await instance.orders.create(options);
    console.log(rzpOrder);
    res.status(200).json({
      success: true,
      order: rzpOrder,
    });
  } catch (error) {
    console.error("Error in checkout:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred during checkout.",
    });
  }
};
