import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { CategoryService } from '../../service/category/category.service';
import { createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import * as CategoryActions from './category.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private categoryService: CategoryService,
    private action$: Actions,
  ) {}
  getCategory$ = createEffect(() =>
    this.action$.pipe(
      ofType(CategoryActions.get),
      switchMap((action) => {
        return this.categoryService.getCategories();
      }),
      map((categories) => {
        return CategoryActions.getSuccess({ categories: categories });
      }),
      catchError((error) => {
        return of(CategoryActions.getFailure({ errorMessage: error }));
      }),
    ),
  );
}
