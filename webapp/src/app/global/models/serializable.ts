export interface ISerializable {
  serialize: () => any;
  deserialize: (obj: any) => void;
}
