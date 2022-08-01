// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      white: string;
      black: string;
      bgColor: string;
      main: {
        xs?: string;
        sm?: string;
        base: string;
        lg: string;
        xl: string;
      };
      active: {
        sm: string;
        base: string;
        lg: string;
        xl: string;
      };
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
      xxxxl: string;
    };
    shadow: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    maxWidth: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    mp: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
      xxxxl: string;
    };
    transition: string;
  }
}
