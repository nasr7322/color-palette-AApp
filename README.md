# Color Palette Analyzer

Color Palette Analyzer is a web application built with Vue.js that helps analyze color palettes and display all possible color combinations sorted by their contrast ratio, based on the [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html). This tool is useful for designers and developers to ensure readability and accessibility of their color choices in web design.

## Motivation

The W3C Web Content Accessibility Guidelines 2.0 define specific contrast ratios that must be met in order to comply at particular levels. In order to meet the guidelines at Level AA, text or images of text must have a contrast ratio of at least 4.5:1 (or 3:1 for large text). Most contrast ratio testers require testing all combinations manually, which can be time-consuming and cumbersome. Color Palette Analyzer automates this process, allowing users to quickly and easily assess the contrast ratios of color combinations in their palettes, helping them ensure compliance with accessibility standards.

## Features

- Add, remove, and customize colors in the palette.
- Generate and display color combinations sorted by contrast ratio.
- Calculate contrast ratio between colors based on WCAG standards.
- Display color names, hex codes, and RGB values for each color in the palette.
- Copy and paste colors from the clipboard.

## Getting Started

To run the Color Palette Analyzer locally, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using npm or yarn:

```
npm install
```

4. Run the development server:

```
npm run serve
```

5. Open your web browser and visit the URL provided by the development server (usually http://localhost:8080/).

## Usage

1. Add colors to the palette by clicking on the "+" button.
2. Customize colors by clicking on the color boxes and using the color picker.
3. Remove colors by clicking on the "-" button next to each color.
4. Generate color combinations by clicking on the "Generate" button.
5. View color combinations sorted by contrast ratio and their respective contrast ratios.
6. Copy colors by selecting a color box and pressing Ctrl+C (Cmd+C on Mac).
7. Paste colors by pressing Ctrl+V (Cmd+V on Mac) in the color picker input.

## Deployment

This project is deployed on [Netlify](https://color-palette-aapp.netlify.app/). You can access the deployed application [here](https://color-palette-aapp.netlify.app/).

## Contributing

Contributions are welcome! If you have any ideas for improvements, bug fixes, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
