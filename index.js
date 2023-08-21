require("dotenv").config()
const express = require('express');
const axios = require('axios');
const { default: getUrl } = require("./helper/helper");
const app = express();
const {getToken} = require("./helper/helper")
const port = process.env.PORT || 8000; 

app.use(express.json());
app.use(cors({
  origin: 'https://main--enchanting-bunny-435412.netlify.app'
}));
const shopifyApiUrl = process.env.SHOPIFY_APP_URL;

app.get('/api/shopify/products', async (req, res) => {

  try {
    const response = await axios.get(`${shopifyApiUrl}/products.json`, {
      headers: {
        "X-Shopify-Access-Token": getToken()
      },
    });
    const products = response.data.products.map((product) => {
      const total = product.variants.reduce((total, variant) => total + variant.inventory_quantity, 0)
      return {
        ...product,
        total_inventory_quantity: total
      }
    })

    res.json({ products});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
