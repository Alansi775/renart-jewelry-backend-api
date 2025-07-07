const express = require('express');
const cors = require('cors');
const fs = require('fs/promises');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Path to products.json, assuming it's now in the same 'api' folder
const productsFilePath = path.join(__dirname, 'products.json'); // <--- This should be correct now

// API endpoint to fetch products
app.get('/products', async (req, res) => { // <--- This path is just '/products'
    try {
        const data = await fs.readFile(productsFilePath, 'utf8');
        let products = JSON.parse(data);
        res.json(products);
    } catch (error) {
        console.error('Error in /products (simplified):', error);
        res.status(500).json({ message: 'Failed to retrieve products (simplified)', error: error.message });
    }
});

module.exports = app;