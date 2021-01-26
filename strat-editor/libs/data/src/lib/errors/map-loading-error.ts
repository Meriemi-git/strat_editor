export class MapLoadingError extends Error {
  name: string;
  stack?: string;
  message: string;
}
