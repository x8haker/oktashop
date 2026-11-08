"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db, firebaseReady } from "./firebase";

/** Профиль покупателя в Firestore: users/{uid} */
export interface UserProfile {
  name: string;
  phone: string;
  email: string;
}

interface AuthCtx {
  user: User | null;
  profile: UserProfile | null;
  /** true, пока не известно, залогинен ли пользователь (первый рендер). */
  loading: boolean;
  /** Конфиг Firebase не заполнен — аутентификация выключена. */
  ready: boolean;
  /** Письмо для подтверждения email ещё не отправлено/не пройдено. */
  needsVerification: boolean;
  /** Повторно отправить письмо «Подтвердите почту». */
  sendVerification: () => Promise<void>;
  register: (
    email: string,
    password: string,
    name: string,
    phone: string
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx | null>(null);

/** Перевод кодов ошибок Firebase на человеческий русский. */
function ruError(e: unknown): string {
  const code = (e as { code?: string })?.code ?? "";
  switch (code) {
    case "auth/email-already-in-use":
      return "Этот email уже зарегистрирован";
    case "auth/invalid-email":
      return "Некорректный email";
    case "auth/weak-password":
      return "Пароль слишком простой (минимум 6 символов)";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Неверный email или пароль";
    case "auth/too-many-requests":
      return "Слишком много попыток — попробуйте позже";
    case "auth/network-request-failed":
      return "Нет связи с сервером — проверьте интернет";
    default:
      return "Не удалось выполнить операцию";
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseReady || !auth) {
      setLoading(false);
      return;
    }
    return onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u && db) {
        try {
          const snap = await getDoc(doc(db, "users", u.uid));
          setProfile(
            snap.exists()
              ? (snap.data() as UserProfile)
              : { name: u.displayName ?? "", phone: "", email: u.email ?? "" }
          );
        } catch {
          setProfile({
            name: u.displayName ?? "",
            phone: "",
            email: u.email ?? "",
          });
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
  }, []);

  const register = useCallback(
    async (email: string, password: string, name: string, phone: string) => {
      if (!auth || !db) throw new Error("auth disabled");
      try {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
        const data: UserProfile = { name, phone, email };
        await setDoc(
          doc(db, "users", cred.user.uid),
          { ...data, createdAt: serverTimestamp() },
          { merge: true }
        );
        setProfile(data);
        // Письмо «Подтвердите почту» — фоном, не блокируем регистрацию.
        sendEmailVerification(cred.user).catch(() => {});
      } catch (e) {
        throw new Error(ruError(e));
      }
    },
    []
  );

  const sendVerification = useCallback(async () => {
    if (!auth?.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser);
    } catch {
      /* письмо не ушло — повторим позже */
    }
  }, []);

  // Клик по ссылке из письма не перезагружает страницу сам —
  // перечитываем пользователя при возврате на вкладку.
  useEffect(() => {
    if (!auth || !user || user.emailVerified) return;
    const a = auth;
    const refresh = () => a.currentUser?.reload().then(() => setUser(a.currentUser!));
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [user]);

  const login = useCallback(async (email: string, password: string) => {
    if (!auth) throw new Error("auth disabled");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      throw new Error(ruError(e));
    }
  }, []);

  const logout = useCallback(async () => {
    if (!auth) return;
    await signOut(auth);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      profile,
      loading,
      ready: firebaseReady,
      needsVerification: Boolean(user && !user.emailVerified),
      sendVerification,
      register,
      login,
      logout,
    }),
    [user, profile, loading, sendVerification, register, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
