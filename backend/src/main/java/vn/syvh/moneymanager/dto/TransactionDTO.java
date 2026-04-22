package vn.syvh.moneymanager.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionDTO {

    private Long id;
    private String name;
    private String icon;
    private LocalDate date;
    private String categoryName;
    private BigDecimal amount;
    private String type;
    private LocalDateTime createdAt;
}
