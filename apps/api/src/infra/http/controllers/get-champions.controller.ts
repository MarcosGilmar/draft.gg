import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { GetChampionsUseCase } from 'src/domain/use-cases/get-champions';
import { GetChampionByIdUseCase } from 'src/domain/use-cases/get-champions-by-id';
import { Public } from 'src/infra/auth/public';

@Controller('/champions')
@Public()
export class GetChampionsController {
  constructor(
    private getChampions: GetChampionsUseCase,
    private getChampionById: GetChampionByIdUseCase,
  ) {}

  @Get()
  async findAll() {
    const result = await this.getChampions.execute();

    if (result.isLeft()) {
      throw new InternalServerErrorException();
    }

    return { champions: result.value };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const result = await this.getChampionById.execute({ id });

    if (result.isLeft()) {
      const error = result.value;

      throw new NotFoundException(error.message);
    }

    return { champion: result.value };
  }
}
