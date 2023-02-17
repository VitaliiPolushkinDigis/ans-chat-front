import { Period } from './enums';

export type LengthCountType = {
  loading: boolean;
  value: number;
};

export type ProfileType = {
  userId: number | string;
  id: number | string;
  firstName: string;
  lastName: string;
  url: string;
  thumbnailUrl: string;
};

export type PofileListType = {
  loading: boolean;
  list: unknown & Array<ProfileType>;
  page: number;
};

export type GetDataType = {
  action: string;
  period: Period;
  thePageNumber: number;
};

export const defaultListPageSize = 50;
