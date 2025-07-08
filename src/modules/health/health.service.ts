import { Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
import { ServiceHealth } from "../../interfaces/service-health.interface";

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  private readonly services: Array<{ name: string; url: string }> = [];

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    // Initialize services with environment variables
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

  async checkAllServices(): Promise<ServiceHealth[]> {
    const healthChecks = this.services.map((service) =>
      this.checkServiceHealth(service.name, service.url)
    );

    return Promise.all(healthChecks);
  }

  async checkServiceHealth(
    serviceName: string,
    serviceUrl: string
  ): Promise<ServiceHealth> {
    const startTime = Date.now();

    try {
      const response = await firstValueFrom(
        this.httpService.get(serviceUrl, {
          timeout: 5000,
          headers: {
            Accept: "application/json",
          },
        })
      );

      const responseTime = Date.now() - startTime;

      return {
        name: serviceName,
        url: serviceUrl,
        status: response.status === 200 ? "healthy" : "unhealthy",
        responseTime,
        lastChecked: new Date().toISOString(),
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      this.logger.warn(
        `Health check failed for ${serviceName}: ${error.message}`
      );

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
}
