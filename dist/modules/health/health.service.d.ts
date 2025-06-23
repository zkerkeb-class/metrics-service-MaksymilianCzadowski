import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { ServiceHealth } from "../../interfaces/service-health.interface";
export declare class HealthService {
    private readonly httpService;
    private readonly configService;
    private readonly logger;
    private readonly services;
    constructor(httpService: HttpService, configService: ConfigService);
    checkAllServices(): Promise<ServiceHealth[]>;
    checkServiceHealth(serviceName: string, serviceUrl: string): Promise<ServiceHealth>;
    getHealthSummary(): Promise<{
        summary: {
            total: number;
            healthy: number;
            unhealthy: number;
            percentage: number;
        };
        timestamp: string;
        services: ServiceHealth[];
    }>;
}
