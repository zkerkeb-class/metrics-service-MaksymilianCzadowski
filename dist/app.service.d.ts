export declare class AppService {
    getServiceInfo(): {
        service: string;
        version: string;
        description: string;
        endpoints: {
            health: string;
            metrics: string;
            dashboard: string;
            documentation: string;
        };
        features: string[];
    };
    getStatus(): {
        status: string;
        timestamp: string;
        uptime: number;
        memory: NodeJS.MemoryUsage;
        version: string;
    };
}
