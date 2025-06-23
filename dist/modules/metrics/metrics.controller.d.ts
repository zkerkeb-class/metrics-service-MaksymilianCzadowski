import { MetricsService } from './metrics.service';
import { PrometheusService } from './prometheus.service';
export declare class MetricsController {
    private readonly metricsService;
    private readonly prometheusService;
    constructor(metricsService: MetricsService, prometheusService: PrometheusService);
    getMetrics(): Promise<string>;
    getMetricsSummary(): Promise<{
        timestamp: string;
        health: {
            summary: {
                total: number;
                healthy: number;
                unhealthy: number;
                percentage: number;
            };
            timestamp: string;
            services: import("../../interfaces/service-health.interface").ServiceHealth[];
        };
        collection: {
            lastRun: string;
            status: string;
            interval: string;
        };
        endpoints: {
            prometheus: string;
            health: string;
            summary: string;
        };
    }>;
    getServicesMetrics(): Promise<{
        timestamp: string;
        services: {
            name: string;
            status: "healthy" | "unhealthy" | "unknown";
            responseTime: number;
            lastChecked: string;
            metricsAvailable: boolean;
        }[];
    }>;
}
