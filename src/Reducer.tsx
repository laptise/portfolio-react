interface Context {
  hello?: boolean;
  menuView: boolean;
}
export const initialState: Context = {
  hello: true,
  menuView: false,
};

export enum ActionType {
  MENU_VIEW = "MENU_VIEW",
  ACTION_SELECT_RADIOBUTTON = "ACTION_SELECT_RADIOBUTTON",
  ACTION_CLICK_BUTTON = "ACTION_CLICK_BUTTON",
}

interface ReducerAction {
  type: ActionType;
  payload: Context;
}
export const reducer = (context: Context, action: ReducerAction) => {
  //reducer関数にincrement、increment、reset処理を書く
  //どの処理を渡すかはactionを渡すことによって判断する
  const body = action.payload;
  switch (action.type) {
    case "MENU_VIEW":
      return { ...context, menuView: body.menuView };
    default:
      return context;
  }
};
