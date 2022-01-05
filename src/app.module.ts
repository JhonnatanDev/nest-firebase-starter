import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firestore.module';
import { TodosModule } from './todos/todos.module';
import { isLocal, EnvVariablesEnum } from './common/helpers/environment.helper'
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (isLocal ? {
        projectId: configService.get<string>(EnvVariablesEnum.PROJECT_ID),
        host: configService.get<string>(EnvVariablesEnum.LOCAL_FIRESTORE_HOST),
        ssl: false
      } : {
        keyFilename: configService.get<string>(EnvVariablesEnum.KEY_FILE_NAME),
        projectId: configService.get<string>(EnvVariablesEnum.PROJECT_ID),
      }),
      inject: [ConfigService],
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
