// // utils/convertToDarkMode.js
// import tinycolor from "tinycolor2";

// // Dark mode fallback palette

// // Function to map original colors to dark mode colors
// const mapToDarkModeColor = (color) => {
//   try {
//     const tColor = tinycolor(color);

//     if (tColor.isValid()) {
//       // Map light colors to darker shades, dark colors to lighter shades
//       if (tColor.getLuminance() > 0.5) {
//         // Darken light colors significantly
//         return tColor.darken(90).toString(); // Increase darkening for better effect
//       } else {
//         // Lighten dark colors moderately
//         return tColor.lighten(20).toString(); // Moderate lightening to make them visible on dark background
//       }
//     } else {
//       console.warn("Invalid color:", color);
//       return darkModePalette.text; // Fallback color
//     }
//   } catch (error) {
//     console.error("Error processing color:", error);
//     return darkModePalette.text; // Fallback color
//   }
// };

// // Function to convert CSS to dark mode
// export const convertToDarkMode = (css) => {
//   try {
//     // Regex to match color-related properties
//     const colorProperties =
//       /(\bcolor\b|\bbackground-color\b|\bborder-color\b|\boutline-color\b|\bfill\b|\bstroke\b|\btext-decoration-color\b|\bbox-shadow\b|\btext-shadow\b|\bbackground\b|\bborder\b|\boutline\b)\s*:\s*([^;}]+)(;|\s|$)/gi;

//     return css.replace(colorProperties, (match, property, value) => {
//       // Check if the value is a valid color format
//       const colorMatch =
//         /^(#([0-9a-fA-F]{3}){1,2}|rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)|rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*([0-1]|0?\.\d+)\)|hsl\(\d{1,3},\s*\d+%,\s*\d+%\)|hsla\(\d{1,3},\s*\d+%,\s*\d+%,\s*([0-1]|0?\.\d+)\))$/i;

//       if (colorMatch.test(value)) {
//         const convertedColor = mapToDarkModeColor(value);
//         console.log(
//           `Original color: ${value}, Converted color: ${convertedColor}`
//         );
//         return `${property}: ${convertedColor};`;
//       }

//       // For non-color values or invalid formats, return them unchanged
//       return `${property}: ${value};`;
//     });
//   } catch (error) {
//     console.error("Error converting CSS:", error);
//     throw new Error(
//       "Error converting CSS. Please check your input and try again."
//     );
//   }
// };

import tinycolor from "tinycolor2";

// Function to map original colors to dark mode colors
const mapToDarkModeColor = (color, darkness) => {
  try {
    const tColor = tinycolor(color);

    if (tColor.isValid()) {
      // Map light colors to darker shades, dark colors to lighter shades
      if (tColor.getLuminance() > 0.5) {
        // Darken light colors dynamically based on slider value
        const darkeningAmount = darkness; // Scale darkness percentage
        return tColor.darken(darkeningAmount).toString();
      } else {
        // Lighten dark colors moderately
        return tColor.lighten(20).toString();
      }
    } else {
      console.warn("Invalid color:", color);
      return "#c5c6c7"; // Fallback color
    }
  } catch (error) {
    console.error("Error processing color:", error);
    return "#c5c6c7"; // Fallback color
  }
};

// Function to convert CSS to dark mode
export const convertToDarkMode = (css, darkness) => {
  try {
    const colorProperties =
      /(\bcolor\b|\bbackground-color\b|\bborder-color\b|\boutline-color\b|\bfill\b|\bstroke\b|\btext-decoration-color\b|\bbox-shadow\b|\btext-shadow\b|\bbackground\b|\bborder\b|\boutline\b)\s*:\s*([^;}]+)(;|\s|$)/gi;

    return css.replace(colorProperties, (match, property, value) => {
      const colorMatch =
        /^(#([0-9a-fA-F]{3}){1,2}|rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\)|rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*([0-1]|0?\.\d+)\)|hsl\(\d{1,3},\s*\d+%,\s*\d+%\)|hsla\(\d{1,3},\s*\d+%,\s*\d+%,\s*([0-1]|0?\.\d+)\))$/i;

      if (colorMatch.test(value)) {
        const convertedColor = mapToDarkModeColor(value, darkness);
        console.log(
          `Original color: ${value}, Converted color: ${convertedColor}`
        );
        return `${property}: ${convertedColor};`;
      }

      return `${property}: ${value};`;
    });
  } catch (error) {
    console.error("Error converting CSS:", error);
    throw new Error(
      "Error converting CSS. Please check your input and try again."
    );
  }
};
