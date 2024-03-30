import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { firstValueFrom } from 'rxjs';
import { DataService } from './data.service';
import { Language } from '../core/language';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private data: DataService) {}
  getLanguageInfo(langId: string) {
    //get config
    const langConfigRequest = firstValueFrom(
      this.http.get(`${environments.development.apiUrl}/lang-config/${langId}`)
    );
    langConfigRequest
      .then((data: any) => {
        let language = this.data.languages
          .getValue()
          .find((lang) => lang.extension == langId);
        if (language) {
          language.config = data;
        } else {
          language = new Language(langId);
          language.config = data;
          this.data.languages.next([
            ...this.data.languages.getValue(),
            language,
          ]);
        }
      })
      .catch((err) => {
        console.log("Couldn't get language configuration. ", err);
      });

    // get syntax
    const langSyntaxRequest = firstValueFrom(
      this.http.get(`${environments.development.apiUrl}/grammar/${langId}`)
    );
    langSyntaxRequest
      .then((data: any) => {
        let language = this.data.languages
          .getValue()
          .find((lang) => lang.extension == langId);
        if (language) {
          language.syntax = data;
        } else {
          language = new Language(langId);
          language.syntax = data;
          this.data.languages.next([
            ...this.data.languages.getValue(),
            language,
          ]);
        }
      })
      .catch((err) => {
        console.log("Couldn't get language syntax. ", err);
      });
    const langSnippetsRequest = firstValueFrom(
      this.http.get(`${environments.development.apiUrl}/grammar/${langId}`)
    );
    langSnippetsRequest
      .then((data: any) => {
        let language = this.data.languages
          .getValue()
          .find((lang) => lang.extension == langId);
        if (language) {
          language.snippets = data;
        } else {
          language = new Language(langId);
          language.snippets = data;
          this.data.languages.next([
            ...this.data.languages.getValue(),
            language,
          ]);
        }
      })
      .catch((err) => {
        console.log("Couldn't get language snippets. ", err);
      });
  }
}





const lineText = "const bob = 'hello';  //this is comment"

const div = ['const', '&nbsp;', 'bob', '&nbsp;','=', '&nbsp;',"'hello';", '&nbsp;', '//this', '&nbsp;','is', '&nbsp;','a', '&nbsp;','comment']
for (let i = 0; i < div.length; i++) {
  const word = div[i];
  if(word.startsWith('//')){
    let wordsToBeCommented = div.slice(div.indexOf(word), div.length)
    const elem = createEem('span', '', wordsToBeCommented.join(''))
    elem.classList.add('comment')
    currentLine.appendChild(elem)
  }
  
}

// on write
if(lineText.includes(lang.config.comments.lineComment)){

}
