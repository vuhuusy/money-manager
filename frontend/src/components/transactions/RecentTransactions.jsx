import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";

const RecentTransactions = ({ transactions }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium">Recent Transactions</h5>
            </div>
            <div className="mt-6 flex-1 flex items-center justify-center min-h-[200px]">
                {transactions?.length > 0 ? (
                    <div className="w-full">
                        {transactions.slice(0, 5).map((transaction) => (
                            <TransactionInfoCard
                                key={transaction.id}
                                title={transaction.title}
                                icon={transaction.icon}
                                date={moment(transaction.date).format("Do MMM YYYY")}
                                amount={transaction.amount}
                                type={transaction.type}
                                categoryName={transaction.categoryName}
                                hideDeleteBtn
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm">No transactions yet</p>
                )}
            </div>
        </div>
    );
};

export default RecentTransactions;
