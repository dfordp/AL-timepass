// src/redis/redis.service.ts
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URI);
  }

  async setValuePair(key: string, val: object): Promise<void> {
    try {
      await this.redis.set(key, JSON.stringify(val), 'EX', 600);
      console.log('Value set successfully');
    } catch (error) {
      console.error('Error setting value:', error);
    }
  }

  async getValuePair(key: string): Promise<any> {
    try {
      const value = await this.redis.get(key);
      const obj = value ? JSON.parse(value) : null;
      console.log('Value retrieved successfully');
      return obj;
    } catch (error) {
      console.error('Error retrieving value:', error);
      return null;
    }
  }
}
