import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { ErrorInterceptor } from './app/core/interceptors/error.interceptor';


bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(withFetch()),
      provideHttpClient(withInterceptorsFromDi()), 
      provideAnimations(),
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  });
