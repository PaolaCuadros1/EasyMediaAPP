import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MessagesComponent } from './components/messages/messages/messages.component';
import { CreateMessageComponent } from './components/messages/create/create.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/message' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'message', component: MessagesComponent, ...canActivate(() => redirectUnauthorizedTo(['/register'])), children: [
      { path: 'create', component: CreateMessageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
