import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import { PrometheusService } from './prometheus.service';

@Module({
  controllers: [MetricsController],
  providers: [MetricsService, PrometheusService],
  exports: [MetricsService, PrometheusService],
})
export class MetricsModule {} 