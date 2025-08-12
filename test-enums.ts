import { PrismaClient } from '@prisma/client';

try {
  const { Role, PostStatus } = require('@prisma/client');
  console.log('✅ Enums found!');
  console.log('Role.ADMIN:', Role.ADMIN);
  console.log('PostStatus.PUBLISHED:', PostStatus.PUBLISHED);
} catch (error) {
  console.log('❌ Enums not found:', error.message);
}
