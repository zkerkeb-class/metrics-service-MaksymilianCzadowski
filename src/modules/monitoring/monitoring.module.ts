import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MonitoringController } from './monitoring.controller';
import { MonitoringService } from './monitoring.service';
import { MetricsModule } from '../metrics/metrics.module';
import { HealthModule } from '../health/health.module';

@Module({
  imports: [HttpModule, MetricsModule, HealthModule],
  controllers: [MonitoringController],
  providers: [MonitoringService],
  exports: [MonitoringService],
})
export class MonitoringModule {} 