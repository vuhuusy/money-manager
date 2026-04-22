package vn.syvh.moneymanager.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CategoryDTO {

    private Long id;
    private Long profileId;

    @NotBlank(message = "Category name is required")
    private String name;
    private String icon;

    @NotBlank(message = "Type is required")
    @Pattern(regexp = "(?i)INCOME|EXPENSE", message = "Type must be INCOME or EXPENSE")
    private String type;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
