import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { FrontendController } from './frontend.controller';

describe('FrontendController', () => {
  let controller: FrontendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FrontendController],
      providers: [CqrsModule],
    }).compile();

    controller = module.get<FrontendController>(FrontendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
