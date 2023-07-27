import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HttpParams } from '@angular/common/http'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: Router
  ) { }

  formRegister = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  async register() {
    if (this.formRegister.valid) {
      await this.authService.register(this.formRegister.value.email, this.formRegister.value.password)
        .then(response => {
          response.user.getIdToken().then(token => {
            this.authService.saveToken(token)
          })
          this.saveData(response.user.email as string, response.user.uid as string)
        })
        .catch(error => { console.error('Error --> ', error) })
    } else {
      console.log('error')
    }
  }

  saveData(email: string, uid: string) {
    let data = {
      userName: this.formRegister.value.userName,
      email: email,
      uid: uid
    }
    this.userService.register(data).subscribe(
      response => {
        if (response.status) {
          this.route.navigate(['/login'])
        } else {
          console.log('El suaurio se encuentra registrado')
        }
      }
    )
  }
}
