import { useState } from "react";
import { useUser } from "../hooks/useUser";
import { useIncome } from "../hooks/useIncome";
import { useCategories } from "../hooks/useCategories";
import { Dashboard } from "../components/layout";
import { Modal, DeleteAlert } from "../components/common";
import { IncomeList, IncomeOverview } from "../components/transactions";
import { AddIncomeForm } from "../components/forms";

const Income = () => {
  useUser();
  const { data: incomeData, addIncome, deleteIncome, downloadIncomes, emailIncomes } = useIncome();
  const { data: categories } = useCategories("income");
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  const handleAddIncome = async (income) => {
    await addIncome(income);
    setOpenAddIncomeModal(false);
  };

  const handleDeleteIncome = async () => {
    await deleteIncome(openDeleteAlert.data);
    setOpenDeleteAlert({ show: false, data: null });
  };

  return (
    <Dashboard activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <IncomeOverview
            transactions={incomeData}
            onAddIncome={() => setOpenAddIncomeModal(true)}
          />
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={downloadIncomes}
            onEmail={emailIncomes}
          />
          <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
            <AddIncomeForm onAddIncome={handleAddIncome} categories={categories} />
          </Modal>
          <Modal
            isOpen={openDeleteAlert.show}
            onClose={() => setOpenDeleteAlert({ show: false, data: null })}
            title="Delete Income"
          >
            <DeleteAlert
              content="Are you sure you want to delete this income entry? This action cannot be undone."
              onDelete={handleDeleteIncome}
            />
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Income;
