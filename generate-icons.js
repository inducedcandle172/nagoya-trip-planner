const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

async function generateIcons() {
    const svgBuffer = await fs.readFile('icons/icon.svg');
    
    for (const size of sizes) {
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(path.join('icons', `icon-${size}x${size}.png`));
        console.log(`Generated ${size}x${size} icon`);
    }
}

generateIcons().catch(console.error); 