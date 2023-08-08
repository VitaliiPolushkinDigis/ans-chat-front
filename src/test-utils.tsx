import React, { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { Provider } from 'react-redux';
import { ThemeProvider, StyledEngineProvider } from '@mui/material';
import { ToastProvider } from 'react-toast-notifications';
import {
  createGenerateClassName,
  ThemeProvider as StylesThemeProvide,
  StylesProvider,
} from '@mui/styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { store } from './store/store';
import LoginPage from './pages/LoginPage/LoginPage';

const generateClassName = createGenerateClassName({
  seed: 'sv-dashboard',
});
export const history = createMemoryHistory({ initialEntries: ['/login'] });
const AllTheProviders: FC<any> = ({ children }) => {
  return (
    <Provider store={store}>
      <StylesProvider generateClassName={generateClassName} injectFirst>
        <StyledEngineProvider injectFirst>
          <ToastProvider autoDismiss autoDismissTimeout={3500}>
            <Router>{children}</Router>
          </ToastProvider>
        </StyledEngineProvider>
      </StylesProvider>
    </Provider>
  );
};
export { store as testingStore };
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });
export * from '@testing-library/react';
export { customRender as render };
