package vn.syvh.moneymanager.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.syvh.moneymanager.dto.IncomeDTO;
import vn.syvh.moneymanager.entity.CategoryEntity;
import vn.syvh.moneymanager.entity.IncomeEntity;
import vn.syvh.moneymanager.entity.ProfileEntity;
import vn.syvh.moneymanager.repository.CategoryRepository;
import vn.syvh.moneymanager.repository.IncomeRepository;

@Service
@RequiredArgsConstructor
public class IncomeService {

    private final CategoryRepository categoryRepository;
    private final IncomeRepository incomeRepository;
    private final ProfileService profileService;

    public IncomeDTO addIncome(IncomeDTO incomeDTO) {

        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity category = categoryRepository.findById(incomeDTO.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + incomeDTO.getCategoryId()));
        IncomeEntity income = toEntity(incomeDTO, profile, category);
        incomeRepository.save(income);
        return toDTO(income);
    }

    // Retrive all incomes for current month/based on date range
    public List<IncomeDTO> getIncomesForCurrentMonth() {

        ProfileEntity profile = profileService.getCurrentProfile();
        LocalDate now = LocalDate.now();
        LocalDate startOfMonth = now.withDayOfMonth(1);
        LocalDate endOfMonth = now.withDayOfMonth(now.lengthOfMonth());
        List<IncomeEntity> incomes = incomeRepository.findByProfileIdAndDateBetween(profile.getId(), startOfMonth,
                endOfMonth);
        return incomes.stream().map(this::toDTO).toList();
    }

    // Delete income by id
    public void deleteIncome(Long incomeId) {

        ProfileEntity profile = profileService.getCurrentProfile();
        IncomeEntity income = incomeRepository.findById(incomeId)
                .orElseThrow(() -> new RuntimeException("Income not found with id: " + incomeId));

        if (!income.getProfile().getId().equals(profile.getId())) {
            throw new RuntimeException("Unauthorized to delete this income");
        }

        incomeRepository.delete(income);
    }

    // Get latest 5 incomes
    public List<IncomeDTO> getLatest5Incomes() {

        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> incomes = incomeRepository.findTop5ByProfileIdOrderByDateDesc(profile.getId());
        return incomes.stream().map(this::toDTO).toList();
    }

    // Get all incomes for current user
    public List<IncomeDTO> getAllIncomes() {

        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> incomes = incomeRepository.findByProfileIdOrderByDateDesc(profile.getId());
        return incomes.stream().map(this::toDTO).toList();
    }

    // Get total incomes
    public BigDecimal getTotalIncomes() {

        ProfileEntity profile = profileService.getCurrentProfile();
        BigDecimal totalIncomes = incomeRepository.findTotalIncomeByProfileId(profile.getId());
        return totalIncomes != null ? totalIncomes : BigDecimal.ZERO;
    }

    // Filter incomes
    public List<IncomeDTO> filterIncomes(LocalDate startDate, LocalDate endDate, String keyword, Sort sort) {

        ProfileEntity profile = profileService.getCurrentProfile();
        List<IncomeEntity> incomes = incomeRepository
                .findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(profile.getId(), startDate, endDate,
                        keyword, sort);
        return incomes.stream().map(this::toDTO).toList();
    }

    // Helper method
    private IncomeEntity toEntity(IncomeDTO incomeDTO, ProfileEntity profile, CategoryEntity category) {

        return IncomeEntity.builder()
                .name(incomeDTO.getName())
                .icon(incomeDTO.getIcon())
                .amount(incomeDTO.getAmount())
                .date(incomeDTO.getDate())
                .profile(profile)
                .category(category)
                .build();
    }

    private IncomeDTO toDTO(IncomeEntity incomeEntity) {
        return IncomeDTO.builder()
                .id(incomeEntity.getId())
                .name(incomeEntity.getName())
                .icon(incomeEntity.getIcon())
                .categoryId(incomeEntity.getCategory() != null ? incomeEntity.getCategory().getId() : null)
                .categoryName(incomeEntity.getCategory() != null ? incomeEntity.getCategory().getName() : null)
                .date(incomeEntity.getDate())
                .amount(incomeEntity.getAmount())
                .type("income")
                .createdAt(incomeEntity.getCreatedAt())
                .updatedAt(incomeEntity.getUpdatedAt())
                .build();
    }
}
