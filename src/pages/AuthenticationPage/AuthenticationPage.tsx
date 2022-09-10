import { FC } from 'react';
import RegisterForm from '../../components/forms/RegisterForm/RegisterForm';
import Page from '../../components/layouts/Page/Page';
import { useStyles } from './AuthenticationPage.helper';

interface AuthenticationPageProps {}

const AuthenticationPage: FC<AuthenticationPageProps> = () => {
  const styles = useStyles();
  return (
    <Page display="flex">
      <div className={styles.root}>
        <RegisterForm />
      </div>
    </Page>
  );
};

export default AuthenticationPage;
