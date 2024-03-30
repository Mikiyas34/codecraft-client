import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from '../core/language';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  files = new BehaviorSubject<File[]>([]);
  openedFiles = new BehaviorSubject<File[]>([]);
  activeFile = new BehaviorSubject<File | null>(null);
  activeBar = new BehaviorSubject<
    'FileExplorer' | 'Extensions' | 'Search' | 'Debug' | 'VCS' | 'None'
  >('FileExplorer');
  languages = new BehaviorSubject<Language[]>([]);
}
