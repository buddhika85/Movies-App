import { Component, Input } from '@angular/core';
import { MultipleSelectorDto } from '../../models/multipleSelector.models';

@Component({
  selector: 'app-multiple-selector',
  standalone: true,
  imports: [],
  templateUrl: './multiple-selector.component.html',
  styleUrl: './multiple-selector.component.scss',
})
export class MultipleSelectorComponent {
  @Input({ required: true })
  selectedList!: MultipleSelectorDto[];

  @Input({ required: true })
  nonSelectedList!: MultipleSelectorDto[];

  select(element: MultipleSelectorDto, index: number): void {
    this.selectedList.push(element);
    this.nonSelectedList.splice(index, 1);
  }

  deselect(element: MultipleSelectorDto, index: number): void {
    this.selectedList.splice(index, 1);
    this.nonSelectedList.push(element);
  }

  selectAll(): void {
    // for (let index = 0; index < this.nonSelectedList.length; index++) {
    //   this.selectedList.push(this.nonSelectedList[index]);
    //   this.nonSelectedList.splice(index, 1);
    // }
    this.selectedList.push(...this.nonSelectedList);
    this.nonSelectedList.length = 0;
  }

  deSelectAll(): void {
    this.nonSelectedList.push(...this.selectedList);
    this.selectedList.length = 0;
  }
}
