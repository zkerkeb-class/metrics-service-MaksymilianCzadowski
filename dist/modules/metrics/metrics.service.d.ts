import { HttpService } from '@nestjs/axios';
import { PrometheusService } from './prometheus.service';
import { HealthService } from '../health/health.service';
export declare class MetricsService {
    private readonly httpService;
    private readonly prometheusService;
    private readonly healthService;
    private readonly logger;
    constructor(httpService: HttpService, prometheusService: PrometheusService, healthService: HealthService);
    collectMetrics(): Promise<void>;
    private collectHealthMetrics;
    private collectBusinessMetrics;
    private collectUserMetrics;
    private collectConversationMetrics;
    private collectPaymentMetrics;
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
