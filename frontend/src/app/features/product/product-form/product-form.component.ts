import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEdit = false;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  selectedFile!: File;
ngOnInit(): void {
this.productForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
  description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
  price: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(\\.[0-9]{1,2})?$")]],
  stock: ['', [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+$")]],
  image: [''] 
});


  this.route.params.subscribe(params => {
    if (params['id']) {
      this.isEdit = true;
      this.productId = +params['id'];
      this.productService.get(this.productId).subscribe((res: any) => {
        this.productForm.patchValue({
          name: res.name,
          description: res.description,
          price: res.price,
          stock: res.stock,
          image: res.image // stocke juste l'URL pour affichage
        });
      });
    }
  });
}

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];

  // Mettre à jour image pour affichage temporaire
  if (this.selectedFile) {
    const reader = new FileReader();
    reader.onload = e => this.productForm.patchValue({ image: reader.result });
    reader.readAsDataURL(this.selectedFile);
  }
}


 onSubmit(): void {
  if (this.productForm.invalid) {
    this.productForm.markAllAsTouched(); // <-- déclenche affichage erreurs
    return;
  }

  const formData = new FormData();
  Object.keys(this.productForm.value).forEach(key => {
    formData.append(key, this.productForm.value[key]);
  });

  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  if (this.isEdit) {
    this.productService.update(this.productId, formData).subscribe(() => {
      this.router.navigate(['/products']);
    });
  } else {
    this.productService.create(formData).subscribe(() => {
      this.router.navigate(['/products']);
    });
  }
}


}
