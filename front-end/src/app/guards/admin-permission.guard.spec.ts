import { TestBed } from '@angular/core/testing';

import { AdminPermissionGuard } from './admin-permission.guard';

describe('AdminPermissionGuard', () => {
  let guard: AdminPermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminPermissionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
