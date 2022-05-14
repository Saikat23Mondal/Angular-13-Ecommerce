import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItem : any=[];

  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  public allProd : string ="";
  
  constructor() { }
  getProduct(){
    return this.productList.asObservable();

  }
  setProduct(product : any){
    this.cartItem.push(...product);
    this.productList.next(product);
  }
  addTocart(product: any){
    this.cartItem.push(product);
    this.productList.next(this.cartItem);
    this.getTotalPrice();
    console.log(this.cartItem);
  }
  getTotalPrice() :number{
    let grandTotal = 0;
    this.cartItem.map((a:any)=>{
      grandTotal += a.total;
    })
    return grandTotal;
  }

  getBill(){
return this.cartItem;
  }
getitle(): string{
  this.cartItem.map((a:any)=>{
    this.allProd += a.title+"  ,  ";
  })
  return this.allProd;
}
  removeCartItem(product:any){
    this.cartItem.map((a:any,index:any)=>{
      if(product.id===a.id){
        this.cartItem.splice(index,1);
      }
    })
    this.productList.next(this.cartItem);

  }
  removeAllCart(){
    this.cartItem = []
    this.productList.next(this.cartItem);
  }
}
