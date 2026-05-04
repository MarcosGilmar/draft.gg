import { Body, Controller, Post } from '@nestjs/common';
import { UniqueEntityId } from 'src/core/entities/unique-entity-id';
import { NoteType } from 'src/domain/entities/note';
import { CreateNoteUseCase } from 'src/domain/use-cases/create-note';
import { CurrentUser } from 'src/infra/auth/current-user-decorator';
import type { TokenPayloadSchema } from 'src/infra/auth/jwt.strategy';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation-pipe';
import z from 'zod';

const createNoteBodySchema = z.object({
  title: z.string().trim().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  content: z.string().min(1),
  type: z.enum(Object.values(NoteType)),
});

type CreateNoteBodySchema = z.infer<typeof createNoteBodySchema>;

@Controller('/notes')
export class CreateNoteController {
  constructor(private createNote: CreateNoteUseCase) {}

  @Post()
  async handle(
    @CurrentUser() currentUser: TokenPayloadSchema,
    @Body(new ZodValidationPipe(createNoteBodySchema))
    body: CreateNoteBodySchema,
  ) {
    const { title, content, type } = body;

    await this.createNote.execute({
      title,
      content,
      type,
      userId: new UniqueEntityId(currentUser.sub),
    });
  }
}
