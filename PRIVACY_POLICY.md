# Privacy Policy - Claude Usage Counter Extension

**Effective Date:** December 2024
**Extension:** Claude Usage Counter (Modular, No API Key)

## Data Collection and Storage

### What Data We Collect
This extension collects and stores the following data **locally in your browser only**:
- Message count and timestamps within 5-hour windows
- Text token estimates from your messages
- File and image attachment metadata (names, sizes, types)
- Your preference settings (plan type, estimation method, file rates)
- Draft message token estimates while typing

### What Data We DO NOT Collect
- **No message content**: We never store or transmit your actual message text
- **No API keys**: Extension requires no external authentication
- **No personal information**: No names, emails, or identifying data
- **No browsing history**: Only works on Claude.ai and local simulator pages
- **No external transmissions**: Zero network requests to our servers

### Where Data Is Stored
All data is stored locally using Firefox's `chrome.storage.local` API:
- Data never leaves your browser
- Data is not synchronized across devices
- Data is not shared with any external services
- Data is deleted when you uninstall the extension

### Data Usage
Collected data is used solely to:
- Display usage statistics in the extension popup
- Calculate remaining message allowances for your plan
- Estimate token consumption from attachments
- Provide real-time draft token estimates

### Data Retention
- Message counts reset automatically every 5 hours
- Settings persist until manually changed or extension uninstalled
- No historical data beyond the current 5-hour window is retained

### Permissions Explanation
- **Storage**: Required to save your settings and usage counts locally
- **Claude.ai access**: Required to detect and count messages on Claude.ai
- **File access**: Required for local simulator testing only

### Data Security
Since all data remains local:
- No risk of external data breaches
- Data protected by Firefox's built-in security model
- No third-party access to your usage data

### Changes to Privacy Policy
Updates will be posted in extension releases and on the GitHub repository.

### Contact
For privacy questions: [TODO: INSERT_CONTACT_EMAIL]
Extension source code: [TODO: INSERT_GITHUB_URL]

---
**This extension is designed with privacy-first principles. Your data stays on your device, always.**