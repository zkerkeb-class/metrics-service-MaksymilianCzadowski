import { MonitoringService } from "./monitoring.service";
export declare class MonitoringController {
    private readonly monitoringService;
    constructor(monitoringService: MonitoringService);
    getSystemOverview(): Promise<{
        timestamp: string;
        status: string;
        services: {
            total: number;
            healthy: number;
            unhealthy: number;
            percentage: number;
        };
        metrics: {
            collectionActive: boolean;
            lastUpdate: string;
        };
        alerts: number;
    }>;
    getAlerts(): Promise<{
        timestamp: string;
        total: number;
        critical: number;
        warnings: number;
        alerts: any[];
    }>;
    getPerformanceMetrics(timeRange?: string): Promise<{
        timestamp: string;
        timeRange: string;
        metrics: {
            averageResponseTime: number;
            healthPercentage: number;
            uptime: number;
            memoryUsage: NodeJS.MemoryUsage;
        };
        services: {
            name: string;
            responseTime: number;
            status: "healthy" | "unhealthy" | "unknown";
        }[];
    }>;
    getUsageStatistics(): Promise<{
        timestamp: string;
        period: string;
        statistics: {
            totalServices: number;
            healthChecks: number;
            averageUptime: number;
            alertsGenerated: number;
        };
        breakdown: {
            services: {
                name: string;
                status: "healthy" | "unhealthy" | "unknown";
                lastChecked: string;
            }[];
        };
    }>;
}
