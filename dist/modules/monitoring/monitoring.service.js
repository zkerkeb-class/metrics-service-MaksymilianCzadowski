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
var MonitoringService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonitoringService = void 0;
const common_1 = require("@nestjs/common");
const health_service_1 = require("../health/health.service");
const metrics_service_1 = require("../metrics/metrics.service");
let MonitoringService = MonitoringService_1 = class MonitoringService {
    constructor(healthService, metricsService) {
        this.healthService = healthService;
        this.metricsService = metricsService;
        this.logger = new common_1.Logger(MonitoringService_1.name);
    }
    async getSystemOverview() {
        const healthSummary = await this.healthService.getHealthSummary();
        const metricsSummary = await this.metricsService.getMetricsSummary();
        return {
            timestamp: new Date().toISOString(),
            status: healthSummary.summary.percentage >= 80 ? 'healthy' : 'degraded',
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
        for (const service of healthSummary.services) {
            if (service.status === 'unhealthy') {
                alerts.push({
                    severity: 'critical',
                    type: 'service_down',
                    service: service.name,
                    message: `Service ${service.name} is unhealthy`,
                    timestamp: service.lastChecked,
                    error: service.error,
                });
            }
            else if (service.responseTime > 5000) {
                alerts.push({
                    severity: 'warning',
                    type: 'slow_response',
                    service: service.name,
                    message: `Service ${service.name} has slow response time: ${service.responseTime}ms`,
                    timestamp: service.lastChecked,
                });
            }
        }
        const memoryUsage = process.memoryUsage();
        const memoryUsagePercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
        if (memoryUsagePercent > 80) {
            alerts.push({
                severity: 'warning',
                type: 'high_memory_usage',
                service: 'monitoring-service',
                message: `High memory usage: ${memoryUsagePercent.toFixed(1)}%`,
                timestamp: new Date().toISOString(),
            });
        }
        return {
            timestamp: new Date().toISOString(),
            total: alerts.length,
            critical: alerts.filter(a => a.severity === 'critical').length,
            warnings: alerts.filter(a => a.severity === 'warning').length,
            alerts: alerts.sort((a, b) => a.severity === 'critical' ? -1 : b.severity === 'critical' ? 1 : 0),
        };
    }
    async getPerformanceMetrics(timeRange = '1h') {
        const healthSummary = await this.healthService.getHealthSummary();
        const avgResponseTime = healthSummary.services.reduce((sum, service) => sum + service.responseTime, 0) / healthSummary.services.length;
        return {
            timestamp: new Date().toISOString(),
            timeRange,
            metrics: {
                averageResponseTime: Math.round(avgResponseTime),
                healthPercentage: healthSummary.summary.percentage,
                uptime: process.uptime(),
                memoryUsage: process.memoryUsage(),
            },
            services: healthSummary.services.map(service => ({
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
            period: '24h',
            statistics: {
                totalServices: healthSummary.summary.total,
                healthChecks: healthSummary.summary.total * 2880,
                averageUptime: healthSummary.summary.percentage,
                alertsGenerated: (await this.getAlerts()).total,
            },
            breakdown: {
                services: healthSummary.services.map(service => ({
                    name: service.name,
                    status: service.status,
                    lastChecked: service.lastChecked,
                })),
            },
        };
    }
    async getActiveAlertsCount() {
        const alerts = await this.getAlerts();
        return alerts.total;
    }
};
exports.MonitoringService = MonitoringService;
exports.MonitoringService = MonitoringService = MonitoringService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [health_service_1.HealthService,
        metrics_service_1.MetricsService])
], MonitoringService);
//# sourceMappingURL=monitoring.service.js.map