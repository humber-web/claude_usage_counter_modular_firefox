# Claude Usage Counter (Modular, No API Key)

Smart usage tracking extension for Claude.ai that respects your privacy and plan limits.

## ✨ Features

- **📊 Smart Counting**: Tracks messages and estimates text tokens with configurable algorithms
- **⏰ 5-Hour Reset Window**: Auto-resets counters to match Claude's actual limits  
- **📋 Plan-Aware Limits**: Supports Free (9), Pro (45), Max 5× (225), and Max 20× (900) plans
- **📎 File & Image Support**: Counts attachment tokens with customizable rates
- **✍️ Real-Time Draft Tracking**: See estimated tokens as you type
- **🔒 Privacy First**: All data stays local - no API keys, no external servers

## 🚀 Installation

### Firefox (Recommended)
1. Download the latest release
2. Open Firefox → `about:debugging` → This Firefox
3. Click "Load Temporary Add-on"
4. Select the extension folder or .xpi file
5. Pin the extension to your toolbar

### Development Setup
```bash
git clone [repository-url]
cd claude_usage_counter_modular_firefox
```

## 🧪 Testing

### Manual Testing
```bash
# Load extension in Firefox for testing
firefox --new-instance --profile-manager
# Load extension via about:debugging

# Test with included simulator
open simulator/claude_sim.html
```

### Automated Testing  
```bash
npm install
npm test
```

## 📖 Usage

1. **Set Your Plan**: Open extension popup → Select your Claude plan
2. **Choose Estimator**: Pick between ~1 token/4 chars or ~1.3 tokens/word
3. **Configure Attachments**: Enable file/image counting and adjust rates
4. **Monitor Usage**: Badge shows remaining messages/tokens for current 5-hour window

### Settings Explained

- **Apenas contar mensagens**: Count only messages, ignore token estimation
- **Contar anexos**: Enable file and image token counting
- **Attachment Rates**: Customize bytes-per-token for different file types
- **Image Modes**: Count by resolution tiers or flat rate per image

## 🏗️ Architecture

```
background/     # Background scripts for state management
├── background.js   # Main background coordination  
├── badge.js        # Toolbar badge management
├── bus.js          # Message passing between components
├── config.js       # Configuration constants
├── state.js        # Usage state management
└── utils.js        # Utility functions

content/        # Content scripts for Claude.ai integration
├── attach.js       # File/image attachment detection
├── content.js      # Main content script coordinator
├── draft.js        # Real-time draft token estimation
├── send.js         # Message send detection
└── util.js         # Content script utilities

popup/          # Extension popup interface
├── popup.html      # Popup UI structure
├── popup.js        # Main popup controller
├── controller.js   # UI event handling
├── api.js          # Storage API communication
└── ui.js           # UI update functions

simulator/      # Local testing simulator
└── claude_sim.html # Standalone Claude-like interface
```

## 🔒 Privacy

- **Zero External Requests**: No data leaves your browser
- **No API Keys Required**: Works entirely offline after installation
- **Local Storage Only**: Uses Firefox's built-in storage APIs
- **No Message Content**: Only counts metadata, never stores actual text
- **Open Source**: Full code transparency

## 🧪 Development

### Running Tests
```bash
# Automated tests
npm test

# Manual test checklist  
cat tests/manual_test_cases.md
```

### Building for Release
```bash
# Create distribution package
npm run build

# Validate for AMO
npx addons-linter dist/
```

### Chrome Variant (Future)
A Manifest V3 version for Chrome is planned. The current Firefox version uses MV2 for broader compatibility.

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Run tests (`npm test`)
4. Commit changes (`git commit -m 'Add amazing feature'`)
5. Push to branch (`git push origin feature/amazing-feature`)
6. Open Pull Request

## 📞 Support

- **Issues**: [GitHub Issues](git@github.com:humber-web/claude_usage_counter_modular_firefox.git/issues)
- **Privacy Questions**: See [PRIVACY_POLICY.md](PRIVACY_POLICY.md)
- **Feature Requests**: Welcome via GitHub Issues

---

**Made with ❤️ for the Claude community. Your data stays on your device, always.**
