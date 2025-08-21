#!/usr/bin/env python3
from PIL import Image, ImageDraw
import os

# Create test images for different resolution categories
fixtures_dir = 'tests/fixtures'

# Small image (<1MP): 800x600 = 0.48MP
small = Image.new('RGB', (800, 600), color='lightblue')
draw = ImageDraw.Draw(small)
draw.text((10, 10), 'Small Test Image\n800x600 (<1MP)', fill='black')
small.save(os.path.join(fixtures_dir, 'small_image.png'))

# Medium image (1-2MP): 1400x1000 = 1.4MP  
medium = Image.new('RGB', (1400, 1000), color='lightgreen')
draw = ImageDraw.Draw(medium)
draw.text((10, 10), 'Medium Test Image\n1400x1000 (1.4MP)', fill='black')
medium.save(os.path.join(fixtures_dir, 'medium_image.png'))

# Large image (2-6MP): 2400x1800 = 4.32MP
large = Image.new('RGB', (2400, 1800), color='lightyellow')
draw = ImageDraw.Draw(large)  
draw.text((10, 10), 'Large Test Image\n2400x1800 (4.32MP)', fill='black')
large.save(os.path.join(fixtures_dir, 'large_image.jpg'))

# Huge image (>6MP): 3200x2400 = 7.68MP
huge = Image.new('RGB', (3200, 2400), color='lightcoral')
draw = ImageDraw.Draw(huge)
draw.text((10, 10), 'Huge Test Image\n3200x2400 (7.68MP)', fill='black')  
huge.save(os.path.join(fixtures_dir, 'huge_image.jpg'))

print("Created test images:")
for img in ['small_image.png', 'medium_image.png', 'large_image.jpg', 'huge_image.jpg']:
    path = os.path.join(fixtures_dir, img)
    if os.path.exists(path):
        size = os.path.getsize(path)
        print(f"  {img}: {size} bytes")