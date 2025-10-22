import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';

type Lang = 'en' | 'es';
const LANGS: readonly Lang[] = ['en', 'es'] as const;

function toLang(v?: string | null): Lang | null {
  if (!v) return null;
  const base = v.split('-')[0]; // "en-US" -> "en"
  return (base === 'en' || base === 'es') ? (base as Lang) : null;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, NgFor, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nexaplaform');

  public translate = inject(TranslateService);
  public platformId = inject(PLATFORM_ID);
  public isBrowser = isPlatformBrowser(this.platformId);

  langs: readonly Lang[] = LANGS;
  lang = signal<Lang>('en');

  constructor() {
    this.translate.addLangs(this.langs as unknown as string[]);

    if (this.isBrowser) {
      const saved = toLang(localStorage.getItem('lang'));
      const browser = toLang(this.translate.getBrowserLang());
      const initial: Lang = saved ?? browser ?? 'en';
      this.setLang(initial);
    } else {
      this.translate.use('en');
      this.lang.set('en');
    }
  }

  public setLang(l: Lang) {
    this.translate.use(l);
    this.lang.set(l);
    if (this.isBrowser) localStorage.setItem('lang', l);
  }

  public onLangChange(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = target?.value as Lang | undefined;
    if (value) this.setLang(value);
  }

  public closeMobileMenu() {
    (document.querySelector('.mobile-nav-toggle') as HTMLElement)?.click();
  }



}
