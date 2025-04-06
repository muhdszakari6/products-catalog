import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject, Inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '@app/services/products.service';
import { SelectComponent } from '@app/shared/components/select/select.component';
import { ButtonDirective } from '@app/shared/directives/button.directive/button.directive';
import { InputDirective } from '@app/shared/directives/input.directive/input.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule, InputDirective, ButtonDirective, SelectComponent],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProductComponent {
  form: FormGroup
  productsService = inject(ProductsService)
  toastr = inject(ToastrService)

  loading = signal(false)

  constructor(public dialogRef: DialogRef, @Inject(DIALOG_DATA) public data: any) {
    this.form = new FormGroup({
      title: new FormControl(this.data?.product.title || "", [Validators.required]),
      category: new FormControl(this.data?.product.category || "", [Validators.required]),
      price: new FormControl(this.data?.product.price || 0, [Validators.required]),

    })
  }

  submit() {
    if (!this.form.valid) return
    this.loading.set(true)
    this.productsService.updateProduct({ ...this.data.product, ...this.form.value }).subscribe(
      (res) => {
        this.loading.set(false)
        this.toastr.success("Updated Successfully")
        this.dialogRef.close(this.form.value)

      },
      err => {
        this.loading.set(false)
        this.toastr.error(err)
      }
    )
  }

}
