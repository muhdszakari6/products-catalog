/* tslint:disable:no-unused-variable */
import { TestBed } from '@angular/core/testing';
import { ProductsService } from './products.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PRODUCTS } from '../shared/constants';
import { provideHttpClient } from '@angular/common/http';


describe('Service: Products', () => {
  let service: ProductsService;
  let httpTestingController: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });

    service = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  describe('get all products', () => {
    it('should call getProducts with the correct URL and respond.', (done: DoneFn) => {

      service.getProducts().subscribe(
        (res) => {
          expect(res.products.length).toBe(PRODUCTS.length);
        }
      )

      const req = httpTestingController.expectOne(`https://dummyjson.com/products`)

      expect(req.request.method).toBe('GET');

      req.flush(PRODUCTS[0]);

      httpTestingController.verify()

      done()
    });
  });


});
