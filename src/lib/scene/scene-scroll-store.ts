export type SceneScrollState = {
  servicesProgress: number;
  activeServiceIndex: number;
  isInServices: boolean;
};

const defaultState: SceneScrollState = {
  servicesProgress: 0,
  activeServiceIndex: 0,
  isInServices: false,
};

let state: SceneScrollState = { ...defaultState };
const listeners = new Set<(state: SceneScrollState) => void>();

export const sceneScrollStore = {
  getState: () => state,

  setState: (partial: Partial<SceneScrollState>) => {
    state = { ...state, ...partial };
    listeners.forEach((listener) => listener(state));
  },

  subscribe: (listener: (state: SceneScrollState) => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  reset: () => {
    state = { ...defaultState };
    listeners.forEach((listener) => listener(state));
  },
};
