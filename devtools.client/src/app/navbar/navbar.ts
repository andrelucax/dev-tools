import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../shared/theme-service/theme-service';

@Component({
  selector: 'dt-navbar',
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly themeService = inject(ThemeService);

  protected theme = this.themeService.theme;

  protected toggleDarkMode() {
    this.themeService.toggleTheme();
  }
}
