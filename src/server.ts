// src/server.ts
import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import prismaPlugin from './plugins/prisma';
import jwtPlugin from './plugins/jwt';
import authRoutes from './routes/auth';

const app = Fastify({ logger: true });

async function bootstrap() {
  await app.register(cors, { origin: true });
  await app.register(prismaPlugin);
  await app.register(jwtPlugin);

  // health
  app.get('/', async () => ({ ok: true, name: 'GeneralCare API' }));

  // rotas
  await app.register(authRoutes);

  const PORT = Number(process.env.PORT || 3333);
  await app.listen({ port: PORT, host: '0.0.0.0' });

  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
}

bootstrap().catch((err) => {
  app.log.error(err);
  process.exit(1);
});
