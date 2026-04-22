package vn.syvh.moneymanager.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static java.util.stream.Stream.concat;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.syvh.moneymanager.dto.ExpenseDTO;
import vn.syvh.moneymanager.dto.IncomeDTO;
import vn.syvh.moneymanager.dto.RecentTransactionDTO;
import vn.syvh.moneymanager.entity.ProfileEntity;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final IncomeService incomeService;
    private final ExpenseService expenseService;
    private final ProfileService profileService;

    public Map<String, Object> getDashboardData() {

        ProfileEntity profile = profileService.getCurrentProfile();
        Map<String, Object> dashboardData = new LinkedHashMap<>();
        List<IncomeDTO> latestIncomes = incomeService.getLatest5Incomes();
        List<ExpenseDTO> latestExpenses = expenseService.getLatest5Expenses();

        List<RecentTransactionDTO> recentTransactions = concat(latestIncomes.stream()
                .map(income -> RecentTransactionDTO.builder()
                        .id(income.getId())
                        .profileId(profile.getId())
                        .icon(income.getIcon())
                        .name(income.getName())
                        .amount(income.getAmount())
                        .date(income.getDate())
                        .createdAt(income.getCreatedAt())
                        .updatedAt(income.getUpdatedAt())
                        .type("income")
                        .build()),
                latestExpenses.stream().map(
                        expense -> RecentTransactionDTO.builder()
                                .id(expense.getId())
                                .profileId(profile.getId())
                                .icon(expense.getIcon())
                                .name(expense.getName())
                                .amount(expense.getAmount())
                                .date(expense.getDate())
                                .createdAt(expense.getCreatedAt())
                                .updatedAt(expense.getUpdatedAt())
                                .type("expense")
                                .build()))
                .sorted((a, b) -> {
                    int dateComparison = b.getDate().compareTo(a.getDate());
                    if (dateComparison == 0 && a.getCreatedAt() != null
                            && b.getCreatedAt() != null) {
                        return b.getCreatedAt().compareTo(a.getCreatedAt());
                    }
                    return dateComparison;
                })
                .toList();
        dashboardData.put("totalBalance", incomeService.getTotalIncomes().subtract(expenseService.getTotalExpenses()));
        dashboardData.put("totalIncomes", incomeService.getTotalIncomes());
        dashboardData.put("totalExpenses", expenseService.getTotalExpenses());
        dashboardData.put("recent5Incomes", latestIncomes);
        dashboardData.put("recent5Expenses", latestExpenses);
        dashboardData.put("recentTransactions", recentTransactions);
        return dashboardData;
    }
}