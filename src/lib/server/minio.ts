import { Client, type BucketItemFromList } from 'minio';
import { env } from '$env/dynamic/private';

const minioClient = new Client({
  endPoint: env.MINIO_ENDPOINT || 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: env.MINIO_ROOT_USER || 'minioadmin',
  secretKey: env.MINIO_ROOT_PASSWORD || 'minioadmin',
});

const BUCKET_NAME = env.MINIO_BUCKET || 'uploads';

export function getDirectObjectUrl(bucketName: string, objectName: string): string {
  return `http://${env.MINIO_ENDPOINT || 'localhost'}:9000/${bucketName}/${objectName}`;
}

export interface UploadResult {
  id: string; url: string; directUrl: string; filename: string; size: number; contentType: string; etag: string;
}

export async function createBucket(bucketName: string): Promise<void> {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) await minioClient.makeBucket(bucketName, 'us-east-1');
}

export async function uploadFile(bucketName: string, objectName: string, file: File): Promise<UploadResult> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const metadata = { 'Content-Type': file.type || 'application/octet-stream' };
  const result = await minioClient.putObject(bucketName, objectName, buffer, buffer.length, metadata);
  return {
    id: objectName, url: getDirectObjectUrl(bucketName, objectName), directUrl: getDirectObjectUrl(bucketName, objectName),
    filename: file.name, size: file.size, contentType: file.type || 'application/octet-stream', etag: result.etag
  };
}

export async function handleFileUpload(file: File, bucketName: string = BUCKET_NAME): Promise<UploadResult> {
  await createBucket(bucketName);
  const objectName = `${Date.now()}-${file.name}`;
  return await uploadFile(bucketName, objectName, file);
}

export async function deleteFileById(bucketName: string, objectId: string): Promise<void> {
  await minioClient.removeObject(bucketName, objectId);
}

export async function updateFile(bucketName: string, objectId: string, newFile: File): Promise<UploadResult> {
  return await uploadFile(bucketName, objectId, newFile);
}

export async function listObjects(bucketName: string, prefix?: string): Promise<any[]> {
  const objects: any[] = [];
  const objStream = minioClient.listObjects(bucketName, prefix, true);
  return new Promise((resolve, reject) => {
    objStream.on('data', (obj) => objects.push(obj));
    objStream.on('end', () => resolve(objects));
    objStream.on('error', reject);
  });
}

export async function listBuckets(): Promise<BucketItemFromList[]> {
  return await minioClient.listBuckets();
}
