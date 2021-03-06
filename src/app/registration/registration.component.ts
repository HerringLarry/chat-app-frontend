import { DataRequestorService } from './../common/services/data-requestor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormMaker } from './form-maker/form-maker';
import { RegistrationDto, RegistrationFormDto } from './dto/registration.dto';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  registrationFormGroup: FormGroup;
  subscriptions: Subscription[] = [];

  constructor( private _dataRequestor: DataRequestorService, private _router: Router ) {
    this.registrationFormGroup = FormMaker.getRegistrationFormGroup();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe() );
  }

  onSubmit(): void {
    if (this.registrationFormGroup.valid) {
      const registrationFormDto: RegistrationFormDto = new RegistrationFormDto( this.registrationFormGroup);
      const sub = this._dataRequestor.postRequest('auth', registrationFormDto ).subscribe( result => {
        this._router.navigate(['login']);
      });
      this.subscriptions.push( sub );
    }
  }

}
