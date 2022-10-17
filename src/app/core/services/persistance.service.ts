import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersistanceService {
  set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error('error set data to storage');
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) || '');
    } catch (err) {
      console.error('error geting data');
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error('error removing data');
    }
  }
}
