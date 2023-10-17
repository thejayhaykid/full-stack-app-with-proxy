import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.create({
  data: {
    name: "John Dough",
    email: `john-${Math.random()}@example.com`,
    password: "password",
  },
});

const count = await prisma.user.count();
console.log(`There are ${count} users!`);

Bun.serve({
  port: 3001,
  async fetch(req, server) {
    const user = await prisma.user.findFirst({
      select: { name: true, email: true },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    const body = JSON.stringify(user);

    return new Response(body, {
      headers: { "content-type": "application/json" },
    });
  },
});
