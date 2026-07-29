import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ShotDataService } from './shot-data.service';

describe('ShotDataService', () => {
  let service: ShotDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ShotDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});