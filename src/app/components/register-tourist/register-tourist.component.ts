import { TouristService } from './../../services/tourist.service';
import { Component, OnInit } from '@angular/core';
import { Tourist } from 'src/app/modal/tourist';
// import { NgToastService } from 'ng-angular-popup';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-tourist',
  templateUrl: './register-tourist.component.html',
  styleUrls: ['./register-tourist.component.css']
})
export class RegisterTouristComponent implements OnInit {
  newTourist:any;
  constructor(private service:TouristService,private router:Router) { }
  touristData:Tourist=new Tourist();
  ngOnInit(): void {


    this.newTourist = new FormGroup({
      "id": new FormControl(null, [Validators.required, Validators.pattern('[0-9]{1,4}')]),
      "firstName": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]{3,15}')]),
      "lastName": new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z]{3,12}')]),
      "age":new FormControl(null,[Validators.required,Validators.pattern('^0*([0-9]|[1-8][0-9]|9|90)$')]),
      "gender": new FormControl(null, [Validators.required]),
      "fromPlace": new FormControl(null, [Validators.required,Validators.pattern('[a-zA-Z]{3,15}')]),
      "numberOfDays":new FormControl(null,[Validators.required,Validators.pattern('^(0|[1-9][0-9]*)$')])
    });
  }
  get firstName() { return this.newTourist.get('firstName'); }
  get id() { return this.newTourist.get('id'); }
  get lastName() { return this.newTourist.get('lastName'); }
  get age() { return this.newTourist.get('age'); }
  get gender() { return this.newTourist.get('gender'); }
  get fromPlace() { return this.newTourist.get('fromPlace'); }
  get numberOfDays() { return this.newTourist.get('numberOfDays'); }
  submitted = false;
  
  register(){
    this,this.submitted=true;
   if(this.newTourist.valid){
    console.log(this.touristData);
    
    this.service.registerTourist(this.touristData).subscribe(data=>{
      alert("Registered Successfully")
      this.reloadCurrentRoute()
    })
   }else{
    return this.newTourist;
   }
   
  }



  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}

}
