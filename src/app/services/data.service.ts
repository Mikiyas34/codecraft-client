import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  view = new BehaviorSubject<View>({
    commandPalette: false,
  });
}

interface View {
  commandPalette: boolean;
}
