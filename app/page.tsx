"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      document.cookie = `token=${data.token}; path=/`;
      router.push("/dashboard");
    } else {
      alert("Error login");
    }
  };

  const register = async () => {
    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    alert("Usuario creado");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
    
    <h1 className="text-2xl font-bold text-center mb-6">
      Bienvenido
    </h1>

    <div className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Contraseña"
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={login}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
      >
        Iniciar sesión
      </button>

      <button
        onClick={register}
        className="w-full border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Crear cuenta
      </button>
    </div>

  </div>
</div>
  );
}