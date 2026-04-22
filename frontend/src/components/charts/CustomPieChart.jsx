import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-sm pointer-events-none">
                <p className="text-gray-600 font-medium">{payload[0].name}</p>
                <p className="text-gray-900 font-semibold">{payload[0].value?.toLocaleString("vi-VN")} ₫</p>
            </div>
        );
    }
    return null;
};

const CustomPieChart = ({ data, label, totalAmount, colors }) => {
    const isEmpty = !data || data.length === 0 || data.every(d => !d.amount);

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center h-[320px] text-gray-400">
                <p className="text-sm">No data available</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={320}>
            <PieChart margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                <Pie data={data} cx="50%" cy="44%" innerRadius={90} outerRadius={130} dataKey="amount" nameKey="name">
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <text x="50%" y="39%" textAnchor="middle" dominantBaseline="middle" fill="#6B7280" fontSize={13}>{label}</text>
                <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" fill="#111827" fontSize={18} fontWeight="600">{totalAmount}</text>
                <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 10 }} allowEscapeViewBox={{ x: true, y: true }} offset={15} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;
