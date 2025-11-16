import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { supabase } from 'src/supabase/supabase.client';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
   async sendPasswordChangeEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://twentyheim.com.br/reset-password' }	);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
  async changePassword(password: string, token: string, refreshToken: string) {
    
    
    

    await supabase.auth.setSession({ access_token: token, refresh_token: token }	);
   
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
}
