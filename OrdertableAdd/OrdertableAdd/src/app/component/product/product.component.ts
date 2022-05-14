import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/api.service';
import { CartService } from 'src/app/shared/cart.service';
import { ProductModel } from 'src/app/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  public productList : any;
  public filterCategory :any;
  searchKey :string ="";
  constructor(private api:ApiService,private cartService: CartService) { }
  productObj : ProductModel = new ProductModel();

  ngOnInit(): void {
this.api.getUserProduct()
.subscribe(res=>{
this.productList = res;
this.filterCategory =res;

this.productList.forEach((a:any)=> {
  // if(a.category==='Games'||a.category==='Esports'){
  //   a.category = "Esports"
  // }
  Object.assign(a,{quantity:1,total : a.price});
});
console.log(this.productList)
    })
    this.cartService.search.subscribe((value:any)=>{
      this.searchKey =value;
    })
  }

  addtocart(item:any){
this.cartService.addTocart(item);
  }
  filter(category:string){
this.filterCategory=this.productList.filter((a:any)=>{
  if(a.category==category||category==''){
    return a;
  }
})
  }
}
