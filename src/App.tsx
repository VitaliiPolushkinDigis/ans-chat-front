import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticationPage from './pages/AuthenticationPage/AuthenticationPage';
import ConversationChannelPage from './pages/ConversationChannelPage/ConversationChannelPage';
import ConversationPage from './pages/ConversationPage/ConversationPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="register" element={<AuthenticationPage />}></Route>
        <Route path="login" element={<LoginPage />}></Route>
        <Route path="conversations" element={<ConversationPage />}>
          <Route path=":id" element={<ConversationChannelPage />} />
        </Route>

        {/*       <Route path="conversations/:id" element={<ConversationChannelPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
