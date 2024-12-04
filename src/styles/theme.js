import {MD3DarkTheme} from 'react-native-paper';

const theme = {
  ...MD3DarkTheme,
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#bb86fc',
    accent: '#03dac6',
    background: '#121212',
    surface: '#1e1e1e',
    text: '#e0e0e0',
    placeholder: '#aaaaaa',
    disabled: '#616161',
    error: '#cf6679',
  },
};

export default theme;