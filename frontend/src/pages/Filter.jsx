import { useState } from "react";
import { Search } from "lucide-react";
import moment from "moment";
import { toast } from "react-toastify";
import { useUser } from "../hooks/useUser";
import { applyFilter } from "../services/filterService";
import { Dashboard } from "../components/layout";
import { TransactionInfoCard } from "../components/transactions";

const Filter = () => {
  useUser();
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [keyword, setKeyword] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appliedType, setAppliedType] = useState("all");

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAppliedType(type);
      const data = await applyFilter({ type, startDate, endDate, sortField, sortOrder, keyword });
      setTransactions(data);

    } catch (error) {
      console.error("Error applying filter:", error);
      toast.error(
        error?.response?.data?.message ||
        "Failed to apply filter. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard activeMenu="Filter">
      <div className="my-5 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">
            Filter Transactions
          </h2>
        </div>
        <div className="card p-4 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-lg font-semibold">
              Select the filters
            </h5>
          </div>
          <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium mb-1">
                Type
              </label>
              <select value={type} onChange={(e) => setType(e.target.value)} id="type" className="w-full border rounded px-3 py-2 bg-white">
                <option value="all">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                Start Date
              </label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} id="startDate" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                End Date
              </label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} id="endDate" className="w-full border rounded px-3 py-2" />
            </div>
            <div>
              <label htmlFor="sortField" className="block text-sm font-medium mb-1">
                Sort By
              </label>
              <select value={sortField} onChange={(e) => setSortField(e.target.value)} id="sortField" className="w-full border rounded px-3 py-2 bg-white">
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortOrder" className="block text-sm font-medium mb-1">
                Sort Order
              </label>
              <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} id="sortOrder" className="w-full border rounded px-3 py-2 bg-white">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="sm:col-span-1 md:col-span-1 flex items-end">
              <div className="w-full">
                <label htmlFor="keyword" className="block text-sm font-medium mb-1">
                  Search
                </label>
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} id="keyword" placeholder="Search..." className="w-full border rounded px-3 py-2" />
              </div>
              <button onClick={handleFilter} className="ml-2 mb-1 p-2 bg-violet-600 hover:bg-violet-700 text-white rounded flex items-center justify-center cursor-pointer">
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-2xl font-semibold">
              Transactions
            </h5>
          </div>
          {transactions.length === 0 && !loading && (
            <p className="text-gray-500">
              Select filters and click the search button to see results here.
            </p>
          )}

          {loading && (
            <p className="text-gray-500">
              Loading transactions...
            </p>
          )}

          {transactions.map((transaction) => (
            <TransactionInfoCard key={`${transaction.type}-${transaction.id}`}
              title={transaction.name}
              icon={transaction.icon}
              date={moment(transaction.date).format("Do MMM YYYY")}
              amount={transaction.amount}
              type={appliedType === "all" ? transaction.type : appliedType}
              categoryName={transaction.categoryName}
              hideDeleteBtn
            />
          ))}

        </div>
      </div>
    </Dashboard>
  );
};

export default Filter;
