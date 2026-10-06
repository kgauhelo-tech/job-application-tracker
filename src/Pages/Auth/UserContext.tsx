import { createContext, useState, type ReactNode } from "react";

const API_URL = "https://6ac55f2754a61668c5f725a7.mockapi.io/api/test/users";

export type User = {
  id: string;
  username: string;
  password: string;
  records: RecordItem[];
};

export type RecordItem = {
  id: number;
  company: string;
  role: string;
  duties: string;
  dateApplied: string;
  status: string;
};

type UserContextType = {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string) => Promise<boolean>;
  isLoggedIn: () => boolean;
  addRecord: (record: Omit<RecordItem, "id">) => Promise<boolean>;
  deleteRecord: (recordId: number) => Promise<boolean>;
  updateRecord: (updatedRecord: RecordItem) => Promise<boolean>;
  getRecords: () => RecordItem[];
  message: string | null;
  showMessage: (msg: string) => void;
  clearMessage: () => void;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const clearMessage = () => setMessage(null);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}?username=${username}`);
      const data = await res.json();

      const users: User[] = Array.isArray(data) ? data : [];
      const found = users.find(
        (user) => user.username === username && user.password === password,
      );

      if (found) {
        setCurrentUser(found);
        localStorage.setItem("currentUser", JSON.stringify(found));
        showMessage("Logged in successfully!");
        return true;
      }

      showMessage("Couldn't log in. Please try again.");
      return false;
    } catch (err) {
      console.error("Login failed:", err);
      showMessage("Error connecting to server.");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    showMessage("Logged out successfully!");
  };

  const register = async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}?username=${username}`);
      const data = await res.json();

      const existing = Array.isArray(data) ? data : [];

      if (existing.length > 0) {
        showMessage("Username already taken. Please try another.");
        return false;
      }

      // Pass user object without 'id' so MockAPI automatically generates it
      const newUser = {
        username,
        password,
        records: [],
      };

      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      showMessage("Account registered successfully!");
      return true;
    } catch (err) {
      console.error("Registration failed:", err);
      showMessage("Error connecting to server.");
      return false;
    }
  };

  const isLoggedIn = () => !!currentUser;

  const addRecord = async (newRecordData: Omit<RecordItem, "id">) => {
    if (!currentUser) return false;

    const newRecord: RecordItem = {
      ...newRecordData,
      id: Date.now(),
    };

    const updatedUser: User = {
      ...currentUser,
      records: [...currentUser.records, newRecord],
    };

    try {
      await fetch(`${API_URL}/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return true;
    } catch (err) {
      console.error("Failed to add record:", err);
      return false;
    }
  };

  const getRecords = (): RecordItem[] => {
    return currentUser ? currentUser.records : [];
  };

  const deleteRecord = async (recordId: number) => {
    if (!currentUser) return false;

    const updatedUser: User = {
      ...currentUser,
      records: currentUser.records.filter((rec) => rec.id !== recordId),
    };

    try {
      await fetch(`${API_URL}/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return true;
    } catch (err) {
      console.error("Failed to delete record:", err);
      return false;
    }
  };

  const updateRecord = async (updatedRecord: RecordItem) => {
    if (!currentUser) return false;

    const updatedUser: User = {
      ...currentUser,
      records: currentUser.records.map((rec) =>
        rec.id === updatedRecord.id ? updatedRecord : rec,
      ),
    };

    try {
      await fetch(`${API_URL}/${currentUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      setCurrentUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return true;
    } catch (err) {
      console.error("Failed to update record:", err);
      return false;
    }
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        message,
        showMessage,
        clearMessage,
        login,
        logout,
        register,
        isLoggedIn,
        addRecord,
        deleteRecord,
        updateRecord,
        getRecords,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
