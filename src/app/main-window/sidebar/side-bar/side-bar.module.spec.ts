import { SideBarModule } from '../side-bar.module';

describe('SideBarModule', () => {
  let sideBarModule: SideBarModule;

  beforeEach(() => {
    sideBarModule = new SideBarModule();
  });

  it('should create an instance', () => {
    expect(sideBarModule).toBeTruthy();
  });
});
