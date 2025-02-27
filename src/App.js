import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState(() => {
    return JSON.parse(localStorage.getItem("expenses")) || [];
  });
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (!amount) return;
    const newExpense = { id: Date.now(), amount: parseFloat(amount), category };
    setExpenses([...expenses, newExpense]);
    setAmount("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const expenseData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.category === expense.category);
    if (existingCategory) {
      existingCategory.amount += expense.amount;
    } else {
      acc.push({ category: expense.category, amount: expense.amount });
    }
    return acc;
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Expense Tracker</h2>
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded-lg mb-2" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded-lg mb-2">
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Bills</option>
        </select>
        <button onClick={addExpense} className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition">Add Expense</button>
        <ul className="mt-4">
          {expenses.map(expense => (
            <li key={expense.id} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg mt-2">
              <span>{expense.category}: ₹{expense.amount}</span>
              <button onClick={() => deleteExpense(expense.id)} className="text-red-500">X</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-white mb-2">Expense Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={expenseData}>
            <XAxis dataKey="category" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="amount" fill="#82ca9d" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExpenseTracker;