import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { map } from 'rxjs';
declare var require: any
const { DateTime } = require("luxon");

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  public messages: any = []
  public dateSelect: string = ''
  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getMyMessages()
  }

  getMyMessages() {
    this.messageService.getMyMessages('DAJMr3Q8hXcakAFCT924eigjX8z1', this.dateSelect)
      .subscribe({
        next: (messages) => {
          let allMessages = []
          let msgs = Object.values(messages);
          for (let i = 0; i < msgs.length; i++) {
            const createAt = DateTime.fromSeconds(msgs[i]['createAt']['_seconds'])
            msgs[i].createAt = createAt.toFormat('t dd/MM/yyyy')
            allMessages.push(msgs[i])
          }
          this.messages = allMessages
        },
        error: (error) => {
          console.error('Error getting messages: ', error)
        }
      }
      )
  }

}
