import { addListener } from '@reduxjs/toolkit';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/layouts/Page/Page';
import { useTypedSelector } from '../../store/store';
import { addTest, getTodoAC } from '../../store/testSlice';

interface TestPageProps {}

const TestPage: FC<TestPageProps> = () => {
  const { test, loading } = useTypedSelector((state) => state.test);
  const dispatch = useDispatch();
  const updateTest = () => {
    dispatch(getTodoAC({ id: '5' }));
  };

  console.log('loading', loading);

  return (
    <Page display="flex">
      <div>{test}</div>
      <div>
        <button onClick={updateTest}>Test</button>
      </div>
      {loading && <h1>loading</h1>}
      <br />
    </Page>
  );
};

export default TestPage;
