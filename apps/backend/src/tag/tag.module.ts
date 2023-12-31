import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Article } from '../article/article.entity';

@Module({
  controllers: [TagController],
  exports: [],
  imports: [MikroOrmModule.forFeature({ entities: [Tag, Article] }), UserModule],
  providers: [TagService],
})
export class TagModule {}
