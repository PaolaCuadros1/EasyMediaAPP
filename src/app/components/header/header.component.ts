import { AuthService } from 'src/app/shared/services/auth.service'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toggleOpen: boolean = false
  printMenu: boolean = true
  userName: string | null = ''
  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.userName = this.authService.getUserName()
    console.log('this.userName --- ', this.userName)
  }

  toggleMenu() {
    this.toggleOpen = !this.toggleOpen
  }

  logout() {
    this.authService.logout()
      .then(() => {
        localStorage.clear()
        this.printMenu = false
        this.route.navigate(['/login'])
      })
      .catch()
  }

}
