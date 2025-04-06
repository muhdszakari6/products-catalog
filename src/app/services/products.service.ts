import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Product, ProductsPaginated } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /**
  * Creates an instance of the CountriesService
  *
  * @param {HttpClient} http Injected instance of HttpClient
  */
  constructor(private http: HttpClient) { }

  /**
  * Sends a GET request to /products endpoint.
  * @remark
  * to get all products.
  * @returns {Observable<Country[]>} Returns an observable that emits all products if successful.
  */
  getProducts(): Observable<ProductsPaginated> {
    return this.http.get<ProductsPaginated>(`${environment.baseURL}/products`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseURL}/products/category-list`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  getProductsByCategory(category: string): Observable<ProductsPaginated> {
    return this.http.get<ProductsPaginated>(`${environment.baseURL}/products/category/${category}`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  searchProducts(q: string): Observable<ProductsPaginated> {
    return this.http.get<ProductsPaginated>(`${environment.baseURL}/products/search?q=${q}`)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  updateProduct(product: any): Observable<Product> {
    return this.http.put<Product>(`${environment.baseURL}/products/${product.id}`, product)
      .pipe(
        catchError(err => this.errorHandler(err)),
      )
  }

  /**
   * Contructs proper error message and rethrows error
   *  @param {any} err Error Object.
   * @returns {Observable<never>} Returns an observable.
   */
  private errorHandler(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error?.message}`;
    } else {
      errorMessage = `${err.statusText}`;
    }
    console.error(err);
    return throwError(() => new Error(errorMessage));
  }
}
