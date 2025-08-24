// src/plugins/jwt.ts
import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import type { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; email: string };
    user: { sub: string; email: string };
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    auth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
  }
}

const jwtPlugin: FastifyPluginAsync = async (app) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    app.log.warn('JWT_SECRET não definido no .env. Usando fallback DEV.');
  }

  await app.register(jwt, {
    secret: secret || 'dev-secret',
  });

  app.decorate('auth', async (request, reply) => {
    try {
      await request.jwtVerify(); 
      app.log.debug({ user: request.user }, 'JWT verificado com sucesso');
    } catch (err) {
      app.log.warn({ err }, 'Falha na verificação do JWT');
      return reply.code(401).send({ message: 'Unauthorized' });
    }
  });
};

export default fp(jwtPlugin);
