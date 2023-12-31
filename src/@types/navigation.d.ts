interface LoginPageParams {
  type: "signin" | "signup";
}

interface PerfilPageParams {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description?: string | null | undefined;
  amountStories?: number | undefined;
  amountEvents?: number | undefined;
  amountSeries?: number | undefined;
  amountComics?: number | undefined;
}

interface SeeAllPageParams {
  type: "comics" | "heroes" | "series" | "events";
}

interface InfoPageParams {
  id: number;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  description?: string | null | undefined;
  type?: string | null | undefined;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      search: string;
      login: LoginPageParams | undefined;
      forgotPassword: undefined;
      perfil: PerfilPageParams;
      info: InfoPageParams;
      seeall: SeeAllPageParams
    }
  }
}
