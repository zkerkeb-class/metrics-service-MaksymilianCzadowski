import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PrometheusService } from './prometheus.service';
import { HealthService } from '../health/health.service';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prometheusService: PrometheusService,
    private readonly healthService: HealthService,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async collectMetrics() {
    this.logger.debug('Collecting metrics from all services...');
    
    try {
      // Collect health metrics
      await this.collectHealthMetrics();
      
      // Collect business metrics
      await this.collectBusinessMetrics();
      
    } catch (error) {
      this.logger.error('Error collecting metrics:', error.message);
    }
  }

  private async collectHealthMetrics() {
    const services = await this.healthService.checkAllServices();
    
    for (const service of services) {
      this.prometheusService.setServiceHealth(
        service.name,
        service.url,
        service.status === 'healthy'
      );
      
      this.prometheusService.setServiceResponseTime(
        service.name,
        service.responseTime
      );
    }
  }

  private async collectBusinessMetrics() {
    try {
      // Collect user metrics from auth service
      await this.collectUserMetrics();
      
      // Collect conversation metrics from ai service
      await this.collectConversationMetrics();
      
      // Collect payment metrics from payment service
      await this.collectPaymentMetrics();
      
    } catch (error) {
      this.logger.warn('Error collecting business metrics:', error.message);
    }
  }

  private async collectUserMetrics() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3002/api/v1/metrics/users', {
          timeout: 5000,
        })
      );
      
      if (response.data?.activeUsers) {
        this.prometheusService.setActiveUsers(response.data.activeUsers);
      }
    } catch (error) {
      this.logger.debug('Could not collect user metrics:', error.message);
    }
  }

  private async collectConversationMetrics() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3003/api/v1/metrics/conversations', {
          timeout: 5000,
        })
      );
      
      if (response.data?.newConversations) {
        this.prometheusService.incrementConversations('created');
      }
    } catch (error) {
      this.logger.debug('Could not collect conversation metrics:', error.message);
    }
  }

  private async collectPaymentMetrics() {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://localhost:3004/api/v1/metrics/payments', {
          timeout: 5000,
        })
      );
      
      if (response.data?.successfulPayments) {
        this.prometheusService.incrementPayments('success');
      }
    } catch (error) {
      this.logger.debug('Could not collect payment metrics:', error.message);
    }
  }

  async getMetricsSummary() {
    const healthSummary = await this.healthService.getHealthSummary();
    
    return {
      timestamp: new Date().toISOString(),
      health: healthSummary,
      collection: {
        lastRun: new Date().toISOString(),
        status: 'active',
        interval: '30 seconds',
      },
      endpoints: {
        prometheus: '/metrics',
        health: '/api/v1/health',
        summary: '/api/v1/metrics/summary',
      },
    };
  }

  async getServicesMetrics() {
    const services = await this.healthService.checkAllServices();
    
    return {
      timestamp: new Date().toISOString(),
      services: services.map(service => ({
        name: service.name,
        status: service.status,
        responseTime: service.responseTime,
        lastChecked: service.lastChecked,
        metricsAvailable: service.status === 'healthy',
      })),
    };
  }
} 