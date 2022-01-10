import { useEffect } from 'react';
import GoogleFontLoader from 'react-google-font-loader';

import { darkTheme, lightTheme } from './themes';
import { Colors } from './types';

type ThemeOptions = 'light' | 'dark';

export interface ThemeProps {
  children: React.ReactNode;
  theme: ThemeOptions;
}

export const Theme = ({ children, theme }: ThemeProps) => {
  const themes: Record<ThemeOptions, Colors> = {
    light: lightTheme,
    dark: darkTheme,
  };
  const colors = themes[theme];

  useEffect(() => {
    Object.keys(colors).forEach(key => {
      document.documentElement.style.setProperty(`--${key}`, colors[key as keyof Colors]);
    });
  });

  return (
    <div>
      <GoogleFontLoader
        fonts={[
          { font: 'Roboto Condensed', weights: [400, 700] },
          { font: 'Roboto', weights: [400, 700] },
        ]}
        subsets={['latin']}
      />
      {children}
    </div>
  );
};
