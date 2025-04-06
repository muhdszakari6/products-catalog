import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent {
  img = input()
  title = input()
  rating = input()
  category = input()
  price = input()
  review = input()
}
