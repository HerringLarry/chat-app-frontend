import { UsernameService } from './../../common/services/username.service';
import { DataRequestorService } from './../../common/services/data-requestor.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../../common/services/session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginFormGroup: FormGroup;
  formBuilder: FormBuilder;


  constructor( private _dataRequestorService: DataRequestorService, private _router: Router) { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
   });
  }

  onSubmit(): void {
    console.log('submit');
    if ( this.loginFormGroup.valid) {
      const request: string = 'auth/' + this.loginFormGroup.value.username + '/' + this.loginFormGroup.value.password;
      this._dataRequestorService.getRequest(request).subscribe( result => {
        console.log(result);
        this.handleLoginResponse( result, this.loginFormGroup.value.username );
      });
    }
  }

  handleLoginResponse( result: any, username: string ): void {
    if ( result ) {
      SessionService.sessionToken = result.token;
      UsernameService.username = username;
      this._router.navigate(['mainwindow']);
    }
  }

  goToRegistration(): void {
    this._router.navigate(['registration']);
  }

}
