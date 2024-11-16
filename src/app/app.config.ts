import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

import {provideFirebaseApp, initializeApp} from "@angular/fire/app";
import {getDatabase, provideDatabase} from "@angular/fire/database";

const firebaseConfig = {

  apiKey: "AIzaSyDwc7Oq1Etq_Wtk0FCHwhAXB7h4Zq_TSWY",

  authDomain: "abccms-95881.firebaseapp.com",

  projectId: "abccms-95881",

  storageBucket: "abccms-95881.firebasestorage.app",

  messagingSenderId: "945214380448",

  appId: "1:945214380448:web:34e1fb3519f5b7329facc5"

};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
  ]
};
