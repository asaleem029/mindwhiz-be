import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from '../models/productModel.js';
import { User } from '../models/userModel.js';

// Load environment variables if not already loaded
dotenv.config();

// Support both DB_USER and DB_ID for backward compatibility
const getDbConfig = () => {
  const dbUser = process.env.DB_USER || process.env.DB_ID;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_NAME;
  const dbHost = process.env.DB_HOST;
  const dbPort = parseInt(process.env.DB_PORT || '5432', 10);

  // Log config in development (without password)
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Database Config:', {
      host: dbHost,
      port: dbPort,
      user: dbUser,
      database: dbName,
      password: dbPassword ? '***' : 'not set',
    });
  }

  return {
    type: 'postgres' as const,
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPassword,
    database: dbName,
    entities: [Product, User],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  };
};

export const AppDataSource = new DataSource(getDbConfig());

export const connectDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize();
    console.log('✅ PostgreSQL connected successfully');
  } catch (error) {
    console.error('❌ PostgreSQL connection error:', error);
    process.exit(1);
  }
};
