import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {BehaviorSubject, Observable, Subject, combineLatest, switchMap, take, takeLast} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ProductModel } from '../../models/product.model';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-advanced-list',
  templateUrl: './advanced-list.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./advanced-list.component.scss']
})
export class AdvancedListComponent {
  readonly categories$: Observable<string[]> = this._categoryService.getAll().pipe(
    map(categories => {
      return categories.filter(category => ['men\'s clothing', 'women\'s clothing'].includes(category));
    })
  )
  private _categorySubject: Subject<string> = new Subject<string>();
  public category$: Observable<string> = this._categorySubject.asObservable();
  private _sortPriceAscSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public sortPriceAsc: Observable<boolean> = this._sortPriceAscSubject.asObservable();
  private _refreshSubject: BehaviorSubject<void> = new BehaviorSubject<void>(void 0);
  public refresh$: Observable<void> = this._refreshSubject.asObservable();

  readonly products$: Observable<ProductModel[]> = this.refresh$.pipe(
    switchMap(() => combineLatest([
      this._productService.getAll(),
      this.category$,
      this.sortPriceAsc
    ]).pipe(
      map(([products, category, sortPriceAsc]: [ProductModel[], string, boolean]) => {
        return products.filter(product => product.category === category)
          .sort((a, b) => {
            if (a.price > b.price) return sortPriceAsc ? 1 : -1;
            if (a.price < b.price) return sortPriceAsc ? -1 : 1;
            return 0;
          })
      })
    ))
  )

  constructor(private _categoryService: CategoryService, private _productService: ProductService) {
  }

  selectCategory(value: string): void {
    this._categorySubject.next(value);
  }

  togglePriceSort(): void {
    this._sortPriceAscSubject.next(!this._sortPriceAscSubject.value);
  }

  delete(id: number): void {
    this._productService.delete(id).subscribe(() => this._refreshSubject.next());
  }
}
