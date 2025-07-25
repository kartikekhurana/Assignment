import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashAdminPass = await bcrypt.hash("admin123", 10);
  const hashUserPass = await bcrypt.hash("user123", 10);

  const users = [
    {
      email: "admin@gmail.com",
      password: hashAdminPass,
      role: "ADMIN",
    },
    {
      email: "viewer@gmail.com",
      password: hashUserPass,
      role: "VIEWER",
    },
    {
      email: "testuser@gmail.com",
      password: await bcrypt.hash("test123", 10),
      role: "VIEWER",
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log("Seeded users");
}
main()
  .catch((e) => {
    console.error(e), process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
