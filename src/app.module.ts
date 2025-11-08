import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueriesModule } from './modules/queries/queries.module';
import { WarbandsModule } from './modules/warbands/warbands.module';
import { SoldiersModule } from './modules/soldiers/soldiers.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    QueriesModule,
    WarbandsModule,
    SoldiersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
