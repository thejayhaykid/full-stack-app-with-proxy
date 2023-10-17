"use client";

import { useEffect, useState } from "react";

export interface User {
  email: string;
  name: string | null;
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>User</h1>
          <p>{user?.name}</p>
        </div>
      )}
    </main>
  );
}
