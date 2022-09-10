import { Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '../../../pages/AuthenticationPage/AuthenticationPage.helper';
import { TextFieldComponent } from '../../TextFieldComponent/TextFieldComponent';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const styles = useStyles();
  const formik = useFormik({
    initialValues: { password: '', email: '' },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    /*  validationSchema: validationSchemaAccountBox, */
    onSubmit: (values, actions) => {
      submitForm(values);
      actions.resetForm({});
    },
  });
  const { handleBlur, handleSubmit, setFieldTouched, values, handleChange, errors, resetForm } =
    formik;

  const submitForm = (values: any) => {
    /*     console.log('value', values); */
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      52:33 and 2:33:51 is BE
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
