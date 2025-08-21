# Git Workflow Guide

## Repository Structure

```
main branch (current)
├── Extension source code
├── Complete QA infrastructure 
├── Store submission assets
└── Chrome MV3 preparation

Future branches:
├── feature/* - New features
├── chrome-release - Chrome Web Store variant
└── v1.0.0 - Release tags
```

## Development Workflow

### Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature-name

# Make changes, test thoroughly
git add .
git commit -m "Add new feature: description"

# Merge back to main
git checkout main
git merge feature/new-feature-name
git branch -d feature/new-feature-name
```

### Release Process
```bash
# Create release branch for final testing
git checkout -b release/v0.6.0

# Run complete test suite
npm test
./tests/manual_test_cases.md

# Build and validate package
./build.sh
npx addons-linter dist/claude-usage-counter-v0.6.0.zip

# Update version in manifest.json
git add manifest.json
git commit -m "Bump version to 0.6.0"

# Merge to main and tag
git checkout main
git merge release/v0.6.0
git tag v0.6.0
git branch -d release/v0.6.0
```

### Chrome Variant Workflow
```bash
# Create Chrome branch from main
git checkout -b chrome-release

# Copy files to chrome_mv3/ and modify for MV3
cp -r popup/ content/ icon*.png chrome_mv3/
# Update service worker, test thoroughly

# Commit Chrome-specific changes
git add chrome_mv3/
git commit -m "Prepare Chrome MV3 release variant"

# Build Chrome package
cd chrome_mv3
zip -r claude-usage-counter-chrome-v1.0.0.zip *
```

## Commit Message Conventions

### Format
```
<type>: <description>

[optional body]

🤖 Generated with Claude Code
https://claude.ai/code

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Types
- `feat:` New features
- `fix:` Bug fixes  
- `test:` Test additions/improvements
- `docs:` Documentation updates
- `build:` Build system changes
- `release:` Version bumps and releases

### Examples
```bash
git commit -m "feat: Add image resolution detection for token counting"
git commit -m "fix: Handle edge case with zero-byte file uploads"
git commit -m "test: Add exploratory testing for Unicode text"
git commit -m "release: Version 0.6.0 with enhanced file support"
```

## Branch Protection

### Main Branch Rules
- All changes via pull requests (when working with collaborators)
- Require passing tests before merge
- No direct pushes to main (except solo development)

### Release Readiness
Before merging to main:
- [ ] All P1 test cases pass
- [ ] AMO linter validation clean
- [ ] Documentation updated
- [ ] Version bumped in manifest.json

## Tagging Strategy

### Version Tags
```bash
# Create annotated tags for releases
git tag -a v0.5.0 -m "Firefox AMO initial release"
git tag -a v1.0.0 -m "Chrome Web Store release"

# Push tags to remote (when added)
git push origin --tags
```

### Tag Naming
- `v0.x.x` - Firefox MV2 releases
- `v1.x.x` - Chrome MV3 releases  
- `beta-x.x.x` - Pre-release testing
- `hotfix-x.x.x` - Emergency fixes

## Repository Backup

### Current Status
- ✅ Complete codebase committed
- ✅ All QA infrastructure included
- ✅ Store assets and documentation ready
- ✅ Build system functional

### Remote Setup (Recommended)
```bash
# Add GitHub/GitLab remote when ready
git remote add origin https://github.com/username/claude-usage-counter.git
git push -u origin main
git push origin --tags
```

## File Organization

### What's Tracked
- Extension source code (background/, content/, popup/)
- Test infrastructure (tests/, fixtures)
- Build system (build.sh, package.json)
- Documentation (README, LICENSE, etc.)
- Store assets and guides

### What's Ignored (.gitignore)
- Built packages (dist/*.zip)
- Node modules and dependencies
- Test outputs and reports
- Development artifacts
- Screenshots (created manually)

---

**Repository is ready for development and collaboration! 🚀**