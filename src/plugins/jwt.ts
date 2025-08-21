import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance {
    auth: (request: any, reply: any) => Promise<void>;
  }

  interface FastifyRequest {
    jwtVerify: () => Promise<void>;
    user?: { sub: string; email: string };
  }
}

const jwtPlugin = fp(async (app) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    app.log.warn('JWT_SECRET não definido no .env');
  }

  await app.register(jwt, {
    secret: secret || 'dev-secret', // fallback DEV
  });

  app.decorate('auth', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.code(401).send({ message: 'Unauthorized' });
    }
  });
});

export default jwtPlugin;
