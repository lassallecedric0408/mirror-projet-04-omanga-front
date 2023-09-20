import { Reducer } from "react";
import { OmangaActions } from "./OmangaActions";
import { OmangaState } from "./OmangaState";

const OmangaReducer: Reducer<OmangaState, OmangaActions> = (prevState, action) => {
  const newState = { ...prevState };
  switch (action.type) {
    // case 'SET_CIRCUIT_MUST_HAVE_COMMENT': {
    //   newState.selectedOutcome = action.outcome;
    //   newState.circuitMustHaveComment = action.commentRequired;
    //   break;
    // }
    default: {
      throw new Error(`invalid action:`);
    }
  }

  return newState;
};

export { OmangaReducer };
