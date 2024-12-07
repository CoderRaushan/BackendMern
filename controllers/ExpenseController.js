import jwt from "jsonwebtoken";
import Expense from "../models/ExpenseModel.js";

export const AddExpense = async (req, res) => {
  const token = req.cookies.jwt;
  const { item, cost, category } = req.body;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JwtTokenKEY);
    const userId = decoded.userId;
    const date = new Date().toISOString();
    const expense = new Expense({ item, cost, category, date, userId });
    await expense.save();
    return res.status(201).json({ message: "Item added successfully!" });
  } catch (err) {
    return res.status(403).json({ error: "Token varification error:", err });
  }
};

export const ShowExpense = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JwtTokenKEY);
    const userId = decoded.userId;
    const expenses = await Expense.find({ userId: userId });
    return res
      .status(200)
      .json({ message: "Expenses fetched successfully!", expenses });
  } catch (err) {
    return res.status(403).json({ error: "Token varification error:", err });
  }
};

export const EditExpense = async (req, res) => {
  const itemId = req.params.id;
  const { item, cost, category } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      itemId,
      { item, cost, category },
      { new: true }
    );
    if (!updatedExpense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    return res.status(201).json({ message: "Item updated successfully!" });
  } catch (err) {
    return res
      .status(403)
      .json({ error: "An error occurred while updating the expense", err });
  }
};
