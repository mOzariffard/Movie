import { Client, Databases, Query, ID } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

console.log("Project ID:", PROJECT_ID);
console.log("Database ID:", DATABASE_ID);
console.log("Collection ID:", COLLECTION_ID);


const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')  // Corrected endpoint
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async(searchTerm, movie) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID, 
      COLLECTION_ID, 
      [Query.equal('searchTerm', searchTerm)]  // Corrected query syntax
    );
    
    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(
        DATABASE_ID, 
        COLLECTION_ID, 
        doc.$id,
        { count: doc.count + 1 }
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm, 
          count: 1,
          movie_id: movie.id,
          poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,  // Corrected reference
        }
      );
    }
  } catch (error) {
    console.error('Error updating search count:', error);
  }
};

export const trendingMovies= async() =>{
    try {

    }
    catch(error){
        console.error(error);
    }
} 