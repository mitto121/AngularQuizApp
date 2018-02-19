import { TestBed, inject } from '@angular/core/testing';

import { AuthenticateUserService } from './authenticate-user.service';

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticateUserService]
    });
  });

  it('should be created', inject([AuthenticateUserService], (service: AuthenticateUserService) => {
    expect(service).toBeTruthy();
  }));
});
