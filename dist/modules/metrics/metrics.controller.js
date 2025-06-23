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
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const metrics_service_1 = require("./metrics.service");
const prometheus_service_1 = require("./prometheus.service");
let MetricsController = class MetricsController {
    constructor(metricsService, prometheusService) {
        this.metricsService = metricsService;
        this.prometheusService = prometheusService;
    }
    async getMetrics() {
        return this.prometheusService.getMetrics();
    }
    async getMetricsSummary() {
        return this.metricsService.getMetricsSummary();
    }
    async getServicesMetrics() {
        return this.metricsService.getServicesMetrics();
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)('metrics'),
    (0, common_1.Header)('Content-Type', 'text/plain; version=0.0.4; charset=utf-8'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Prometheus metrics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Prometheus metrics returned' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('api/v1/metrics/summary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get metrics summary in JSON format' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Metrics summary retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getMetricsSummary", null);
__decorate([
    (0, common_1.Get)('api/v1/metrics/services'),
    (0, swagger_1.ApiOperation)({ summary: 'Get metrics for all services' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Services metrics retrieved' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetricsController.prototype, "getServicesMetrics", null);
exports.MetricsController = MetricsController = __decorate([
    (0, swagger_1.ApiTags)('metrics'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [metrics_service_1.MetricsService,
        prometheus_service_1.PrometheusService])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map