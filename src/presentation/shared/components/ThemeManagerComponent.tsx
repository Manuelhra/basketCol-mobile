import React, { useEffect } from 'react';
import { ColorSchemeName } from 'react-native';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { themeActions } from '../store/redux/slices/theme/theme.slice';
import { darkTheme, lightTheme } from '../config/theme';

type ThemeManagerComponentProps = {
  children: React.ReactNode;
  scheme: ColorSchemeName;
};

export const ThemeManagerComponent = ({ scheme, children }: ThemeManagerComponentProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (scheme) {
      dispatch(themeActions.setMode(scheme));
      dispatch(themeActions.setTheme(scheme === 'dark' ? darkTheme : lightTheme));
    }
  }, [scheme, dispatch]);

  return (
    <>
      {children}
    </>
  );
};
