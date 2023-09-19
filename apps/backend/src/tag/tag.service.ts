import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { ITagsRO } from './tag.interface';
import { Article } from '../article/article.entity';

@Injectable()
export class TagService {
  constructor(@InjectRepository(Article) private articleRepository: EntityRepository<Article>) {}

  async findAll() {
    const articles = await this.articleRepository.findAll();

    const tags = articles.reduce((acc: string[], article: Article) => {
      return [...acc, ...article.tagList];
    }, [] as string[]);

    return {
      tags: [...new Set(tags)],
    };
  }
}
