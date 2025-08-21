# Screenshot Creation Guide

## Required Store Screenshots (1280×800)

### Setup Instructions
1. Install extension in clean Firefox profile
2. Load simulator page: `file:///path/to/project/simulator/claude_sim.html`
3. Send 3-4 test messages with different attachments to populate data
4. Set browser window to exactly 1280×800

### Screenshot 1: Extension Popup with Data
**Filename:** `extension_popup_with_data.png`
**Setup:**
- Send 5 messages in simulator (mix of text + files)  
- Upload small_image.png and test.txt
- Set plan to Pro, estimator to chars4
- Enable "Contar anexos"

**Capture:** 
- Open extension popup
- Show populated stats (messages: 5, tokens: ~50, files: 2, etc.)
- Badge should show remaining count

### Screenshot 2: Settings Panel Expanded  
**Filename:** `settings_panel_expanded.png`
**Setup:**
- Open extension popup
- Expand "Settings de anexos" details section
- Show all attachment configuration options

**Capture:**
- Full popup with settings expanded
- Highlight customizable token rates
- Show image mode selection

### Screenshot 3: Simulator in Action
**Filename:** `simulator_demo.png`
**Setup:**
- Open simulator in full browser window
- Type message in composer: "Testing with attachments"
- Upload small_image.png (show thumbnail)
- Prepare to send (don't send yet)

**Capture:**
- Full simulator interface
- Composer with text and file attachment
- Show image thumbnail in interface

### Screenshot 4: Browser Integration
**Filename:** `browser_integration.png`
**Setup:**
- Send several messages to get non-zero badge
- Pin extension to Firefox toolbar
- Open about:addons to show extension installed

**Capture:**
- Firefox browser with extension badge visible
- Extension listed in about:addons
- Badge showing remaining count (e.g., "40")

## Screenshot Commands

### Firefox Dev Tools Method
1. Open Firefox Dev Tools (F12)
2. Click "Responsive Design Mode" (Ctrl+Shift+M)  
3. Set dimensions to 1280×800
4. Click camera icon for screenshot

### Browser Screenshot Extension
```bash
# Using Firefox built-in screenshot
# Right-click page → "Take Screenshot" → "Save visible area"
```

### Command Line (if available)
```bash
# Using Firefox headless
firefox --screenshot=tests/screenshots/screenshot1.png --window-size=1280,800 file:///path/to/simulator.html
```

## Quality Requirements

### Technical Specs
- **Resolution:** Exactly 1280×800 pixels
- **Format:** PNG preferred, JPG acceptable
- **File Size:** Under 5MB each
- **Quality:** High quality, no compression artifacts

### Content Requirements
- Clear, readable text
- Representative of actual usage
- Show extension working properly
- Highlight key features
- Professional appearance

### What to Avoid
- Empty/default states (show populated data)
- Error states or broken functionality  
- Debug information or console logs
- Personal information or sensitive data
- Low resolution or blurry images

## Validation Checklist

Before uploading screenshots:
- [ ] All images are 1280×800 pixels
- [ ] Extension functionality is clearly visible
- [ ] Text is readable and professional
- [ ] No sensitive information visible
- [ ] Files under 5MB each
- [ ] Represent key features accurately

## Store Upload Notes

### Firefox AMO
- Upload 3-5 screenshots minimum
- Order matters (first screenshot is primary)
- Add descriptive captions for each
- Preview how they'll appear in store listing

### Chrome Web Store (Future)
- Requires additional 440×280 promotional tile
- Same screenshots work, may need cropping
- Different aspect ratio requirements