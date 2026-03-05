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
        image: 'https://www.jackjones.in/cdn/shop/files/902146301_g0_c1663387-117c-427c-a849-e984fa95fd2d.jpg?v=1758867845&width=2048'
    },
    {
        name: 'Wireless Bluetooth Headphones',
        description: 'Immersive sound with noise cancellation and 40-hour battery life.',
        price: 4999,
        category: 'Electronics',
        stock: 50,
        image: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRSmJobvogMUfkcyzgEHF_w6hAijuYnE-XQ2ywyXOUJAQJ0zJR15pyllXWrBDuR0uoaFJLdu9iNjJDTaUTjgHQl661X4_hM'
    },
    {
        name: 'Leather Minimalist Wallet',
        description: 'Sleek and slim genuine leather wallet with RFID protection.',
        price: 1299,
        category: 'Accessories',
        stock: 30,
        image: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQceCDxkuU0fLxSyf7CtSIBEmezyZI-u2sLEc3I9eQ22Cf0N5DhYypqFd13UzKwnf-3WfVUPCHlMURhFl51WlaiT_-cPJZUmakAgDvbRcjihG5nMUwQ9eWTtyQ'
    },
    {
        name: 'Organic Green Tea',
        description: 'Premium organic green tea leaves for a refreshing experience.',
        price: 450,
        category: 'Food & Beverage',
        stock: 200,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Running Sneakers',
        description: 'Lightweight and breathable sneakers for your daily run.',
        price: 2999,
        category: 'Footwear',
        stock: 40,
        image: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQlGaORWupb728PHsNE3PH4ta4pxonog4VCDn1zgNLakRblpvSwMTRJKALI7PmBcUHVwwI4dX8EkTl1Q-Bilw9yJdfEQ-PNLdvS92hM9M8nRD_-YUHRs_WeTQ'
    },
    {
        name: 'Smartphone Pro Max',
        description: 'The latest smartphone with amazing camera and performance.',
        price: 69999,
        category: 'Electronics',
        stock: 15,
        image: 'https://s3bg.cashify.in/gpro/uploads/2022/04/18140303/samsung-galaxy-s24-5g-back-1.webp'
    },
    {
        name: 'Classic Denim Jacket',
        description: 'Timeless denim jacket with a comfortable fit.',
        price: 1899,
        category: 'Apparel',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Premium Coffee Beans',
        description: 'Gourmet roasted coffee beans for the perfect cup.',
        price: 650,
        category: 'Food & Beverage',
        stock: 120,
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Polarized Sunglasses',
        description: 'Stylish sunglasses with UV protection and polarized lenses.',
        price: 1599,
        category: 'Accessories',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Yoga Mat',
        description: 'Eco-friendly non-slip yoga mat for your daily practice.',
        price: 1200,
        category: 'Fitness',
        stock: 80,
        image: 'https://images.unsplash.com/photo-1637157216470-d92cd2edb2e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Dumbbell Set',
        description: 'Pair of 5kg dumbbells for home strength training.',
        price: 2499,
        category: 'Fitness',
        stock: 20,
        image: 'https://plus.unsplash.com/premium_photo-1723773734089-a896ee701eef?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
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
        image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Stainless Steel Water Bottle',
        description: 'Vacuum insulated water bottle that keeps drinks cold for 24 hours.',
        price: 899,
        category: 'Accessories',
        stock: 150,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60'
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
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Memory Foam Pillow',
        description: 'Ergonomic memory foam pillow for a better night sleep.',
        price: 1299,
        category: 'Home & Living',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?w=500&auto=format&fit=crop&q=60'
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
        image: 'https://plus.unsplash.com/premium_photo-1671534312576-845be6898618?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Portable Power Bank',
        description: '10000mAh portable charger with fast charging support.',
        price: 1299,
        category: 'Electronics',
        stock: 85,
        image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Yoga Blocks (Set of 2)',
        description: 'High-density foam blocks for yoga and stretches.',
        price: 799,
        category: 'Fitness',
        stock: 65,
        image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Canvas Wall Art',
        description: 'Modern abstract canvas print for home decor.',
        price: 1499,
        category: 'Home & Living',
        stock: 20,
        image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Luxury Scented Diffuser',
        description: 'Elite essential oil diffuser with ambient lighting and ultra-quiet operation.',
        price: 3499,
        category: 'Home & Living',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Velvet Throw Pillow',
        description: 'Ultra-soft premium velvet pillow for a touch of luxury in any room.',
        price: 1199,
        category: 'Home & Living',
        stock: 120,
        image: 'https://plus.unsplash.com/premium_photo-1739612423035-4d3b7a34ea39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Silk Sleep Mask',
        description: '100% pure mulberry silk mask for the ultimate restorative sleep.',
        price: 899,
        category: 'Accessories',
        stock: 200,
        image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Marble Coaster Set',
        description: 'Set of 4 hand-polished Italian marble coasters with non-slip backing.',
        price: 1850,
        category: 'Home & Living',
        stock: 60,
        image: 'https://plus.unsplash.com/premium_photo-1683121918741-4fc54b7f5ede?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
        name: 'Gold-Plated Stationery',
        description: 'Set of luxury pens and clips plated in 18k gold for the executive desk.',
        price: 2999,
        category: 'Accessories',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Artisanal Honey Set',
        description: 'Three rare wildflower honeys harvested from sustainable high-altitude hives.',
        price: 1250,
        category: 'Food & Beverage',
        stock: 90,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Premium Matcha Whisk',
        description: 'Handcrafted bamboo whisk (Chasen) for the perfect cup of ceremonial matcha.',
        price: 750,
        category: 'Food & Beverage',
        stock: 150,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Leather Desk Mat',
        description: 'Full-grain leather surface for superior mouse tracking and desk elegance.',
        price: 4500,
        category: 'Electronics',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Designer Table Lamp',
        description: 'Sleek mid-century modern lamp with warm LED glow and copper finish.',
        price: 6800,
        category: 'Home & Living',
        stock: 12,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Hand-Blown Glass Vase',
        description: 'Individually crafted artistic vase with deep sapphire and gold swirls.',
        price: 3200,
        category: 'Home & Living',
        stock: 18,
        image: 'https://images.unsplash.com/photo-1471086569966-db3eebc25a59?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Cashmere Scarf',
        description: 'Incredibly soft and warm 100% Mongolian cashmere in charcoal grey.',
        price: 5499,
        category: 'Apparel',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Silver-Plated Photo Frame',
        description: 'Classic tarnish-resistant sterling silver frame for your most cherished memories.',
        price: 2100,
        category: 'Accessories',
        stock: 55,
        image: 'https://m.media-amazon.com/images/I/41VFNh7dryL._SY300_SX300_QL70_FMwebp_.jpg'
    },
    {
        name: 'Italian Leather Belt',
        description: 'Hand-dyed brown leather belt with a brushed nickel buckle.',
        price: 1999,
        category: 'Accessories',
        stock: 75,
        image: 'https://m.media-amazon.com/images/I/416TGddUuSL._AC_UL640_FMwebp_QL65_.jpg'
    },
    {
        name: 'Crystal Wine Glasses',
        description: 'Set of 2 lead-free crystal glasses for the perfect wine experience.',
        price: 2800,
        category: 'Food & Beverage',
        stock: 30,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Gourmet Truffle Oil',
        description: 'Cold-pressed extra virgin olive oil infused with rare white truffles.',
        price: 1550,
        category: 'Food & Beverage',
        stock: 80,
        image: 'https://m.media-amazon.com/images/I/61pl1SrE0FL._SY879_.jpg'
    },
    {
        name: 'Solid Oak Cutting Board',
        description: 'Thick end-grain oak board for serious chefs. Naturally antimicrobial.',
        price: 3600,
        category: 'Home & Living',
        stock: 22,
        image: 'https://m.media-amazon.com/images/I/41EYkBmip0L._AC_UL640_FMwebp_QL65_.jpg'
    },
    {
        name: 'Copper Cocktail Shaker',
        description: 'Professional grade weighted shaker with a brilliant hammered copper finish.',
        price: 2200,
        category: 'Accessories',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Linen Bedding Set',
        description: 'Breathable stonewashed French linen duvet cover and pillowcases.',
        price: 12500,
        category: 'Home & Living',
        stock: 10,
        image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Artisanal Soap Set',
        description: 'Three artisanal bars formulated with shea butter and exotic botanicals.',
        price: 950,
        category: 'Accessories',
        stock: 100,
        image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Minimalist Wall Clock',
        description: 'Silent quartz movement with a clean white face and natural wood frame.',
        price: 2750,
        category: 'Home & Living',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Espresso Machine Pro',
        description: 'Compact professional espresso machine for the ultimate home barista.',
        price: 24999,
        category: 'Electronics',
        stock: 8,
        image: 'https://m.media-amazon.com/images/I/71drOx2anhL._AC_UY436_FMwebp_QL65_.jpg'
    },
    {
        name: 'Wool Yoga Blanket',
        description: 'Authentic hand-woven wool blanket for comfort during meditation.',
        price: 1600,
        category: 'Fitness',
        stock: 55,
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&auto=format&fit=crop&q=60'
    },
    {
        name: 'Suede Loafers',
        description: 'Premium soft suede loafers with cushioned soles for elegant comfort.',
        price: 4999,
        category: 'Footwear',
        stock: 28,
        image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=500&auto=format&fit=crop&q=60'
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
