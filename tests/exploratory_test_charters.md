# Exploratory Test Charters - Claude Usage Counter Extension

## Charter 1: Performance Under Load (2 hours)

**Mission:** Explore how the extension handles high-frequency usage and large attachments  
**Tester:** _______________  
**Date:** _______________  
**Time Allocated:** 2 hours  

### Areas to Investigate:
- [ ] Send 50+ messages rapidly via simulator (30 seconds between messages)
- [ ] Upload 20+ files simultaneously using multiple file selection
- [ ] Test with large files: 10MB+, 50MB+, 100MB+ if possible
- [ ] Open 10+ Claude/simulator tabs concurrently
- [ ] Monitor extension popup responsiveness during high load
- [ ] Check badge update frequency with rapid changes

### Look For:
- Memory leaks (Firefox Task Manager)
- UI freezing or unresponsive popup
- Counter accuracy under rapid changes
- Storage bloat (check storage size in dev tools)
- Browser performance impact

### Test Data:
```
Large file test: ___ MB uploaded, result: ___________
Rapid messages: Sent ___ in ___ minutes, accuracy: ____%
Multi-tab test: ___ tabs, sync issues: ___________
Memory usage: Start ___ MB, End ___ MB, Delta ___
```

### Findings:
```
Critical Issues Found:
1. ________________________________
2. ________________________________

Performance Notes:
_________________________________________
_________________________________________

Recommendations:
_________________________________________
```

---

## Charter 2: Resilience Testing (90 minutes)

**Mission:** Test extension behavior under adverse conditions  
**Tester:** _______________  
**Date:** _______________  
**Time Allocated:** 90 minutes  

### Areas to Investigate:
- [ ] Disable network mid-session (airplane mode)
- [ ] Throttle CPU to 25% in browser dev tools
- [ ] Fill browser storage to near-capacity
- [ ] Modify DOM elements that extension depends on
- [ ] Kill/restart background processes
- [ ] Test with other extensions that might conflict

### Look For:
- Graceful degradation when resources unavailable
- Error handling and user feedback
- Recovery mechanisms after disruption
- Data consistency after interruptions

### Test Scenarios:
```
Network disabled test: ___________________
CPU throttling result: __________________
Storage quota test: _____________________
DOM modification: _______________________
Extension conflicts: ___________________
```

### Findings:
```
Resilience Issues:
1. ________________________________
2. ________________________________

Recovery Behavior:
_________________________________________

Error Handling Quality:
_________________________________________
```

---

## Charter 3: Unicode & Internationalization (90 minutes)

**Mission:** Verify token estimation with diverse text inputs  
**Tester:** _______________  
**Date:** _______________  
**Time Allocated:** 90 minutes  

### Test Inputs:
- [ ] Mixed scripts: "Hello مرحبا 你好" (Latin + Arabic + Chinese)
- [ ] Emoji combinations: "🚀💯✨🎉👨‍💻👩‍🎨" 
- [ ] Skin tone modifiers: "👋🏻👋🏽👋🏿"
- [ ] Zero-width characters and combining marks
- [ ] German compounds: "Geschwindigkeitsbegrenzung"
- [ ] RTL text: "ختبار النص العربي الطويل"
- [ ] Mathematical symbols: "∑∫∂√∞±≠"

### Token Estimation Analysis:
```
Text Input                     | chars4 | words13 | Expected | Notes
------------------------------|--------|---------|----------|-------
"Hello مرحبا"                  |        |         |          |
"🚀💯✨"                        |        |         |          |
"Geschwindigkeitsbegrenzung"   |        |         |          |
"∑∫∂√∞"                        |        |         |          |
```

### Look For:
- Accurate character counting across scripts
- Proper word boundary detection
- No crashes with complex Unicode
- Consistent estimation between methods

### Findings:
```
Unicode Issues Found:
1. ________________________________
2. ________________________________

Estimation Accuracy:
_________________________________________

Recommendations for edge cases:
_________________________________________
```

---

## Charter 4: DOM Mutation Tolerance (2 hours)

**Mission:** Test content script resilience to Claude.ai changes  
**Tester:** _______________  
**Date:** _______________  
**Time Allocated:** 2 hours  

### Areas to Investigate:
- [ ] Use browser dev tools to modify Claude DOM structure
- [ ] Remove/rename composer element classes
- [ ] Add/remove DOM elements dynamically during use
- [ ] Test with different ad blockers enabled
- [ ] Simulate slow DOM loading scenarios
- [ ] Test with accessibility tools running

### DOM Modifications to Test:
```
Modification                          | Result           | Fallback Works?
-------------------------------------|------------------|----------------
Remove .composer element             |                  |
Change composer ID/class             |                  |
Add interfering elements             |                  |
Deeply nested composer               |                  |
Multiple matching elements           |                  |
```

### Look For:
- Continued functionality with DOM changes
- Fallback selector mechanisms
- Error logging and recovery
- Performance with selector queries

### Findings:
```
DOM Dependency Issues:
1. ________________________________
2. ________________________________

Fallback Effectiveness:
_________________________________________

Recommended Improvements:
_________________________________________
```

## Charter Summary

**Total Issues Found:** _____
**Critical Issues:** _____
**Performance Issues:** _____
**Compatibility Issues:** _____

**Overall Exploratory Assessment:**
```
The extension demonstrates _________________ resilience under adverse conditions.
Key areas for improvement: ________________________________
Confidence for production release: ________________________
```