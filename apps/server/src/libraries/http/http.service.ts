import { HttpService as HttpServiceAxios } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { AxiosError, AxiosRequestConfig } from 'axios'
import { catchError, firstValueFrom } from 'rxjs'

@Injectable()
export class HttpService {
  private options: AxiosRequestConfig<any> = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }

  constructor(private readonly httpService: HttpServiceAxios) {}

  async post<ReturnType>(
    url: string,
    body: Record<string, string>,
  ): Promise<ReturnType> {
    const response = await firstValueFrom(
      this.httpService.post<ReturnType>(url, body, this.options).pipe(
        catchError((error: AxiosError) => {
          throw error
        }),
      ),
    )

    return response.data
  }

  async download(url: string): Promise<ArrayBuffer> {
    const response = await firstValueFrom(
      this.httpService
        .get<ArrayBuffer>(url, { responseType: 'arraybuffer' })
        .pipe(
          catchError((error: AxiosError) => {
            throw error
          }),
        ),
    )

    return response.data
  }
}
