import { Component, OnInit } from '@angular/core';
import { UserAccount } from '../../models/user-account';
import { UserAccountService } from '../../services/user-account.service';

@Component({
  selector: 'app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  users: UserAccount[];
  searchText: string;


  constructor(private _userAccountService: UserAccountService) {
    this.users = [];
  }

  ngOnInit() {
    this._userAccountService.getUsers()
      .subscribe(
        res => this.users = res
      );
  }

  activeOrDeactiveUserAccount(userId: number, isActive: boolean) {
    this._userAccountService.activeOrDeactiveUserAccount(userId, isActive)
      .subscribe(
        res => {
          if (res) {
            this.users.find(x => x.id == userId).isActive = isActive;
          }
        }
      );
  }

}
