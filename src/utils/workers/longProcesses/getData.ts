import { profiles } from '../data';
import { Period, processList } from './enums';
import { defaultListPageSize, GetDataType, PofileListType } from './types';

self.onmessage = (e: MessageEvent<string>) => {
  const data = JSON.parse(e.data) as GetDataType;

  if (data.action !== processList.getData) {
    return;
  }

  if (data.period === 'initial') {
    const items = profiles.filter((item, i) => i < defaultListPageSize);

    const response = {
      loading: false,
      list: items,
      page: data.thePageNumber,
    } as PofileListType;

    self.postMessage(JSON.stringify(response));
  }

  if (data.period === 'pageNumber' || data.period === 'next' || data.period === 'prev') {
    const items = profiles.slice(
      (data.thePageNumber - 1) * defaultListPageSize,
      data.thePageNumber * defaultListPageSize,
    );

    const response = {
      loading: false,
      list: items,
      page: data.thePageNumber,
    } as PofileListType;

    self.postMessage(JSON.stringify(response));
  }
};
