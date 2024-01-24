import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MainService} from "../../../../core/services/main.service";
import {ApiEndpoints} from "../../../../core/config/apiEndpoints";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private matDialogRef: MatDialogRef<UserFormComponent>
  ) {
    this.groupForm()
  }

  groupForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      roles: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submitForm() {
    console.log(this.form.value)
    if (this.form.valid) {
      this.mainService.post(ApiEndpoints.user.add, this.form.value).subscribe(
        (response) => {
          console.log(response)
          this.matDialogRef.close({result: true})
        }
      )
    }
  }
}
