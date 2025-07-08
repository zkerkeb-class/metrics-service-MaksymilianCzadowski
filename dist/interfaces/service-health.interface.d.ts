export interface ServiceHealth {
    name: string;
    url: string;
    status: "healthy" | "unhealthy" | "unknown";
    responseTime: number;
    lastChecked: string;
    error?: string;
}
