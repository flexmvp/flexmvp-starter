const daisyuiThemes = require('daisyui/src/theming/themes');

const themesWithSchemes = Object.keys(daisyuiThemes).map(extractThemeName).filter(x => ![null, "light", "dark"].includes(x)).reduce((acc, name) => {
  const theme = daisyuiThemes[`[data-theme=${name}]`];
  const colorScheme = theme['color-scheme'];
  return {
    ...acc,
    [`${name}__${colorScheme}`]: theme
  }
}, {})

const newThemes = {
  [`aqua__light`]: {
    ...themesWithSchemes['aqua__dark'],
    "color-scheme": "light",
    primary: "#0bd1e1",
    "primary-content": "#005355",
    secondary: "#a98bc6",
    accent: "#ffd587",
    neutral: "#5da2d8",
    "base-100": "#e0e8f7",
    "info": "#4b7ddc",
    "success": "#3eb573",
    "warning": "#ec9a0f",
    "error": "#f24545",
  },
  [`black__light`]: {
    ...themesWithSchemes['black__dark'],
    "color-scheme": "light",
    "primary": "#CACACA",
    "secondary": "#CACACA",
    "accent": "#CACACA",
    "base-100": "#FFFFFF",
    "base-200": "#F2F2F2",
    "base-300": "#E5E5E5",
    "neutral": "#D8D8D8",
    "neutral-focus": "#CACACA",
    "info": "#1A1AFF",
    "success": "#1AFF1A",
    "warning": "#FFFF1A",
    "error": "#FF1A1A"
  },
  "acid__dark": {
    ...themesWithSchemes['black__light'],
    "color-scheme": "dark",
    "primary": "#B300BB",
    "secondary": "#B33D00",
    "accent": "#93B800",
    "neutral": "#E5E5FF",
    "base-100": "#050505",
    "info": "#1A5AB1",
    "success": "#2F8C61",
    "warning": "#B1A800",
    "error": "#A50000"
  }
};

const themes = [
  // light: daisyuiThemes["[data-theme=light]"],
  // dark: daisyuiThemes["[data-theme=dark]"],
  // ...cleanKeys(daisyuiThemes),
  "light",
  "dark",
  {
    ...sortObjectKeys({
      ...newThemes,
      ...themesWithSchemes,
    }),
  },

  // Array of all default daisyui theme names except light and dark
  // ...Object.keys(daisyuiThemes).map(extractThemeName).filter(x => ![null, "light", "dark"].includes(x)),
]

module.exports = themes;

/**
 * rebuilds the object with the theme name as the key
 * e.g. { "[data-theme=dark]": { ... } } => { dark: { ... } }
 */
function cleanKeys(obj) {
  const newObj = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[extractThemeName(key)] = obj[key];
    }
  }

  return newObj;
}

/**
 * extracts the theme name from the string
 * e.g. [data-theme=dark] => dark
 */
function extractThemeName(str) {
  const regex = /\[data-theme=([^\]]+)\]/;
  const match = regex.exec(str);

  if (match && match[1]) {
    return match[1];
  }

  return null;
}


/**
 * Sort object keys by name
 */
function sortObjectKeys(obj) {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj = {};

  for (let key of sortedKeys) {
    sortedObj[key] = obj[key];
  }

  return sortedObj;
}
