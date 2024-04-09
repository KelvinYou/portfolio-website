interface ApiResponse {
  data: any;
  status: number;
  message: string;
  [key: string]: any;
}

export const callApi = async (
  endpoint: string,
  method: string = 'GET',
  body: object | null = null
): Promise<ApiResponse> => {
  const baseUrl: string = '/api'; // or use process.env.BASE_URL for external API

  try {
    const response: Response = await fetch(`${baseUrl}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    throw new Error(`API error: ${(error as Error).message}`);
  }
};
