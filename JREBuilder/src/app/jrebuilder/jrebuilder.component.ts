import { Component, OnInit ,Input,ChangeDetectionStrategy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, of} from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { RestserviceService } from "../service/restservice.service";
import {Jrepackages  } from "../model/jrepackages";
import { Jrepackageresponse } from "../util/jrepackageresponse";
import { Jreconstants } from "../util/jreconstants";

@Component({
  selector: 'app-jrebuilder',
  templateUrl: './jrebuilder.component.html',
  styleUrls: ['./jrebuilder.component.css']
})
export class JrebuilderComponent implements OnInit {
  toppings = new FormControl();
  selectedValue:any;
  showDiv:any;
  constructor(private service:RestserviceService) { 
   
  } 
  jreList: string[] = ['JRE 11'];
  items = [];
  currentSelectedPage:number = 0;
  totalPages: number = 0;
  jrepackages: Array<Jrepackages> = [];
  pageIndexes: Array<number> = [];
  showAlert:boolean;
  msg:any;
  // salaries list
  salaries: Array<number> = [];
  selectedSalary: number = -1;

  // sorting
  agesorting: boolean = false;
  desc: boolean = false;
  
  private checkItem: Jrepackages[] = [];
  ngOnInit(): void {
     // get the first Page
     this.getPage(0, -1, false, false);    
  }
  valueChanged(value){
    if(value){
        this.selectedValue = value;
        this.showDiv=true;
    }
  }

  closeAlert(){
    this.showAlert= false;
  }

  getPage(page: number, selectedSalary: number, agesorting: boolean, desc: boolean){

    this.service.getPagableJREPackages(page, Jreconstants.PAGE_SIZE, selectedSalary, 
                                              agesorting, desc)
            .subscribe(
                (jrepackageresponse: Jrepackageresponse) => {
                  console.log(jrepackageresponse);
                  this.jrepackages = jrepackageresponse.jrePackage;
                  this.totalPages = jrepackageresponse.totalPages;
                  this.pageIndexes = Array(this.totalPages).fill(0).map((x,i)=>i);
                  this.currentSelectedPage = jrepackageresponse.pageNumber;
                },
                (error) => {
                  console.log(error);
                }
            );
  }

  getPaginationWithIndex(index: number) {
    this.getPage(index, this.selectedSalary, this.agesorting, this.desc);
  }


  getCustomerPagesWithSalaryFiltering(optionValue: any) {
    // convert option string value to appropriate number
    if(optionValue != "All"){
      this.selectedSalary = parseInt(optionValue);
    } else {
      this.selectedSalary = -1;
    }

    // load customer again with filtering and pagination api
    this.getPage(0, this.selectedSalary, this.agesorting, this.desc);
  }

  sortNow(){
    if(this.desc == true && this.agesorting == false){
      alert("Please select 'agesorting' option before selecting 'desc' option!");
      return;
    }
    // load again from backend for sorting with age field
    this.getPage(0, this.selectedSalary, this.agesorting, this.desc);
  }

  onAgeSortingChange(value: any){
    this.agesorting = !this.agesorting;
    if(!this.agesorting){
      // reset desc
      this.desc = false;
    }
  }

  active(index: number) {
    if(this.currentSelectedPage == index ){
      return {
        active: true
      };
    }
  }

  nextClick(){
    if(this.currentSelectedPage < this.totalPages-1){
      this.getPage(++this.currentSelectedPage,
                   this.selectedSalary, this.agesorting, this.desc);
    }  
  }

  previousClick(){
    if(this.currentSelectedPage > 0){
      this.getPage(--this.currentSelectedPage,
                   this.selectedSalary, this.agesorting, this.desc);
    }  
  }
  
   getItemFromCheckbox(item: Jrepackages, event) {
   const index = this.checkItem.findIndex(newItem => newItem.id === item.id);
    if(event.target.checked) {
      if(index === -1) {
        item.checked = true;
        this.checkItem.push(item);
      }
    }
    else {
      if(index !== -1) {
        this.checkItem.splice(index, 1);
      }
    }
    console.log('all item checked'+this.checkItem.length);
  }

  buildCustomJRE(){

    if(this.checkItem.length==0){
      this.msg = Jreconstants.PACKAGE_ERROR;
      this.showAlert= true;
      
      return;
    }
    this.service.buildJRE(this.checkItem).subscribe(response => {
      if(response.size ===0){
        this.showAlert= true;
        this.msg =Jreconstants.DOWNLOAD_ERROR;
        return;
      }
      console.log(response.headers);
      var binaryData = [];
      binaryData.push(response);
      var url = window.URL.createObjectURL(new Blob(binaryData, {type: `${Jreconstants.RETURN_TYPE}`}));
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = "jrename";
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

    }, error => {

      console.log(error);
    });

}

  

}