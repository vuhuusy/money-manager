import { useMemo } from "react";
import { Plus } from "lucide-react";
import { prepareLineChartData } from "../../utils/helper";
import { CustomLineChart } from "../charts";

const BaseOverview = ({ title, description, transactions, onAdd, addLabel, color, gradientId }) => {
    const chartData = useMemo(() => prepareLineChartData(transactions), [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h5 className="text-lg font-medium">{title}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">{description}</p>
                </div>
                <button className="add-btn flex items-center gap-1" onClick={onAdd}>
                    <Plus size={16} />
                    {addLabel}
                </button>
            </div>
            <CustomLineChart data={chartData} color={color} gradientId={gradientId} />
        </div>
    );
};

export default BaseOverview;
