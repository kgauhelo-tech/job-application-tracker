import { createContext, useState, type ReactNode } from "react";

export type User = {
  id: string;
  userID: number;
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
    const res = await fetch("http://localhost:3000/users");
    const data = await res.json();

    // Safely extract the array whether server returns [...] or { users: [...] }
    const users: User[] = Array.isArray(data) ? data : data.users || [];

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
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    showMessage("Logged out successfully!");
  };

  const register = async (username: string, password: string) => {
    const res = await fetch(`http://localhost:3000/users?username=${username}`);
    const data = await res.json();

    // Handle array or wrapped object response for query filtering
    const existing = Array.isArray(data) ? data : data.users || [];

    if (existing.length > 0) {
      showMessage("Username already taken. Please try another.");
      return false;
    }

    const userId = Date.now();

    const newUser: User = {
      id: String(userId),
      userID: userId,
      username,
      password,
      records: [],
    };

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    showMessage("Account registered successfully!");
    return true;
  };

  const isLoggedIn = () => {
    return !!currentUser;
  };

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
      await fetch(`http://localhost:3000/users/${currentUser.id}`, {
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
      await fetch(`http://localhost:3000/users/${currentUser.id}`, {
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
      await fetch(`http://localhost:3000/users/${currentUser.id}`, {
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
