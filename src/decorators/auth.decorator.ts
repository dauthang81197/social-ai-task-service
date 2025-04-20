import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

export function Auth(type: string): MethodDecorator {
  return applyDecorators(ApiBearerAuth(), UseGuards(AuthGuard(type)));
}
