import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectDoctorPage } from './select-doctor.page';

describe('SelectDoctorPage', () => {
  let component: SelectDoctorPage;
  let fixture: ComponentFixture<SelectDoctorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDoctorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectDoctorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
