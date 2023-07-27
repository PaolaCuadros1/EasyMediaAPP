import { Component, OnInit } from '@angular/core'

import { MessageService } from '../message.service'
import { AuthService } from 'src/app/shared/services/auth.service';

declare var require: any
const { DateTime } = require("luxon");

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages: any = []
  dateSelect: string = ''
  nPages: number = 1
  currentPage: number = 1

  constructor(
    private messageService: MessageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getMyMessages()
    this.getCount()
  }

  getMyMessages(page: number = this.currentPage) {
    let userId: any = this.authService.getUserId()
    console.log('userId --- ', this.dateSelect)
    this.messageService.getMyMessages(userId, this.dateSelect, page)
      .subscribe({
        next: (messages) => {
          const allMessages = []
          let msgs = Object.values(messages);
          for (let i = 0; i < msgs.length; i++) {
            const createAt = DateTime.fromSeconds(msgs[i]['createAt']['_seconds'])
            msgs[i].createAt = createAt.toFormat('t dd/MM/yyyy')
            allMessages.push(msgs[i])
          }

          this.currentPage = page
          this.messages = allMessages
        },
        error: (error) => {
          console.error('Error getting messages: ', error)
        }
      })
  }

  getCount() {
    this.messageService.getCount('DAJMr3Q8hXcakAFCT924eigjX8z1', this.dateSelect)
      .subscribe({
        next: (response: any) => {
          this.nPages = response.nPages
        },
        error: (error) => {
          console.error('Error counting messages: ', error)
        }
      })
  }

  selectPage(page: number) {
    this.getMyMessages(page)
  }

  prevPage(page: number) {
    this.getMyMessages(page)
  }

  nextPage(page: number) {
    this.getMyMessages(page)
  }

}
