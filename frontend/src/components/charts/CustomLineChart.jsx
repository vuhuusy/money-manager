import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../../utils/helper";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { totalAmount, items = [] } = payload[0].payload;
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-3 text-sm min-w-[160px]">
                <p className="font-semibold text-gray-700 mb-2">{label}</p>
                <p className="text-emerald-600 font-semibold mb-2">Total: {formatCurrency(totalAmount)}</p>
                {items.length > 0 && (
                    <>
                        <p className="text-gray-500 text-xs font-medium mb-1">Details:</p>
                        <ul className="space-y-0.5">
                            {items.map((item) => (
                                <li key={item.id} className="flex justify-between gap-4 text-xs text-gray-600">
                                    <span>{item.name}</span>
                                    <span className="font-medium">{formatCurrency(item.amount)}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        );
    }
    return null;
};

const CustomLineChart = ({ data, gradientId = "chartGradient", color = "#10b981" }) => {
    if (!data || data.length === 0) {
        return <p className="text-gray-400 text-sm text-center py-10">No data available</p>;
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
                <defs>
                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} tickLine={false} axisLine={false} />
                <YAxis
                    tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={false}
                    width={45}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="totalAmount"
                    stroke={color}
                    strokeWidth={2}
                    fill={`url(#${gradientId})`}
                    dot={{ r: 4, fill: color, strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
