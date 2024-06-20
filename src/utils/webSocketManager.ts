import { L2MessageData, L2UpdateMessageData, SnapshotMessageData } from '../models/coinbase.types';
import { buildSubscribeMessage } from './webSocketManager.utils';

export class WebSocketManager {
  private ws: WebSocket | null = null;
  private isConnected = false;

  constructor(private readonly wsUrl: string) {}

  public connect(currency: string): void {
    this.ws = new WebSocket(this.wsUrl);
    this.ws.onopen = () => {
      console.log('WebSocket opened');
      this.subscribe(currency);
    };

    this.ws.onmessage = this.handleMessage;

    this.ws.onclose = () => {
      console.log('WebSocket closed');
      this.isConnected = false;
    };
  }

  public disconnect(): void {
    if (this.ws && this.isConnected) {
      this.ws.close();
    }
  }

  public subscribe(currency: string): void {
    if (this.ws && this.isConnected) {
      const subscribeMessage = buildSubscribeMessage([currency]);
      this.ws.send(JSON.stringify(subscribeMessage));
    } else {
      setTimeout(() => this.subscribe(currency), 100); // Retry after 100ms if not connected
    }
  }

  private handleMessage(event: MessageEvent): void {
    const data = JSON.parse(event.data) as L2MessageData;
    console.log('onmessage.data', data);
    if (data.type === 'snapshot') {
      const typedData = data as SnapshotMessageData;
      // Set bids and asks
    } else if (data.type === 'l2update') {
      const typedData = data as L2UpdateMessageData;
      // Update order book
    }
  }
}
