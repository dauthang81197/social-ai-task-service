import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PostModule } from 'src/modules/post/post.module';
import { GeminiService } from './gemini.service';

@Module({
  imports: [HttpModule, PostModule],
  providers: [GeminiService],
})
export class GeminiModule {}
