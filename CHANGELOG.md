# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

### Removed

### Security

## [0.1.0] - 2026-03-14

### Added

- Spring Boot application entry point
- Profile module with entity and repository
- Auth and Profile data transfer objects (DTOs)
- Service layer: ProfileService, EmailService, AppUserDetailsService
- REST controllers: HomeController, ProfileController
- Spring Security configuration
- Maven wrapper and project configuration
- Conventional commit message generator agent

### Security

- Externalized sensitive credentials to environment variables
- Added `.env` to `.gitignore` to prevent credential exposure

[Unreleased]: https://github.com/username/money-manager/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/username/money-manager/releases/tag/v0.1.0
