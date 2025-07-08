import { DashboardService } from "./dashboard.service";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getDashboardOverview(): Promise<{
        timestamp: string;
        system: {
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
        };
        alerts: {
            total: number;
            critical: number;
            warnings: number;
            recent: any[];
        };
        performance: {
            averageResponseTime: number;
            healthPercentage: number;
            uptime: number;
        };
    }>;
    getWidgetsData(): Promise<{
        timestamp: string;
        widgets: ({
            id: string;
            title: string;
            type: string;
            data: {
                name: string;
                status: "healthy" | "unhealthy" | "unknown";
                responseTime: number;
                lastChecked: string;
                metricsAvailable: boolean;
            }[];
        } | {
            id: string;
            title: string;
            type: string;
            data: {
                healthy: number;
                unhealthy: number;
                total: number;
                uptime?: undefined;
                memory?: undefined;
                alerts?: undefined;
            };
        } | {
            id: string;
            title: string;
            type: string;
            data: {
                name: string;
                value: number;
            }[];
        } | {
            id: string;
            title: string;
            type: string;
            data: {
                uptime: number;
                memory: NodeJS.MemoryUsage;
                alerts: number;
                healthy?: undefined;
                unhealthy?: undefined;
                total?: undefined;
            };
        })[];
    }>;
    exportData(format?: string, timeRange?: string): Promise<{
        exportInfo: {
            timestamp: string;
            format: string;
            timeRange: string;
            generatedBy: string;
        };
        data: {
            overview: {
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
            };
            alerts: {
                timestamp: string;
                total: number;
                critical: number;
                warnings: number;
                alerts: any[];
            };
            performance: {
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
            };
            usage: {
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
            };
        };
    } | {
        format: string;
        content: string;
        filename: string;
    }>;
}
