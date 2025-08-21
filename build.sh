#!/bin/bash

# Build script for Claude Usage Counter Extension
set -e

VERSION=$(grep '"version"' manifest.json | sed 's/.*"version": "\([^"]*\)".*/\1/')
BUILD_NAME="claude-usage-counter-v${VERSION}"
DIST_DIR="dist"

echo "Building ${BUILD_NAME}..."

# Create dist directory
mkdir -p ${DIST_DIR}

# Clean previous builds
rm -f ${DIST_DIR}/${BUILD_NAME}.zip
rm -f ${DIST_DIR}/${BUILD_NAME}.xpi

# Create ZIP for AMO submission (excludes development files)
zip -r "${DIST_DIR}/${BUILD_NAME}.zip" \
  manifest.json \
  icon*.png \
  background/ \
  content/ \
  popup/ \
  simulator/ \
  README.md \
  LICENSE \
  PRIVACY_POLICY.md \
  -x "*.git*" "*.DS_Store" "*~" "node_modules/*" "tests/*" "dist/*" "*.log"

# Copy to .xpi for Firefox testing
cp "${DIST_DIR}/${BUILD_NAME}.zip" "${DIST_DIR}/${BUILD_NAME}.xpi"

echo "✅ Built ${BUILD_NAME}.zip ($(du -h ${DIST_DIR}/${BUILD_NAME}.zip | cut -f1))"
echo "✅ Built ${BUILD_NAME}.xpi for local testing"

# Validate package contents
echo -e "\n📦 Package contents:"
unzip -l "${DIST_DIR}/${BUILD_NAME}.zip" | head -20

echo -e "\n🔍 Ready for validation with: npx addons-linter ${DIST_DIR}/${BUILD_NAME}.zip"