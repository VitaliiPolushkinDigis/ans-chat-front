import { Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useStyles } from '../../../pages/AuthenticationPage/AuthenticationPage.helper';
import { useLoginMutation } from '../../../utils/services/api';
import { UserCredentialsParams } from '../../../utils/types';
import { TextFieldComponent } from '../../TextFieldComponent/TextFieldComponent';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const { addToast } = useToasts();
  const styles = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { password: '', email: '' },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    /*  validationSchema: validationSchemaAccountBox, */
    onSubmit: (values, actions) => {
      submitForm(values);
      /*  actions.resetForm({}); */
    },
  });
  const { handleBlur, handleSubmit, setFieldTouched, values, handleChange, errors, resetForm } =
    formik;

  const [login, { error }] = useLoginMutation();

  const submitForm = async (values: UserCredentialsParams) => {
    try {
      login(values).then((res: any) => {
        console.log(res, error);

        addToast('Login Successfully', { appearance: 'success' });
        navigate('/profiles');
      });
    } catch (error) {
      console.log(error);
      addToast('Login Unsuccessfully', { appearance: 'error' });
    }
    /*  postLoginUser(values).then(() => {

        addToast('Login Successfully', { appearance: 'success' });
        navigate('/profile');
      });
    } catch (error) {
      console.log(error);
      addToast('Login Unsuccessfully', { appearance: 'error' });
    } */
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit} data-attr="form">
      <Grid>
        <TextFieldComponent
          placeholder="Your email"
          name="email"
          value={values.email ? values.email : ''}
          onChange={handleChange}
          onBlur={handleBlur}
          setFieldTouched={setFieldTouched}
          errorText={errors.email}
          fullWidth
          helperText
          label="Your Email"
          dataAttr="email"
        />
      </Grid>
      <Grid>
        <TextFieldComponent
          placeholder="Your password"
          name="password"
          value={values.password ? values.password : ''}
          onChange={handleChange}
          onBlur={handleBlur}
          setFieldTouched={setFieldTouched}
          errorText={errors.password}
          fullWidth
          helperText
          label="Your password"
          dataAttr="password"
        />
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        data-attr="submit"
      >
        Submit
      </Button>
      <Button
        type="reset"
        onClick={() => resetForm()}
        variant="outlined"
        color="info"
        size="large"
        fullWidth
      >
        Reset
      </Button>
      <Typography>
        <Link data-attr="register-link" to="/register">
          Don't have an account? Register.
        </Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
