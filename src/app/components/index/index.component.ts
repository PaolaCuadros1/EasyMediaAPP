import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }

  logout(){
    this.userService.logout()
    .then()
    .catch()
  }

}
