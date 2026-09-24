export interface Article {
  title: string;
  subtitle: string;
  body: string;
  abstract: string;
  category: 'National' | 'Technology' | 'Sports' | 'Economy';
  id: number;
  show: null | 1;
  user: string;
  date: Date;
}