import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class FileService {
  constructor(private config: ConfigService) {}
  async saveFile() {
    try {
      const response = await axios.get(
        'https://api.newscatcherapi.com/v2/search?q=crypto&lang=en',
        {
          headers: {
            'x-api-key': this.config.get('NEWS_APIKEY'),
          },
        },
      );
      const data = JSON.stringify(response.data);
      fs.writeFileSync('news.txt', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async getFile() {
    try {
      const data = fs.readFileSync('news.txt', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw error;
    }
  }
}
