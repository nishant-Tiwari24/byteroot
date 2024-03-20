import { UploadFileType } from './upload.type'

export type UploadPublicOptions = {
  file: UploadFileType
}

export type UploadPublicReturn = {
  url: string
}

export type UploadPrivateOptions = {
  file: UploadFileType
}

export type UploadPrivateReturn = {
  url: string
}

export interface UploadProvider {
  uploadPublic(options: UploadPublicOptions): Promise<UploadPublicReturn>
  uploadPrivate(options: UploadPrivateOptions): Promise<UploadPrivateReturn>
}
