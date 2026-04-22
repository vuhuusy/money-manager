import BaseTransactionList from "./BaseTransactionList";

const IncomeList = (props) => (
    <BaseTransactionList title="Income Sources" type="income" {...props} />
);

export default IncomeList;
