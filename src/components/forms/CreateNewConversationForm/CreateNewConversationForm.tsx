import { Button, FormControl, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC } from 'react';
import { TextFieldComponent } from '../../TextFieldComponent/TextFieldComponent';
import { classes } from './CreateNewConversationForm.helper';

interface CreateNewConversationFormProps {}

const CreateNewConversationForm: FC<CreateNewConversationFormProps> = ({}) => {
  const { handleBlur, handleSubmit, setFieldTouched, values, handleChange, errors, resetForm } =
    useFormik({
      initialValues: { name: '', message: '' },
      enableReinitialize: true,
      validateOnChange: true,
      validateOnBlur: false,
      /*  validationSchema: validationSchemaAccountBox, */
      onSubmit: (values, actions) => {
        submitForm();
        actions.resetForm({});
      },
    });

  const submitForm = async (/* data: CreateUserParams */) => {
    try {
      console.log('post', values);

      /*      await postRegisterUser(data).then(() => {
          addToast('Registered Successfully', { appearance: 'success' });
        }); */
    } catch (error) {
      console.log(error);
      /*    addToast('Register Unsuccessfully', { appearance: 'error' }); */
    }
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
      <Typography className={classes.title} id="modal-modal-title" variant="h6" component="h2">
        Create new Conversation
      </Typography>
      <Typography sx={{ mt: 2 }}>Person</Typography>
      <TextFieldComponent
        placeholder="Person Name"
        name="name"
        value={values.name ? values.name : ''}
        onChange={handleChange}
        onBlur={handleBlur}
        setFieldTouched={setFieldTouched}
        errorText={errors.name}
        fullWidth
        helperText
        label="Person Name"
      />
      <Typography sx={{ mt: 2 }}>Message</Typography>
      <TextFieldComponent
        placeholder="Message"
        name="message"
        value={values.message ? values.message : ''}
        onChange={handleChange}
        onBlur={handleBlur}
        setFieldTouched={setFieldTouched}
        errorText={errors.message}
        fullWidth
        helperText
        label="Your Message"
        multiline
      />
      <Button type="submit" sx={{ mt: 2 }} variant="contained" color="primary">
        Create and send
      </Button>
    </form>
  );
};

export default CreateNewConversationForm;
