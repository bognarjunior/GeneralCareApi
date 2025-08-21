import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8), 
  name: z.string().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export default async function authRoutes(app: FastifyInstance) {
  app.post('/auth/register', async (request, reply) => {
    const parse = registerSchema.safeParse(request.body);
    if (!parse.success) {
      return reply.code(400).send({ message: 'Dados inválidos', issues: parse.error.issues });
    }
    const { email, password, name } = parse.data;

    const exists = await app.prisma.user.findUnique({ where: { email } });
    if (exists) {
      return reply.code(409).send({ message: 'E-mail já cadastrado' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await app.prisma.user.create({
      data: { email, password: hash, name },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    return reply.code(201).send({ user });
  });

  app.post('/auth/login', async (request, reply) => {
    const parse = loginSchema.safeParse(request.body);
    if (!parse.success) {
      return reply.code(400).send({ message: 'Dados inválidos', issues: parse.error.issues });
    }
    const { email, password } = parse.data;

    const user = await app.prisma.user.findUnique({ where: { email } });
    if (!user) {
      return reply.code(401).send({ message: 'Credenciais inválidas' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return reply.code(401).send({ message: 'Credenciais inválidas' });
    }

    const token = app.jwt.sign({ sub: user.id, email: user.email });
    return reply.send({ token });
  });

  app.get('/auth/me', { preHandler: [app.auth] }, async (request, reply) => {
    // @ts-ignore - fastify-jwt popula request.user
    const userId = request.user?.sub as string;

    const user = await app.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, createdAt: true },
    });

    if (!user) return reply.code(404).send({ message: 'Usuário não encontrado' });

    return reply.send({ user });
  });
}
