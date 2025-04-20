// gemini.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PostService } from 'src/modules/post/post.service';
import { PostEntity } from 'src/modules/post/post.entity';
@Injectable()
export class GeminiService {
  private generativeAI: GoogleGenerativeAI;

  private readonly logger = new Logger(GeminiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly postService: PostService,
  ) {
    // Khởi tạo GoogleGenerativeAI với API key
    this.generativeAI = new GoogleGenerativeAI(
      String(this.configService.get('GEMINI_API_KEY')),
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    this.logger.log('Đang chạy job mỗi 1 tiếng...');

    const result = await this.generateContent(
      `Create a social media post with the following structure:
          1. 'content': A short description of a personal experience or interesting fact that could engage users, written in a casual, friendly tone.
          2. 'imageUrl': A URL pointing to an image related to the content (could be a random image URL from a free public domain image provider, like Unsplash or Pexels).
          Make sure the content is engaging and relevant for a broad audience.
        `,
    );

    await this.postService.addPost({
      content: result.content,
      imageUrl: result.imageUrl,
    } as PostEntity);
  }

  async generateContent(prompt: string) {
    try {
      const model = this.generativeAI.getGenerativeModel({
        model: 'gemini-1.5-flash', // Mô hình AI bạn muốn sử dụng
      });

      // Gọi API để tạo nội dung từ prompt
      const result = await model.generateContent([prompt]);

      const responseText = result.response.text().trim(); // Trả về nội dung đã được tạo
      const cleanResponse = responseText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      return JSON.parse(cleanResponse);
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Could not generate content');
    }
  }
}
