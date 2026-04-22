package vn.syvh.moneymanager.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.syvh.moneymanager.dto.ExpenseDTO;
import vn.syvh.moneymanager.dto.FilterDTO;
import vn.syvh.moneymanager.dto.IncomeDTO;
import vn.syvh.moneymanager.dto.TransactionDTO;
import vn.syvh.moneymanager.service.ExpenseService;
import vn.syvh.moneymanager.service.IncomeService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/filter")
public class FilterController {

    private final ExpenseService expenseService;
    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<?> filterTransactions(@RequestBody FilterDTO filterDTO) {

        LocalDate startDate = filterDTO.getStartDate() != null ? filterDTO.getStartDate() : LocalDate.of(2000, 1, 1);
        LocalDate endDate = filterDTO.getEndDate() != null ? filterDTO.getEndDate() : LocalDate.now();
        String keyword = filterDTO.getKeyword() != null ? filterDTO.getKeyword() : "";
        String sortBy = filterDTO.getSortBy() != null ? filterDTO.getSortBy() : "date";
        // Map frontend field names to entity field names
        String entitySortBy = switch (sortBy) {
            case "category" -> "category.name";
            default -> sortBy;
        };
        Sort.Direction sortDirection = "desc".equalsIgnoreCase(filterDTO.getSortDirection()) ? Sort.Direction.DESC
                : Sort.Direction.ASC;
        Sort sort = Sort.by(sortDirection, entitySortBy);

        if ("expense".equalsIgnoreCase(filterDTO.getType())) {
            List<ExpenseDTO> expenses = expenseService.filterExpenses(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(expenses);
        } else if ("income".equalsIgnoreCase(filterDTO.getType())) {
            List<IncomeDTO> incomes = incomeService.filterIncomes(startDate, endDate, keyword, sort);
            return ResponseEntity.ok(incomes);
        } else if ("all".equalsIgnoreCase(filterDTO.getType())) {
            List<IncomeDTO> incomes = incomeService.filterIncomes(startDate, endDate, keyword, sort);
            List<ExpenseDTO> expenses = expenseService.filterExpenses(startDate, endDate, keyword, sort);

            List<TransactionDTO> merged = new ArrayList<>();
            incomes.forEach(i -> merged.add(TransactionDTO.builder()
                    .id(i.getId()).name(i.getName()).icon(i.getIcon())
                    .date(i.getDate()).categoryName(i.getCategoryName())
                    .amount(i.getAmount()).type("income").createdAt(i.getCreatedAt()).build()));
            expenses.forEach(e -> merged.add(TransactionDTO.builder()
                    .id(e.getId()).name(e.getName()).icon(e.getIcon())
                    .date(e.getDate()).categoryName(e.getCategoryName())
                    .amount(e.getAmount()).type("expense").createdAt(e.getCreatedAt()).build()));

            Comparator<TransactionDTO> comparator;
            if ("amount".equals(sortBy)) {
                comparator = Comparator.comparing(TransactionDTO::getAmount,
                        Comparator.nullsLast(Comparator.naturalOrder()));
            } else if ("category".equals(sortBy)) {
                comparator = Comparator.comparing(
                        (TransactionDTO t) -> t.getCategoryName() != null ? t.getCategoryName() : "");
            } else {
                comparator = Comparator.comparing(TransactionDTO::getDate,
                        Comparator.nullsLast(Comparator.naturalOrder()));
            }
            if (sortDirection == Sort.Direction.DESC) comparator = comparator.reversed();
            merged.sort(comparator);

            return ResponseEntity.ok(merged);
        } else {
            return ResponseEntity.badRequest().body("Invalid type. Must be 'income', 'expense', or 'all'.");
        }
    }
}
