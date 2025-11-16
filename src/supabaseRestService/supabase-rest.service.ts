import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SupabaseRestService {
  constructor(private readonly httpService: HttpService) {}

  async changePassword(password: string, token: string) {
    return this.httpService.post('https://admin.twentyheim.com.br/auth/v1/user', {
      password,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': process.env.ANON_KEY
      }
    })
  }
}