// src/app/translate-loader.factory.ts
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';

class SimpleHttpLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix: string = 'assets/i18n/',
    private suffix: string = '.json'
  ) {}

   getTranslation(lang: string): Observable<any> {
    const url = `${this.prefix}${lang}${this.suffix}?v=${Date.now()}`;
    return this.http.get(url).pipe(
      catchError(() => of({}))
    );
  }
}

export function httpLoaderFactory(http: HttpClient): TranslateLoader {
  return new SimpleHttpLoader(http, 'assets/i18n/', '.json');
}
