import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getServiceInfo() {
    return {
      service: "Penpal AI Monitoring Service",
      version: "1.0.0",
      description:
        "Service de monitoring et métriques pour l'écosystème Penpal AI",
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
}
