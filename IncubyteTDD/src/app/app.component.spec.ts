import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],  // Import ReactiveFormsModule for form controls
      declarations: [AppComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should invalidate the form if input is empty', () => {
      component.Form.controls['problem'].setValue('');
      expect(component.Form.invalid).toBeTrue();
    });

    it('should validate the form if input contains only numbers and commas', () => {
      component.Form.controls['problem'].setValue('1,2,3');
      expect(component.Form.valid).toBeTrue();
    });

    it('should invalidate the form if input contains invalid characters', () => {
      component.Form.controls['problem'].setValue('1,2,a');
      expect(component.Form.invalid).toBeTrue();
    });

    it('should validate the form if input contains numbers, commas, and hyphens', () => {
      component.Form.controls['problem'].setValue('1-2,3-4');
      expect(component.Form.valid).toBeTrue();
    });
  });

  describe('Submit Method', () => {
    it('should call sumNumbers and update output if form is valid', () => {
      spyOn(component, 'sumNumbers').and.returnValue(10);
      component.Form.controls['problem'].setValue('1,2,3,4');
      component.Submit();
      expect(component.sumNumbers).toHaveBeenCalledWith('1,2,3,4');
      expect(component.output).toBe(10);
    });

    it('should not call sumNumbers if form is invalid', () => {
      spyOn(component, 'sumNumbers');
      component.Form.controls['problem'].setValue('1,2,a');
      component.Submit();
      expect(component.sumNumbers).not.toHaveBeenCalled();
    });
  });

  describe('Clear Method', () => {
    it('should reset the form and output to default values', () => {
      component.Form.controls['problem'].setValue('1,2,3');
      component.output = 6;
      component.Clear();
      expect(component.Form.value.problem).toBeNull();
      expect(component.output).toBe(0);
    });
  });

  describe('sumNumbers Method', () => {
    it('should return 0 for an empty string', () => {
      expect(component.sumNumbers('')).toBe(0);
    });

    it('should correctly sum up numbers separated by commas', () => {
      expect(component.sumNumbers('1,2,3,4')).toBe(10);
    });

    it('should correctly handle numbers with spaces', () => {
      expect(component.sumNumbers(' 1 , 2 , 3 ')).toBe(6);
    });

    it('should ignore invalid numbers and sum only valid numbers', () => {
      expect(component.sumNumbers('1,2,a,3')).toBe(6);
    });

   
  });
});
