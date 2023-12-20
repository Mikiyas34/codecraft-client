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
}
