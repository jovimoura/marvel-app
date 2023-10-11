# Marvel Fans🚀

Consiste em um App feito com React Native e Firebase

<br />

```
Project                 marvel-app
Application Identifier  com.jovimoura.marvelapp

Push Notifications (FCM)  
  None assigned yet

Google Service Account Key For Submissions  
  None assigned yet

Configuration: Build Credentials juYUaOf2Kj (Default)  
Keystore  
Type                JKS
Key Alias           6cdedf21ff33ff0d4d0578e48477f531
MD5 Fingerprint     58:0B:1A:6C:0A:00:E1:4E:33:87:07:C2:A9:F0:97:ED
SHA1 Fingerprint    5F:C1:5E:75:27:5F:DF:6D:A6:E6:9E:8C:F7:04:88:04:C5:91:26:FF
SHA256 Fingerprint  F4:BE:29:43:E5:43:2A:6A:05:D0:17:E6:58:AA:34:0C:1C:A1:7C:C9:CB:3A:7C:96:6E:B9:98:C7:E7:A3:1E:B4
Updated             34 seconds ago
```


## Como rodar

## Você vai precisar configurar o seu firebase e suas .envs:

````
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
````


````
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN as string,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID as string,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: process.env
    .EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID as string,
};
````

### Clone o proejto

```
git clone https://github.com/jovimoura/marvel-app
```

### Acesse a pasta

```
cd <name-folder>
```

### Instale as dependencias

```
npm i
```

### Start o app

```
npx expo start
```

### Port:

```
exp://192.168.0.12:19000
```

## Tecnologias e Libs:

<ul>
    <li>Expo</li>
    <li>React Native</li>
    <li>TypeScript</li>
    <li>Firebase</li>
</ul>

<br />

## Feito por:

### João Victor dos Santos Moura

### E-mail: joaovictors.mouraa@gmail.com

### Linkedin: https://www.linkedin.com/in/jovimoura10/
