import { FC } from 'react';
import LoginForm from '../../components/forms/LoginForm/LoginForm';
import Page from '../../components/layouts/Page/Page';
import { useStyles } from './LoginPage.helper';

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
  const styles = useStyles();
  return (
    <Page display="flex">
      <div className={styles.root}>
        <LoginForm />
      </div>
    </Page>
  );
};

export default LoginPage;
