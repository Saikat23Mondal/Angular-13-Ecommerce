
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
@Input() billObj :any='';

  constructor() { }
  ngOnInit(): void {
  }
  
}
