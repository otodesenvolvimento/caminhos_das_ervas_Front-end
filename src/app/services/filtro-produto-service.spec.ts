import { TestBed } from '@angular/core/testing';

import { FiltroProdutoService } from './filtro-produto-service';

describe('FiltroProdutoService', () => {
  let service: FiltroProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltroProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
