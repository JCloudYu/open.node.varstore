type BinaryData = Buffer|ArrayBuffer|DataView|Uint8ClampedArray|Uint8Array|Int8Array|Uint16Array|Int16Array|Uint32Array|Int32Array|Float32Array|Float64Array;
export type StoredTypes = boolean|number|string|null|Buffer;
export type AllowedInputTypes = StoredTypes|BinaryData;
export interface IStorageConnect {
	list():Promise<string[]>;
	get(var_name:string):Promise<StoredTypes|undefined>;
	set(var_name:string, value:AllowedInputTypes):Promise<boolean>;
	del(var_name:string):Promise<undefined|StoredTypes>;
}


const _VarStore:WeakMap<VarStore, {connector:IStorageConnect}> = new WeakMap();
export class VarStore {
	constructor(connector:IStorageConnect) {
		_VarStore.set(this, {connector});
	}
	
	list():Promise<string[]> {
		const {connector} = _VarStore.get(this)!;
		return connector.list();
	}

	var(name:string):Promise<StoredTypes|undefined>;
	var(name:string, value:AllowedInputTypes):Promise<boolean>;
	var(name:string, value?:AllowedInputTypes):Promise<StoredTypes|undefined>|Promise<boolean> {
		const {connector} = _VarStore.get(this)!;
		if ( arguments.length < 2 ) {
			return connector.get(name);
		}


		if ( value !== undefined ) {
			return connector.set(name, value);
		}

		return connector.del(name);
	}
}