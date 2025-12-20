import io from "socket.io-client";

interface StepEventData {
    user_id: number;
    category_id: number;
    steps: number;
    type: string;
    lat: number;
    lng: number;
    timestamp: number;
}

class SocketService {
    private static instance: SocketService;
    private socket: any = null;
    private readonly SOCKET_URL = "https://videosdownloaders.com:3000";

    private constructor() { }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    public initialize(): void {
        // Initialization logic if needed, currently handled in connect
    }

    public connect(): void {
        if (this.socket?.connected) {
            console.log("Socket already connected");
            return;
        }
        console.log("Connecting to socket:", this.SOCKET_URL);
        this.socket = io(this.SOCKET_URL, {
            transports: ["websocket"],
        });
        this.setupListeners();
    }

    private setupListeners(): void {
        if (!this.socket) return;

        // Debug all events
        this.socket.onAny((event: string, ...args: any[]) => {
            console.log(`DEBUG: Received event '${event}':`, args);
        });

        this.socket.on("connect", () => {
            console.log("Socket is connected");
            console.log("Socket ID:", this.socket?.id);
        });

        this.socket.on("disconnect", (reason: any) => {
            console.log("Socket disconnected:", reason);
        });

        this.socket.on("connect_error", (error: any) => {
            console.log("Socket connection error came:", error);
        });

        this.socket.on("step_ack", (data: any) => {
            console.log("Step saved (ACK):", data);
        });

        this.socket.on("auth_error", (data: any) => {
            console.log("Auth error:", data.message);
        });
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }

    public sendStepEvent(data: Omit<StepEventData, 'timestamp'> & { timestamp?: number }): void {
        if (!this.socket || !this.socket.connected) {
            console.log("Cannot send event, socket not connected");
            return;
        }

        const payload: StepEventData = {
            ...data,
            timestamp: data.timestamp || Math.floor(Date.now() / 1000)
        };

        console.log("Emitting step_event:", payload);
        this.socket.emit("step_event", payload);
    }

    public isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

export default SocketService.getInstance();
