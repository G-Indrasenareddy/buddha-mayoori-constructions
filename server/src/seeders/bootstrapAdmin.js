import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
import { User } from '../models/User.js';
import { logger } from '../utils/logger.js';

try {
  dns.setDefaultResultOrder('ipv4first');
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

dotenv.config();

export const bootstrapAdmin = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/buddha_mayoori_db';
    await mongoose.connect(connUri);
    logger.info('Connected to MongoDB for admin bootstrapping...');

    const existingAdmin = await User.findOne({ role: { $in: ['admin', 'superadmin'] } });

    if (existingAdmin) {
      logger.info(`Admin user already exists (${existingAdmin.email}). Aborting bootstrap cleanly.`);
      await mongoose.connection.close();
      return;
    }

    const username = process.env.INITIAL_ADMIN_USERNAME || 'admin';
    const email = process.env.INITIAL_ADMIN_EMAIL || 'admin@buddhamayoori.com';
    const password = process.env.INITIAL_ADMIN_PASSWORD || 'SecureAdminPassword2026!';

    const admin = await User.create({
      username,
      email,
      password,
      role: 'superadmin',
      isActive: true,
    });

    logger.info(`Successfully created initial superadmin user: ${admin.email}`);

    await mongoose.connection.close();
    logger.info('Database connection closed. Bootstrap complete!');
  } catch (error) {
    logger.error(`Error bootstrapping admin user: ${error.message}`);
    process.exit(1);
  }
};

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  bootstrapAdmin();
}
