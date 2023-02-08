import { addListener } from '@reduxjs/toolkit';
import { FC, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../components/layouts/Page/Page';
import { useTypedSelector } from '../../store/store';
import { addTest, getTodoAC } from '../../store/testSlice';
import Loader from '../../utils/workers/components/Loader';
import Table from '../../utils/workers/components/Table';
import { processList } from '../../utils/workers/longProcesses/enums';
import { PofileListType, GetDataType, ProfileType } from '../../utils/workers/longProcesses/types';

interface TestPageProps {}

const TestPage: FC<TestPageProps> = () => {
  const { test, loading } = useTypedSelector((state) => state.test);
  const dispatch = useDispatch();
  const updateTest = () => {
    dispatch(getTodoAC({ id: '5' }));
  };

  console.log('loading', loading);

  const [lengthCount, setLengthCount] = useState({ loading: true, value: 0 });
  const [data, setData] = useState<PofileListType>({
    loading: true,
    list: [],
    page: 1,
  });

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

  useEffect(() => {
    if (window.Worker) {
      const requiest = {
        action: processList.getData,
        period: 'initial',
        thePageNumber: data.page,
      } as GetDataType;

      getData.postMessage(JSON.stringify(requiest));
    }
  }, []);

  useEffect(() => {
    if (window.Worker) {
      getData.onmessage = (e: MessageEvent<string>) => {
        const response = JSON.parse(e.data) as PofileListType;

        setData((prev) => ({
          ...prev,
          loading: response.loading,
          list: response.list,
          page: response.page,
        }));
      };
    }
  }, [getData]);

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
        <section className="table-container">
          {data.loading ? <Loader size={40} display="block" /> : <Table list={data.list} />}
        </section>
      </main>
    </Page>
  );
};

export default TestPage;
