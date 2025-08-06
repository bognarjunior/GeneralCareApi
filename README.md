# GeneralCareApi

API do GeneralCare — Backend para gerenciamento de saúde.

---

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Fastify** (servidor web)
- **Supabase** (PostgreSQL online)
- **Prisma** (ORM)
- [ ] Testes automatizados (Jest/Supertest) *(to-do)*

---

## ⚡️ Como rodar

```bash
# Instale as dependências
npm install

# Rode em desenvolvimento
npm run dev
````

> Configure as variáveis de ambiente no `.env` para conectar ao Supabase.

---

## 📂 Estrutura do Projeto

```
src/
  routes/
  controllers/
  services/
  prisma/
  index.ts
.env
```

---

## 📝 To-do

* [ ] Configurar Prisma e rodar primeiras migrations
* [ ] Criar endpoints de usuários e saúde
* [ ] Integração com autenticação
* [ ] Testes automatizados
* [ ] Documentação de API (Swagger)

---

## 🤝 Contribuindo

Pull requests são bem-vindos! Para grandes mudanças, por favor abra uma issue antes.

---

## 📄 Licença

Este projeto está sob a licença MIT.

