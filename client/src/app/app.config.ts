import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AuthEffects } from './nrgx/auth/auth.effects';
import { authReducer } from './nrgx/auth/auth.reducer';
import { environment } from '../environments/environment';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideHttpClient } from '@angular/common/http';
import { userReducer } from './nrgx/user/user.reducer';
import { UserEffects } from './nrgx/user/user.effects';
import { motorReducer } from './nrgx/motor/motor.reducer';
import { MotorEffects } from './nrgx/motor/motor.effects';
import { categoryReducer } from './nrgx/category/category.reducer';
import { CategoryEffects } from './nrgx/category/category.effects';
// import { candidateReducer } from './ngrx/reducers/candidate.reducer';
// import { CandidateEffects } from './ngrx/effects/candidate.effects';
// import { jobReducer } from './ngrx/reducers/job.reducer';
// import { JobEffects } from './ngrx/effects/job.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    importProvidersFrom(TuiRootModule),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      TuiRootModule,
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideStore(),
    provideState({ name: 'auth', reducer: authReducer }),
    provideState({ name: 'user', reducer: userReducer }),
    provideState({ name: 'motor', reducer: motorReducer }),
    provideState({ name: 'category', reducer: categoryReducer }),

    // provideState({ name: 'motor', reducer: motorReducer }),
    provideEffects([AuthEffects, UserEffects, MotorEffects, CategoryEffects]),
    provideHttpClient(),
  ],
};
