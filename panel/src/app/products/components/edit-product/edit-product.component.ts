import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  editProdForm: FormGroup;
  product: any;
  colors: any[];
  categories: any[];
  isLoading: Boolean = false;
  isCreated: Boolean = false;

  constructor(
    private apiService: ApiService,
    public formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editProdForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      category_id: new FormControl('',[Validators.required]),
      existence: new FormControl(0, [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      price_extra: new FormControl(0, [Validators.required])
    });
  }

  ngOnInit() {
    this.apiService.getAll('colors/list').subscribe(resp=>this.colors = resp);
    this.apiService.getAll('products/categories/list').subscribe(resp=>this.categories = resp);
    this.getProduct(this.route.snapshot.params.id);
  }

  getProduct(id) {
    if (this.route.snapshot.params.id) {
      this.apiService.getOne('products/list', id).subscribe((data: any) => {
        this.product = data;
        this.editProdForm.patchValue(data);
        this.colors = this.product.colors;
        this.editProdForm.get('existence').patchValue(this.product.existence.toString());
      },(error)=>{
        console.log("Hubo un error al traer la informacion del producto con el id: "+id);
        console.log(error);
      });
    }
  }

  saveChanges(id) {
    let token = localStorage.getItem('access_token');
    this.apiService.put('products/update', id, this.editProdForm.value, token).subscribe((data) => {
      console.log("Si jalo el update");
      console.log(data);
      this.isCreated = true
    },(error)=>{
      console.log("Hubo un error al guardar los cambios del producto con el id: "+id);
      console.log(error);
    },()=>{
      this.toggleLoading()
      setTimeout(()=>this.goBack(), 1000)
    });
  }

  goBack(){
    this.router.navigateByUrl('productos')
  }

  toggleLoading(){
    this.isLoading = !this.isLoading
  }
}
