import { Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useStyles } from '../../../pages/AuthenticationPage/AuthenticationPage.helper';
import { postLoginUser } from '../../../utils/api';
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

  const submitForm = async (values: UserCredentialsParams) => {
    try {
      postLoginUser(values).then(() => {
        addToast('Login Successfully', { appearance: 'success' });
        navigate('/conversations');
      });
    } catch (error) {
      console.log(error);
      addToast('Login Unsuccessfully', { appearance: 'error' });
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
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
        />
      </Grid>
      <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
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
        <Link to="/register">Don't have an account? Register.</Link>
      </Typography>
    </form>
  );
};

export default LoginForm;
