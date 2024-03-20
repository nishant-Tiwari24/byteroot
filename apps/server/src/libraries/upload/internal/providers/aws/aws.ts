import {
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { Injectable } from '@nestjs/common'
import { ConfigurationService } from '@server/core/configuration'
import {
  UploadProvider,
  UploadPublicOptions,
  UploadPublicReturn,
} from '@server/libraries/upload/upload.provider'
import { Logger, LoggerService } from '../../../../logger'

type Bucket = {
  name: string
  dateCreation: Date
}

@Injectable()
export class UploadAWS implements UploadProvider {
  private logger: Logger
  private client: S3Client
  private bucketPublicName: string

  constructor(
    private loggerService: LoggerService,
    private configurationService: ConfigurationService,
  ) {
    this.logger = this.loggerService.create({ name: 'AWS' })

    this.initialise()
  }

  private async initialise() {
    try {
      const accessKey = this.configurationService.get(`SERVER_AWS_ACCESS_KEY`)
      const secretKey = this.configurationService.get(`SERVER_AWS_SECRET_KEY`)

      if (!accessKey) {
        throw new Error('Access key is required')
      }

      if (!secretKey) {
        throw new Error('Secret key is required')
      }

      const region =
        this.configurationService.get(`SERVER_AWS_REGION`) ?? 'us-west-1'

      this.bucketPublicName = this.getBucketName()

      this.client = new S3Client({
        region,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey,
        },
      })

      await this.check()

      this.logger.success(`AWS library active`)
    } catch (error) {
      this.logger.error(`AWS library failed to start`)
      this.logger.error(error)
    }
  }

  private async check(): Promise<void> {
    const buckets = await this.listBuckets()

    const bucket = buckets.find(bucket => bucket.name === this.bucketPublicName)

    if (!bucket) {
      throw new Error(`Bucket "${this.bucketPublicName}" was not found`)
    }
  }

  private getBucketName(): string {
    const bucketName = this.configurationService.get(
      `SERVER_AWS_BUCKET_PUBLIC_NAME`,
    )

    return bucketName ?? null
  }

  private async listBuckets(): Promise<Bucket[]> {
    const result = await this.client.send(new ListBucketsCommand({}))

    const buckets = result.Buckets.map(item => ({
      name: item.Name,
      dateCreation: item.CreationDate,
    }))

    return buckets
  }

  public async uploadPublic(
    options: UploadPublicOptions,
  ): Promise<UploadPublicReturn> {
    const file = options.file

    if (!file) {
      return null
    }

    const key = this.ensureKey(file.originalname)

    const command = new PutObjectCommand({
      Bucket: `${this.bucketPublicName}`,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype ?? 'image/png',
    })

    try {
      await this.client.send(command)

      this.logger.success(`File ${file.originalname} saved (public)`)

      const url = `https://${this.bucketPublicName}-public.s3.us-west-1.amazonaws.com/${file.originalname}`

      return { url }
    } catch (error) {
      this.logger.error(`${error}`)
    }
  }

  public async uploadPrivate(
    options: UploadPublicOptions,
  ): Promise<UploadPublicReturn> {
    const file = options.file

    if (!file) {
      return null
    }

    const key = this.ensureKey(file.originalname)

    const command = new PutObjectCommand({
      Bucket: `${this.bucketPublicName}`,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype ?? 'image/png',
    })

    try {
      await this.client.send(command)

      this.logger.success(`File ${file.originalname} saved (public)`)

      const url = `https://${this.bucketPublicName}-public.s3.us-west-1.amazonaws.com/${file.originalname}`

      return { url }
    } catch (error) {
      this.logger.error(`${error}`)
    }
  }

  private ensureKey(key: string): string {
    const isPrefixed = key.startsWith('/')

    if (isPrefixed) {
      return key.slice(1)
    }

    return key
  }
}
