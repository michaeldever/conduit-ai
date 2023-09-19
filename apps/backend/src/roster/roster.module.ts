import { Module } from '@nestjs/common';
import { RosterController } from './roster.controller';
import { RosterService } from './roster.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';

@Module({
  controllers: [RosterController],
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  providers: [RosterService],
})
export class RosterModule {}
