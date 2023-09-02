import { FC, useContext, useEffect } from 'react';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import Page from '../../components/layouts/Page/Page';
import { useAppDispatch } from '../../store/store';
import { SocketContext } from '../../utils/context/SocketContext';
import { MessageEventPayload } from '../../utils/types';
import { useStyles } from './LoginPage.helper';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const styles = useStyles();
  const dispatch = useAppDispatch();

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on('connected', () => console.log('Connected'));
    socket.on('onMessage', (payload: MessageEventPayload) => {
      console.log('Message Received');
      const { conversation, ...message } = payload;
      /*   dispatch(addMessage(payload)); */
    });
    return () => {
      socket.off('connected');
      socket.off('onMessage');
    };
  }, []);

  return (
    <Page display="flex">
      <div className={styles.root}>
        <LoginForm />
      </div>
    </Page>
  );
};

export default LoginPage;
