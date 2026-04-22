import BaseTransactionList from "./BaseTransactionList";

const ExpenseList = (props) => (
    <BaseTransactionList title="Expense Sources" type="expense" {...props} />
);

export default ExpenseList;
