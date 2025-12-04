import mongoose from 'mongoose';
import Product from '../models/Product';
import dbConnect from '../lib/db';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const products = [
    {
        name: 'Midnight Velvet Tuxedo',
        description: 'A masterpiece of tailoring, this midnight blue velvet tuxedo features a satin shawl collar and a slim, modern fit. Perfect for black-tie events and gala dinners.',
        price: 1299.00,
        category: 'Men',
        images: ['/images/tuxedo-1.jpg', '/images/tuxedo-2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Midnight Blue', 'Black'],
        inStock: true,
        isFeatured: true,
    },
    {
        name: 'Royal Gold Silk Saree',
        description: 'Handwoven from the finest Kanchipuram silk, this saree features intricate gold zari work and a rich, lustrous finish. A timeless piece for weddings and special occasions.',
        price: 899.00,
        category: 'Sarees',
        images: ['/images/saree-1.jpg', '/images/saree-2.jpg'],
        sizes: ['Free Size'],
        colors: ['Gold', 'Red'],
        inStock: true,
        isFeatured: true,
    },
    {
        name: 'Emerald Evening Gown',
        description: 'Radiate elegance in this floor-length emerald green gown. Crafted from flowing chiffon with a beaded bodice, it offers a flattering silhouette and effortless grace.',
        price: 650.00,
        category: 'Women',
        images: ['/images/gown-1.jpg', '/images/gown-2.jpg'],
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['Emerald Green', 'Sapphire Blue'],
        inStock: true,
        isFeatured: true,
    },
    {
        name: 'Sapphire Cufflinks',
        description: 'Add a touch of sophistication to your attire with these sterling silver cufflinks featuring genuine sapphire stones. The perfect accessory for the modern gentleman.',
        price: 150.00,
        category: 'Accessories',
        images: ['/images/cufflinks-1.jpg'],
        sizes: ['One Size'],
        colors: ['Silver'],
        inStock: true,
        isFeatured: false,
    },
    {
        name: 'Ivory Sherwani Set',
        description: 'Exude regal charm in this ivory sherwani set with intricate thread embroidery. Comes with a matching churidar and stole.',
        price: 950.00,
        category: 'Men',
        images: ['/images/sherwani-1.jpg'],
        sizes: ['M', 'L', 'XL'],
        colors: ['Ivory', 'Cream'],
        inStock: true,
        isFeatured: true,
    },
    {
        name: 'Cashmere Pashmina Shawl',
        description: 'Wrap yourself in luxury with this 100% pure cashmere pashmina shawl. Soft, warm, and incredibly lightweight.',
        price: 299.00,
        category: 'Accessories',
        images: ['/images/shawl-1.jpg'],
        sizes: ['One Size'],
        colors: ['Beige', 'Grey', 'Black'],
        inStock: true,
        isFeatured: false,
    }
];

async function seed() {
    try {
        await dbConnect();
        console.log('Connected to MongoDB');

        await Product.deleteMany({});
        console.log('Cleared existing products');

        await Product.insertMany(products);
        console.log('Seeded products successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seed();
