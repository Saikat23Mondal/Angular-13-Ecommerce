
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public billItem : any=[];
  public loginApiUrl :string = "https://localhost:7265/api/Login/"

  constructor(private http: HttpClient) { }
  postProduct(data: any) {
    return this.http.post<any>("https://localhost:7265/api/Product/add-product", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  getProduct() {
    return this.http.get<any>("https://localhost:7265/api/Product/view-product")
      .pipe(map((res: any) => {
        return res;
      }));
  }
  updateProduct(data: any) {
    return this.http.put<any>("https://localhost:7265/api/Product/update-product", data)
      .pipe(map((res: any) => {
        return res;
      }));
  }
  
  deleteProduct(id: Number) {
    return this.http.delete<any>("https://localhost:7265/api/Product/delete-product/"+id)
      .pipe(map((res: any) => {
        return res;
      }));
    
  }
  postOrder(orderObj :any){
    this.billItem=orderObj;
        return this.http.post<any>("https://localhost:7265/api/OrderTable/add-order",orderObj)
  }
  getbill(){
    return this.billItem;
  }
  signUp(userObj : any){
    return this.http.post<any>(this.loginApiUrl+"signup",userObj)

  }
  login(userObj:any){
return this.http.post<any>(this.loginApiUrl+"login",userObj)
  }
  getUserProduct(){
    return this.http.get<any>("https://localhost:7265/api/Product/view-product")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  

}
