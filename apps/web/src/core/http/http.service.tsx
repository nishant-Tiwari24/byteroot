import { HttpClient } from './internal/http.client'

export class HttpService {
  static api = new HttpClient()
}
