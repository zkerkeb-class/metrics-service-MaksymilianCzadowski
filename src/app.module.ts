import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TerminusModule } from "@nestjs/terminus";
import { HttpModule } from "@nestjs/axios";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { HealthModule } from "./modules/health/health.module";
import { MetricsModule } from "./modules/metrics/metrics.module";
import { MonitoringModule } from "./modules/monitoring/monitoring.module";
import { DashboardModule } from "./modules/dashboard/dashboard.module";

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.local", ".env"],
    }),

    // Scheduling for metrics collection
    ScheduleModule.forRoot(),

    // Health checks
    TerminusModule,

    // HTTP client for service communication
    HttpModule,

    // Custom modules
    HealthModule,
    MetricsModule,
    MonitoringModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
