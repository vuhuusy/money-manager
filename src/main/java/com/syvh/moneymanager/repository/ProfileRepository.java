package com.syvh.moneymanager.repository;

import com.syvh.moneymanager.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {

    // select * from tbl_profile where email =?
    Optional<ProfileEntity> findByEmail(String email);

    // select * from tbl_profile where activation_token =?
    Optional<ProfileEntity> findByActivationToken(String activationToken);
}
