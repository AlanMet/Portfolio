//colormanager.js
class ColorManager {
    constructor() {
        this.colours = {};
    }

    // Generate a vibrant HSL color with good saturation and lightness for visibility
    generateColor() {
        // Use golden ratio to spread hues evenly
        const goldenRatio = 0.618033988749895;
        let hue = Math.random();
        hue += goldenRatio;
        hue %= 1;

        // Convert to degrees and ensure vibrant but readable colors
        const h = Math.floor(hue * 360);
        const s = Math.floor(70 + Math.random() * 20); // 70-90% saturation
        const l = Math.floor(45 + Math.random() * 15); // 45-60% lightness

        return `hsl(${h}, ${s}%, ${l}%)`;
    }

    // Get or generate a color for a tag
    getColor(tag) {
        if (!this.colours[tag]) {
            this.colours[tag] = this.generateColor();
        }
        return this.colours[tag];
    }

    // Mix two colors for border effects
    mixColors(color1, color2) {
        // Parse HSL values
        const parseHSL = (color) => {
            const match = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            return match ? {
                h: parseInt(match[1]),
                s: parseInt(match[2]),
                l: parseInt(match[3])
            } : null;
        };

        const c1 = parseHSL(color1);
        const c2 = parseHSL(color2);

        if (!c1 || !c2) return color1; // Fallback to first color if parsing fails

        // Average the HSL values
        const h = Math.round((c1.h + c2.h) / 2);
        const s = Math.round((c1.s + c2.s) / 2);
        const l = Math.round((c1.l + c2.l) / 2);

        return `hsl(${h}, ${s}%, ${l}%)`;
    }
}

// Create and export a single instance
const colorManager = new ColorManager();
export default colorManager;