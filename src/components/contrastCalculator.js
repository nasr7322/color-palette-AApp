export function calculateContrast(color1, color2) {
    const RED = 0.2126;
    const GREEN = 0.7152;
    const BLUE = 0.0722;
     const GAMMA = 2.4;
    // const GAMMA = 8;
    // const GAMMA = 1;

    function hexToRgb(hex) {
        let r = parseInt(hex.slice(1, 3), 16);
        let g = parseInt(hex.slice(3, 5), 16);
        let b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
    }

    function luminance(r, g, b) {
        var a = [r, g, b].map((v) => {
            v /= 255;
            return v <= 0.03928
            ? v / 12.92
            : Math.pow((v + 0.055) / 1.055, GAMMA);
        });
        return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
    }

    function contrast(rgb1, rgb2) {
        var lum1 = luminance(...rgb1);
        var lum2 = luminance(...rgb2);
        var brightest = Math.max(lum1, lum2);
        var darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    return contrast(hexToRgb(color1), hexToRgb(color2));
}