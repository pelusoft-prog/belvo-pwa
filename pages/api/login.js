import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(400).json({ error: "Password incorrecto" });
    }
res.setHeader(
    "Set-Cookie",
     `auth=true; Path=/; HttpOnly; SameSite=Strict; Secure`
    );
    res.status(200).json({ message: "Login exitoso" });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: error.message });
  }
}