import 'reflect-metadata';
import { Server } from '@overnightjs/core';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database.js';
import { ProductController } from './controllers/productController.js';

// Load environment variables
dotenv.config();

class AppServer extends Server {
  constructor() {
    super(process.env.NODE_ENV === 'development');

    // Middleware
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Health check route
    this.app.get('/health', (req, res) => {
      res.json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString(),
      });
    });

    // Setup controllers
    this.setupControllers();

    // 404 handler
    this.app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    });

    // Error handler
    this.app.use(
      (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.error('Error:', err);
        res.status(500).json({
          success: false,
          message: 'Internal server error',
          error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
        });
      }
    );
  }

  private setupControllers(): void {
    super.addControllers([new ProductController()]);
  }

  public async start(port: number): Promise<void> {
    try {
      // Connect to database
      await connectDatabase();

      // Start listening
      this.app.listen(port, () => {
        console.log(`🚀 Server is running on http://localhost:${port}`);
        console.log(`📝 API endpoints available at http://localhost:${port}/api`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  }
}

const server = new AppServer();
const PORT = parseInt(process.env.PORT || '5000', 10);
server.start(PORT);
