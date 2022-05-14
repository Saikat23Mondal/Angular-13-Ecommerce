import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OrderModels } from 'src/app/order.model';
import { ApiService } from 'src/app/shared/api.service';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
 public currentItem : any='';
 public total : number =0;
 public cartProduct : any [] = [];
 public allProductName : string ="";
 public cartitems :any;
 public orderForm! : FormGroup;
 public orderHtml:boolean =true;
 public billHtml :boolean=false;
  constructor(private api:ApiService, private cart:CartService,private formBuilder :FormBuilder , private http : HttpClient , private router:Router) { }

  orderObj:OrderModels=new OrderModels();
  ngOnInit(): void {
    this.total= this.cart.getTotalPrice();
    this.cartProduct=this.cart.cartItem;
    this.cart.getProduct().subscribe
    (res=>{
      this.cartitems = res.length;
    })

      this.orderForm=this.formBuilder.group({
        fullName:[''],
        email:[''],
        phoneNumber:[''],
        userAddress:[''],
        productName:[''],
        price:[''],
        quantity:[''],

      });
      


  }
  placeOrder(){
    this.orderObj.FullName=this.orderForm.value.fullName;
    this.orderObj.Email=this.orderForm.value.email;
    this.orderObj.UserAddress=this.orderForm.value.userAddress;
    this.orderObj.PhoneNumber=this.orderForm.value.phoneNumber;
    this.orderObj.Price=this.total;
    this.orderObj.Quantity=this.cartitems;
     this.orderObj.ProductName=this.cart.getitle();
     this.currentItem=this.orderObj;
    this.api.postOrder(this.orderObj)
    .subscribe(res=>{
      console.log(res.Message);
      this.orderHtml=false;

      this.router.navigate(['/order/invoice'])
      this.billHtml=true;
      //this.orderForm.reset();
      
      
    },
    err=>{
      alert("something Went Wrong")
    })
    this.cart.removeAllCart();

  }
// getAllname(){
// this.allProductName=this.cart.getAllName()
// }

}
