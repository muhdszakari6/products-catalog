import { Directive, HostBinding, Input } from '@angular/core';
@Directive({
  selector: '[app-button]',
  standalone: true,
})
export class ButtonDirective {
  protected class: string = 'focus-visible:outline-none cursor-pointer ';
  @Input() rounded: boolean = false;
  @Input() variant: ButtonVariant = "filled"
  @Input() size: ButtonSize = "md"

  constructor(
  ) { }

  ngOnInit() {
    this.setVariant()
    this.setSize()
    this.setRounded()
  }

  setVariant() {
    switch (this.variant) {
      case "filled":
        this.class += "bg-primary text-white active:bg-primary focus:outline-2 focus:outline-primary outline-offset-2 disabled:bg-gray-500"
        break;
      case "outlined":
        this.class += "bg-transparent text-gray font-semibold bg-gray-700 border border-gray-400 active:border-gray-500/50 disabled:border-gray-700/50 disabled:text-gray-700/50"
        break;
      case "raised":
        this.class += "bg-primary text-white active:bg-primary focus:outline-2 focus:outline-primary outline-offset-2 disabled:bg-primary shadow-2xl"
        break;
      case "circle":
        this.class += "bg-background text-primary rounded-full active:text-primary active:border-primary disabled:border-primary disabled:text-primary "
        break;
      default:
        break;
    }
  }

  setSize() {
    switch (this.size) {
      case "md":
        this.variant !== 'circle' ? this.class += " px-6 py-3" : this.class += " h-10 w-10 flex items-center justify-center"
        break;
      case "sm":
        this.variant !== 'circle' ? this.class += " px-4 py-[6px] text-sm" : this.class += " h-7 w-7 flex items-center justify-center text-sm"
        break;
      case "xs":
        this.variant !== 'circle' ? this.class += " px-2 py-[4px] text-xs" : this.class += " h-5 w-5 flex items-center justify-center text-xs"
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
        this.class += " rounded-lg"
        break;
      default:
        break;
    }
  }

  @HostBinding('class') get classes(): string {
    return this.class;
  }
}


type ButtonVariant = "filled" | "outlined" | "raised" | "circle"
type ButtonSize = "xs" | "sm" | "md"
