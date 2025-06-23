import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get dashboard overview data' })
  @ApiResponse({ status: 200, description: 'Dashboard overview data retrieved' })
  async getDashboardOverview() {
    return this.dashboardService.getDashboardOverview();
  }

  @Get('widgets')
  @ApiOperation({ summary: 'Get dashboard widget data' })
  @ApiResponse({ status: 200, description: 'Dashboard widgets data retrieved' })
  async getWidgetsData() {
    return this.dashboardService.getWidgetsData();
  }

  @Get('export')
  @ApiOperation({ summary: 'Export monitoring data' })
  @ApiQuery({ name: 'format', required: false, description: 'Export format (json, csv)' })
  @ApiQuery({ name: 'timeRange', required: false, description: 'Time range for export' })
  @ApiResponse({ status: 200, description: 'Data exported successfully' })
  async exportData(
    @Query('format') format: string = 'json',
    @Query('timeRange') timeRange: string = '24h'
  ) {
    return this.dashboardService.exportData(format, timeRange);
  }
} 