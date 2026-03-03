import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import Cart from './models/Cart.js';
import User from './models/User.js';

dotenv.config();
connectDB();

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
    }
];

const products = [
    {
        name: 'Classic Black T-Shirt',
        description: 'A premium quality cotton black t-shirt for everyday wear.',
        price: 999,
        category: 'Apparel',
        stock: 100,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVlJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Wireless Bluetooth Headphones',
        description: 'Immersive sound with noise cancellation and 40-hour battery life.',
        price: 4999,
        category: 'Electronics',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D'
    },
    {
        name: 'Leather Minimalist Wallet',
        description: 'Sleek and slim genuine leather wallet with RFID protection.',
        price: 1299,
        category: 'Accessories',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbGV0fGVufDB8fDB8fHww'
    },
    {
        name: 'Organic Green Tea',
        description: 'Premium organic green tea leaves for a refreshing experience.',
        price: 450,
        category: 'Food & Beverage',
        stock: 200,
        image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JlZW4lMjB0ZWF8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Running Sneakers',
        description: 'Lightweight and breathable sneakers for your daily run.',
        price: 2999,
        category: 'Footwear',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Smartphone Pro Max',
        description: 'The latest smartphone with amazing camera and performance.',
        price: 69999,
        category: 'Electronics',
        stock: 15,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGhvbmV8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket with a comfortable fit.',
        price: 1899,
        category: 'Apparel',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGVuaW0lMjBqYWNrZXR8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Premium Coffee Beans',
        description: 'Gourmet roasted coffee beans for the perfect cup.',
        price: 650,
        category: 'Food & Beverage',
        stock: 120,
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29mZmVlJTIwYmVhbnN8ZW58MHx8MHx8fDA%3D'
    },
    {
        name: 'Polarized Sunglasses',
        description: 'Stylish sunglasses with UV protection and polarized lenses.',
        price: 1599,
        category: 'Accessories',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3VuZ2xhc3Nlc3xlbnwwfHwwfHx8MA%3D%3D'
    },
    {
        name: 'Yoga Mat',
        description: 'Eco-friendly non-slip yoga mat for your daily practice.',
        price: 1200,
        category: 'Fitness',
        stock: 80,
        image: 'https://plus.unsplash.com/premium_photo-1674675646706-8468e673b74a?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Dumbbell Set',
        description: 'Pair of 5kg dumbbells for home strength training.',
        price: 2499,
        category: 'Fitness',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHVtYmJlbGxzfGVufDB8fDB8fHww'
    },
    {
        name: 'Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with blue switches.',
        price: 3499,
        category: 'Electronics',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Gaming Mouse',
        description: 'High-precision optical gaming mouse with programmable buttons.',
        price: 1499,
        category: 'Electronics',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Cotton Hooded Sweatshirt',
        description: 'Warm and comfortable cotton hoodie for winter.',
        price: 1599,
        category: 'Apparel',
        stock: 80,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Leather Handbag',
        description: 'Elegant leather handbag for women.',
        price: 3999,
        category: 'Accessories',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Smart Watch',
        description: 'Fitness tracker and smartwatch with heart rate monitor.',
        price: 2999,
        category: 'Electronics',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Stainless Steel Water Bottle',
        description: 'Vacuum insulated water bottle that keeps drinks cold for 24 hours.',
        price: 899,
        category: 'Accessories',
        stock: 150,
        image: 'https://plus.unsplash.com/premium_photo-1681284938505-62efa3494bf2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Gourmet Dark Chocolate',
        description: '70% cocoa organic dark chocolate bar.',
        price: 299,
        category: 'Food & Beverage',
        stock: 300,
        image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Ceramic Coffee Mug',
        description: 'Handcrafted ceramic mug with a unique glaze.',
        price: 499,
        category: 'Accessories',
        stock: 90,
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Desk Plant (Succulent)',
        description: 'Small indoor succulent plant in a stylish pot.',
        price: 399,
        category: 'Home & Living',
        stock: 70,
        image: 'https://images.unsplash.com/photo-1446071103084-c257b5f70672?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Memory Foam Pillow',
        description: 'Ergonomic memory foam pillow for a better night sleep.',
        price: 1299,
        category: 'Home & Living',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1632127271816-9f44ce97d86f?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Travel Backpack',
        description: 'Spacious and durable backpack for weekend trips.',
        price: 2499,
        category: 'Accessories',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Scented Soy Candle',
        description: 'Lavender scented soy candle for relaxation.',
        price: 599,
        category: 'Home & Living',
        stock: 110,
        image: 'https://images.unsplash.com/photo-1603006905003-be475513b19b?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Portable Power Bank',
        description: '10000mAh portable charger with fast charging support.',
        price: 1299,
        category: 'Electronics',
        stock: 85,
        image: 'https://images.pexels.com/photos/16814787/pexels-photo-16814787.jpeg'
    },
    {
        name: 'Yoga Blocks (Set of 2)',
        description: 'High-density foam blocks for yoga and stretches.',
        price: 799,
        category: 'Fitness',
        stock: 65,
        image: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRodI68ArnrSvMYWQ4S2V59bOl8dcmjCYLS6pXmgoIiwUDr8t2z6Yn6K2VjGlmSZiRTE5CQb5GHNSn_gHOUk09nOasbM4TXxvSZJanqFrcEZaequjY_DYOSDjo'
    },
    {
        name: 'Canvas Wall Art',
        description: 'Modern abstract canvas print for home decor.',
        price: 1499,
        category: 'Home & Living',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=60'
    }
];

const importData = async () => {
    try {
        await Product.deleteMany();
        await Cart.deleteMany();
        await User.deleteMany();

        await User.insertMany(users);
        await Product.insertMany(products);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await Cart.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
