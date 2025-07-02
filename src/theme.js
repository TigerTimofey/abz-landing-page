import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: "'Nunito', Arial, sans-serif",
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "'Nunito', Arial, sans-serif",
        },
        input: {
          fontFamily: "'Nunito', Arial, sans-serif",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontFamily: "'Nunito', Arial, sans-serif",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: "'Nunito', Arial, sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "'Nunito', Arial, sans-serif",
        },
      },
    },
  },
})

export default theme
