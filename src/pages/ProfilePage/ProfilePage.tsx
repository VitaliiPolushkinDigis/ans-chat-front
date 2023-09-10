import { Box, Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Page from '../../components/layouts/Page/Page';
import { TextFieldComponent } from '../../components/TextFieldComponent/TextFieldComponent';
import { AuthContext } from '../../utils/context/AuthContext';
import {
  useCreatePostMutation,
  useLazyGetProfilePostsQuery,
  useLazyGetProfileQuery,
} from '../../utils/services/api';
/* import { useAuth } from '../../hooks/useAuth'; */

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const { user } = useContext(AuthContext);
  const [getProfile, profile] = useLazyGetProfileQuery();
  const [getPosts, posts] = useLazyGetProfilePostsQuery();
  const [createPost, resulr] = useCreatePostMutation();
  console.log('user', user, 'profile', profile, posts.data);

  const { values, handleChange, handleBlur, setFieldTouched, errors, handleSubmit } = useFormik({
    initialValues: { title: '', description: '', subtitle: '', imgUrl: '' },
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: false,
    /*  validationSchema: validationSchemaAccountBox, */
    onSubmit: (values, actions) => {
      /*   submitForm(values); */
      createPost({
        ...values,
        likes: 0,
        imgUrl:
          values.imgUrl ||
          'https://techcrunch.com/wp-content/uploads/2022/06/instagram-pin-posts.png',
      }).then(() => {
        actions.resetForm({});
      });
    },
  });

  useEffect(() => {
    if (user?.id) {
      getProfile(user.id);
      getPosts(user.id);
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
                {
                  profile?.data?.status ? (
                    <Typography>{profile?.data?.status}</Typography>
                  ) : null /* (
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
                ) */
                }

                <form onSubmit={handleSubmit} data-attr="form">
                  <Typography>create your post</Typography>
                  <TextFieldComponent
                    placeholder="Post title"
                    name="title"
                    value={values.title ? values.title : ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    setFieldTouched={setFieldTouched}
                    errorText={errors.title}
                    fullWidth
                    helperText
                    label="Post Title"
                  />
                  <TextFieldComponent
                    placeholder="Your Subtitle"
                    name="subtitle"
                    value={values.subtitle || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    setFieldTouched={setFieldTouched}
                    errorText={errors.subtitle}
                    fullWidth
                    helperText
                    label="Your Subtitle"
                  />
                  <TextFieldComponent
                    placeholder="Your Description"
                    name="description"
                    value={values.description || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    setFieldTouched={setFieldTouched}
                    errorText={errors.description}
                    fullWidth
                    helperText
                    label="Your Description"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    data-attr="submit"
                  >
                    Create a new post
                  </Button>
                </form>
                <Box style={{ marginTop: '40px' }}>
                  {posts.data?.map((p) => (
                    <Box style={{ paddingTop: '24px', paddingBottom: '24px' }}>
                      <Typography fontWeight={700}>{p.title}</Typography>
                      {p.imgUrl && (
                        <img style={{ maxWidth: '500px', borderRadius: '12px' }} src={p.imgUrl} />
                      )}
                      <Typography>{p.subtitle}</Typography>
                      <Typography fontWeight={200}>{p.description}</Typography>
                      <Grid container justifyContent={'space-between'}>
                        <Typography>Likes: {p.likes}</Typography>
                        <Typography>Views: {p.views}</Typography>
                      </Grid>
                    </Box>
                  ))}
                </Box>
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
