import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { CommonUtility } from '../../shared/common-utility';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAccountService } from '../../services/user-account.service';
import { Participant } from '../../models/participant';


@Component({
  selector: 'participant-registration',
  templateUrl: './participant-registration.component.html',
  styleUrls: ['./participant-registration.component.css']
})
export class ParticipantRegistrationComponent implements OnInit {

  participantSignUpForm: FormGroup;
  participant:Participant;
  quizId:number;  
  @Output()
  onSubmit:EventEmitter<any>=new EventEmitter();


  constructor(private _userAccountService: UserAccountService,
              private _activatedRoute:ActivatedRoute,) {
                this.participant=new Participant();
  }

  ngOnInit() {
    this.quizId =this._activatedRoute.snapshot.params['id'];
    this.createValidationControls();
  }

  private createValidationControls(): void {

    this.participantSignUpForm = new FormGroup({
      name: new FormControl( this.participant.name, Validators.required),
      birth_date: new FormControl(this.participant.dateOfBirth, Validators.required),
      email: new FormControl(this.participant.email, [Validators.required, Validators.email])     
    });
  }

  createParticipant(signUpForm: FormControl) {
    if (this.participantSignUpForm.valid) {
      let newParticipant = {
        Name: this.participantSignUpForm.get('name').value,
        DateOfBirth: this.participantSignUpForm.get('birth_date').value,
        Email: this.participantSignUpForm.get('email').value       
      };
      
      this._userAccountService.createParticipant(newParticipant)
        .subscribe( res => {
         if(res.isSucceeded)
         {
           this.participant=res.result;
           this.onSubmit.emit(res.result.id);
         }         
        });

    }
    else {
      CommonUtility.validateAllFormFields(this.participantSignUpForm);
    }

  }


}
