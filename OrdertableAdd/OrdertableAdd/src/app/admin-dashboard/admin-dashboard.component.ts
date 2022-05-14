import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { AdminDashboardModel } from '../admin-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  formValue!: FormGroup;

  constructor(private formBuilder:FormBuilder,private api:ApiService) { }
  adminProductModelObj: AdminDashboardModel = new AdminDashboardModel();
  productData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      productId:[''],
      productName:[''],
      productPrice:[''],
      productDescription:[''],
      productCategory:[''],
      productImage:['']
    })
    this.getAllProduct();
  }
  postProductDetails(){
  //  this.adminProductModelObj.id = this.formValue.value.productId;
    this.adminProductModelObj.title = this.formValue.value.productName;
    this.adminProductModelObj.price = this.formValue.value.productPrice;
    this.adminProductModelObj.description = this.formValue.value.productDescription;
    this.adminProductModelObj.category = this.formValue.value.productCategory;
    this.adminProductModelObj.image = this.formValue.value.productImage;

    this.api.postProduct(this.adminProductModelObj)
    .subscribe(res=>{
      console.log(res);
      alert("Product Added Successfully")
      let ref = document.getElementById('close')
      ref?.click();
      this.formValue.reset();
      this.getAllProduct();
    },
    err=>{
      alert("Something Went Wrong")
    })
  }
  getAllProduct(){
    this.api.getProduct()
    .subscribe(res=>{
      this.productData = res;

    })
  }
  deleteProduct(row:any){
    this.api.deleteProduct(row.id)
    .subscribe(res=>{
      alert("Product Deleted");
      this.getAllProduct();
    })
  }
  onEdit(row: any){
    
    this.showAdd=false;
    this.showUpdate=true;
    this.adminProductModelObj.id=row.id;
    this.formValue.controls['productName'].setValue(row.title);
    this.formValue.controls['productImage'].setValue(row.image);
    this.formValue.controls['productDescription'].setValue(row.description);
    this.formValue.controls['productPrice'].setValue(row.price);
    this.formValue.controls['productCategory'].setValue(row.category);
    
  }
  clickAddProduct(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  updateProductDetails(){
    this.adminProductModelObj.title = this.formValue.value.productName;
    this.adminProductModelObj.price = this.formValue.value.productPrice;
    this.adminProductModelObj.description = this.formValue.value.productDescription;
    this.adminProductModelObj.category = this.formValue.value.productCategory;
    this.adminProductModelObj.image = this.formValue.value.productImage;
    this.api.updateProduct(this.adminProductModelObj)
    .subscribe(res=>{
      alert("Updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllProduct();

    })
  }
}
