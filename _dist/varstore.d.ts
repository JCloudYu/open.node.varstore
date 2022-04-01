export interface IStorageConnect {
    list(): Promise<string[]>;
    get<ReturnType = any>(var_name: string): Promise<ReturnType | undefined>;
    set<ValueType = any>(var_name: string, value: ValueType): Promise<boolean>;
    del<ReturnType = any>(var_name: string): Promise<undefined | ReturnType>;
}
export declare class RemoteStorage {
    constructor(connector: IStorageConnect);
    list(): Promise<string[]>;
    var<ValueType = any>(name: string): Promise<ValueType | undefined>;
    var<ValueType = any>(name: string, value: ValueType): Promise<boolean>;
}
