package vn.syvh.moneymanager.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import vn.syvh.moneymanager.entity.ExpenseEntity;

public interface ExpenseRepository extends JpaRepository<ExpenseEntity, Long> {

    @EntityGraph(attributePaths = { "category" })
    List<ExpenseEntity> findByProfileIdOrderByDateDesc(Long profileId);

    @EntityGraph(attributePaths = { "category" })
    List<ExpenseEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    @Query("SELECT SUM(e.amount) FROM ExpenseEntity e WHERE e.profile.id = :profileId")
    BigDecimal findTotalExpenseByProfileId(@Param("profileId") Long profileId);

    @EntityGraph(attributePaths = { "category" })
    @Query("SELECT e FROM ExpenseEntity e LEFT JOIN e.category c WHERE e.profile.id = :profileId AND e.date BETWEEN :startDate AND :endDate AND LOWER(e.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<ExpenseEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            @Param("profileId") Long profileId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("keyword") String keyword,
            Sort sort);

    @EntityGraph(attributePaths = { "category" })
    List<ExpenseEntity> findByProfileIdAndDateBetween(Long profileId, LocalDate startDate, LocalDate endDate);

    @EntityGraph(attributePaths = { "category" })
    List<ExpenseEntity> findByProfileIdAndDate(Long profileId, LocalDate date);
}
