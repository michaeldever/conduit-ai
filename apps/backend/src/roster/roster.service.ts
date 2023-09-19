import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { Article } from '../article/article.entity';

export interface RosterUser {
  username: string;
  url: string;
  articlesCount: number;
  totalFavorites: number;
  firstArticleDate?: Date;
}

@Injectable()
export class RosterService {
  constructor(private userRepository: UserRepository) {}

  async getRoster(): Promise<RosterUser[]> {
    const users = await this.userRepository.findAll({
      populate: ['articles'],
    });

    users.sort((a, b) => {
      return (
        b.articles.getItems().reduce((sum: number, article: Article) => {
          return sum + article.favoritesCount;
        }, 0) -
        a.articles.getItems().reduce((sum: number, article: Article) => {
          return sum + article.favoritesCount;
        }, 0)
      );
    });

    return users.map((user) => {
      return {
        username: user.username,
        url: `/profile/${user.username}`,
        articlesCount: user.articles.length,
        totalFavorites: user.articles.getItems().reduce((sum, article) => {
          return sum + article.favoritesCount;
        }, 0),
        firstArticleDate: user.articles[0]?.createdAt,
      };
    });
  }
}
