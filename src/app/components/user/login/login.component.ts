import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: Router
  ) { }

  formLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  }

  login(){
    this.authService.login(this.formLogin.value.email, this.formLogin.value.password)
    .then( (response) => {
      this.userService.getById(response.user.uid).subscribe(
        (response: any) => {
          let userName = <HTMLInputElement>document.getElementById('userName')
          userName.innerHTML = response.userName
          this.authService.saveUserData(response)
        }
      )
      this.route.navigate(['/my-posts'])
    } )
    .catch( error => { console.error('Error ', error) } )
  }

}
