import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { MetricsController, MetricsApiController } from "./metrics.controller";
import { MetricsService } from "./metrics.service";
import { PrometheusService } from "./prometheus.service";
import { HealthModule } from "../health/health.module";

@Module({
  imports: [HttpModule, HealthModule],
  controllers: [MetricsController, MetricsApiController],
  providers: [MetricsService, PrometheusService],
  exports: [MetricsService, PrometheusService],
})
export class MetricsModule {}
