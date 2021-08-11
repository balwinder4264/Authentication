import {MongoClient} from "mongodb";

// mongodb+srv://balwinder:<password>@foodcluster.iyupi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
export async function connectToDatabase(){
    const client = await MongoClient.connect("mongodb+srv://balwinder:Arshjeet123@foodcluster.iyupi.mongodb.net/socialMedia?retryWrites=true&w=majority");
    return client;
}
// mongodb://127.0.0.1:27017/nextAuth