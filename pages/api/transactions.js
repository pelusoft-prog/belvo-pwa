// pages/api/transactions.js

export default async function handler(req, res) {
  try {
    // DATA SIMULADA
const datasets = [
      [
        { id: 1, description: "Salario", amount: 25000, type: "income" },
        { id: 2, description: "Renta", amount: -8000, type: "expense" },
        { id: 3, description: "Supermercado", amount: -1500, type: "expense" },
      ],
      [
        { id: 1, description: "Freelance", amount: 12000, type: "income" },
        { id: 2, description: "Uber", amount: -500, type: "expense" },
        { id: 3, description: "Netflix", amount: -200, type: "expense" },
      ],
      [
        { id: 1, description: "Venta", amount: 8000, type: "income" },
        { id: 2, description: "Gasolina", amount: -1200, type: "expense" },
        { id: 3, description: "Comida", amount: -900, type: "expense" },
      ],
      [
        { id: 1, description: "Bono", amount: 5000, type: "income" },
        { id: 2, description: "Viaje", amount: -3000, type: "expense" },
        { id: 3, description: "Restaurante", amount: -700, type: "expense" },
      ],
      [
        { id: 1, description: "Dividendos", amount: 4000, type: "income" },
        { id: 2, description: "Gym", amount: -600, type: "expense" },
        { id: 3, description: "Amazon", amount: -1200, type: "expense" },
      ],
    ];

        //Seleccionar uno al azar
      const randomIndex = Math.floor(Math.random() * datasets.length);
      const transactions = datasets[randomIndex];

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Error servidor" });
  }
}