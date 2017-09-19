import { Observable } from 'rxjs/Rx';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from './model';
import { EditService } from './edit.service';
import { products } from './products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  cars = [
    {color: 'red', brand: 'BMW', name: 'Cobra', year: 2005},
    {color: 'blue', brand: 'Porche', name: 'Cabrero', year: 2015},
    {color: 'black', brand: 'Mercedes', name: 'E41', year: 2009},
    {color: 'yellow', brand: 'Ferrari', name: 'Fer', year: 2017}
  ];

  view: Observable<GridDataResult>;

  public gridState: State = {
      sort: [],
      skip: 0,
      take: 10
  };

  private editService: EditService;
  private editedRowIndex: number;
  private editedProduct: Product;

  gridView: any[] = products;

  constructor(@Inject(EditService) editServiceFactory: any) {
      this.editService = editServiceFactory();
  }

  ngOnInit(): void {
       this.view = this.editService.map(data => process(data, this.gridState));

      this.editService.read();
  }

  public onStateChange(state: State) {
      this.gridState = state;

      this.editService.read();
  }

  protected addHandler({sender}) {
      this.closeEditor(sender);

      sender.addRow(new Product());
  }

  protected editHandler({sender, rowIndex, dataItem}) {
      this.closeEditor(sender);

      this.editedRowIndex = rowIndex;
      this.editedProduct = Object.assign({}, dataItem);

      sender.editRow(rowIndex);
  }

  protected cancelHandler({sender, rowIndex}) {
      this.closeEditor(sender, rowIndex);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
      grid.closeRow(rowIndex);
      this.editService.resetItem(this.editedProduct);
      this.editedRowIndex = undefined;
      this.editedProduct = undefined;
  }

  protected saveHandler({sender, rowIndex, dataItem, isNew}) {
      this.editService.save(dataItem, isNew);

      sender.closeRow(rowIndex);

      this.editedRowIndex = undefined;
      this.editedProduct = undefined;
  }

  protected removeHandler({dataItem}) {
      this.editService.remove(dataItem);
  }


}
