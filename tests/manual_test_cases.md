# Manual Test Cases - Claude Usage Counter Extension

## Test Execution Instructions

1. Load extension in Firefox (about:debugging → This Firefox → Load Temporary Add-on)
2. Pin extension to toolbar for easy access
3. Navigate to simulator: `file:///path/to/claude_usage_counter_modular_firefox/simulator/claude_sim.html`
4. Execute test cases in order, documenting results

## P1 Test Cases (Critical - Must Pass)

### TC001: Basic Text Token Estimation ✅
**Preconditions:** Fresh extension install
**Steps:**
1. Open popup, verify Plan="Pro", Estimator="~1 token / 4 chars"  
2. Navigate to simulator page
3. Type "Hello world!" (12 chars) in composer
4. Click Send
5. Open popup immediately

**Expected Result:**
- Messages: 1
- Estimated tokens: 3 (12 ÷ 4)
- Draft est. tokens: 0
- Remaining: 44 (45 - 1 message)

**Actual Result:** [ ] PASS [ ] FAIL
**Notes:** _______________

---

### TC002: Plan Switching Updates Badge ✅
**Steps:**
1. Send 5 messages on Free plan (change plan to Free first)
2. Open popup, verify Remaining shows 4
3. Change plan to Pro
4. Click Save

**Expected Result:**
- Remaining immediately shows 40 (45 - 5)
- Badge updates to show 40
- No page reload required

**Actual Result:** [ ] PASS [ ] FAIL
**Notes:** _______________

---

### TC003: File Attachment Counting ✅
**Steps:**
1. Enable "Contar anexos" in popup
2. Upload tests/fixtures/test.txt to simulator
3. Send message with file
4. Check popup

**Expected Result:**
- Files: 1 • est. tokens 25 (100 bytes ÷ 4 bpt_text default)
- Last msg: files 25
- Total tokens include file tokens

**Actual Result:** [ ] PASS [ ] FAIL
**Notes:** _______________

---

### TC004: Image Resolution Detection ✅
**Steps:**
1. Upload tests/fixtures/small_image.png (800x600, <1MP)
2. Send message in simulator
3. Open popup

**Expected Result:**
- Images: 1 • est. tokens 300 (imgSmall default)
- Last msg: imgs 300

**Actual Result:** [ ] PASS [ ] FAIL
**Notes:** _______________

---

### TC005: Draft Token Live Updates ✅
**Steps:**
1. Open popup and simulator in split view
2. Type "Testing draft tokens" in composer (≈5 tokens for chars4)
3. Watch popup Draft est. tokens field
4. Clear composer
5. Watch field again

**Expected Result:**
- Draft tokens update as you type (~5 tokens)
- Draft tokens go to 0 when cleared
- No page refresh needed

**Actual Result:** [ ] PASS [ ] FAIL
**Notes:** _______________

---

### TC006: Settings Persistence ✅
**Steps:**
1. Open popup settings
2. Change bpt_text to 8, imgFlat to 1000
3. Click Save
4. Close browser completely
5. Restart browser, open popup

**Expected Result:**
- Settings show bpt_text: 8, imgFlat: 1000
- File calculations use new rates

**Actual Result:** [ ] PASS [ ] FAIL
**Notes:** _______________

---

### TC007: Manual Reset Functionality ✅
**Steps:**
1. Send several messages to get counts > 0
2. Open popup, verify non-zero counts
3. Click Reset button
4. Verify popup updates

**Expected Result:**
- All counters reset to 0
- Timer resets to ~4:59:xx
- Badge updates to show full plan limit

**Actual Result:** [ ] PASS [ ] FAIL
**Notes:** _______________

---

### TC008: Multiple File Types ✅
**Steps:**
1. Enable "Contar anexos"
2. Upload test.txt (100 bytes), test.pdf (1000 bytes), test.docx (500 bytes)
3. Send message
4. Check popup

**Expected Result:**
- Files: 3 • est. tokens 183 (100÷4 + 1000÷12 + 500÷10)
- Last msg: files 183

**Actual Result:** [ ] PASS [ ] FAIL
**Notes:** _______________

## P2 Test Cases (Important)

### TC009: Token Estimator Switching
**Steps:**
1. Send message "Hello world test" with chars4 estimator
2. Note token count
3. Change to words13 estimator
4. Verify recalculation

**Expected Result:**
- chars4: ~4 tokens (16÷4)
- words13: ~4 tokens (3 words × 1.3)

**Actual Result:** [ ] PASS [ ] FAIL

---

### TC010: Image Mode Switching
**Steps:**
1. Upload large_image.jpg (>2MP)
2. Note tokens with "By resolution" 
3. Switch to "Flat per image"
4. Verify recalculation

**Expected Result:**
- By resolution: 1200 tokens (large category)
- Flat: 600 tokens (default imgFlat)

**Actual Result:** [ ] PASS [ ] FAIL

## Test Summary
- P1 Tests Passed: ___/8
- P2 Tests Passed: ___/2
- Critical Issues: _______________
- Go/No-Go Decision: [ ] GO [ ] NO-GO

**Tester:** _______________
**Date:** _______________
**Firefox Version:** _______________