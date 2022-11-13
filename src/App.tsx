import { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { Socket } from 'socket.io-client';
import { AuthenticatedRoute } from './components/AuthenticatedRoute';

import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import ConversationChannelPage from './pages/ConversationChannelPage/ConversationChannelPage';
import ConversationPage from './pages/ConversationPage/ConversationPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthContext } from './utils/context/AuthContext';
import { socket, SocketContext } from './utils/context/SocketContext';
import { User } from './utils/types';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store/store';

function AppWithProviders({ children, user, setUser, socket }: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, udpateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          <ToastProvider autoDismiss autoDismissTimeout={3500}>
            {children}
          </ToastProvider>
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

type Props = {
  user?: User;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  socket: Socket;
};

function App() {
  const [user, setUser] = useState<User>();
  return (
    <AppWithProviders user={user} setUser={setUser} socket={socket}>
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
    </AppWithProviders>
  );
}

export default App;
