import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium">{title}</h5>
                <button className="card-btn" onClick={onMore}>
                    More <ArrowRight size={18} />
                </button>
            </div>
            <div className="mt-6">
                {transactions?.length > 0 ? (
                    transactions.slice(0, 5).map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format("Do MMM YYYY")}
                            amount={transaction.amount}
                            type={type}
                            categoryName={transaction.categoryName}
                            hideDeleteBtn
                        />
                    ))
                ) : (
                    <p className="text-gray-400 text-sm text-center py-10">No transactions yet</p>
                )}
            </div>
        </div>
    );
};

export default Transactions;
