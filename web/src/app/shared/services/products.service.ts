import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  baseUrl = environment.baseUrl;


  public setHeadersWithNoToken(){
    return new HttpHeaders({ // some hard coded headers but they work hella fine in here
      'Content-Type':'application/json; charset=utf-8',
    });
  }

  constructor(
    private http: HttpClient
  ) { }

  products: any[] = [
    {
      id: 1,
      name: "Sudadera tipo 1",
      category: "sudadera",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 2,
      name: "Sudadera tipo 2",
      category: "sudadera",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 3,
      name: "playera tipo 1",
      category: "playera",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 4,
      name: "Playera tipo 2",
      category: "playera",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 5,
      name: "Gorra tipo 1",
      category: "gorra",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 6,
      name: "gorra tipo 2",
      category: "gorra",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 7,
      name: "Sudadera tipo 1",
      category: "sudadera",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 8,
      name: "Sudadera tipo 1",
      category: "sudadera",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 9,
      name: "Sudadera tipo 1",
      category: "sudadera",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
    {
      id: 10,
      name: "Sudadera tipo 1",
      category: "sudadera",
      price: 250,
      desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, quam minima nesciunt cupiditate vero consectetur sit repellendus ex nostrum ab assumenda, possimus a quia odit aliquid, explicabo incidunt. Est quidem natus dolor, tempore assumenda ut distinctio cumque eos deserunt consectetur quia iste maiores error voluptas expedita vero asperiores nemo molestiae!",
      stock: 10,
      imageUrl: "../assets/images/products/tShirt.png",
      images: [
        {
          id: 1,
          url: "../assets/images/products/mockup.png"
        },
        {
          id: 2,
          url: "../assets/images/products/mockup-a.png"
        },
        {
          id: 3,
          url: "../assets/images/products/tShirt.png"
        },
      ]
    },
  ]

  getProducts(): any{
    // return this.products;
    const headers = this.setHeadersWithNoToken();
    return this.http.get(this.baseUrl+'/products/list',{headers}).pipe(
      retry(3),
    )
  }

  getProduct(id: any): any{
    const headers = this.setHeadersWithNoToken();
    return this.http.get(this.baseUrl+'/products/list/'+id,{headers}).pipe(
      retry(3),
    )  
  }
}
