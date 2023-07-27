import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from '../message.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
declare var require: any
const { DateTime } = require("luxon");

@Component({
  selector: 'app-create-message',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateMessageComponent implements OnInit {

  title = 'Your post title'
  startMessage = 'Create a message for share with your friends.'
  userName: any = ''
  errorText: string = 'hide-title-error'
  errorMessage: string = 'hide-message-error'
  currentDate = DateTime.fromISO(DateTime.now().toString()).toFormat('t dd/MM/yyyy')
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  formCreate = new FormGroup({
    text: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  })

  create(){
    if(this.formCreate.valid){
      let data = {
        title: this.formCreate.value.text,
        message: this.formCreate.value.message,
        userId: this.authService.getUserId()
      }
      this.messageService.register(data).subscribe(
        response => {
          Swal.fire({
            title: 'Post created',
            icon: 'success'
          }).then(
            () =>{
              this.route.navigate(['/my-posts'])
            }
          )
        },
        error => {
          Swal.fire({
            title: 'Uppss Try Later',
            icon: 'error'
          })
        }
      )
    }else{
      this.errorText = this.formCreate.controls['text'].status == 'INVALID' ? 'display-title-error' : 'hide-title-error'
      this.errorMessage = this.formCreate.controls['message'].status == 'INVALID' ? 'display-message-error' : 'hide-message-error'
    }
  }

  getCurrentUser(){
    this.userName = this.authService.getUserName()
  }

}
