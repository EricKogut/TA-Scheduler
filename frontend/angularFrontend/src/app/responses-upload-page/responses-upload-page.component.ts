import { Component, OnInit } from '@angular/core';
import { read, IWorkBook } from 'ts-xlsx';
import * as XLSX from 'ts-xlsx';

@Component({
  selector: 'app-responses-upload-page',
  templateUrl: './responses-upload-page.component.html',
  styleUrls: ['./responses-upload-page.component.css']
})
export class ResponsesUploadPageComponent  {

  constructor() { }


  arrayBuffer:any;
file:File;
incomingfile(event)
  {
  this.file= event.target.files[0];
  }

 Upload() {
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));
        }
        fileReader.readAsArrayBuffer(this.file);
}

}
