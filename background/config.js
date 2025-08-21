// Quotas and default persistent state
const QUOTAS = { free: 9, pro: 45, max5x: 225, max20x: 900 };
const DEFAULTS = {
  plan: "pro",
  windowStart: 0,
  msgCount: 0,
  tokenCount: 0,
  estimator: "chars4",
  justCount: false,
  draftTokens: 0,
  // attachments counters
  fileCount: 0,
  imageCount: 0,
  fileTokenCount: 0,
  imageTokenCount: 0,
  // last message debug
  lastTextTokens: 0,
  lastFileTokens: 0,
  lastImageTokens: 0,
  // attachment settings
  countAttachments: true,
  bytesPerToken_text: 4,
  bytesPerToken_pdf: 12,
  bytesPerToken_docx: 10,
  bytesPerToken_other: 12,
  imageCostMode: "byResolution",
  imageTokens_flat: 600,
  imageTokens_small: 300,
  imageTokens_medium: 600,
  imageTokens_large: 1200,
  imageTokens_huge: 2400
};
