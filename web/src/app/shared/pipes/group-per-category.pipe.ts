import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'groupPerCategory'
})
export class GroupPerCategoryPipe implements PipeTransform {

  transform(products: any[]): any {
    const orderProducts: any[] = [];
    products.forEach(product=>{
      const quantity = products.reduce((acum, element)=>(product.category_id === element.category_id) ? acum + 1 : acum, 0);
      if(!orderProducts.some( ({product: {category_id}}) =>  category_id === product.category_id)){
        orderProducts.push({product,quantity});
      }
    });
    return orderProducts;
  }

}
