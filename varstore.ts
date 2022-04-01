export interface IStorageConnect {
	list():Promise<string[]>;
	get<ReturnType=any>(var_name:string):Promise<ReturnType|undefined>;
	set<ValueType=any>(var_name:string, value:ValueType):Promise<boolean>;
	del<ReturnType=any>(var_name:string):Promise<undefined|ReturnType>;
}


const _RemoteStorage:WeakMap<RemoteStorage, {connector:IStorageConnect}> = new WeakMap();
export class RemoteStorage {
	constructor(connector:IStorageConnect) {
		_RemoteStorage.set(this, {connector});
	}
	
	list():Promise<string[]> {
		const {connector} = _RemoteStorage.get(this)!;
		return connector.list();
	}

	var<ValueType=any>(name:string):Promise<ValueType|undefined>;
	var<ValueType=any>(name:string, value:ValueType):Promise<boolean>;
	var<ValueType=any>(name:string, value?:ValueType):Promise<ValueType|undefined>|Promise<boolean> {
		const {connector} = _RemoteStorage.get(this)!;
		if ( arguments.length < 2 ) {
			return connector.get<ValueType>(name);
		}


		if ( value !== undefined ) {
			return connector.set<ValueType>(name, value);
		}

		return connector.del<ValueType>(name);
	}
}