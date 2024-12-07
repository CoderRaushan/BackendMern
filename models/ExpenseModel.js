import mongoose from "mongoose";
const ExpenseSchema = mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
  },
  { timestamps: true }
);
const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
