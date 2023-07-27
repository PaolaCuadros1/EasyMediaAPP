import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { FirestoreModule } from '@angular/fire/firestore'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeaderComponent } from './components/header/header.component'
import { HomeComponent } from './components/home/home.component'
import { CreateMessageComponent } from './components/messages/create/create.component'
import { MessagesComponent } from './components/messages/messages/messages.component'
import { LoginComponent } from './components/user/login/login.component'
import { RegisterComponent } from './components/user/register/register.component'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    CreateMessageComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    FirestoreModule,
    HttpClientModule,
    SharedModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth( () => getAuth() )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
