import BaseOverview from "./BaseOverview";

const ExpenseOverview = ({ transactions, onAddExpense }) => (
    <BaseOverview
        title="Expense Overview"
        description="Track your spending over time and analyze your expense trends with our comprehensive overview."
        transactions={transactions}
        onAdd={onAddExpense}
        addLabel="Add Expense"
        color="#ef4444"
        gradientId="expenseGradient"
    />
);

export default ExpenseOverview;
