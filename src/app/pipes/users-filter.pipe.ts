import { Pipe, PipeTransform } from '@angular/core';
import { UserAccount } from '../models/user-account';

@Pipe({
  name: 'usersFilter'
})
export class UsersFilterPipe implements PipeTransform {

  transform(value: UserAccount[], searchValue): any {
    searchValue = (searchValue) ? searchValue.trim().toLowerCase() : null;

    return searchValue ? value.filter(
      (user: UserAccount) => user.firstName.toLowerCase().indexOf(searchValue) !== -1
      || user.lastName.toLowerCase().indexOf(searchValue) !== -1
      || user.email.toLowerCase().indexOf(searchValue) !== -1
      || user.userName.toLowerCase().indexOf(searchValue) !== -1
    ) : value;
  }

}
