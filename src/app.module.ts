import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './configs/app.config';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import { MySqlDriver } from '@mikro-orm/mysql';
import { APP_FILTERS, APP_GUARDS, APP_MODULES } from './index';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'], // https://docs.nestjs.com/techniques/configuration
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useFactory: () => {
        const configDB = AppConfig.getInstance().database;
        return {
          driver: MySqlDriver,
          host: configDB.host,
          port: configDB.port,
          username: configDB.username,
          password: configDB.password,
          synchronize: true,
          dbName: configDB.nameDatabase,
          autoLoadEntities: true,
          extensions: [Migrator, EntityGenerator, SeedManager],
        };
      },
    }),
    ...APP_MODULES,
  ],
  controllers: [AppController],
  providers: [
    ...APP_FILTERS.map((filter) => ({
      provide: APP_FILTER,
      useClass: filter,
    })),
    ...APP_GUARDS.map((guard) => ({
      provide: APP_GUARD,
      useClass: guard,
    })),
    AppService,
  ],
})
export class AppModule {}
