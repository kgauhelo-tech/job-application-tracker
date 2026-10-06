import { createContext, useState, type ReactNode } from "react";
import { Navigate } from "react-router";

type User = {
  userID: number;
  username: string;
  password: string;
  records: RecordItem[];
};

type RecordItem = {
  id: number;
  company: string;
  role: string;
  duties: string;
  dateApplied: string;
  status: string;
};

type userContextType = {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
};

export const UserContext = createContext<userContextType>(
  {} as userContextType,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    //allowing the current user to persist
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username: string, password: string) => {
    const res = await fetch("http://localhost:3001/users");
    const users: User[] = await res.json();

    const found = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (found) {
      setCurrentUser(found);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const register = async (username: string, password: string) => {
    const res = await fetch(`http://localhost:3001/users?username=${username}`);
    const existing = await res.json();

    if (existing.length > 0) {
      return false;
    }

    const newUser: User = {
      userID: Date.now(),
      username: username,
      password: password,
      records: [],
    };

    await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    <Navigate to="/login" />;

    return true;
  };

  return (
    <>
      <UserContext.Provider value={{ currentUser, login, register, logout }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
