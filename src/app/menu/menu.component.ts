import {
  Component,
  OnInit,
  Directive,
  HostListener,
  Renderer,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('touchMenu', [
      state('inactive', style({
        width: '50px',
        transform: 'translateX(0)'
      })),
      state('active', style({
        width: '250px',
        transform: 'translateX(0)'
      })),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out'))
    ])
  ]
})
export class MenuComponent implements OnInit {

  public style = {
    width: (window.screen.width - 250) + 'px'
  }


  public status: string = 'inactive';
  @Input() menus: any[];

  constructor(private authService: AuthService) {

  }

  ngOnInit() {}


  onSignOut() {
    this.authService.signOut();
  }

 overMenu(event){
   this.status='active';
 }
 outMenu(event){
   this.status='inactive';
 }

}



@Directive({
  selector: "[cchover]"
})
export class MenuHoverDirective {

  public hover: boolean = false;
  constructor(private el: ElementRef,
    private renderer: Renderer) {
    // renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
  }

  @HostListener('mouseover') onMouseOver() {
    this.hover = true;
  }

  @HostListener('mouseout') onMouseOut() {
    this.hover = false;
  }
}
