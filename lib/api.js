const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function api(endpoint, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    ...rest
  } = options;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    ...rest,
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || "Something went wrong");
  }

  return data;
}

export default api;