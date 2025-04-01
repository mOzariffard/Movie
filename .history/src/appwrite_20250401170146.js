import { Databases } from "appwrite";
import { Client , Databases , Query } from "appwrite";

const PROJECT_ID=import.meta.env.local.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID=import.meta.env.local.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID=import.meta.env.local.VTTE_APPWITE_COLLECTION_ID;


const client = new Client()
    .setEndpoint('http://appwrite.io/v1')
    .setProject(PROJECT_ID)

    const database = new Databases(client);

export const updateSearchCount= async(searchTerm , movie) => {
    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID , queries[Query.equal('searchTerm', searchTerm)]);
    }
};