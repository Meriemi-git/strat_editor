export interface StratFilter {
  userId: string;
  mapIds: string[];
  favorites: boolean;
  name: string;
  sortedBy: string;
  order: 'asc' | 'desc';
}
