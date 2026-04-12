import { Injectable, signal } from '@angular/core';

type ThemeMode = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly storageKey = 'theme';

  private _theme = signal<ThemeMode>(this.getInitialTheme());

  theme = this._theme.asReadonly();

  constructor() {
    this.applyTheme(this._theme());
  }

  toggleTheme() {
    const next = this._theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: ThemeMode) {
    this._theme.set(theme);
    localStorage.setItem(this.storageKey, theme);
    this.applyTheme(theme);
  }

  private getInitialTheme(): ThemeMode {
    const saved = localStorage.getItem(this.storageKey) as ThemeMode | null;
    if (saved) return saved;

    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private applyTheme(theme: ThemeMode) {
    const isLight = theme === 'light';

    document.body.classList.toggle('light-mode', isLight);
  }
}
