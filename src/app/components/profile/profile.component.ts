import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAccountService } from '../../services/user-account.service';
import { CommonUtility } from '../../shared/common-utility';
import { UserAccount } from '../../models/user-account';
import { Location } from '@angular/common'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userProfileForm: FormGroup;
  user: UserAccount;
  profilePicture: any;
  formData: FormData;
  statusMessage: string;
  showModal: boolean;

  constructor(private _location: Location,
    private _userAccountService: UserAccountService) {
    this.user = new UserAccount();

    this.createForm();
  }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this._userAccountService.getUserById(user.id)
      .subscribe(
        res => this.bindForm(res),
        err => console.error(err),
        () => this.createForm()
      );

  }

  private bindForm(res) {
    this.user = res
    this.profilePicture = `data:image/JPEG;base64,${res.image}`;
    this.user.image = null;
  }
  private createForm() {
    this.userProfileForm = new FormGroup({
      contactNumber: new FormControl(this.user.contactNumber),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
    });
  }


  onFileUpload(event) {
    let files = event.target.files;
    if (files && files.length > 0) {
      this.formData = new FormData();
      this.formData.append('file', files[0], files[0].name)

      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.profilePicture = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  onSave() {

    this.user.email = this.userProfileForm.get('email').value;
    this.user.contactNumber = this.userProfileForm.get('contactNumber').value;

    this._userAccountService.updateProfile(this.formData, this.user)
      .subscribe(res => {
        this.statusMessage = res.displayMessage;
        this.showModal = true
      });
  }

  onCancel() {
    this._location.back();
  }
  closeModal(isDisplay)
  {
    this.showModal=isDisplay;
  }

}
