import { BadRequestException, Injectable } from '@nestjs/common';

import { supabase } from 'src/supabase/supabase.client';

import { HttpService } from '@nestjs/axios';


@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}
   async sendPasswordChangeEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://twentyheim.com.br/reset-password' }	);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
  async changePassword(password: string, token: string) {
    console.log('password >>>>>', password);
    try {
    const response = this.httpService.post('https://admin.twentyheim.com.br/auth/v1/user', {
      password,
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': process.env.SERVICE_ROLE_KEY,
        'Content-Type': 'application/json',
        }
      })
      console.log('response >>>>>', response);
      return { message: 'senha mudada com sucesso' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
