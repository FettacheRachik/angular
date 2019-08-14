import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  pagePhotos:any =[];
  currentPage:number=1;
  size:number=10;
  totalPages:number;
  pages:Array<number>=[];
  motCle:string="";
  dataFor:any={motCle:""};

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  onSearch(dataForm){
    console.log(dataForm);

    this.http.get("https://pixabay.com/api/?key=13302920-7ab11d2dbc23eb03e61a7726d&q="+dataForm.motCle+"&per_page="+this.size+"&page="+this.currentPage+"")
    
    .subscribe( data =>{
      console.log("data = " + data);
      this.pagePhotos=data;
      console.log(this.pagePhotos);
      //console.log("hits = " + this.pagePhotos.totalHits);
      this.totalPages=this.pagePhotos.totalHits/this.size;
      console.log("TotalPages = " + this.totalPages);
      if (this.pagePhotos.totalHits % this.size!=0) ++this.totalPages;

      console.log(this.totalPages);
      this.pages = new Array (Math.ceil(this.totalPages));

    })
  }

  goTopage(i){
    this.currentPage=i+1;
    this.dataFor.motCle=this.motCle;
    this.onSearch(this.dataFor);
    console.log("thisdatfor = " + this.dataFor.motCle);
  }

}
