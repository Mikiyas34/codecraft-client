import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DataService } from '../services/data.service';
import { HttpClient } from '@angular/common/http';
import { writer } from '../core/writer';
import { getFileExtension } from '../util';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom,
})
export class EditorComponent implements OnInit, AfterViewInit {
  activatedLanguageFeatures: any[] = [];
  constructor(private data: DataService, private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('http://localhost:3000').subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        console.log('Error', err);
      },
    });
  }
  ngAfterViewInit(): void {
    this.data.activeFile.subscribe((file) => {
      const fileExt = getFileExtension(file!);
      // const currentLanguageFeature = language_features.find((lf) =>
      //   lf.languages.includes(fileExt)
      // );
      // const language_feature_active = this.activatedLanguageFeatures.includes(
      //   currentLanguageFeature
      // );
      // if (language_feature_active) {
      //   currentLanguageFeature?.use(file!);
      // } else {
      //   currentLanguageFeature?.activate(file!);
      //   this.activatedLanguageFeatures.push(currentLanguageFeature);
      // }
    });

    // writter.writeFromText('Hello how is it going\ni am good');
  }
}
