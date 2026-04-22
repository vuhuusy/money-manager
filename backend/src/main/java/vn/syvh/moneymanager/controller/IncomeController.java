package vn.syvh.moneymanager.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;
import vn.syvh.moneymanager.dto.IncomeDTO;
import vn.syvh.moneymanager.service.IncomeService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {

    private final IncomeService incomeService;

    @PostMapping
    public ResponseEntity<IncomeDTO> addIncome(@Valid @RequestBody IncomeDTO incomeDTO) {

        IncomeDTO createdIncome = incomeService.addIncome(incomeDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdIncome);
    }

    @GetMapping
    public ResponseEntity<List<IncomeDTO>> getIncomesForCurrentMonth() {

        return ResponseEntity.ok(incomeService.getIncomesForCurrentMonth());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncome(@PathVariable Long id) {

        incomeService.deleteIncome(id);
        return ResponseEntity.noContent().build();
    }
}
