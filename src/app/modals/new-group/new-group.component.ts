import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { HttpClient } from '@angular/common/http';

import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, FormBuilder} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {
  
  get url():String {
    return this.dataService.url;
  }
  newGroupForm = this.fb.group({
    name: ['', Validators.required],
    topic: ['', Validators.required],
    owner: ['',Validators.required]
  });
  

  constructor(private dataService: DataService,public dialogRef: MatDialogRef<NewGroupComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private http: HttpClient) {
    this.newGroupForm.controls.owner.setValue(this.data.CurrentUser._id);
  }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.http.post(this.C9URL+'/createGroup', this.newGroupForm.value)
      .subscribe(
        res => {
          if(res['statusCode'] == "UserError"){
            console.log(res['msg'])
            //Throw error message for duplicate user here
            //Probably in a text popup
          }
          else{
            this.dialogRef.close(res);
          }
        },
        err => {
          console.log("Error occured", err);
        }
      );
  }
  onCloseCancel() {
    this.dialogRef.close();
  }

}
