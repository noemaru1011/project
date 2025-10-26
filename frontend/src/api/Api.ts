const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
export async function Api<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} ${errorText}`);
  }

  return res.json() as Promise<T>;
}
