import { Injectable, Logger } from "@nestjs/common";
import { HealthService } from "../health/health.service";
import { MetricsService } from "../metrics/metrics.service";

@Injectable()
export class MonitoringService {
  private readonly logger = new Logger(MonitoringService.name);

  constructor(
    private readonly healthService: HealthService,
    private readonly metricsService: MetricsService
  ) {}

  async getSystemOverview() {
    const healthSummary = await this.healthService.getHealthSummary();
    const metricsSummary = await this.metricsService.getMetricsSummary();

    return {
      timestamp: new Date().toISOString(),
      status: healthSummary.summary.percentage >= 80 ? "healthy" : "degraded",
      services: {
        total: healthSummary.summary.total,
        healthy: healthSummary.summary.healthy,
        unhealthy: healthSummary.summary.unhealthy,
        percentage: healthSummary.summary.percentage,
      },
      metrics: {
        collectionActive: true,
        lastUpdate: metricsSummary.collection.lastRun,
      },
      alerts: await this.getActiveAlertsCount(),
    };
  }

  async getAlerts() {
    const healthSummary = await this.healthService.getHealthSummary();
    const alerts = [];

    // Service health alerts
    for (const service of healthSummary.services) {
      if (service.status === "unhealthy") {
        alerts.push({
          severity: "critical",
          type: "service_down",
          service: service.name,
          message: `Service ${service.name} is unhealthy`,
          timestamp: service.lastChecked,
          error: service.error,
        });
      } else if (service.responseTime > 5000) {
        alerts.push({
          severity: "warning",
          type: "slow_response",
          service: service.name,
          message: `Service ${service.name} has slow response time: ${service.responseTime}ms`,
          timestamp: service.lastChecked,
        });
      }
    }

    // System alerts
    const memoryUsage = process.memoryUsage();
    const memoryUsagePercent =
      (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;

    if (memoryUsagePercent > 80) {
      alerts.push({
        severity: "warning",
        type: "high_memory_usage",
        service: "monitoring-service",
        message: `High memory usage: ${memoryUsagePercent.toFixed(1)}%`,
        timestamp: new Date().toISOString(),
      });
    }

    return {
      timestamp: new Date().toISOString(),
      total: alerts.length,
      critical: alerts.filter((a) => a.severity === "critical").length,
      warnings: alerts.filter((a) => a.severity === "warning").length,
      alerts: alerts.sort((a, b) =>
        a.severity === "critical" ? -1 : b.severity === "critical" ? 1 : 0
      ),
    };
  }

  async getPerformanceMetrics(timeRange: string = "1h") {
    const healthSummary = await this.healthService.getHealthSummary();

    // Calculate average response time
    const avgResponseTime =
      healthSummary.services.reduce(
        (sum, service) => sum + service.responseTime,
        0
      ) / healthSummary.services.length;

    return {
      timestamp: new Date().toISOString(),
      timeRange,
      metrics: {
        averageResponseTime: Math.round(avgResponseTime),
        healthPercentage: healthSummary.summary.percentage,
        uptime: process.uptime(),
        memoryUsage: process.memoryUsage(),
      },
      services: healthSummary.services.map((service) => ({
        name: service.name,
        responseTime: service.responseTime,
        status: service.status,
      })),
    };
  }

  async getUsageStatistics() {
    const healthSummary = await this.healthService.getHealthSummary();

    return {
      timestamp: new Date().toISOString(),
      period: "24h",
      statistics: {
        totalServices: healthSummary.summary.total,
        healthChecks: healthSummary.summary.total * 2880, // 30s interval for 24h
        averageUptime: healthSummary.summary.percentage,
        alertsGenerated: (await this.getAlerts()).total,
      },
      breakdown: {
        services: healthSummary.services.map((service) => ({
          name: service.name,
          status: service.status,
          lastChecked: service.lastChecked,
        })),
      },
    };
  }

  private async getActiveAlertsCount(): Promise<number> {
    const alerts = await this.getAlerts();
    return alerts.total;
  }
}
