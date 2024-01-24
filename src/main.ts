import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(HttpClientModule),
    provideAnimations(),
    importProvidersFrom(MatCardModule),
    importProvidersFrom(MatFormFieldModule),
    importProvidersFrom(FormsModule),
    importProvidersFrom(NgModule),
  ],
}).catch((err) => console.error(err));
