import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { supabase } from 'src/supabase/supabase.client';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
   async sendPasswordChangeEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
  async changePassword(password: string, token: string) {
    
    const session = await supabase.auth.exchangeCodeForSession(token);
    if (session.error) {
      throw new BadRequestException(session.error.message);
    }

    const supabaseAuthInstance = createClient(process.env.SUPABASE_URL!, session.data.session?.access_token || '');
   
    const { data, error } = await supabaseAuthInstance.auth.updateUser({
      password,
    });
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
}
