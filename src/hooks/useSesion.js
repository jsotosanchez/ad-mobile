import {useState, useMemo} from 'react';
/**
 * @typedef {{
    logear: (s: Sesion) => void;
    deslogear: () => void;
    estaLogeado: () => boolean;
  }} SesionStateActions 
  
  @typedef{{
    documento: string;
    pass: string;
  }} LogIn

@typedef{{
  id?: number;
  documento?: string; 
}} Sesion

  @typedef {{ sesion: Sesion, actions: SesionStateActions}} SesionState
 */

/**
 * @type {SesionState}
 */
export const initialState = {
  sesion: {},
  actions: {
    logear: () => {},
    deslogear: () => {},
    estaLogeado: () => false,
  },
};

/**
 *
 * @param {Sesion} initialValue
 * @returns {SesionState} context
 */
export function useSesion(initialValue) {
  const [sesion, updater] = useState(initialValue);

  const actions = useMemo(() => {
    /**
     *
     * @param {Sesion} t
     * @returns void
     */

    const logear = t => updater(t);

    /**
     * @returns void
     */
    const deslogear = () => updater(undefined);

    /**
     * @returns boolean
     */
    const estaLogeado = () => {
      console.log('sesion: ', sesion);
      return sesion.id !== undefined;
    };

    return {
      logear,
      deslogear,
      estaLogeado,
    };
  }, [updater]);

  return {sesion, actions};
}
