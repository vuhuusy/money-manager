package vn.syvh.moneymanager.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import vn.syvh.moneymanager.dto.ExpenseDTO;
import vn.syvh.moneymanager.repository.ProfileRepository;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationService {

    private final ExpenseService expenseService;
    private final EmailService emailService;
    private final ProfileRepository profileRepository;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Scheduled(cron = "0 0 8 * * ?", zone = "Asia/Ho_Chi_Minh") // Every day at 8 AM
    public void sendDailyIncomeExpenseReminder() {

        log.info("Starting daily income/expense reminder job");

        profileRepository.findAll().forEach(profile -> {
            String body = """
                    Hi %s,<br><br>
                    This is a friendly reminder to add your income and expenses for today in Money Manager.<br><br>
                    <a href="%s/dashboard">Go to Dashboard</a><br><br>
                    Best regards,<br>Money Manager Team
                    """.formatted(profile.getFullName(), frontendUrl);

            emailService.sendEmail(profile.getEmail(), "Daily Reminder: Track Your Finances", body);
        });

        log.info("Finished daily income/expense reminder job");
    }

    @Scheduled(cron = "0 0 23 * * ?", zone = "Asia/Ho_Chi_Minh") // Every day at 11 PM
    public void sendDailyExpenseSummary() {

        log.info("Starting daily expense summary job");

        profileRepository.findAll().forEach(profile -> {
            List<ExpenseDTO> todayExpenses = expenseService.getExpensesOnDate(profile.getId(),
                    java.time.LocalDate.now());

            if (!todayExpenses.isEmpty()) {
                StringBuilder body = new StringBuilder("""
                        Hi %s,<br><br>
                        Here is a summary of your expenses for today:<br><br>
                        <ul>
                        """.formatted(profile.getFullName()));

                todayExpenses.forEach(expense -> body
                        .append("<li>%s: %,.2f VND</li>".formatted(expense.getName(), expense.getAmount())));
                body.append("</ul><br><br>Best regards,<br>Money Manager Team");

                emailService.sendEmail(profile.getEmail(), "Daily Expense Summary", body.toString());
            }
        });

        log.info("Finished daily expense summary job");
    }
}