import { profiles } from '../data';
import { processList } from './enums';

self.onmessage = (e: MessageEvent<string>) => {
  if (e.data === processList.conut) {
    const findLength = profiles.length;

    self.postMessage(findLength);
  }
};

export {};
