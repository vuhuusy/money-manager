import { useState } from "react";
import { Download, Mail } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";
import Button from "../common/Button";

const BaseTransactionList = ({ title, type, transactions, onDelete, onDownload, onEmail }) => {
    const [emailLoading, setEmailLoading] = useState(false);
    const [downloadLoading, setDownloadLoading] = useState(false);

    const handleEmail = async () => {
        setEmailLoading(true);
        try {
            await onEmail();
        } finally {
            setEmailLoading(false);
        }
    };

    const handleDownload = async () => {
        setDownloadLoading(true);
        try {
            await onDownload();
        } finally {
            setDownloadLoading(false);
        }
    };

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg font-medium">{title}</h5>
                <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" loading={emailLoading} onClick={handleEmail}>
                        {emailLoading ? "Emailing..." : <><Mail size={16} />Email</>}
                    </Button>
                    <Button variant="ghost" loading={downloadLoading} onClick={handleDownload}>
                        {downloadLoading ? "Downloading..." : <><Download size={16} />Download</>}
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.length > 0 ? (
                    transactions.map((item) => (
                        <TransactionInfoCard
                            key={item.id}
                            title={item.name}
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={type}
                            categoryName={item.categoryName}
                            onDelete={() => onDelete(item.id)}
                        />
                    ))
                ) : (
                    <p className="col-span-2 text-gray-400 text-sm text-center py-10">No transactions yet</p>
                )}
            </div>
        </div>
    );
};

export default BaseTransactionList;
