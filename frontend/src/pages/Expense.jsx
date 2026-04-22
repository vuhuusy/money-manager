import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useExpenses } from "../hooks/useExpenses";
import { useCategories } from "../hooks/useCategories";
import { Dashboard } from "../components/layout";
import { Modal, DeleteAlert } from "../components/common";
import { ExpenseList, ExpenseOverview } from "../components/transactions";
import { AddExpenseForm } from "../components/forms";

const Expense = () => {
  useUser();
  const { data: expenseData, addExpense, deleteExpense, downloadExpenses, emailExpenses } = useExpenses();
  const { data: categories } = useCategories("expense");
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const handleAddExpense = async (expense) => {
    await addExpense(expense);
    setOpenAddExpenseModal(false);
  };

  const handleDeleteExpense = async () => {
    await deleteExpense(openDeleteAlert.data);
    setOpenDeleteAlert({ show: false, data: null });
  };

  return (
    <Dashboard activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
          />
          <ExpenseList
            transactions={expenseData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={downloadExpenses}
            onEmail={emailExpenses}
          />
          <Modal isOpen={openAddExpenseModal} onClose={() => setOpenAddExpenseModal(false)} title="Add Expense">
            <AddExpenseForm onAddExpense={handleAddExpense} categories={categories} />
          </Modal>
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Expense"
          >
            <DeleteAlert
              content="Are you sure you want to delete this expense entry? This action cannot be undone."
              onDelete={handleDeleteExpense}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Expense;
