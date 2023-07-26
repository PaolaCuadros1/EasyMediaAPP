import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public myMessage: any = []

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getMyMessages()
  }

  getMyMessages(){
    this.messageService.getMyMessages('DAJMr3Q8hXcakAFCT924eigjX8z1').subscribe(
      (response: any) => {
        this.myMessage = response.messages
        this.myMessage.user = response.user
      }
    )
  }

}
