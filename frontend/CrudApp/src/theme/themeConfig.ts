export type ThemeType = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  card: string;
  border: string;
  inActiveColor: string;
  lightBlack: string;
  lightWhite: string;
  cardDescription: string;
  deepMaroon: string;
  lightMaroon: string;
  textDark: string;
  borderColor: string;
  blueColor: string;
}

export const lightTheme: ThemeColors = {
  primary: '#f28913',
  background: '#FFFFFF',
  text: '#000000',
  textDark: '#ffffff',
  card: '#F2F2F2',
  border: '#C6C6C8',
  inActiveColor: '#8E8E93',
  lightBlack: 'rgba(0, 0, 0, 0.3)',
  lightWhite: 'rgba(255, 255, 255, 0.2)',
  cardDescription: '#918E8E',
  deepMaroon: '#631513',
  lightMaroon: '#A94442',
  borderColor: '#E1E0E0',
  blueColor: '#134CBF',
};

export const darkTheme: ThemeColors = {
  primary: '#f28913',
  background: '#121212',
  text: '#FFFFFF',
  textDark: '#000000',
  card: '#1E1E1E',
  border: '#2C2C2E',
  inActiveColor: '#98989D',
  lightBlack: 'rgba(255, 255, 255, 0.3)',
  lightWhite: 'rgba(0, 0, 0, 0.2)',
  cardDescription: '#A9A9A9',
  deepMaroon: '#ff2d2a',
  lightMaroon: '#D27B7B',
  borderColor: '#E1E0E0',
  blueColor: '#134CBF',
};

export type ThemeColorKey = keyof ThemeColors;
