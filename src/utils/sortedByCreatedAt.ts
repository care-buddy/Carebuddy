import { ICreatedAt } from '@/types';

const sortedByCreatedAt = <T extends ICreatedAt>(data: T[]): T[] =>
  [...data].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

export default sortedByCreatedAt;
