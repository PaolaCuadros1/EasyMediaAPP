import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private route: Router
  ) { }

  formRegister = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }

  register() {
    if (this.formRegister.valid) {
      this.userService.register(this.formRegister.value.email, this.formRegister.value.password)
        .then(response => {
          this.route.navigate(['/login'])
        })
        .catch(error => { console.error('Error --> ', error) })
    } else {
      console.log('error')
    }

  }

}
