/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  // const admin = require("firebase-admin");

  const serviceAccount = {
    type: 'service_account',
    project_id: 'motor-844f4',
    private_key_id: '8669b108bca993585335f81815a548e3cb7818f5',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCJF3RcAU48DmSd\nhBuz34inhXAbmdgEg5R6diWPM/f+I4UHcNaV89pm7Q7QoUg9axqTGiv+N7fsXZRr\nOewly9O8VYb/9JTTnuwB0NYuRw/oQ91l3fmQCskMBfjmtmQlfDUdVnqthV8wmNel\nN8mCN7mv94YGiXVmxB3wp7e+qWRGRswkqotIdld0NZItyr015J66sO+9alZDO7or\nvWJjL58LSNjY47r8x0JTPOpz5hMWw6EpZhvLZqqIEczN+nI8T6cYSJH0C8vOw/VG\nqzyPsoO/7QDu6c1BkiZ+YIYalQAjmdCjp8ZmvBDwJ3R/A4BPCq4eTEw0Qx7D8ZWf\nmLMJuhOLAgMBAAECgf8PLDQJ+sWt3+nthQbhNtw+WNu6Mky2My87s9fJrEwbfyg5\n/+3AAD0r0bt8sQejGeIsZbkjabHxdxSgyXMEETWzTRlOkBiTU1jLhVGEeFj1Bo3P\nuGw72ksQtEMtRa0lI5oSpSpECil+4hZRMttv42Wpvrtr/cqrP7QQmSoSRVfTxINZ\ns4c7K/Afd6lvSmWcQxHaHqNd2DSqQq8dejqqVK6sAmlr54qaWbG6EBNO5h0k6jAh\nDiLr4I+vicJKcibL7mjo3xiUiFfVQ2HeAS/KNmHVJTr+0TId1aHBfHsfswROB9fY\n6PDff2JM3LmWIvFvcff8M0dgcZN92eczntn5v3kCgYEAvwqp41MeJ5AHaqtN74v4\n9QgB1k8iCCEvjMImid2obo11gHW7gZpoOX2byrAKImlIyLffRkA2Y+Ug1RRQKr8u\ng/MtV5fbdbRv+YaVGwVNwAhg/hxnO1lqPDnzszoRQdP3ioRDmM6pEQkZVhLkxTRX\n9ZdPG8diEDZt6lt0Yd9Ab60CgYEAt7StbFVrvctvWJT80ZHlhIbOz8RGJWMbF/Kr\n1Dgvt/8a3wj1W/Pp5wH9Q5DkLIYRcaWKdWDmpPBZX6vEZm1SeOlXaXqmfPa7cwrl\ndLb5zFhtUt4gd2ZgZnCIzV1hV9/FFAaENZQcuXJiOHxuRoCZ/Ovcr7quSFx6FDNd\nD4t1lxcCgYB4xa4G9ynOCwCVT7ySXqPBjBFVQWubRheAXdDtQULUuPr6ffNPCKUx\nCxZtOYL+pB6OPaeaCsgXuOdbrV7M11X5tscIZAkqTSqozYr/rQetCd7/ZkdgvrMp\nZd2JhYEZY35PhDQTqzo4ec8ZmhIkFWYx7Tjmr9Jvu2kbSju2D+P1dQKBgG9fRlSL\nZQpnr1WQ3cVgIjm6UN99Ktm3v9FA+hNrDOML8gqNr9LTiVbXyeeQjATCMwknR03q\nNWqBnG14AVXnqTxMmwYDqbPREcupK3sbA05zvbOjnyNEGeWBDC8VEdLogt6lJLom\n1VNImWuNZH2xsam4hM606rxL9GcSzLSD5AJ5AoGAOdDD4EmCj+h5xpYHMcSKvqR8\nBavrwPnBZAHsZHF26yS5rp0nyUus0BQqa9VuMA9RvjRBB4iKqHi4NzsWIMkpYpDN\nrX6DFqe5Wlj0QwLD4v4ylSPtz3QzlKgeZuz+RKd/whezXMqqR0ghrcGK+n/pRyT1\n3faL1VlUB9zohsfFArw=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-ifzz5@motor-844f4.iam.gserviceaccount.com',
    client_id: '108046989508811662165',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ifzz5%40motor-844f4.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com',
  };
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    storageBucket: 'gs://motor-844f4.appspot.com',
  });
  await app.listen(3000);
}
bootstrap();

// rồi
