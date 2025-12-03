import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Dashboard} from './dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [Dashboard],
  templateUrl: './app.html'
})
export class App {
  protected readonly title = signal('delifhery-client');
}
