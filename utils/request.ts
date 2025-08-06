export async function fetcher<T = Record<string, unknown>>(
  url: string,
  host = process.env.HOST_NAME
): Promise<T> {
  try {
    const response = await fetch(`${host}${url}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Request failed with: ${(error as Error).message}`);

    return {} as T;
    // throw new Error(`Request failed with: ${(error as Error).message}`);
  }
}
