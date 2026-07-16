type N8nClientOptions = {
  baseUrl?: string;
  apiKey?: string;
  timeoutMs: number;
};

type N8nCredentialInput = {
  name: string;
  type: string;
  data: Record<string, unknown>;
};

type N8nWorkflowInput = Record<string, unknown>;

export function isN8nConfigured(options: Pick<N8nClientOptions, "baseUrl" | "apiKey">) {
  return Boolean(options.baseUrl && options.apiKey);
}

export class N8nClient {
  private baseUrl: string;
  private apiKey: string;
  private timeoutMs: number;

  constructor(options: N8nClientOptions) {
    if (!isN8nConfigured(options)) {
      throw new Error("N8N_BASE_URL and N8N_API_KEY are required");
    }

    this.baseUrl = options.baseUrl!.replace(/\/+$/, "");
    this.apiKey = options.apiKey!;
    this.timeoutMs = options.timeoutMs;
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          "X-N8N-API-KEY": this.apiKey,
          ...init.headers,
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`n8n API error ${res.status}: ${text || res.statusText}`);
      }

      return (await res.json()) as T;
    } finally {
      clearTimeout(timeout);
    }
  }

  createCredential(input: N8nCredentialInput) {
    return this.request<{ id: string; name: string }>("/api/v1/credentials", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  createWorkflow(input: N8nWorkflowInput) {
    return this.request<{ id: string; name?: string }>("/api/v1/workflows", {
      method: "POST",
      body: JSON.stringify(input),
    });
  }

  executeWorkflow(workflowId: string, input: Record<string, unknown>) {
    return this.request<{ id?: string; data?: unknown; finished?: boolean }>(`/api/v1/workflows/${workflowId}/execute`, {
      method: "POST",
      body: JSON.stringify({ input }),
    });
  }
}
