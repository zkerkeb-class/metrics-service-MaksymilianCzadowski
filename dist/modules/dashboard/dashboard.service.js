"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const monitoring_service_1 = require("../monitoring/monitoring.service");
const metrics_service_1 = require("../metrics/metrics.service");
let DashboardService = class DashboardService {
    constructor(monitoringService, metricsService) {
        this.monitoringService = monitoringService;
        this.metricsService = metricsService;
    }
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
                recent: alerts.alerts.slice(0, 5),
            },
            performance: {
                averageResponseTime: performance.metrics.averageResponseTime,
                healthPercentage: performance.metrics.healthPercentage,
                uptime: Math.round(performance.metrics.uptime / 3600),
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
    async exportData(format, timeRange) {
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
    convertToCSV(data) {
        const services = data.data.overview.services;
        const csvHeader = "Service,Status,Response Time (ms),Last Checked\n";
        const csvRows = data.data.performance.services
            .map((service) => `${service.name},${service.status},${service.responseTime},${new Date().toISOString()}`)
            .join("\n");
        return {
            format: "csv",
            content: csvHeader + csvRows,
            filename: `penpal-monitoring-${new Date().toISOString().split("T")[0]}.csv`,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [monitoring_service_1.MonitoringService,
        metrics_service_1.MetricsService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map