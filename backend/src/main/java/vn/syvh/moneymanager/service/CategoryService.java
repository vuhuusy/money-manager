package vn.syvh.moneymanager.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.syvh.moneymanager.dto.CategoryDTO;
import vn.syvh.moneymanager.entity.CategoryEntity;
import vn.syvh.moneymanager.entity.ProfileEntity;
import vn.syvh.moneymanager.repository.CategoryRepository;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final ProfileService profileService;
    private final CategoryRepository categoryRepository;

    public CategoryDTO saveCategory(CategoryDTO categoryDTO) {

        ProfileEntity currentProfile = profileService.getCurrentProfile();
        if (categoryRepository.existsByNameAndProfileId(categoryDTO.getName(), currentProfile.getId())) {
            throw new RuntimeException("Category name already exists");
        }

        CategoryEntity newCategory = toEntity(categoryDTO, currentProfile);
        return toDTO(categoryRepository.save(newCategory));
    }

    public List<CategoryDTO> getCategoriesForCurrentProfile() {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByProfileId(currentProfile.getId());
        return categories.stream().map(this::toDTO).toList();
    }

    public List<CategoryDTO> getCategoriesByTypeForCurrentProfile(String type) {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByTypeAndProfileId(type, currentProfile.getId());
        return categories.stream().map(this::toDTO).toList();
    }

    public CategoryDTO updateCategory(Long id, CategoryDTO categoryDTO) {
        ProfileEntity currentProfile = profileService.getCurrentProfile();
        CategoryEntity existingCategory = categoryRepository.findByIdAndProfileId(id, currentProfile.getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        if (!existingCategory.getName().equals(categoryDTO.getName()) &&
                categoryRepository.existsByNameAndProfileId(categoryDTO.getName(), currentProfile.getId())) {
            throw new RuntimeException("Category name already exists");
        }

        existingCategory.setName(categoryDTO.getName());
        existingCategory.setType(categoryDTO.getType().toLowerCase());
        existingCategory.setIcon(categoryDTO.getIcon());

        return toDTO(categoryRepository.save(existingCategory));
    }

    // Helper method
    private CategoryEntity toEntity(CategoryDTO categoryDTO, ProfileEntity profile) {
        return CategoryEntity.builder()
                .name(categoryDTO.getName())
                .type(categoryDTO.getType().toLowerCase())
                .icon(categoryDTO.getIcon())
                .profile(profile)
                .build();
    }

    private CategoryDTO toDTO(CategoryEntity categoryEntity) {
        return CategoryDTO.builder()
                .id(categoryEntity.getId())
                .name(categoryEntity.getName())
                .type(categoryEntity.getType())
                .icon(categoryEntity.getIcon())
                .profileId(categoryEntity.getProfile() != null ? categoryEntity.getProfile().getId() : null)
                .createdAt(categoryEntity.getCreatedAt())
                .updatedAt(categoryEntity.getUpdatedAt())
                .build();
    }
}
