import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { MonitoringService } from "./monitoring.service";

@ApiTags("monitoring")
@Controller("monitoring")
export class MonitoringController {
  constructor(private readonly monitoringService: MonitoringService) {}

  @Get("overview")
  @ApiOperation({ summary: "Get overall system overview" })
  @ApiResponse({ status: 200, description: "System overview retrieved" })
  async getSystemOverview() {
    return this.monitoringService.getSystemOverview();
  }

  @Get("alerts")
  @ApiOperation({ summary: "Get current system alerts" })
  @ApiResponse({ status: 200, description: "System alerts retrieved" })
  async getAlerts() {
    return this.monitoringService.getAlerts();
  }

  @Get("performance")
  @ApiOperation({ summary: "Get performance metrics" })
  @ApiQuery({
    name: "timeRange",
    required: false,
    description: "Time range for metrics (1h, 24h, 7d)",
  })
  @ApiResponse({ status: 200, description: "Performance metrics retrieved" })
  async getPerformanceMetrics(@Query("timeRange") timeRange?: string) {
    return this.monitoringService.getPerformanceMetrics(timeRange);
  }

  @Get("usage")
  @ApiOperation({ summary: "Get usage statistics" })
  @ApiResponse({ status: 200, description: "Usage statistics retrieved" })
  async getUsageStatistics() {
    return this.monitoringService.getUsageStatistics();
  }
}
