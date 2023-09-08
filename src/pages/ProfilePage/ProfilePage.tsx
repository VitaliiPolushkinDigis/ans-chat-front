import { Box, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Page from '../../components/layouts/Page/Page';
import { TextFieldComponent } from '../../components/TextFieldComponent/TextFieldComponent';
import { AuthContext } from '../../utils/context/AuthContext';
import { useLazyGetProfileQuery } from '../../utils/services/api';
/* import { useAuth } from '../../hooks/useAuth'; */

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const { user } = useContext(AuthContext);
  const [getProfile, profile] = useLazyGetProfileQuery();
  console.log('user', user, 'profile', profile);

  const { values, handleChange, handleBlur, setFieldTouched, errors } = useFormik({
    initialValues: { text: '' },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    /*  validationSchema: validationSchemaAccountBox, */
    onSubmit: (values, actions) => {
      /*   submitForm(values); */
    },
  });

  useEffect(() => {
    if (user?.id) {
      getProfile(user.id);
    }
  }, []);

  return (
    <Page>
      <Grid
        container
        direction="row"
        style={{ flexWrap: 'inherit', margin: '0 auto', width: '80%' }}
      >
        <Box style={{ width: '300px', background: 'yellow' }}>Sidebar</Box>
        <Box style={{ width: '100%', background: 'aliceblue' }}>
          {profile && (
            <Box style={{ display: 'flex' }}>
              <Box>
                <img
                  style={{ borderRadius: '50%', width: '200px' }}
                  src={profile?.data?.avatarUrl}
                  alt="avatar"
                />
              </Box>
              <Box>
                <Typography>
                  {user?.firstName} {user?.lastName}
                </Typography>
                {profile?.data?.status ? (
                  <Typography>{profile?.data?.status}</Typography>
                ) : (
                  <TextFieldComponent
                    placeholder="Your Status"
                    name="text"
                    value={values.text ? values.text : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    setFieldTouched={setFieldTouched}
                    errorText={errors.text}
                    fullWidth
                    helperText
                    label="Your Status"
                    dataAttr="text"
                  />
                )}
                <Typography></Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Grid>
      <Outlet />
    </Page>
  );
};

export default ProfilePage;
