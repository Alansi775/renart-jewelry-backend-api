const express = require('express');
const cors = require('cors');
const fs = require('fs/promises'); // لاستخدام readFile بشكل غير متزامن
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const productsFilePath = path.join(__dirname, '../products.json');

// نقطة نهاية API لجلب المنتجات فقط (بدون حسابات الذهب حالياً)
app.get('/products', async (req, res) => {
    try {
        // قراءة المنتجات من ملف JSON
        const data = await fs.readFile(productsFilePath, 'utf8');
        let products = JSON.parse(data);
        res.json(products); // إرسال المنتجات مباشرة

    } catch (error) {
        console.error('Error in /products (simplified):', error);
        res.status(500).json({ message: 'Failed to retrieve products (simplified)', error: error.message });
    }
});

module.exports = app;