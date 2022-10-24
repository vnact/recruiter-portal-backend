import { BaseEntity } from '@common/base.entity';
import { Query } from '@nestjs-architects/typed-cqrs';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DataSource, MoreThanOrEqual } from 'typeorm';

export class GetCurrentUpdatedQuery<T extends typeof BaseEntity> extends Query<
  T[]
> {
  constructor(public readonly entity: T, public readonly lastestCron?: Date) {
    super();
  }
}

@QueryHandler(GetCurrentUpdatedQuery)
export class GetCurrentUpdatedQueryHandler<T extends typeof BaseEntity>
  implements IQueryHandler<GetCurrentUpdatedQuery<T>>
{
  constructor(@Inject('datasource') private readonly dataSource: DataSource) {}
  execute(query: GetCurrentUpdatedQuery<T>): Promise<any> {
    return this.dataSource.manager.find(query.entity, {
      where: query.lastestCron
        ? {
            updatedAt: MoreThanOrEqual(query.lastestCron),
          }
        : {},
    });
  }
}
