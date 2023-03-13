import { Test, TestingModule } from '@nestjs/testing';
import { ShareController } from './shares.controller';

describe('ShareController', () => {
  let controller: ShareController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShareController],
    }).compile();

    controller = module.get<ShareController>(ShareController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
