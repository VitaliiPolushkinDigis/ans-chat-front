/* import { profiles } from '../data'; */
import { processList } from './enums';

self.onmessage = (e: MessageEvent<string>) => {
  if (e.data === processList.count) {
    const findLength = [].length;

    self.postMessage(findLength);
  }
};

export {};
