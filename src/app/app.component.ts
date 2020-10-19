import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { user } from './model/use.model';

interface Visit {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  DetailsForm: any;
  constructor(
    public http: HttpClient,
    public router: Router,
    private FormBuilder2: FormBuilder
  ) {}
  userData: any = [];
  namePattern = '^[a-zA-z]{2,20}$';

  title = 'FrontEndTask2';

  ngOnInit() {
    this.DetailsForm = this.FormBuilder2.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      visit: ['', [Validators.required]],
      personToVisit: ['', [Validators.required]],
      date: [this.serializedDate.value, [Validators.required]],
      timeOfEntry: ['', [Validators.required]],
      timeOfExit: ['', [Validators.required]],
    });
  }

  visits: Visit[] = [
    { value: 'Meeting', viewValue: 'Meeting' },
    { value: 'Delivery', viewValue: 'Delivery' },
    { value: 'Personal', viewValue: 'Personal' },
  ];

  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());

  showData() {
    console.log('DetailsForm', this.DetailsForm.value);
  }

  mockUrl: string = 'http://localhost:3000/user';
  onAddUser(userForm: user) {
    this.http.post(this.mockUrl, this.DetailsForm.value).subscribe(
      (result: any) => {
        console.log('Data Saved');
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }
}
