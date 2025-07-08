import { Controller, Get } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheckResult,
} from "@nestjs/terminus";
import { HealthService } from "./health.service";
import { ServiceHealth } from "../../interfaces/service-health.interface";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private healthService: HealthService
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: "Overall health check of monitoring service" })
  @ApiResponse({ status: 200, description: "Health check successful" })
  check(): Promise<HealthCheckResult> {
    return this.health.check([
      () =>
        this.http.pingCheck(
          "monitoring-service",
          "http://localhost:3005/api/v1/status"
        ),
    ]);
  }

  @Get("services")
  @ApiOperation({ summary: "Health check of all Penpal services" })
  @ApiResponse({ status: 200, description: "Services health status retrieved" })
  async checkAllServices(): Promise<ServiceHealth[]> {
    return this.healthService.checkAllServices();
  }

  @Get("summary")
  @ApiOperation({ summary: "Health summary of all services" })
  @ApiResponse({ status: 200, description: "Health summary retrieved" })
  async getHealthSummary(): Promise<any> {
    return this.healthService.getHealthSummary();
  }
}
