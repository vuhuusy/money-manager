package vn.syvh.moneymanager.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import vn.syvh.moneymanager.entity.IncomeEntity;

public interface IncomeRepository extends JpaRepository<IncomeEntity, Long> {

    @EntityGraph(attributePaths = { "category" })
    List<IncomeEntity> findByProfileIdOrderByDateDesc(Long profileId);

    @EntityGraph(attributePaths = { "category" })
    List<IncomeEntity> findTop5ByProfileIdOrderByDateDesc(Long profileId);

    @Query("SELECT SUM(i.amount) FROM IncomeEntity i WHERE i.profile.id = :profileId")
    BigDecimal findTotalIncomeByProfileId(@Param("profileId") Long profileId);

    @EntityGraph(attributePaths = { "category" })
    @Query("SELECT i FROM IncomeEntity i LEFT JOIN i.category c WHERE i.profile.id = :profileId AND i.date BETWEEN :startDate AND :endDate AND LOWER(i.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<IncomeEntity> findByProfileIdAndDateBetweenAndNameContainingIgnoreCase(
            @Param("profileId") Long profileId,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("keyword") String keyword,
            Sort sort);

    @EntityGraph(attributePaths = { "category" })
    List<IncomeEntity> findByProfileIdAndDateBetween(Long profileId, LocalDate startDate, LocalDate endDate);

    @EntityGraph(attributePaths = { "category" })
    List<IncomeEntity> findByProfileIdAndDate(Long profileId, LocalDate date);
}
