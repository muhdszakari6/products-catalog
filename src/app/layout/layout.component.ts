import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from "../shared/components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../shared/components/footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  template: `
  <app-header></app-header>
    <main class="py-18 px-10">
      <router-outlet></router-outlet>
    </main>
  <app-footer></app-footer>
  `,
  styleUrl: './layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent { }
