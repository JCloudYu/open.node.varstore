type BinaryData = Buffer|ArrayBuffer|DataView|Uint8ClampedArray|Uint8Array|Int8Array|Uint16Array|Int16Array|Uint32Array|Int32Array|Float32Array|Float64Array;
export type StoredTypes = boolean|number|string|null|Buffer;
export type AllowedInputTypes = StoredTypes|BinaryData;
export interface IStorageConnect {
	list():Promise<string[]>;
	get<ReturnType extends StoredTypes = StoredTypes>(var_name:string):Promise<ReturnType|undefined>;
	set<ValueType extends AllowedInputTypes = AllowedInputTypes>(var_name:string, value:ValueType):Promise<boolean>;
	del<ReturnType extends StoredTypes = StoredTypes>(var_name:string):Promise<ReturnType|undefined>;
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

	var<ReturnType extends StoredTypes = StoredTypes>(name:string):Promise<ReturnType|undefined>;
	var<ReturnType extends StoredTypes = StoredTypes>(name:string, value:undefined):Promise<ReturnType|undefined>;
	var<ValueType extends AllowedInputTypes=AllowedInputTypes>(name:string, value:ValueType):Promise<boolean>;
	var<ReturnType extends StoredTypes = StoredTypes, ValueType extends AllowedInputTypes=AllowedInputTypes>(name:string, value:ValueType|undefined=undefined):Promise<ReturnType|undefined|boolean> {
		const {connector} = _VarStore.get(this)!;
		if ( arguments.length < 2 ) {
			return connector.get<ReturnType>(name);
		}


		if ( value !== undefined ) {
			return connector.set<ValueType>(name, value);
		}

		return connector.del<ReturnType>(name);
	}
}