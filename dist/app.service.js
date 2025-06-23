"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    getServiceInfo() {
        return {
            service: "Penpal AI Monitoring Service",
            version: "1.0.0",
            description: "Service de monitoring et métriques pour l'écosystème Penpal AI",
            endpoints: {
                health: "/api/v1/health",
                metrics: "/metrics",
                dashboard: "/api/v1/dashboard",
                documentation: "/api/docs",
            },
            features: [
                "Real-time metrics collection",
                "Prometheus integration",
                "Service health monitoring",
                "Performance analytics",
                "Dashboard visualization",
            ],
        };
    }
    getStatus() {
        return {
            status: "healthy",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            version: process.version,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map