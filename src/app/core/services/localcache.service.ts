import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalCacheService {

  constructor() { }

  setItem(key: string, value: any): void {
    console.log('LocalCacheService::setItem',key,value);
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    console.log('LocalCacheService::getItem',key,item ? JSON.parse(item) : null);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    console.log('LocalCacheService::removeItem',key);
    localStorage.removeItem(key);
  }

  clear(): void {
    console.log('LocalCacheService::clear');
    localStorage.clear();
  }
}
