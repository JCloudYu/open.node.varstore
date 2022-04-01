import type { IStorageConnect } from "../varstore.js";
declare type InitOptions = {
    uri: string;
    db?: string;
    collection: string;
};
declare class MongoConnector implements IStorageConnect {
    static init(conn_info: InitOptions): Promise<MongoConnector>;
    list(): Promise<string[]>;
    get<ValueType = any>(name: string): Promise<ValueType | undefined>;
    set<ValueType = any>(name: string, value: ValueType): Promise<boolean>;
    del<ValueType = any>(name: string): Promise<ValueType | undefined>;
}
export default MongoConnector;
