import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai proses seeder...");

  // 1. Buat Admin User
  const adminEmail = "admin@exocloud.id";
  const adminPassword = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: adminPassword,
    },
  });
  console.log("Admin user berhasil dibuat:", admin.email);

  console.log("Proses seeder selesai!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });