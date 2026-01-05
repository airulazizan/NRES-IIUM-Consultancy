
export interface PolicyEntry {
  id: string;
  objektif: string;
  dasar: string[];
  fokus: string[];
  contoh: string[];
  skop: string[];
  perundangan: string[];
  fasa: string[];
}

export type ViewMode = 'grid' | 'pivot' | 'graph';
