import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { MatIconModule } from '@angular/material/icon';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    importProvidersFrom(MatCardModule),
    importProvidersFrom(MatFormFieldModule),
    importProvidersFrom(MatInputModule),
    importProvidersFrom(FormsModule),
    importProvidersFrom(NgModule),
    importProvidersFrom(RouterModule),
    importProvidersFrom(MatIconModule),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
