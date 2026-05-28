import { randomInt } from 'node:crypto';
import { ResetCodeGenerator } from 'src/application/ports/cryptography/reset-code-generator';

export class CryptoResetCodeGenerator implements ResetCodeGenerator {
  generateCode(): string {
    const code = randomInt(100000, 999999);

    return code.toString();
  }
}
