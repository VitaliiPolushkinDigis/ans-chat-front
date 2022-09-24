import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';

import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import ConversationChannelPage from './pages/ConversationChannelPage/ConversationChannelPage';
import ConversationPage from './pages/ConversationPage/ConversationPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <ToastProvider autoDismiss autoDismissTimeout={3500}>
      <Router>
        <Routes>
          <Route path="register" element={<AuthenticationPage />}></Route>
          <Route path="login" element={<LoginPage />}></Route>
          <Route
            path="conversations"
            element={
              <AuthenticatedRoute>
                <ConversationPage />
              </AuthenticatedRoute>
            }
          >
            <Route path=":id" element={<ConversationChannelPage />} />
          </Route>

          {/*       <Route path="conversations/:id" element={<ConversationChannelPage />} /> */}
        </Routes>
      </Router>
    </ToastProvider>
  );
}

export default App;
