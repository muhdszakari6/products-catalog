import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { InputDirective } from '@app/shared/directives/input.directive/input.directive';

@Component({
  selector: 'app-select',
  imports: [InputDirective, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent implements ControlValueAccessor {
  top = 0
  left = 0
  width = 0
  bottom = 0
  @ViewChild('input') input: ElementRef | undefined;
  @ViewChild('dropdown') dropdownEl: ElementRef | undefined;

  @Input() placeholder: string = ""
  @Input() size: InputSize = "md"
  @Input() variant: InputVariant = "outlined"
  @Input() rounded: boolean = false;
  @Input() autocomplete: boolean = false;
  @Input() prefix: string | undefined;
  @Input() suffix: string | undefined;
  @Input() options: Array<SelectOptionItem> = [];
  @Output() selectInputChange = new EventEmitter();

  private onTouched: Function = () => { };
  private onChanged: Function = (item: SelectOptionItem | null) => { };
  selectedOption: SelectOptionItem | null = null;
  dropdownOpen: boolean = false;

  constructor(private el: ElementRef, @Self() @Optional() public control: NgControl) {
    if (this.control)
      this.control.valueAccessor = this;
  }

  public get invalid(): boolean | null {
    return this.control ? this.control.invalid : false;
  }

  public get disabled(): boolean | null {
    return this.control ? this.control.disabled : false;
  }

  public get showError(): boolean | null {
    if (!this.control) {
      return false;
    }

    const { dirty, touched } = this.control;
    return this.invalid ? (dirty || touched) : false;
  }

  writeValue(item: SelectOptionItem | null): void {
    if (typeof item === 'string') {
      this.selectedOption = this.options.filter((option) => option.value === item)[0]
    } else {
      this.selectedOption = item;
    }
  }


  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }


  selectOption(item: SelectOptionItem) {
    this.onTouched();
    this.writeValue(item)
    this.onChanged(item.value);
    this.toggleDropdown();
  }


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.el.nativeElement.contains(event.target) && this.dropdownOpen) {
      this.dropdownOpen = false;
      this.onTouched() //Calls onTouched whenever dropdown is closed, check if there's a validation error
    }
  }

  toggleDropdown() {
    if (this.dropdownOpen) this.onTouched() //Calls onTouched whenever dropdown is closed, check if there's a validation error
    this.dropdownOpen = !this.dropdownOpen
    if (this.dropdownOpen) {
      this.updatePosition()
      this.width = this.input?.nativeElement.getBoundingClientRect().width
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updatePosition()
  }

  updatePosition = () => {
    this.top = this.input?.nativeElement.getBoundingClientRect().top + this.input?.nativeElement.getBoundingClientRect().height
    this.left = this.input?.nativeElement.getBoundingClientRect().left
  }

  emitChange() {
    this.onTouched()
    this.selectInputChange.emit();
  }

}

type InputSize = "xs" | "sm" | "md"
type InputVariant = "filled" | "outlined"
export interface SelectOptionItem {
  label: string,
  value: string
}
