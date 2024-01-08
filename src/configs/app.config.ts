import { ConfigService } from '@nestjs/config';

export interface IFirebaseConfig {
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
  authUri: string;
  tokenUri: string;
  authProviderX509CertUrl: string;
  clientX509CertUrl: string;
  universeDomain: string;
}

export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  nameDatabase: string;
}

export interface IAuthConfig {
  accessTokenSecretKey: string;
  accessTokenExpirationTime: number;
  saltRound: number;
}

export interface IMailConfig {
  host: string;
  user: string;
  password: string;
  from: string;
  timeOutOtp: number;
}

export interface IAppConfig {
  port: number;
  apiVersion: number;
  apiPrefix: string;
  product: string;
}

export interface ITwilioConfig {
  accountSid: string;
  authToken: string;
}

export class AppConfig {
  private static configService: ConfigService;
  private static instance: AppConfig;

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
      AppConfig.configService = new ConfigService();
    }

    return AppConfig.instance;
  }

  get app(): IAppConfig {
    return {
      apiPrefix: AppConfig.configService.get<string>('APP_PREFIX_API') ?? 'api',
      port: Number.parseInt(
        AppConfig.configService.get<string>('APP_PORT') ?? '3600',
      ),
      apiVersion: Number.parseInt(
        AppConfig.configService.get<string>('APP_API_VERSION') ?? '1',
      ),
      product: AppConfig.configService.get<string>('APP_ENV') ?? 'dev',
    };
  }

  get auth(): IAuthConfig {
    return {
      accessTokenSecretKey:
        AppConfig.configService.get<string>('JWT_ACCESS_TOKEN_SECRET') ?? '',

      accessTokenExpirationTime: Number.parseInt(
        AppConfig.configService.get<string>(
          'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
        ) ?? '60',
      ),
      saltRound: Number.parseInt(
        AppConfig.configService.get<string>('SALT_ROUND') ?? '1',
      ),
    };
  }

  get database(): IDatabaseConfig {
    return {
      host: AppConfig.configService.get<string>('DATABASE_HOST') ?? '127.0.0.1',
      port: AppConfig.configService.get<number>('DATABASE_PORT') ?? 27017,
      nameDatabase:
        AppConfig.configService.get<string>('DATABASE_NAME_DB') ?? 'test',
      username: AppConfig.configService.get<string>('DATABASE_USERNAME') ?? '',
      password: AppConfig.configService.get<string>('DATABASE_PASSWORD') ?? '',
    };
  }

  get mail(): IMailConfig {
    return {
      timeOutOtp: AppConfig.configService.get<number>('OPT_TIME_OUT'),
      host: AppConfig.configService.get<string>('MAIL_HOST'),
      from: AppConfig.configService.get<string>('MAIL_FROM'),
      password: AppConfig.configService.get<string>('MAIL_PASSWORD'),
      user: AppConfig.configService.get<string>('MAIL_USER'),
    };
  }

  get firebase(): IFirebaseConfig {
    return {
      projectId: AppConfig.configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKeyId: AppConfig.configService.get<string>(
        'FIREBASE_PRIVATE_KEY_ID',
      ),
      privateKey: AppConfig.configService.get<string>('FIREBASE_PRIVATE_KEY'),
      clientEmail: AppConfig.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      clientId: AppConfig.configService.get<string>('FIREBASE_CLIENT_ID'),
      authUri: AppConfig.configService.get<string>('FIREBASE_AUTH_URI'),
      tokenUri: AppConfig.configService.get<string>('FIREBASE_TOKEN_URI'),
      authProviderX509CertUrl: AppConfig.configService.get<string>(
        'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
      ),
      clientX509CertUrl: AppConfig.configService.get<string>(
        'FIREBASE_CLIENT_X509_CERT_URL',
      ),
      universeDomain: AppConfig.configService.get<string>(
        'FIREBASE_UNIVERSE_DOMAIN',
      ),
    };
  }

  get twilio(): ITwilioConfig {
    return {
      accountSid: AppConfig.configService.get<string>('TWILIO_ACCOUNT_SID'),
      authToken: AppConfig.configService.get<string>('TWILIO_AUTH_TOKEN'),
    };
  }
}
