import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['./application-form.component.css']
})
export class ApplicationFormComponent implements OnInit {
  jobApplicationForm: FormGroup;
  submit = false;
  workExperience = [
    { 
      companyName: '',
      designation: '',
      startDate:'',
      endDate: ''
    }
  ];
  technologyName = [
    {value: 'php', name: 'PHP'},
    {value: 'angular', name: 'Angular'},
    {value: 'nodejs', name: 'NodeJs'},
    {value: 'react', Name: 'React'}
  ];

  language= [
    {langulageName: 'English', read: false, write: false, speak: false, languageSelected: true },
    {langulageName: 'Hindi', read: false, write: false, speak: false, languageSelected: true },
    {langulageName: 'Gujarati', read: false, write: false, speak: false, languageSelected: true },
  ]
  constructor(private fb: FormBuilder,
    private router: Router) { 
    this.jobApplicationForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      address: [null, Validators.compose([Validators.required])],
      gender: [null, Validators.compose([Validators.required])],
      contact: [null, Validators.compose([Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])],
      // SSC: [null, Validators.compose([Validators.required])],
      Graduation: new FormGroup({
        board: new FormControl(null),
        year: new FormControl(null),
        percentage: new FormControl(null)
      }),
      workExperience: [null],
      language: [null],
      technicalExp: new FormGroup({
        technologyName:  new FormControl(null),
        // expType: new FormControl('', Validators.required),
      }),
     
    });

  }


  ngOnInit(): void {
  }

  saveApplication() {
    this.submit = true;

    this.jobApplicationForm.value.workExperience = this.workExperience;
    this.jobApplicationForm.value.language = this.language;
    if (this.jobApplicationForm.invalid) {
      return;
    }


    if (localStorage.getItem('jobAppDetail')) {
      let dataArray = JSON.parse(localStorage.getItem('jobAppDetail') || '');
      dataArray.push(this.jobApplicationForm.value);
      localStorage.setItem('jobAppDetail', JSON.stringify(dataArray));
    } else {
      let dataArray = [];
      dataArray.push(this.jobApplicationForm.value);
      localStorage.setItem('jobAppDetail', JSON.stringify(dataArray));
    }
    alert('Data Save Successfully!!');
    this.router.navigateByUrl('');
  }

  addWorkExperience() {
    this.workExperience.push({ 
      companyName: '',
      designation: '',
      startDate:'',
      endDate: ''
    })
  }

  removeWorkExpp(i: number) {
    this.workExperience.splice(i, 1);
  }

  languageSelected(event: any, i: number) {
    if (event.target.checked) {
      this.language[i].languageSelected = false;
    } else {
      this.language[i].languageSelected = true;
    }
  }

  selectLanguageOption(event: any, i: number, value: any) {
    if (event.target.checked) {
      if (value == 'read') {
      this.language[i]['read'] = true;
      } else if(value == 'write') {
        this.language[i]['write'] = true;
      } else if (value == 'speak') {
        this.language[i]['speak'] = true;
      }
    } else {
      if (value == 'read') {
        this.language[i]['read'] = false;
        } else if(value == 'write') {
          this.language[i]['write'] = false;
        } else if (value == 'speak') {
          this.language[i]['speak'] = false;
        }

    }

  }
}
