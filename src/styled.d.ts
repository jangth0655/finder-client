// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      bgColor: string;
      main: {
        sm: string;
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
      lg: string;
      xl: string;
    };
    fontSize: {
      sm: string;
      lg: string;
      xl: string;
    };
  }
}
