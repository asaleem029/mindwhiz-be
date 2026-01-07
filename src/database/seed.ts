import 'reflect-metadata';
import { AppDataSource } from '../config/database.js';
import { User, UserRole } from '../models/userModel.js';
import { Product, ProductAvailability } from '../models/productModel.js';
import bcrypt from 'bcrypt';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Initialize database connection
    await AppDataSource.initialize();
    console.log('✅ Database connected');

    const userRepository = AppDataSource.getRepository(User);
    const productRepository = AppDataSource.getRepository(Product);

    // Clear existing data (optional - comment out if you want to keep existing data)
    await productRepository.clear();  // Clears all products
    await userRepository.clear();     // Clears all users
    console.log('🧹 Cleared existing data');

    // Seed Users
    console.log('👥 Seeding users...');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const customerPassword = await bcrypt.hash('customer123', 10);

    const admin = userRepository.create({
      email: 'admin@mindwhiz.com',
      password: adminPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
    });

    const customer = userRepository.create({
      email: 'customer@mindwhiz.com',
      password: customerPassword,
      name: 'John Doe',
      role: UserRole.CUSTOMER,
    });

    await userRepository.save([admin, customer]);
    console.log('✅ Users seeded successfully');
    console.log('📧 Admin: admin@mindwhiz.com / admin123');
    console.log('📧 Customer: customer@mindwhiz.com / customer123');

    // Seed Products
    console.log('📦 Seeding products...');

    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description:
          'Premium noise-cancelling wireless headphones with 30-hour battery life. Experience crystal-clear audio with deep bass and comfortable over-ear design.',
        price: 129.99,
        availability: ProductAvailability.IN_STOCK,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      },
      {
        name: 'Smart Fitness Watch',
        description:
          'Track your health and fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, sleep tracking, and 50+ sport modes.',
        price: 249.99,
        availability: ProductAvailability.IN_STOCK,
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      },
      {
        name: 'Laptop Backpack',
        description:
          'Durable water-resistant backpack with dedicated laptop compartment (fits up to 15.6"), USB charging port, and multiple organizational pockets.',
        price: 49.99,
        availability: ProductAvailability.IN_STOCK,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      },
      {
        name: 'Mechanical Gaming Keyboard',
        description:
          'RGB backlit mechanical keyboard with tactile switches. Features programmable keys, anti-ghosting, and ergonomic design for long gaming sessions.',
        price: 89.99,
        availability: ProductAvailability.IN_STOCK,
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      },
      {
        name: 'Wireless Mouse',
        description:
          'Ergonomic wireless mouse with adjustable DPI, 6 programmable buttons, and long-lasting rechargeable battery. Perfect for work and gaming.',
        price: 39.99,
        availability: ProductAvailability.IN_STOCK,
        imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      },
      {
        name: '4K Webcam',
        description:
          'Professional 4K webcam with auto-focus, built-in dual microphones, and adjustable field of view. Ideal for video conferencing and streaming.',
        price: 149.99,
        availability: ProductAvailability.OUT_OF_STOCK,
        imageUrl: 'https://images.unsplash.com/photo-1589739900243-c4fad42c2b5c?w=500',
      },
      {
        name: 'Portable SSD 1TB',
        description:
          'Ultra-fast portable solid-state drive with USB-C connectivity. Transfer speeds up to 1050MB/s. Compact and durable design.',
        price: 119.99,
        availability: ProductAvailability.IN_STOCK,
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500',
      },
      {
        name: 'Desk Lamp with USB Charging',
        description:
          'LED desk lamp with adjustable brightness levels, color temperatures, and built-in USB charging port. Eye-friendly lighting for work or study.',
        price: 34.99,
        availability: ProductAvailability.IN_STOCK,
        imageUrl: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
      },
    ];

    for (const productData of products) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
    }

    console.log('✅ Products seeded successfully');
    console.log(`📊 Total products created: ${products.length}`);

    console.log('\n🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
