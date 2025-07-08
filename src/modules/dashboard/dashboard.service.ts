import { Injectable } from "@nestjs/common";
import { MonitoringService } from "../monitoring/monitoring.service";
import { MetricsService } from "../metrics/metrics.service";

@Injectable()
export class DashboardService {
  constructor(
    private readonly monitoringService: MonitoringService,
    private readonly metricsService: MetricsService
  ) {}

  async getDashboardOverview() {
    const [systemOverview, alerts, performance] = await Promise.all([
      this.monitoringService.getSystemOverview(),
      this.monitoringService.getAlerts(),
      this.monitoringService.getPerformanceMetrics(),
    ]);

    return {
      timestamp: new Date().toISOString(),
      system: systemOverview,
      alerts: {
        total: alerts.total,
        critical: alerts.critical,
        warnings: alerts.warnings,
        recent: alerts.alerts.slice(0, 5), // Last 5 alerts
      },
      performance: {
        averageResponseTime: performance.metrics.averageResponseTime,
        healthPercentage: performance.metrics.healthPercentage,
        uptime: Math.round(performance.metrics.uptime / 3600), // Convert to hours
      },
    };
  }

  async getWidgetsData() {
    const [overview, usage, servicesMetrics] = await Promise.all([
      this.monitoringService.getSystemOverview(),
      this.monitoringService.getUsageStatistics(),
      this.metricsService.getServicesMetrics(),
    ]);

    return {
      timestamp: new Date().toISOString(),
      widgets: [
        {
          id: "services-status",
          title: "Services Status",
          type: "status-grid",
          data: servicesMetrics.services,
        },
        {
          id: "health-summary",
          title: "Health Summary",
          type: "donut-chart",
          data: {
            healthy: overview.services.healthy,
            unhealthy: overview.services.unhealthy,
            total: overview.services.total,
          },
        },
        {
          id: "response-times",
          title: "Response Times",
          type: "bar-chart",
          data: servicesMetrics.services.map((service) => ({
            name: service.name,
            value: service.responseTime,
          })),
        },
        {
          id: "system-metrics",
          title: "System Metrics",
          type: "metrics-card",
          data: {
            uptime: Math.round(process.uptime() / 3600),
            memory: process.memoryUsage(),
            alerts: overview.alerts,
          },
        },
      ],
    };
  }

  async exportData(format: string, timeRange: string) {
    const [overview, alerts, performance, usage] = await Promise.all([
      this.monitoringService.getSystemOverview(),
      this.monitoringService.getAlerts(),
      this.monitoringService.getPerformanceMetrics(timeRange),
      this.monitoringService.getUsageStatistics(),
    ]);

    const exportData = {
      exportInfo: {
        timestamp: new Date().toISOString(),
        format,
        timeRange,
        generatedBy: "Penpal AI Monitoring Service",
      },
      data: {
        overview,
        alerts,
        performance,
        usage,
      },
    };

    if (format === "csv") {
      return this.convertToCSV(exportData);
    }

    return exportData;
  }

  private convertToCSV(data: any) {
    // Simple CSV conversion for services data
    const services = data.data.overview.services;
    const csvHeader = "Service,Status,Response Time (ms),Last Checked\n";
    const csvRows = data.data.performance.services
      .map(
        (service) =>
          `${service.name},${service.status},${service.responseTime},${new Date().toISOString()}`
      )
      .join("\n");

    return {
      format: "csv",
      content: csvHeader + csvRows,
      filename: `penpal-monitoring-${new Date().toISOString().split("T")[0]}.csv`,
    };
  }
}
