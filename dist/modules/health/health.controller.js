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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const terminus_1 = require("@nestjs/terminus");
const health_service_1 = require("./health.service");
let HealthController = class HealthController {
    constructor(health, http, healthService) {
        this.health = health;
        this.http = http;
        this.healthService = healthService;
    }
    check() {
        return this.health.check([
            () => this.http.pingCheck("monitoring-service", "http://localhost:3005/api/v1/status"),
        ]);
    }
    async checkAllServices() {
        return this.healthService.checkAllServices();
    }
    async getHealthSummary() {
        return this.healthService.getHealthSummary();
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, terminus_1.HealthCheck)(),
    (0, swagger_1.ApiOperation)({ summary: "Overall health check of monitoring service" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Health check successful" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)("services"),
    (0, swagger_1.ApiOperation)({ summary: "Health check of all Penpal services" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Services health status retrieved" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "checkAllServices", null);
__decorate([
    (0, common_1.Get)("summary"),
    (0, swagger_1.ApiOperation)({ summary: "Health summary of all services" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Health summary retrieved" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthController.prototype, "getHealthSummary", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)("health"),
    (0, common_1.Controller)("health"),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.HttpHealthIndicator,
        health_service_1.HealthService])
], HealthController);
//# sourceMappingURL=health.controller.js.map