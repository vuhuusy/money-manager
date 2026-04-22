package vn.syvh.moneymanager.controller;

import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vn.syvh.moneymanager.entity.ProfileEntity;
import vn.syvh.moneymanager.service.EmailService;
import vn.syvh.moneymanager.service.ExcelService;
import vn.syvh.moneymanager.service.ProfileService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;
    private final ExcelService excelService;
    private final ProfileService profileService;

    @PostMapping("/income-excel")
    public ResponseEntity<Void> emailIncomeExcel() throws IOException {

        ProfileEntity profile = profileService.getCurrentProfile();
        byte[] excelBytes = excelService.exportIncomesToExcel();

        emailService.sendEmailWithAttachment(
                profile.getEmail(),
                "Your Income Report",
                "Hi " + profile.getFullName() + ",\n\nPlease find your income report attached.\n\nBest regards,\nMoney Manager Team",
                excelBytes,
                "incomes.xlsx"
        );

        return ResponseEntity.ok().build();
    }

    @PostMapping("/expense-excel")
    public ResponseEntity<Void> emailExpenseExcel() throws IOException {

        ProfileEntity profile = profileService.getCurrentProfile();
        byte[] excelBytes = excelService.exportExpensesToExcel();

        emailService.sendEmailWithAttachment(
                profile.getEmail(),
                "Your Expense Report",
                "Hi " + profile.getFullName() + ",\n\nPlease find your expense report attached.\n\nBest regards,\nMoney Manager Team",
                excelBytes,
                "expenses.xlsx"
        );

        return ResponseEntity.ok().build();
    }
}
