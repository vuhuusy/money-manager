import { useNavigate } from "react-router-dom";
import { Coins, Wallet, WalletCards } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { useDashboard } from "../hooks/useDashboard";
import { formatCurrency } from "../utils/helper";
import { Dashboard } from "../components/layout";
import { InfoCard } from "../components/common";
import { RecentTransactions, FinanceOverview, Transactions } from "../components/transactions";

const Home = () => {
  useUser();
  const navigate = useNavigate();
  const { data: dashboardData } = useDashboard();

  return (
    <Dashboard activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<WalletCards size={26} />}
            label="Total Balance"
            value={formatCurrency(dashboardData?.totalBalance || 0)}
            bgColor="bg-purple-600"
          />
          <InfoCard
            icon={<Wallet size={26} />}
            label="Total Income"
            value={formatCurrency(dashboardData?.totalIncomes || 0)}
            bgColor="bg-green-700"
          />
          <InfoCard
            icon={<Coins size={26} />}
            label="Total Expenses"
            value={formatCurrency(dashboardData?.totalExpenses || 0)}
            bgColor="bg-red-700"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions transactions={dashboardData?.recentTransactions || []} />
          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncomes={dashboardData?.totalIncomes || 0}
            totalExpenses={dashboardData?.totalExpenses || 0}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Transactions
            transactions={dashboardData?.recent5Incomes || []}
            onMore={() => navigate("/income")}
            type="income"
            title="Recent Incomes"
          />
          <Transactions
            transactions={dashboardData?.recent5Expenses || []}
            onMore={() => navigate("/expense")}
            type="expense"
            title="Recent Expenses"
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Home;
