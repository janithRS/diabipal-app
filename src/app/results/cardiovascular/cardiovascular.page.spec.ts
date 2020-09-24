import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardiovascularPage } from './cardiovascular.page';

describe('CardiovascularPage', () => {
  let component: CardiovascularPage;
  let fixture: ComponentFixture<CardiovascularPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardiovascularPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardiovascularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
