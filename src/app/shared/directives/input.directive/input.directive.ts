import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[app-input]'
})
export class InputDirective {
  protected class: string = 'outline-none border border-gray-400 focus:!border-primary-500 ';
  @Input() size: InputSize = "md"
  @Input() variant: InputVariant = "outlined"
  @Input() rounded: boolean = false;
  @Input() prefix: string | undefined;
  @Input() suffix: string | undefined;


  constructor() { }

  ngOnInit() {
    this.setVariant()
    this.setSize()
    this.setRounded()
    this.setPrefixOrSuffix()
  }

  setVariant() {
    switch (this.variant) {
      case "filled":
        this.class += "bg-background disabled:bg-foreground/50"
        break;
      case "outlined":
        this.class += "bg-foreground disabled:bg-background/50"
        break;

      default:
        break;
    }
  }

  setSize() {
    switch (this.size) {
      case "md":
        this.class += " px-[9px] py-[11px]"
        break;
      case "sm":
        this.class += " px-4 py-[6px] text-sm"
        break;
      case "xs":
        this.class += " px-2 py-[4px] text-xs"
        break;
      default:
        break;
    }
  }

  setRounded() {
    switch (this.rounded) {
      case true:
        this.class += " rounded-full"
        break;
      case false:
        this.class += " rounded-md"
        break;
      default:
        break;
    }
  }

  setPrefixOrSuffix() {
    this.prefix != undefined ? this.class += " ps-10" : ''
    this.suffix != undefined ? this.class += " pe-10" : ''
  }


  @HostBinding('class') get classes(): string {
    return this.class;
  }

}

type InputSize = "xs" | "sm" | "md"
type InputVariant = "filled" | "outlined"
