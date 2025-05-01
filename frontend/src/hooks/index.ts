import { createContext, useContext } from "react";
import { Member } from "../types";

type AppContextType = {
  members: Member[];
  addMember: (member: Member) => void;
  updateMember: (member: Member) => void;
  deleteMember: (id: string) => void;
  currentMember: Member | null;
  setCurrentMember: (member: Member | null) => void;
};

export const AppContext = createContext<AppContextType>({
  members: [],
  addMember: () => {},
  updateMember: () => {},
  deleteMember: () => {},
  currentMember: null,
  setCurrentMember: () => {},
});

export const useAppContext = () => useContext(AppContext);
