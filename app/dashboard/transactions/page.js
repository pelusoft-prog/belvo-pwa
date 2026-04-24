"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const router = useRouter();
  useEffect(() => {
    fetch("/api/transactions")
      .then(res => res.json())
      .then(data => {
        setTransactions(data);
        const total = data.reduce((acc, tx) => acc + tx.amount, 0);
        setBalance(total);
      });
  }, []);

  const incomes = transactions.filter(t => t.amount > 0);
  const expenses = transactions.filter(t => t.amount < 0);

  return (
    
    <div style={styles.container}>
      <button
        onClick={() => router.back()}
          style={{
            marginBottom: "20px",
            background: "transparent",
            border: "none",
            color: "#4f46e5",
            cursor: "pointer",
            fontWeight: "bold"
          }}
    >← Volver a bancos</button>
      
      {/* Header */}
      <h1 style={styles.title}>Dashboard Financiero</h1>

      {/* KPI Card */}
      <div style={styles.kpiCard}>
        <p style={styles.kpiLabel}>Balance total</p>
        <h2 style={styles.kpiValue}>
          ${balance.toLocaleString()}
        </h2>
      </div>

      {/* Sections */}
      <div style={styles.grid}>

        {/* Ingresos */}
        <div style={styles.card}>
          <h3 style={{ color: "#16a34a" }}>Ingresos</h3>
          {incomes.map(tx => (
            <div key={tx.id} style={styles.row}>
              <span>{tx.description}</span>
              <span style={styles.income}>
                +${tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Egresos */}
        <div style={styles.card}>
          <h3 style={{ color: "#dc2626" }}>Egresos</h3>
          {expenses.map(tx => (
            <div key={tx.id} style={styles.row}>
              <span>{tx.description}</span>
              <span style={styles.expense}>
                ${tx.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    backgroundColor: "#f5f7fb",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif"
  },

  title: {
    marginBottom: "20px"
  },

  kpiCard: {
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "white",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "25px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
  },

  kpiLabel: {
    margin: 0,
    opacity: 0.8
  },

  kpiValue: {
    margin: 0,
    fontSize: "28px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee"
  },

  income: {
    color: "#16a34a",
    fontWeight: "bold"
  },

  expense: {
    color: "#dc2626",
    fontWeight: "bold"
  }
};