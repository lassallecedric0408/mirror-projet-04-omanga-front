import { type ReactNode, createContext, useContext, useReducer } from "react";
import { OmangaReducer } from "../states/OmangaReducer";
import { OmangaDefaultState, type OmangaState } from "../states/OmangaState";
import { type OmangaActions } from "../states/OmangaActions";

type OmangaContextProps = {
  OmangaState: OmangaState;
  dispatch: React.Dispatch<OmangaActions>;
};

type OmangaProviderProps = {
  children: ReactNode;
};

const OmangaContext = createContext<OmangaContextProps | undefined>(undefined);

const useOmangaContex = (): OmangaContextProps => {
  const context = useContext(OmangaContext);
  if (!context) {
    throw new Error("Error with OmangaContex");
  } else {
    return context;
  }
};

const OmangaProvider: React.FC<OmangaProviderProps> = ({ children }) => {
  const initialOmangaState = OmangaDefaultState();
  const [OmangaState, dispatch] = useReducer(OmangaReducer, initialOmangaState);

  return (
    <OmangaContext.Provider
      value={{
        OmangaState,
        dispatch,
      }}
    >
      {children}
    </OmangaContext.Provider>
  );
};
export { useOmangaContex, OmangaProvider };
