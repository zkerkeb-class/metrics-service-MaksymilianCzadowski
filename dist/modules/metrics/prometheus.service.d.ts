import { OnModuleInit } from "@nestjs/common";
export declare class PrometheusService implements OnModuleInit {
    private readonly httpRequestsTotal;
    private readonly httpRequestDuration;
    private readonly serviceHealthStatus;
    private readonly serviceResponseTime;
    private readonly activeUsers;
    private readonly conversationsTotal;
    private readonly paymentsTotal;
    private readonly tokensConsumed;
    constructor();
    onModuleInit(): void;
    incrementHttpRequests(method: string, route: string, statusCode: string, service: string): void;
    observeHttpDuration(method: string, route: string, service: string, duration: number): void;
    setServiceHealth(serviceName: string, serviceUrl: string, isHealthy: boolean): void;
    setServiceResponseTime(serviceName: string, responseTime: number): void;
    setActiveUsers(count: number): void;
    incrementConversations(status: "created" | "completed" | "failed"): void;
    incrementPayments(status: "success" | "failed" | "pending", amount?: number): void;
    incrementTokensConsumed(provider: string, model: string, tokens: number): void;
    getMetrics(): Promise<string>;
    getRegister(): import("prom-client").Registry<"text/plain; version=0.0.4; charset=utf-8">;
}
