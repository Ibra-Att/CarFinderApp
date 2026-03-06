import { Component, inject, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterOutlet } from '@angular/router';
import { Nav } from './layout/nav/nav';
import { BusyService } from './core/services/busy-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatSlideToggleModule,
    Nav
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected busyService = inject(BusyService);

  protected readonly title = signal('CarFinder-UI');



}
