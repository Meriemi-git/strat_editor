export interface StratFilter {
  mapIds: string[];
  favorites: boolean;
  name: string;
  orderBy: string;
  order: 'asc' | 'desc';
}
