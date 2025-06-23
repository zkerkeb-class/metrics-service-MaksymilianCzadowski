import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { MonitoringModule } from '../monitoring/monitoring.module';
import { MetricsModule } from '../metrics/metrics.module';

@Module({
  imports: [MonitoringModule, MetricsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {} 