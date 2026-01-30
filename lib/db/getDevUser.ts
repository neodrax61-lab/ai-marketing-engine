import { prisma } from './prisma';

export const getDevUser = async () => {
  const email = process.env.DEV_USER_EMAIL;
  const isProduction = process.env.NODE_ENV === 'production';

  if (!email) {
    if (isProduction) {
      throw new Error('Autenticação real obrigatória em produção. Configure DEV_USER_EMAIL apenas para uso temporário.');
    }

    throw new Error('DEV_USER_EMAIL não definido para ambiente de desenvolvimento.');
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: { email },
  });
};
