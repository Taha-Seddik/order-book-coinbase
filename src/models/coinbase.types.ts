export type L2MessageData = SnapshotMessageData | L2UpdateMessageData;

export type TupleArrayType = [string, string][];

export type SnapshotMessageData = {
  type: "snapshot";
  product_id: string;
  bids: TupleArrayType;
  asks: TupleArrayType;
};

export type L2UpdateMessageData = {
  type: "l2update";
  product_id: string;
  time: string; // ISO 8601 date string
  changes: [string, string, string][];
};
