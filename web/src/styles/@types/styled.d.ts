import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    palette: {
      main: {
        primary: string,
        primaryLight: string,
        secondary: string,
      },
      grayScale: {
        one: string,
        two: string,
        three: string,
        four: string,
        five: string,
      },
      feedback: {
        alert: string,
        warning: string,
        success: string,
        info: string,
      },
    },
    typography: {
      sizes: {
        one: string,
        two: string,
        three: string,
        four: string,
        five: string,
        six: string,
      }
    }
  }
}