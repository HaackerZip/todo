// import { ReactNode } from 'react';

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
  isFeatured: boolean;
  productCount: number;
}

export interface ColumnData<T> {
  key: keyof T | "actions";
  label: string;
  render?: (
    value: T[keyof T] | undefined,
    row?: T,
  ) => JSX.Element | string | null;
}

export interface Filter<T> {
  key: keyof T;
  label: string;
  options: { label: string; value: string }[];
}
