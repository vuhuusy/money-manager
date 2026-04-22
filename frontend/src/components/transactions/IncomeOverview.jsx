import BaseOverview from "./BaseOverview";

const IncomeOverview = ({ transactions, onAddIncome }) => (
    <BaseOverview
        title="Income Overview"
        description="Track your earnings over time and analyze your income trends with our comprehensive overview."
        transactions={transactions}
        onAdd={onAddIncome}
        addLabel="Add Income"
        color="#10b981"
        gradientId="incomeGradient"
    />
);

export default IncomeOverview;
