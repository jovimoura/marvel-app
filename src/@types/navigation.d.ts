interface LoginPageParams {
  type: "signin" | "signup";
}

interface PerfilPageParams {
  id: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      search: string;
      login: LoginPageParams | undefined;
      perfil: PerfilPageParams;
    }
  }
}
