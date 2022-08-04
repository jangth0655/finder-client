import { DefaultTheme } from "styled-components";

const lightTheme: DefaultTheme = {
  color: {
    white: "white",
    black: "black",
    bgColor: "rgb(248 250 252)",
    main: {
      xs: "rgb(229 231 235)",
      sm: "rgb(209 213 219)",
      base: "rgb(55 65 81)",
      lg: "rgb(31 41 55)",
      xl: "rgb(17 24 39)",
    },
    active: {
      sm: "rgb(253 186 116)",
      base: "rgb(249 115 22)",
      lg: "rgb(234 88 12)",
      xl: "rgb(194 65 12)",
    },
  },
  borderRadius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    xxxl: "1.875rem",
    xxxxl: "2.25rem",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  maxWidth: {
    sm: "36rem",
    md: "42rem",
    lg: "48rem",
    xl: "56rem",
  },
  mp: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "2.5rem",
    xxxl: "3rem",
    xxxxl: "3.5rem",
  },
  transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
  respnosive: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

export { lightTheme };

const darkTheme: DefaultTheme = {
  color: {
    white: "white",
    black: "black",
    bgColor: "rgb(17 24 39)",
    main: {
      xs: "rgb(209 213 219)",
      sm: "rgb(107 114 128)",
      base: "rgb(229 231 235)",
      lg: "rgb(209 213 219)",
      xl: "rgb(156 163 175)",
    },
    active: {
      sm: "rgb(253 186 116)",
      base: "rgb(249 115 22)",
      lg: "rgb(234 88 12)",
      xl: "rgb(194 65 12)",
    },
  },
  borderRadius: {
    sm: "0.125rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
  },
  fontSize: {
    xs: "0.75rem",
    sm: "0.875rem",
    lg: "1.125rem",
    xl: "1.25rem",
    xxl: "1.5rem",
    xxxl: "1.875rem",
    xxxxl: "2.25rem",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  maxWidth: {
    sm: "36rem",
    md: "42rem",
    lg: "48rem",
    xl: "56rem",
  },
  mp: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "2.5rem",
    xxxl: "3rem",
    xxxxl: "3.5rem",
  },
  transition: "all 180ms cubic-bezier(0.4, 0, 0.2, 1)",
  respnosive: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
};

export { darkTheme };
