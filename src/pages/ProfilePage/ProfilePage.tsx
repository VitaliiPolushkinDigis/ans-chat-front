import { Box, Button, Grid, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Page from '../../components/layouts/Page/Page';
import Post from '../../components/Post/Post';
import { TextFieldComponent } from '../../components/TextFieldComponent/TextFieldComponent';
import usePrevious from '../../hooks/usePrevious';
import { AuthContext } from '../../utils/context/AuthContext';
import {
  useCreatePostMutation,
  useGetProfilePostsQuery,
  useLazyGetProfilePostsQuery,
  useLazyGetProfileQuery,
} from '../../utils/services/api';
import { User } from '../../utils/types';
/* import { useAuth } from '../../hooks/useAuth'; */

interface PostsProps {
  user: User;
}

const Posts: FC<PostsProps> = ({ user }) => {
  const { data } = useGetProfilePostsQuery(user.id);

  return <>{data?.map((p) => <Post p={p} />) || <Typography>No posts yet</Typography>}</>;
};

interface ProfilePageProps {}

const ProfilePage: FC<ProfilePageProps> = ({}) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [getProfile, profile] = useLazyGetProfileQuery();

  const [createPost, resulr] = useCreatePostMutation();

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
    }
  }, []);

  return (
    <Page>
      <Grid
        container
        direction="row"
        style={{ flexWrap: 'inherit', margin: '0 auto', width: '80%' }}
      >
        <Box style={{ width: '300px', background: 'yellow' }}>
          Sidebar
          <Typography onClick={() => navigate('/conversations')}>Conversations</Typography>
        </Box>
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

                {user?.id && (
                  <Box style={{ marginTop: '40px' }}>
                    <Posts user={user} />
                  </Box>
                )}
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
