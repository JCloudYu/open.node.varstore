import type {IStorageConnect} from "../varstore.js";
import mongodb from "mongodb";

type InitOptions = { uri:string; db?:string; collection:string; };
type VarRecord<ValueType> = {name:string; value:ValueType;}



const _MongoConnector:WeakMap<MongoConnector, {conn:mongodb.MongoClient; db:mongodb.Db; coll_name:string;}> = new WeakMap();
class MongoConnector implements IStorageConnect {
	static async init(conn_info:InitOptions):Promise<MongoConnector> {
		const raw_uri = (''+(conn_info.uri||'')).trim();

		const db_name = conn_info.db;
		if ( !db_name ) throw new SyntaxError("Bound database name is required!");
		
		const coll_name = (''+(conn_info.collection||'')).trim();
		if ( !coll_name ) throw new SyntaxError("Bound collection name is required!");

		const mongo_client = await mongodb.MongoClient.connect(raw_uri);
		const mongo_db = db_name ? mongo_client.db() : mongo_client.db(db_name);

		const instance = new MongoConnector();
		_MongoConnector.set(instance, {
			coll_name,
			conn:mongo_client,
			db:mongo_db
		});
		return instance;
	}
	async list():Promise<string[]> {
		const {db, coll_name} = _MongoConnector.get(this)!;
		const [{names}] = await db.collection(coll_name).find<{names:string[]}>([
			
		]).toArray();

		return names;
	}
	async get<ValueType=any>(name:string):Promise<ValueType|undefined> {
		const {db, coll_name} = _MongoConnector.get(this)!;
		const [data] = await db.collection(coll_name).find<VarRecord<ValueType>>({name}).toArray();

		return data ? data.value : undefined;
	}
	async set<ValueType=any>(name:string, value:ValueType):Promise<boolean> {
		const {db, coll_name} = _MongoConnector.get(this)!;
		const result = await db.collection(coll_name).updateOne({name}, {$set:{value:value}});
		return result.matchedCount > 0;
	}
	async del<ValueType=any>(name:string):Promise<ValueType|undefined> {
		const {db, coll_name} = _MongoConnector.get(this)!;
		const {value} = await db.collection(coll_name).findOneAndDelete({name});
		if ( value === null ) return undefined;
		
		return value.value;
	}
}

export default MongoConnector;