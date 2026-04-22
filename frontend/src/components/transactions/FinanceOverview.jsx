import { formatCurrency } from "../../utils/helper";
import { CustomPieChart } from "../charts";

const FinanceOverview = ({ totalBalance, totalIncomes, totalExpenses }) => {
    const COLORS = ["#7C3AED", "#15803D", "#b91c1c"];
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Incomes", amount: totalIncomes },
        { name: "Total Expenses", amount: totalExpenses },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium">Finance Overview</h5>
            </div>
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={formatCurrency(totalBalance)}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;
