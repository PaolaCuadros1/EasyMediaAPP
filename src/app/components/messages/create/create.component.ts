import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from '../message.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-message',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateMessageComponent implements OnInit {

  title = 'Your post title'
  startMessage = 'Create a message for share with your friends.'
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private route: Router
  ) { }

  ngOnInit(): void {

  }

  formCreate = new FormGroup({
    text: new FormControl('Your post title', Validators.required),
    message: new FormControl('Create a message for share with your friends.', Validators.required)
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
              this.route.navigate(['/message'])
            }
          )
          //console.log('response --- ', response.messageId)
        }
      )
    }else{

    }
  }

}
