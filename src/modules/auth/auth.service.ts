import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { supabase } from 'src/supabase/supabase.client';
import { createClient } from '@supabase/supabase-js';
import { SupabaseRestService } from 'src/supabaseRestService/supabase-rest.service';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseRestService: SupabaseRestService) {}
   async sendPasswordChangeEmail(email: string) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: 'https://twentyheim.com.br/reset-password' }	);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return data;
  }
  async changePassword(password: string, token: string) {
    
    try {	
      this.supabaseRestService.changePassword(password, token);
      return { message: 'Password changed successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
