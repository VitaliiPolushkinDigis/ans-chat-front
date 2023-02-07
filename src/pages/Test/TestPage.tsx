import { addListener } from '@reduxjs/toolkit';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/layouts/Page/Page';
import { useTypedSelector } from '../../store/store';
import { addTest, getTodoAC } from '../../store/testSlice';
import Loader from '../../utils/workers/components/Loader';
import { processList } from '../../utils/workers/longProcesses/enums';

interface TestPageProps {}

const TestPage: FC<TestPageProps> = () => {
  const { test, loading } = useTypedSelector((state) => state.test);
  const dispatch = useDispatch();
  const updateTest = () => {
    dispatch(getTodoAC({ id: '5' }));
  };

  console.log('loading', loading);

  const [lengthCount, setLengthCount] = useState({ loading: true, value: 0 });

  const counter: Worker = useMemo(
    () => new Worker(new URL('../../utils/workers/longProcesses/count.ts', import.meta.url)),
    [],
  );

  const getData: Worker = useMemo(
    () => new Worker(new URL('../../utils/workers/longProcesses/getData.ts', import.meta.url)),
    [],
  );

  useEffect(() => {
    if (window.Worker) {
      counter.postMessage(processList.count);
    }
  }, [counter]);

  useEffect(() => {
    if (window.Worker) {
      counter.onmessage = (e: MessageEvent<string>) => {
        setLengthCount((prev) => ({
          ...prev,
          loading: false,
          value: Number(e.data) && Number(e.data),
        }));
      };
    }
  }, [counter]);

  console.log('lengthCount', lengthCount);

  return (
    <Page display="flex">
      <div>{test}</div>
      <div>
        <button onClick={updateTest}>Test</button>
      </div>
      {loading && <h1>loading</h1>}
      <br />

      <main className="main-container">
        <section className="count">
          Total count of Profiles is
          <b>
            {lengthCount.loading ? (
              <Loader size={14} display="inline-block" color="black" />
            ) : (
              lengthCount.value
            )}
          </b>
        </section>
        <section className="table-container"></section>
      </main>
    </Page>
  );
};

export default TestPage;
