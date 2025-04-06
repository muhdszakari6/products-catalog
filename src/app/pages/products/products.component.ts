import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ProductComponent } from 'src/app/shared/components/product/product.component';
import { SelectComponent, SelectOptionItem } from "@app/shared/components/select/select.component";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputDirective } from '@app/shared/directives/input.directive/input.directive';
import { debounceTime, distinctUntilChanged, switchMap, catchError, EMPTY } from 'rxjs';
import { Dialog } from '@angular/cdk/dialog';
import { EditProductComponent } from './components/edit-product/edit-product.component';

@Component({
  selector: 'app-products',
  imports: [ProductComponent, SelectComponent, ReactiveFormsModule, InputDirective],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  form = new FormGroup({
    search: new FormControl(""),
    category: new FormControl("")
  })
  productsService = inject(ProductsService)
  products = signal<Product[] | null>(null)
  categories = signal<SelectOptionItem[]>([])
  dialog = inject(Dialog)

  ngOnInit(): void {
    this.getCategoriesList()
    this.getProducts()
    this.setupSearchValueChanges()
    this.setupCategoryValueChanges()

  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (res) => {
        this.products.set(res.products)
      }
    })
  }

  getCategoriesList() {
    this.productsService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res.map((item) => ({
          label: item,
          value: item
        })))
      }
    })
  }

  setupSearchValueChanges() {
    this.form.controls['search'].valueChanges
      .pipe(debounceTime(300),
        distinctUntilChanged(),
        switchMap((value: any) => {
          return this.productsService.searchProducts(value).pipe(
            catchError((_) => {
              return EMPTY
            })
          )
        }),
      )
      .subscribe({
        next: (res) => this.products.set(res.products)
      });
  }

  setupCategoryValueChanges() {
    this.form.controls['category'].valueChanges
      .pipe(debounceTime(300),
        distinctUntilChanged(),
        switchMap((value: any) => {
          return this.productsService.getProductsByCategory(value).pipe(
            catchError((_) => {
              return EMPTY
            })
          )
        }),
      )
      .subscribe({
        next: (res) => this.products.set(res.products)
      });
  }

  edit(product: Product) {
    this.dialog.open(EditProductComponent, {
      maxWidth: "450px",
      data: { product, categories: this.categories() }
    })
  }
}
