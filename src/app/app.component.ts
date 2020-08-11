import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ForecastComponent } from './components//forecast.component';
@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(injector: Injector) {
    const weather = createCustomElement(ForecastComponent, {injector});
    customElements.define('weather-mfe', ForecastComponent);
  }
}
