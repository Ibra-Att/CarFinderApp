export interface NhtsaResponse<T> {
  count: number;
  message: string;
  searchCriteria: string | null;
  results: T[];
}