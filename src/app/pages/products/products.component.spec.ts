import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from 'src/app/services/products.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { PRODUCTS } from '@app/shared/constants';
import { ProductsPaginated } from '@app/models/product';
import { By } from '@angular/platform-browser';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let mockProductsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    mockProductsService = jasmine.createSpyObj('ProductsService', [
      'getProducts',
      'getCategories',
      'searchProducts',
      'getProductsByCategory'
    ]);

    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ReactiveFormsModule],
      providers: [
        { provide: ProductsService, useValue: mockProductsService }
      ],
    }).compileComponents();

    mockProductsService.getProducts.and.returnValue(of(PRODUCTS[0] as unknown as ProductsPaginated));
    mockProductsService.getCategories.and.returnValue(of([]));
    mockProductsService.searchProducts.and.returnValue(of(PRODUCTS[0] as unknown as ProductsPaginated));
    mockProductsService.getProductsByCategory.and.returnValue(of(PRODUCTS[0] as unknown as ProductsPaginated));

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts and getCategoriesList on init', () => {
    expect(mockProductsService.getProducts).toHaveBeenCalled();
    expect(mockProductsService.getCategories).toHaveBeenCalled();
  });

  it('should create a product card for each product returned ', () => {
    const productCards = fixture.debugElement.queryAll(By.css('[data-test-id="product"]'))
    expect(productCards.length).toBe(PRODUCTS[0].products.length);
  });
});
