import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

app.get('/', async (request, reply) => {
  console.log('Rota / acessada!');
  return { message: 'Hello, GeneralCare API!' };
});

const start = async () => {
  try {
    await app.listen({ port: 3333, host: '0.0.0.0' });
    console.log('🚀 Servidor rodando em http://localhost:3333');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

