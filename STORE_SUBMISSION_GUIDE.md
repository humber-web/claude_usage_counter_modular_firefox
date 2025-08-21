# Store Submission Guide - Claude Usage Counter Extension

## Firefox AMO Submission Checklist

### Pre-Submission Validation
- [x] **Package Built**: `dist/claude-usage-counter-v0.5.0.zip` created
- [x] **AMO Linter**: Validation passed (1 warning about simulator inline script - acceptable)
- [x] **Manual Testing**: Execute `tests/manual_test_cases.md` 
- [ ] **P1 Test Cases**: All 8 P1 tests must pass
- [ ] **Exploratory Testing**: Complete 4 charters in `tests/exploratory_test_charters.md`

### Required Assets
- [x] **Extension Package**: `claude-usage-counter-v0.5.0.zip`
- [x] **Icons**: 16x16, 32x32, 48x48, 128x128 ✓
- [x] **Privacy Policy**: `PRIVACY_POLICY.md` ✓
- [x] **License**: `LICENSE` (MIT) ✓
- [x] **Documentation**: `README.md` ✓
- [ ] **Screenshots**: Need 3+ screenshots at 1280×800px
- [ ] **Promotional Images**: Optional but recommended

### Store Listing Content

#### Short Description (79 chars max)
```
Track Claude messages, text tokens, and file attachments with 5-hour limits
```

#### Long Description
```
📊 Smart Usage Tracking for Claude.ai

Keep track of your Claude conversations with intelligent counting that respects plan limits:

• Message & Token Counting: Tracks messages and estimates text tokens using configurable algorithms (~1 token/4 chars or ~1.3 tokens/word)
• 5-Hour Reset Window: Auto-resets counters every 5 hours to match Claude's limits  
• Plan-Aware Limits: Supports Free (9), Pro (45), Max 5× (225), and Max 20× (900) with remaining count display
• File & Image Support: Counts attachment tokens with customizable rates for PDFs, documents, and images by resolution
• Real-Time Draft Tracking: See estimated tokens as you type
• Privacy First: All data stays local - no API keys, no external servers, no data collection

Perfect for:
- Power users monitoring usage patterns
- Teams managing message budgets  
- Anyone wanting transparent token estimation

Permissions Explained:
- Storage: Save your settings and usage data locally
- Claude.ai access: Count messages and attachments on the site

Works entirely offline after installation. Your conversation data never leaves your browser.
```

### AMO Submission Steps

1. **Create Account**: https://addons.mozilla.org/developers/
2. **Submit Extension**:
   - Upload `dist/claude-usage-counter-v0.5.0.zip`
   - Fill extension details
   - Add screenshots (take from working extension)
   - Set categories: "Developer Tools" + "Productivity"
3. **Permission Justification**:
   - **Storage**: Required to save user preferences and usage statistics locally
   - **https://claude.ai/***: Required to detect and count messages on Claude.ai
   - **localhost/file:// (optional)**: For development testing with included simulator
4. **Review Notes**:
```
This extension provides usage tracking for Claude.ai with complete privacy:

- No external network requests (all data stays local)
- No API keys required
- Counts messages and estimates tokens using configurable heuristics
- Includes local simulator for testing without using Claude.ai
- Modular codebase for maintainability

The extension helps users stay within Claude's plan limits by tracking messages and token estimates over 5-hour windows.
```

## Chrome Web Store Preparation (Future)

### MV3 Package Ready
- [x] **Chrome Manifest**: `chrome_mv3/manifest.json` (MV3 format)
- [x] **Service Worker**: Background functionality converted
- [x] **Migration Notes**: Complete technical documentation

### Chrome Store Requirements
- [ ] **Developer Account**: $5 verification fee
- [ ] **Privacy Policy**: Must be hosted online (not local file)
- [ ] **Screenshots**: 1280×800 + 440×280 promotional tile
- [ ] **Store Listing**: Chrome-optimized copy

## Quality Gates

### Must Pass (Go Criteria)
- [ ] All P1 manual tests pass (8/8)
- [ ] AMO linter shows 0 errors 
- [ ] Privacy audit confirms no external requests
- [ ] Extension works on Firefox 109+ 
- [ ] Storage stays under 5MB in normal usage

### Should Pass (Strong Recommendation)
- [ ] >80% of P2 tests pass
- [ ] Performance testing shows no memory leaks
- [ ] Exploratory testing finds <3 non-critical issues
- [ ] Unicode estimation works for major languages

### May Pass (Nice to Have)
- [ ] Perfect estimation accuracy across all languages
- [ ] Handles all edge cases gracefully
- [ ] Automation tests pass completely

## Screenshot Capture Checklist

### Required Screenshots (1280×800)
1. **Main Popup View**: Extension popup showing usage stats with data
2. **Settings Expanded**: Attachment settings panel open
3. **Simulator Demo**: Working with local simulator page
4. **Badge Display**: Browser toolbar showing extension badge

### Screenshot Commands
```bash
# Firefox screenshot tool
firefox --screenshot --window-size=1280,800 --url="about:debugging"

# Or use browser dev tools:
# F12 → Device Toolbar → Responsive → Set 1280×800 → Screenshot
```

## Submission Timeline

### Week 1: Final Testing & Assets
- Day 1-2: Complete all manual test cases
- Day 3: Run exploratory testing charters  
- Day 4: Create screenshots and final assets
- Day 5: Final AMO validation and submission

### Week 2: Review & Launch
- Day 1: Submit to AMO
- Day 2-5: Respond to review feedback if needed
- Day 6-7: Monitor approval and launch

### Success Metrics
- AMO approval within 7 days
- <2 rounds of review feedback
- Clean launch with no critical issues reported
- Positive initial user feedback

---

**Ready for submission once all checkboxes are completed!**