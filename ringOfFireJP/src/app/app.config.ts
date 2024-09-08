// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';


import { routes } from './app.routes';

const firebaseConfig = {

  apiKey: "AIzaSyBo_2mTr58a2xGREGVFLE70uTU6VxmTrOE",
  authDomain: "ringoffirejp.firebaseapp.com",
  projectId: "ringoffirejp",
  storageBucket: "ringoffirejp.appspot.com",
  messagingSenderId: "48199702768",
  appId: "1:48199702768:web:558c95a65c22e717a98a35"
  
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideStorage(() => getStorage()),
  ]
};