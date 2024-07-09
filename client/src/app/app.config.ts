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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { reservationReducer } from './nrgx/reservation/reservation.reducer';
import { storageReducer } from './nrgx/storage/storage.reducer';
import { manufacturerReducer } from './nrgx/manufacturer/manufacturer.reducer';
import { paymentReducer } from './nrgx/payment/payment.reducer';
import { ManufacturerEffects } from './nrgx/manufacturer/manufacturer.effects';
import { ReservationEffects } from './nrgx/reservation/reservation.effects';
import { StorageEffects } from './nrgx/storage/storage.effects';
import { PaymentEffects } from './nrgx/payment/payment.effects';

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
    provideState({ name: 'manufacturer', reducer: manufacturerReducer }),
    provideState({ name: 'payment', reducer: paymentReducer }),
    provideState({ name: 'reservation', reducer: reservationReducer }),
    provideState({ name: 'storage', reducer: storageReducer }),

    // provideState({ name: 'motor', reducer: motorReducer }),
    provideEffects([
      AuthEffects,
      UserEffects,
      MotorEffects,
      CategoryEffects,
      PaymentEffects,
      ManufacturerEffects,
      ReservationEffects,
      StorageEffects,
    ]),
    provideHttpClient(),
    provideAnimationsAsync(),
  ],
};
