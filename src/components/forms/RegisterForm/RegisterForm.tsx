import { Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from '../../../pages/AuthenticationPage/AuthenticationPage.helper';
import { TextFieldComponent } from '../../TextFieldComponent/TextFieldComponent';

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = () => {
  const styles = useStyles();
  const formik = useFormik({
    initialValues: { password: '', repeatPassword: '', email: '', firstName: '', lastName: '' },
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
    console.log('value', values);
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
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextFieldComponent
            placeholder="Your Name"
            name="firstName"
            value={values.firstName ? values.firstName : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            setFieldTouched={setFieldTouched}
            errorText={errors.firstName}
            fullWidth
            helperText
            label="Your Name"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldComponent
            placeholder="Your Lastname"
            name="lastName"
            value={values.lastName ? values.lastName : ''}
            onChange={handleChange}
            onBlur={handleBlur}
            setFieldTouched={setFieldTouched}
            errorText={errors.lastName}
            fullWidth
            helperText
            label="Your Lastname"
          />
        </Grid>
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
      <Grid>
        <TextFieldComponent
          placeholder="Your password"
          name="repeatPassword"
          value={values.repeatPassword ? values.repeatPassword : ''}
          onChange={handleChange}
          onBlur={handleBlur}
          setFieldTouched={setFieldTouched}
          errorText={errors.repeatPassword}
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
        <Link to="/login">Already have an account? Login.</Link>
      </Typography>
    </form>
  );
};

export default RegisterForm;
