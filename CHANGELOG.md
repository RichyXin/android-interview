# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2026-03-23

### Added
- AGENTS.md knowledge base for AI assistants
- VERSION file for version tracking
- Version number mechanism

### Fixed
- Card loading bug - questions now load correctly with proper error handling
- Button click events not responding (syntax error in app.js)
- Daily Study page UI - buttons aligned, dropdowns modernized
- Flashcard size increased to 70vh for better answer display

### Changed
- Improved DataLoader with better error handling
- Card data loading now handles missing files gracefully
- Updated deployment workflow documentation

## [1.0.0] - 2026-03-22

### Added
- 600+ Android interview questions across 15 days
- Daily learning mode with progress tracking
- Flashcard mode with flip animation
- AI integration (DashScope/OpenAI support)
- IndexedDB for local progress storage
- Mermaid diagram support in answers
- Category browsing
- Weakness analysis (80% complete)
- Mock interview (80% complete)
- Cloud deployment support

### Technical
- Vanilla JavaScript (ES6+)
- CSS3 with CSS Variables
- No framework dependencies
- Lazy loading for question data