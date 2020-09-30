import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from 'app/services/services';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  form: FormGroup;
  selectedFiles: File[] = [];
  values:any;
  categories: any[];
  collections: any[];
  colors: any[] = [];
  imgArray: any[] = [];
  itemsId:number = 0;
  noColors: number = 0;
  isLoading: Boolean = false;
  isCreated: Boolean = false;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('',[Validators.required]),
      images: this.formBuilder.array([]),
      colors: new FormControl('', [Validators.required]),
      category_id: new FormControl('',[Validators.required]),
      existence: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      price_extra: new FormControl('', [Validators.required])
    });
  }

  get imagesArray(){
    return this.form.get('images') as FormArray; 
  }

  addItem(item) {
    this.imgArray.push(item);
    this.imagesArray.push(this.formBuilder.control(null));
  }

 removeItem() {
    this.imgArray.pop();
    this.imagesArray.removeAt(this.imagesArray.length - 1);
  }


  ngOnInit(): void{
    this.form.valueChanges.subscribe((data)=> {
      this.form.value.images = <File[]>this.selectedFiles;
      this.values = this.form.value;
      let colors = this.form.value.colors;
      this.form.value.colors = JSON.stringify(colors);
    });
    this.apiService.getAll('colors/list').subscribe((resp:any)=>{
      this.colors = resp;
    });
    this.apiService.getAll('products/categories/list').subscribe((resp:any)=>{
      this.categories = resp;
    });
  }

  create(){
    this.toggleLoading()
    const token = localStorage.getItem('access_token');
    let formData = new FormData();
    const files: Array<File> = this.selectedFiles;
    formData = this.apiService.toFormData(this.form.value);
    Array.from(files).forEach((file: File)=>{
      formData.append("images", file, file.name);
    });
    let colors = this.form.value.colors;
    this.form.value.colors = JSON.stringify(colors);
    console.log(this.form.value);
    this.apiService.post('products/create', formData, token).subscribe((data:any)=>{
      console.log(data);
      this.isCreated = true
    },(error)=>{
      console.log(error);
    },()=>{
      this.toggleLoading()
      setTimeout(()=>this.goBack(), 1000)
    });
  }

  handleChange(event){
    Array.from(<Array<File>>event.target.files).forEach((file: File, index)=>{
      this.selectedFiles = [...this.selectedFiles, <File>file];
    });
    this.form.value.images = this.selectedFiles;
  }

  onColorSelect(option){
    const colorName = option.value.name
    const value = option._selected
    if(value){
      let item = {
        id: this.itemsId,
        name: colorName
      };
      this.addItem(item);
      this.itemsId += 1;
      this.noColors = this.noColors + 1;
    }else{
      this.removeItem();
      this.itemsId -= 1;
      this.noColors = this.noColors - 1;
    }
  }

  goBack(){
    this.router.navigateByUrl('productos')
  }

  toggleLoading(){
    this.isLoading = !this.isLoading
  }
}
