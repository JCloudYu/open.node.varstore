import type { IStorageConnect, StoredTypes, AllowedInputTypes } from "../varstore.js";
declare type InitOptions = {
    uri: string;
    db?: string;
    collection: string;
};
declare class MongoConnector implements IStorageConnect {
    static init(conn_info: InitOptions): Promise<MongoConnector>;
    list(): Promise<string[]>;
    get(name: string): Promise<StoredTypes | undefined>;
    set(name: string, value: AllowedInputTypes): Promise<boolean>;
    del(name: string): Promise<StoredTypes | undefined>;
    release(): Promise<void>;
}
export default MongoConnector;
