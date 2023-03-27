import { AuthService } from './app/shared/services/auth/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { APP_ROUTES } from './app/app.routes';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { RouterModule, provideRouter, withDebugTracing } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AuthInterceptor } from './app/shared/interceptors/auth/auth.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(
          BrowserModule,
          RouterModule,
          ToastrModule.forRoot(),
          NgxEditorModule.forRoot({
            locals: {
                // menu
                bold: 'Bold',
                italic: 'Italic',
                code: 'Code',
                blockquote: 'Blockquote',
                underline: 'Underline',
                strike: 'Strike',
                bullet_list: 'Bullet List',
                ordered_list: 'Ordered List',
                heading: 'Heading',
                h1: 'Header 1',
                h2: 'Header 2',
                h3: 'Header 3',
                h4: 'Header 4',
                h5: 'Header 5',
                h6: 'Header 6',
                align_left: 'Left Align',
                align_center: 'Center Align',
                align_right: 'Right Align',
                align_justify: 'Justify',
                text_color: 'Text Color',
                background_color: 'Background Color',
                // popups, forms, others...
                url: 'URL',
                text: 'Text',
                openInNewTab: 'Open in new tab',
                insert: 'Insert',
                altText: 'Alt Text',
                title: 'Title',
                remove: 'Remove',
            },
          }),

          ),
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
          provide: AuthService,
          useClass: AuthService
        },
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(APP_ROUTES, withDebugTracing())
    ]
})
  .catch((err) => console.error(err));
