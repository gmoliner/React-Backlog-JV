import * as React from "react";
import { useState, useEffect, useContext } from "react";

import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";

const BacklogContext = React.createContext([]);

const initialState = []

/**
 * BacklogProvider: fonction permettant de gérer le contexte lié au backlog
 */
export function BacklogProvider({ children }) {
  const [backlog, setBacklog] = useState(() => getLocalStorage("backlog", initialState))

  /**
   * addGame: fonction permettant d'ajouter un jeu dans son backlog
   * @param {*} game 
   * @returns 
   */
  const addGame = (game)  => {
    return new Promise((res) => {
      // lorsqu'on ajoute la première fois le jeu au backlog, on définit le statut sur "à faire"
      game['status'] = process.env.REACT_APP_BACKLOG_DEFAULT_STATUS

      setBacklog(result => [...result, game]);
      res();
    });
  } 

  /**
   * removeGame: fonction permettant de supprimer un jeu de son backlog
   * @param {*} game
   * @returns 
   */
  const removeGame = (game)  => {
    return new Promise((res) => {
      const backlogCopy = backlog.filter((item) => item.id !== game.id);
      setBacklog(backlogCopy)
      res();
    });
  }   

  /**
   * modifyStatus: pour un jeu présent dans le backlog, fonction permettant de modifier l'état du jeu
   * @param {*} game 
   * @param {*} status 
   * @returns 
   */
  const modifyStatus = (game, status) => {
    return new Promise((res) => {
      const backlogCopy = backlog.slice()
      const gameIndex = backlog.findIndex(res => res.id === game.id)
      const gameCopy = backlogCopy[gameIndex]
      gameCopy['status'] = status
      backlogCopy[gameIndex] = gameCopy
    
      setBacklog(backlogCopy);
      res();
    })
  }

  // on modifie le LS à chaque changement sur le state "backlog"
  useEffect(() => {
    setLocalStorage("backlog", backlog)
  }, [backlog])

  return (
    <BacklogContext.Provider 
      value={{
        backlog,
        addGame, 
        removeGame,
        modifyStatus
      }}
    >
      {children}
    </BacklogContext.Provider>
  ) 
}

export default function useBacklog() {
  return useContext(BacklogContext);
}