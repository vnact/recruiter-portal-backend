import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { ormConfig } from './configs/orm.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [ormConfig],
});

const typeormConfig = <DataSourceOptions>ormConfig();

const dataSource = new DataSource(typeormConfig);

export default dataSource;
