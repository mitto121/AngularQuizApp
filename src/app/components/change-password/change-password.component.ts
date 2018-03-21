import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { CommonUtility } from '../../shared/common-utility';
import { AuthService } from '../../services/auth.service';
import { UserAccountService } from '../../services/user-account.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  statusMessage: string;
  showModal: boolean;

  constructor(private _location: Location,
              private _authService:AuthService,
              private _userAccountService:UserAccountService) { }

  ngOnInit() {
    this.createValidationControls();
  }

  private createValidationControls(): void {
    this.changePasswordForm = new FormGroup({
      password: new FormControl(),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirm_Password: new FormControl('', [Validators.required])
    });
  }
  onSave() {
    if (this.changePasswordForm.valid) {
      var changePasswordModel={
        Id:this._authService.user.id,
        oldPassword:this.changePasswordForm.get('password').value,
        newPassword:this.changePasswordForm.get('newPassword').value
      };
      this._userAccountService.changePassword(changePasswordModel)
      .subscribe(res=>{
        console.log(res);
        this.statusMessage=res.displayMessage;
        this.showModal=true
      });
    }
    else {
      CommonUtility.validateAllFormFields(this.changePasswordForm);
    }
  }
  onCancel() {
    this._location.back();
  }

  closeModal(isDisplay)
  {
    this.showModal=isDisplay;
  }

}
