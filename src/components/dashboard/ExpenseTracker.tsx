import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
}

interface ExpenseTrackerProps {
  expenses: Expense[];
  onAddExpense: (expense: Omit<Expense, 'id'>) => void;
  onDeleteExpense: (id: string) => void;
}

export function ExpenseTracker({ expenses, onAddExpense, onDeleteExpense }: ExpenseTrackerProps) {
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.category || !newExpense.amount) return;

    onAddExpense({
      category: newExpense.category,
      amount: Number(newExpense.amount),
      date: newExpense.date
    });

    setNewExpense({
      category: '',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Expense Tracker</h2>

        <form onSubmit={handleSubmit} className="mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Input
              placeholder="Category"
              value={newExpense.category}
              onChange={(e) => setNewExpense(prev => ({
                ...prev,
                category: e.target.value
              }))}
            />
            <Input
              type="number"
              placeholder="Amount"
              value={newExpense.amount}
              onChange={(e) => setNewExpense(prev => ({
                ...prev,
                amount: e.target.value
              }))}
            />
            <Input
              type="date"
              value={newExpense.date}
              onChange={(e) => setNewExpense(prev => ({
                ...prev,
                date: e.target.value
              }))}
            />
          </div>
          <Button
            type="submit"
            className="mt-4 w-full bg-[hsl(var(--gold))] text-[hsl(var(--navy))]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </form>

        <div className="space-y-4">
          {expenses.map((expense) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-black/20 rounded-lg"
            >
              <div>
                <p className="font-medium">{expense.category}</p>
                <p className="text-sm text-white/60">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  {expense.amount.toLocaleString()} AUD
                </span>
                <button
                  onClick={() => onDeleteExpense(expense.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
}