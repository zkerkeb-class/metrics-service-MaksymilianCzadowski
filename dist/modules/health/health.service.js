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
var HealthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let HealthService = HealthService_1 = class HealthService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = new common_1.Logger(HealthService_1.name);
        this.services = [];
        this.services = [
            {
                name: "auth-service",
                url: `${this.configService.get("AUTH_SERVICE_URL", "http://auth-service:3002")}/api/v1/health`,
            },
            {
                name: "db-service",
                url: `${this.configService.get("DB_SERVICE_URL", "http://db-service:3001")}/api/v1/health`,
            },
            {
                name: "ai-service",
                url: `${this.configService.get("AI_SERVICE_URL", "http://ai-service:3003")}/api/v1/health`,
            },
            {
                name: "payment-service",
                url: `${this.configService.get("PAYMENT_SERVICE_URL", "http://payment-service:3004")}/api/v1/health`,
            },
        ];
    }
    async checkAllServices() {
        const healthChecks = this.services.map((service) => this.checkServiceHealth(service.name, service.url));
        return Promise.all(healthChecks);
    }
    async checkServiceHealth(serviceName, serviceUrl) {
        const startTime = Date.now();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(serviceUrl, {
                timeout: 5000,
                headers: {
                    Accept: "application/json",
                },
            }));
            const responseTime = Date.now() - startTime;
            return {
                name: serviceName,
                url: serviceUrl,
                status: response.status === 200 ? "healthy" : "unhealthy",
                responseTime,
                lastChecked: new Date().toISOString(),
            };
        }
        catch (error) {
            const responseTime = Date.now() - startTime;
            this.logger.warn(`Health check failed for ${serviceName}: ${error.message}`);
            return {
                name: serviceName,
                url: serviceUrl,
                status: "unhealthy",
                responseTime,
                lastChecked: new Date().toISOString(),
                error: error.message,
            };
        }
    }
    async getHealthSummary() {
        const services = await this.checkAllServices();
        const healthy = services.filter((s) => s.status === "healthy").length;
        const unhealthy = services.filter((s) => s.status === "unhealthy").length;
        const total = services.length;
        return {
            summary: {
                total,
                healthy,
                unhealthy,
                percentage: Math.round((healthy / total) * 100),
            },
            timestamp: new Date().toISOString(),
            services,
        };
    }
};
exports.HealthService = HealthService;
exports.HealthService = HealthService = HealthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], HealthService);
//# sourceMappingURL=health.service.js.map