package vn.syvh.moneymanager.service;

import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vn.syvh.moneymanager.dto.AuthDTO;
import vn.syvh.moneymanager.dto.ProfileDTO;
import vn.syvh.moneymanager.entity.ProfileEntity;
import vn.syvh.moneymanager.repository.ProfileRepository;

import vn.syvh.moneymanager.util.JwtUtil;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Value("${app.activation.base-url}")
    private String activationBaseUrl;

    public ProfileDTO registerProfile(ProfileDTO profileDTO) {

        if (profileRepository.findByEmail(profileDTO.getEmail()).isPresent()) {
            throw new IllegalArgumentException("This email is already taken.");
        }

        ProfileEntity newProfile = toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        profileRepository.save(newProfile);

        // Send activation email
        String activationLink = activationBaseUrl + "/api/v1.0/activate?token="
                + newProfile.getActivationToken();
        String subject = "Activate Your Money Manager Account";
        String body = "Hi " + newProfile.getFullName() + ",\n\n"
                + "Thank you for registering with Money Manager! Please click the link below to activate your account:\n"
                + activationLink + "\n\n"
                + "If you did not register for this account, please ignore this email.\n\n"
                + "Best regards,\nMoney Manager Team";
        emailService.sendEmail(newProfile.getEmail(), subject, body);

        return toDTO(newProfile);
    }

    public ProfileEntity toEntity(ProfileDTO profileDTO) {

        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(passwordEncoder.encode(profileDTO.getPassword()))
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(ProfileEntity profileEntity) {

        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken) {

        return profileRepository.findByActivationToken(activationToken)
                .map(profile -> {
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return profileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email: " + email));
    }

    public ProfileDTO getPublicProfile(String email) {
        ProfileEntity currentUser = null;
        if (email == null) {
            currentUser = getCurrentProfile();
        } else {
            currentUser = profileRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email: " + email));
        }

        return toDTO(currentUser);
    }

    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        String email = authDTO.getEmail();
        authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(email, authDTO.getPassword()));

        ProfileEntity profile = profileRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException("Invalid email or password"));
        if (!profile.getIsActive()) {
            throw new DisabledException("Account is not active. Please activate your account first.");
        }

        String token = jwtUtil.generateToken(email);
        return Map.of("token", token,
                "user", getPublicProfile(email));
    }
}