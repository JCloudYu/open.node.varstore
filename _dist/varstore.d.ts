/// <reference types="node" />
declare type BinaryData = Buffer | ArrayBuffer | DataView | Uint8ClampedArray | Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;
export declare type StoredTypes = boolean | number | string | null | Buffer;
export declare type AllowedInputTypes = StoredTypes | BinaryData;
export interface IStorageConnect {
    list(): Promise<string[]>;
    get(var_name: string): Promise<StoredTypes | undefined>;
    set(var_name: string, value: AllowedInputTypes): Promise<boolean>;
    del(var_name: string): Promise<undefined | StoredTypes>;
}
export declare class VarStore {
    constructor(connector: IStorageConnect);
    list(): Promise<string[]>;
    var(name: string): Promise<StoredTypes | undefined>;
    var(name: string, value: AllowedInputTypes): Promise<boolean>;
}
export {};
