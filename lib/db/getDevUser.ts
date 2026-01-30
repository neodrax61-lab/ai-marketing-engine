import { prisma } from './prisma';

export const getDevUser = async () => {
  const email = process.env.DEV_USER_EMAIL;

  if (!email) {
    throw new Error('DEV_USER_EMAIL não definido.');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: { email },
  });
};
