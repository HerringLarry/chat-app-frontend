import { Component, OnInit } from '@angular/core';
import { UsernameService } from '../common/services/username.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    if (UsernameService.username) {
      this._router.navigate(['groupselectionwindow']);
    }
  }

}
