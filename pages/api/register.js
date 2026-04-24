import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    // 🔒 Hash de contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "Usuario creado" });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}