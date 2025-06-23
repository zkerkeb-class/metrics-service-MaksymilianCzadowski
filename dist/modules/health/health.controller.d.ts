import { HealthCheckService, HttpHealthIndicator, HealthCheckResult } from "@nestjs/terminus";
import { HealthService } from "./health.service";
import { ServiceHealth } from "../../interfaces/service-health.interface";
export declare class HealthController {
    private health;
    private http;
    private healthService;
    constructor(health: HealthCheckService, http: HttpHealthIndicator, healthService: HealthService);
    check(): Promise<HealthCheckResult>;
    checkAllServices(): Promise<ServiceHealth[]>;
    getHealthSummary(): Promise<any>;
}
