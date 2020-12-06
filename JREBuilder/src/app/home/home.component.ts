import { Component, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { IJre } from '../util/ijre';
import { Jremodel } from "../model/jremodel";
import {RestserviceService} from '../service/restservice.service';
import { Jreconstants } from "../util/jreconstants";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  columns= Jreconstants.JRE_TABLE_COLUMN;
  index=Jreconstants.JRE_TABLE_COLUMN_INDEX;
  jreArray: Array<IJre> = [];
  searchkey: any="";
  showAlert:boolean;
  showWarningAlert:boolean;

  constructor(private service:RestserviceService) { 
    
      interval(10000).subscribe(() => this.getAllJRE());
    
  }

  ngOnInit(): void {
    this.getAllJRE();
    
  }


  getAllJRE(){
    this.service.getAllJre().subscribe(data=>{
      this.jreArray =  data;
      console.log(data)
    });
  }

  closeAlert(){
    this.showAlert= false;
  }

  

  searchJre(){
    if(this.searchkey === "" ){

      this.showAlert= true;
      return;
    }
    this.service.getJreBySearch(this.searchkey).subscribe(data=>{
      this.jreArray = data;
      if(this.jreArray.length==0){
        this.showWarningAlert = true;
      }
    })
  }
  download(jrename){
    this.service.download(jrename).subscribe(response => {

      console.log(response);
      var binaryData = [];
      binaryData.push(response);
      var url = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}));
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.setAttribute('style', 'display: none');
      a.setAttribute('target', 'blank');
      a.href = url;
      a.download = jrename;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

  }, error => {

      console.log(error);
  });
  }


}
