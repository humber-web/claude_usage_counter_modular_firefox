const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Claude Usage Counter - Simulator Tests', () => {
  let simulatorUrl;

  test.beforeAll(async () => {
    simulatorUrl = 'file://' + path.resolve(__dirname, '../simulator/claude_sim.html');
  });

  test.beforeEach(async ({ page }) => {
    // Navigate to simulator
    await page.goto(simulatorUrl);
    await page.waitForLoadState('networkidle');
  });

  test('TC001: Basic message sending in simulator', async ({ page }) => {
    // Fill composer with test text
    const testMessage = 'Hello world!'; // 12 chars
    await page.fill('#composer', testMessage);
    
    // Verify message appears in composer
    const composerValue = await page.inputValue('#composer');
    expect(composerValue).toBe(testMessage);
    
    // Send message
    await page.click('#send');
    
    // Verify message appears in feed
    const lastMessage = page.locator('.bubble.user').last();
    await expect(lastMessage).toContainText(testMessage);
    
    // Verify composer is cleared
    const clearedComposer = await page.inputValue('#composer');
    expect(clearedComposer).toBe('');
  });

  test('TC002: File upload in simulator', async ({ page }) => {
    const testFile = path.resolve(__dirname, 'fixtures/test.txt');
    
    // Upload file
    await page.setInputFiles('#file', testFile);
    
    // Verify file appears in thumbs
    await expect(page.locator('#thumbs')).toContainText('test.txt');
    
    // Send message with file
    await page.fill('#composer', 'Message with attachment');
    await page.click('#send');
    
    // Verify message shows file attachment
    const lastMessage = page.locator('.bubble.user').last();
    await expect(lastMessage).toContainText('[files: test.txt]');
    
    // Verify file input is cleared
    const fileInputValue = await page.inputValue('#file');
    expect(fileInputValue).toBe('');
  });

  test('TC003: Image upload in simulator', async ({ page }) => {
    const testImage = path.resolve(__dirname, 'fixtures/small_image.png');
    
    // Upload image
    await page.setInputFiles('#file', testImage);
    
    // Verify image thumbnail appears
    await expect(page.locator('#thumbs img')).toBeVisible();
    
    // Send message
    await page.click('#send');
    
    // Verify message shows image attachment
    const lastMessage = page.locator('.bubble.user').last();
    await expect(lastMessage).toContainText('[files: small_image.png]');
  });

  test('TC004: Multiple file upload', async ({ page }) => {
    const files = [
      path.resolve(__dirname, 'fixtures/test.txt'),
      path.resolve(__dirname, 'fixtures/small_image.png')
    ];
    
    // Upload multiple files
    await page.setInputFiles('#file', files);
    
    // Verify both files appear
    await expect(page.locator('#thumbs')).toContainText('test.txt');
    await expect(page.locator('#thumbs img')).toBeVisible();
    
    // Send message
    await page.click('#send');
    
    // Verify message shows both files
    const lastMessage = page.locator('.bubble.user').last();
    await expect(lastMessage).toContainText('test.txt, small_image.png');
  });

  test('TC005: Enter key sends message', async ({ page }) => {
    const testMessage = 'Testing enter key';
    await page.fill('#composer', testMessage);
    
    // Press Enter to send (not Shift+Enter)
    await page.press('#composer', 'Enter');
    
    // Verify message was sent
    const lastMessage = page.locator('.bubble.user').last();
    await expect(lastMessage).toContainText(testMessage);
    
    // Verify composer is cleared
    const composerValue = await page.inputValue('#composer');
    expect(composerValue).toBe('');
  });

  test('TC006: Shift+Enter creates new line', async ({ page }) => {
    const testMessage = 'Line 1';
    await page.fill('#composer', testMessage);
    
    // Press Shift+Enter for new line
    await page.press('#composer', 'Shift+Enter');
    
    // Add second line
    await page.type('#composer', 'Line 2');
    
    // Verify composer contains both lines
    const composerValue = await page.inputValue('#composer');
    expect(composerValue).toContain('Line 1\\nLine 2');
  });

  test('TC007: Empty message with no files cannot be sent', async ({ page }) => {
    // Try to send empty message
    await page.click('#send');
    
    // Verify no new message appears (should remain empty or show placeholder)
    const messageCount = await page.locator('.bubble.user').count();
    expect(messageCount).toBe(0);
  });

  test('TC008: Assistant echo response', async ({ page }) => {
    const testMessage = 'Test echo';
    await page.fill('#composer', testMessage);
    await page.click('#send');
    
    // Wait for assistant response (has 300ms delay)
    await page.waitForTimeout(500);
    
    // Verify assistant response
    const assistantMessage = page.locator('.bubble.assistant').last();
    await expect(assistantMessage).toContainText('Echo: Test echo');
  });
});