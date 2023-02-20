import { FC, useEffect, useMemo, useState } from 'react';
import Page from '../../components/layouts/Page/Page';
import Loader from '../../utils/workers/components/Loader';
import Pagination from '../../utils/workers/components/Pagination';
import Table from '../../utils/workers/components/Table';
import { Period, processList } from '../../utils/workers/longProcesses/enums';
import {
  defaultListPageSize,
  GetDataType,
  PofileListType,
} from '../../utils/workers/longProcesses/types';

interface TestPageProps {}

const TestPage: FC<TestPageProps> = () => {
  const counter: Worker = useMemo(
    () => new Worker(new URL('../../utils/workers/longProcesses/count.ts', import.meta.url)),
    [],
  );
  const getData: Worker = useMemo(
    () => new Worker(new URL('../../utils/workers/longProcesses/getData.ts', import.meta.url)),
    [],
  );

  const [lengthCount, setLengthCount] = useState({ loading: true, value: 0 });
  const [data, setData] = useState<PofileListType>({
    loading: true,
    list: [],
    page: 1,
  });

  const handlePageNumber = (pageNumber: number) => {
    if (window.Worker) {
      const request = {
        action: processList.getData,
        period: Period.pageNumber,
        thePageNumber: pageNumber,
      };

      getData.postMessage(JSON.stringify(request));
    }
  };
  const prevHandler = (pageNumber: number) => {
    if (data.page === 1) {
      return;
    }

    if (window.Worker) {
      const request = {
        action: processList.getData,
        period: Period.prev,
        thePageNumber: pageNumber - 1,
      } as GetDataType;

      getData.postMessage(JSON.stringify(request));
    }
  };
  const nextHandler = (userSelectedPage: number, thePageLength: number) => {
    if (userSelectedPage < thePageLength) {
      if (window.Worker) {
        const request = {
          action: processList.getData,
          period: Period.next,
          thePageNumber: userSelectedPage + 1,
        } as GetDataType;

        getData.postMessage(JSON.stringify(request));
      }
    }
  };

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
    //get data on initial render
    if (window.Worker) {
      const request = {
        action: processList.getData,
        period: 'initial',
        thePageNumber: data.page,
      } as GetDataType;

      getData.postMessage(JSON.stringify(request));
    }
  }, []);

  useEffect(() => {
    //handle receiving response from getData worker
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

  return (
    <Page display="flex">
      <main className="main-container">
        <section className="count">
          Total count of Profiles is {''}
          <b>
            {lengthCount.loading ? (
              <Loader size={14} display="inline-block" color="black" />
            ) : (
              lengthCount.value
            )}
          </b>
        </section>
        <section className="table-container">
          {data.loading ? (
            <Loader size={40} display="block" />
          ) : (
            <>
              <Pagination
                page={data.page}
                pages={lengthCount.value / defaultListPageSize}
                pageClick={(pageNumber) => handlePageNumber(pageNumber)}
                prevHandler={() => prevHandler(data.page)}
                nextHandler={() => nextHandler(data.page, lengthCount.value / defaultListPageSize)}
              />
              <Table list={data.list} />
              <Pagination
                page={data.page}
                pages={lengthCount.value / defaultListPageSize}
                pageClick={(pageNumber) => handlePageNumber(pageNumber)}
                prevHandler={() => prevHandler(data.page)}
                nextHandler={() => nextHandler(data.page, lengthCount.value / defaultListPageSize)}
              />
            </>
          )}
        </section>
      </main>
    </Page>
  );
};

export default TestPage;
