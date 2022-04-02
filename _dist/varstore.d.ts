/// <reference types="node" />
declare type BinaryData = Buffer | ArrayBuffer | DataView | Uint8ClampedArray | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;
export declare type StoredTypes = boolean | number | string | null | Buffer;
export declare type AllowedInputTypes = StoredTypes | BinaryData;
export interface IStorageConnect {
    list(): Promise<string[]>;
    get<ReturnType extends StoredTypes = StoredTypes>(var_name: string): Promise<ReturnType | undefined>;
    set<ValueType extends AllowedInputTypes = AllowedInputTypes>(var_name: string, value: ValueType): Promise<boolean>;
    del<ReturnType extends StoredTypes = StoredTypes>(var_name: string): Promise<ReturnType | undefined>;
}
export declare class VarStore {
    constructor(connector: IStorageConnect);
    list(): Promise<string[]>;
    var<ReturnType extends StoredTypes = StoredTypes>(name: string): Promise<ReturnType | undefined>;
    var<ReturnType extends StoredTypes = StoredTypes>(name: string, value: undefined): Promise<ReturnType | undefined>;
    var<ValueType extends AllowedInputTypes = AllowedInputTypes>(name: string, value: ValueType): Promise<boolean>;
}
export {};
