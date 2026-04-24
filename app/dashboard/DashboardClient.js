"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardClient() {
  const [banks, setBanks] = useState([]);
  const [status, setStatus] = useState({}); //estado por banco
  const router = useRouter();
  const logout = () => {
    document.cookie = "auth=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.replace("/");
  };
  const connectBank = async (institution) => {
    //estado loading
    setStatus((prev) => ({
      ...prev,
      [institution]: "loading",
    }));

    try {
      const res = await fetch("/api/create-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ institution }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus((prev) => ({
          ...prev,
          [institution]: "success",
        }));

        console.log("LINK:", data);
         //  guardar link
        localStorage.setItem("linkId", data.id);
        // REDIRECCIÓN
        router.push("/dashboard/transactions");
      } else {
        throw new Error(data.error);
      }

    } catch (error) {
      setStatus((prev) => ({
        ...prev,
        [institution]: "error",
      }));

      console.error(error);
    }
  };

  useEffect(() => {
    fetch("/api/banks")
      .then((res) => res.json())
      .then((data) => setBanks(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <button onClick={logout} 
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        background: "#ef4444",
        color: "white",
        border: "none",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold"
      }}>
      Cerrar sesión
      </button>
      <h1>Selecciona tu banco</h1>

      {banks.map((bank) => (
        <div
          key={bank.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "15px",
            marginBottom: "10px",
            cursor: "pointer"
          }}
        >
          <h3>{bank.display_name}</h3>
          <p>{bank.country_code}</p>
<button 
  onClick={() => connectBank(bank.name)}
  style={{
    backgroundColor: "#2563eb",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontWeight: "600"
  }}
  onMouseOver={e => e.currentTarget.style.backgroundColor = "#1d4ed8"}
  onMouseOut={e => e.currentTarget.style.backgroundColor = "#2563eb"}
>
  Conectar
</button>

          {/* 👇 ESTADO VISUAL */}
          {status[bank.name] === "loading" && <p>⏳ Conectando...</p>}
          {status[bank.name] === "success" && <p>✅ Conectado</p>}
          {status[bank.name] === "error" && <p>❌ Error al conectar</p>}
        </div>
      ))}
    </div>
  );
}