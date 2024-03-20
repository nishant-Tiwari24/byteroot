import * as fs from 'fs'
import * as os from 'os'
import * as Path from 'path'
import { join } from 'path'
import { Readable } from 'typeorm/platform/PlatformTools'

export namespace FileHelper {
  export function getRoot(): string {
    return Path.join(__dirname, '../../..')
  }

  export function findFileContent(path: string): string {
    return fs.readFileSync(path, 'utf-8')
  }

  export function writeFolder(path: string): void {
    fs.mkdirSync(path, { recursive: true })
  }

  export function writeFile(path: string, content: string | Buffer): void {
    const pathFolder = path.split('/').slice(0, -1).join('/')

    writeFolder(pathFolder)

    return fs.writeFileSync(path, content)
  }

  export function joinPaths(...paths: string[]): string {
    return join(...paths)
  }

  export function createReadStream(path: string): fs.ReadStream {
    return fs.createReadStream(path)
  }

  export function buildTemporaryPath(path: string): string {
    const pathTemporary = Path.join(os.tmpdir(), 'marblism-tmp', path)
    return pathTemporary
  }

  export function fromArrayBufferToReadable(
    arrayBuffer: ArrayBuffer,
  ): Readable {
    let buffer = Buffer.from(arrayBuffer)

    const readableStream = new Readable({
      read() {
        this.push(buffer) // Push the buffer to the stream
        this.push(null) // Indicate the end of the stream
      },
    })

    return readableStream
  }

  export async function createReadStreamFromArrayBuffer(
    arrayBuffer: ArrayBuffer,
    filename: string,
  ) {
    const path = buildTemporaryPath(filename)

    const pathFolder = path.split('/').slice(0, -1).join('/')

    deleteFolder(pathFolder)

    writeFolder(pathFolder)

    fs.writeFileSync(path, Buffer.from(arrayBuffer))

    return fs.createReadStream(path)
  }

  export async function deleteFile(path: string): Promise<void> {
    fs.unlinkSync(path)
  }

  export function deleteFolder(path: string): void {
    try {
      fs.rmdirSync(path, { recursive: true })
    } catch (error) {
      // ignore
    }
  }
}
