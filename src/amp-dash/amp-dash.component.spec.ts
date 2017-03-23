import { setTimeout } from 'timers';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AmpDashComponent } from './amp-dash.component';

describe('AmpDashComponent', () => {
  let component: AmpDashComponent;
  let fixture: ComponentFixture<AmpDashComponent>;
  const testTextOne = 'Test';
  const testTextTwo = ['Test 1', 'Test 2'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmpDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmpDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(true);
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

   it('should set defaults input options', () => {
    expect(component.cursorClass).toEqual('cursor');
    expect(component.cursorChar).toEqual('_');
    expect(component.typeText).toEqual(['']);
    expect(component.typeDelay).toEqual(100);
    expect(component.typeLoop).toEqual(false);
    expect(component.eraseDelay).toEqual(2000);
  });

  it('should convert typeText string to string array', () => {
    component.typeText = testTextOne;
    component.ngOnChanges(true);
    expect(component.typeTextClone).toEqual(jasmine.any(Array));
  });

  it('should assign typeText array to clone', () => {
    component.typeText = testTextTwo;
    component.ngOnChanges(true);
    expect(component.typeTextClone).toContain('Test 2');
  });

  it('should call typewrite function on changes', () => {
    spyOn(component, 'typewrite');
    component.ngOnChanges(true);
    expect(component.typewrite).toHaveBeenCalled();
  });

  it('should call clearTimeouts function on destroy', () => {
    spyOn(component, 'clearTimeouts');
    fixture.destroy();
    expect(component.clearTimeouts).toHaveBeenCalled();
  });

  describe('Rendering', () => {
    let ampDashEl;
    let typewriteSpy;
    let erasewriteSpy;
    beforeEach(function() {
      typewriteSpy = spyOn(component, 'typewrite').and.callThrough();
      erasewriteSpy = spyOn(component, 'erasewrite').and.callThrough();
      jasmine.clock().install();
    });

    beforeEach(() => {
      fixture.autoDetectChanges();
      ampDashEl = fixture.debugElement.query(By.css('pre')).nativeElement;
    });

    afterEach(() => {
      jasmine.clock().uninstall();
      typewriteSpy.calls.reset();
      erasewriteSpy.calls.reset();
    });

    it('should render default element', () => {
      jasmine.clock().tick(101);
      expect(ampDashEl.innerText).toContain('_');
    });

    it('should update the displayText on change of typeText', () => {
      component.typeText = testTextOne;
      component.ngOnChanges(true);
      jasmine.clock().tick(400); // 100ms x 4 (letters)
      expect(typewriteSpy).toHaveBeenCalled();
      expect(component.displayText).toContain('Test');
    });

   it('should erase existing text before rendering new text', () => {
     component.typeText = testTextOne;
     component.ngOnChanges(true);
     jasmine.clock().tick(400); // 100ms x 4 (letters)
     expect(typewriteSpy).toHaveBeenCalled();

     component.typeText = testTextTwo;
     component.ngOnChanges(true);
     jasmine.clock().tick(2400); // 100ms x 4 (letters) + 2000ms erase delay
     expect(erasewriteSpy).toHaveBeenCalled();
     jasmine.clock().tick(3800);
     expect(component.displayText).toContain('Test 2');
   });

   it('should loop over the input text provided', () => {
     component.typeText = testTextTwo;
     component.typeLoop = true;
     component.ngOnChanges(true);
     jasmine.clock().tick(600); // 100ms x 6 (letters)
     expect(component.displayText).toContain('Test 1');
     jasmine.clock().tick(3200);
     expect(component.displayText).toContain('Test 2');
     jasmine.clock().tick(3200);
     expect(component.displayText).toContain('Test 1');
    jasmine.clock().tick(3200);
     expect(component.displayText).toContain('Test 2');
   });
  });
});
