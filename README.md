# hanlight-backend-api

## 구동 시 필요사항

- 명령어

  > npm install  
  > npm run start

- config/database.json

  > "host": "아이피",  
  > "database": "hanlight",  
  > "username": "root",  
  > "password": "rootroot"

- .env

  > NODE_ENV= production | development  
  > PORT= number  
  > TOKEN_SECRET= string

- config/encryption.json

  > "algorithm": "encryption algorithm",  
  > "saltSize": number,  
  > "iteration": number,  
  > "encryptionSize": number

- config/facebook.json

  > "version": "version",  
  > "appId": "app id",  
  > "appSecret": "app secret"

- config/awsConfig.json
  > "accessKeyId": "string",  
  > "secretAccessKey": "string",  
  > "region": "ap-northeast-2"
