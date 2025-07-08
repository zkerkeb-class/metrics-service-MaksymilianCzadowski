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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dashboard_service_1 = require("./dashboard.service");
let DashboardController = class DashboardController {
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getDashboardOverview() {
        return this.dashboardService.getDashboardOverview();
    }
    async getWidgetsData() {
        return this.dashboardService.getWidgetsData();
    }
    async exportData(format = "json", timeRange = "24h") {
        return this.dashboardService.exportData(format, timeRange);
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)("overview"),
    (0, swagger_1.ApiOperation)({ summary: "Get dashboard overview data" }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Dashboard overview data retrieved",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getDashboardOverview", null);
__decorate([
    (0, common_1.Get)("widgets"),
    (0, swagger_1.ApiOperation)({ summary: "Get dashboard widget data" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Dashboard widgets data retrieved" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getWidgetsData", null);
__decorate([
    (0, common_1.Get)("export"),
    (0, swagger_1.ApiOperation)({ summary: "Export monitoring data" }),
    (0, swagger_1.ApiQuery)({
        name: "format",
        required: false,
        description: "Export format (json, csv)",
    }),
    (0, swagger_1.ApiQuery)({
        name: "timeRange",
        required: false,
        description: "Time range for export",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Data exported successfully" }),
    __param(0, (0, common_1.Query)("format")),
    __param(1, (0, common_1.Query)("timeRange")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "exportData", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)("dashboard"),
    (0, common_1.Controller)("dashboard"),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map