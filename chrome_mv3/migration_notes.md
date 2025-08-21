# Chrome MV3 Migration Notes

## Key Changes from Firefox MV2

### Manifest Changes
- `manifest_version: 3`
- `browser_action` → `action`
- `background.scripts` → `background.service_worker` (single file)
- `permissions` → split into `permissions` and `host_permissions`
- Removed `localhost/*` and `file://*/*` (not allowed in Chrome Web Store)

### Background Script Migration
- Combined all background scripts into single `service_worker.js`
- Uses `importScripts()` to load modules
- Replaced `setInterval` with `chrome.alarms` API for 5-hour reset
- Added proper service worker lifecycle handling
- No persistent background page (event-driven)

### API Changes
- All `browser.*` calls changed to `chrome.*`
- Service worker has different lifecycle than persistent background

### Removed Features for Chrome
- Local simulator support (file:// protocol not allowed)
- Localhost development testing
- Persistent background state (now uses storage + alarms)

### Chrome Web Store Requirements
- No file:// or localhost permissions
- Service worker must handle being killed/restarted
- All timers replaced with alarms API
- Stricter CSP requirements

## Testing Requirements for MV3

1. **Service Worker Lifecycle**
   - Test extension after service worker killed/restarted
   - Verify badge persists across worker restarts
   - Check alarms continue working

2. **Storage Dependency** 
   - All state must survive service worker restarts
   - Badge updates from storage on startup
   - Settings persistence across restarts

3. **Alarms API**
   - 5-hour reset via chrome.alarms
   - Test alarm accuracy and reliability
   - Handle missed alarms gracefully

## Build Process for Chrome

```bash
# Copy shared files to chrome_mv3/
cp -r popup/ content/ icon*.png chrome_mv3/
cp README.md LICENSE PRIVACY_POLICY.md chrome_mv3/

# Copy modified background scripts
cp background/*.js chrome_mv3/background/ 
# (except background.js which is replaced by service_worker.js)

# Create Chrome Web Store package
cd chrome_mv3
zip -r claude-usage-counter-chrome-v1.0.0.zip *
```

## Store Submission Differences

### Chrome Web Store
- Developer account verification required ($5 fee)
- More restrictive permission policies  
- Different screenshot requirements (1280×800 + 440×280 tile)
- Privacy policy must be hosted online (not local file)
- More detailed review process

### Firefox AMO vs Chrome
| Aspect | Firefox AMO | Chrome Web Store |
|--------|-------------|------------------|
| Cost | Free | $5 developer fee |
| Review Time | 1-7 days | 3-7 days |
| Permissions | More permissive | Very restrictive |
| Local Files | Allowed | Blocked |
| Self-hosting | Allowed | Discouraged |

## Migration Checklist

- [ ] Test service worker lifecycle thoroughly
- [ ] Verify all chrome.* APIs work correctly  
- [ ] Test alarms API for 5-hour reset
- [ ] Remove localhost/file:// functionality
- [ ] Update documentation for Chrome differences
- [ ] Create Chrome Web Store assets
- [ ] Host privacy policy online
- [ ] Validate with Chrome extension validator