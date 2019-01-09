import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  @Input() formGroup: FormGroup;

  @Output() submitEmitter: EventEmitter<void> = new EventEmitter();

  constructor( private _router: Router ) { }

  ngOnInit() {}

  onSubmit(): void {
    this.submitEmitter.emit();
  }

  goToLogin() {
    this._router.navigate(['login']);
  }


}
