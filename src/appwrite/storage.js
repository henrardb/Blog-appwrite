import conf from "../conf/conf";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
  client = new Client();
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.bucket = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("StorageService :: uploadFile() :: ", error);
    }
  }

  async deletFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("StorageService :: deleteFile() :: ", error);
    }
  }

  getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview(conf.appwriteBucketId, fileId).href;
    } catch (error) {
      console.log("StorageService :: getFilePreview() :: ", error);
    }
  }
}

const storageService = new StorageService();
export default storageService;
