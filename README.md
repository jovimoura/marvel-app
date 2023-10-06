# Marvel Fans🚀

Consiste em um App feito com React Native e Firebase

<br />

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
