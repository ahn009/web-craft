import { apiUrl } from '@/config/api';

export interface MarketplaceAgent {
  id: string;
  workflowId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  nodeCount: number;
  createdAt: string;
}

export interface MarketplaceAgentDetail extends MarketplaceAgent {
  rawJson: Record<string, unknown>;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AgentsResponse {
  agents: MarketplaceAgent[];
  pagination: PaginationInfo;
}

export interface TestResult {
  workflowName: string;
  totalNodes: number;
  executionTime: string;
  status: string;
  steps: {
    step: number;
    name: string;
    type: string;
    status: string;
    duration: string;
    output: string;
  }[];
}

export interface PurchasedAgent {
  purchaseId: string;
  purchasedAt: string;
  amount: number;
  agent: MarketplaceAgent;
}

export interface CheckoutResult {
  checkoutMode: 'demo' | 'disabled';
  purchase: {
    id: string;
    userId: string;
    agentId: string;
    amount: number;
    createdAt: string;
  };
  message: string;
}

export interface UserCredentialSafe {
  id: string;
  provider: string;
  label: string;
  lastFour?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface FetchAgentsParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
  sort?: 'price_asc' | 'price_desc' | 'name_asc' | 'newest';
}

async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(apiUrl(endpoint), options);
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(json?.error || `API error: ${res.status} ${res.statusText}`);
  }
  const json: ApiResponse<T> = await res.json();
  return json.data;
}

function withAuth(token: string, options: RequestInit = {}): RequestInit {
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };
}

export async function fetchAgents(params: FetchAgentsParams = {}): Promise<AgentsResponse> {
  const searchParams = new URLSearchParams();
  if (params.page) searchParams.set('page', String(params.page));
  if (params.limit) searchParams.set('limit', String(params.limit));
  if (params.search) searchParams.set('search', params.search);
  if (params.category) searchParams.set('category', params.category);
  if (params.tag) searchParams.set('tag', params.tag);
  if (params.sort) searchParams.set('sort', params.sort);

  const qs = searchParams.toString();
  return apiFetch<AgentsResponse>(`/api/agents${qs ? `?${qs}` : ''}`);
}

export async function fetchAgentById(id: string): Promise<MarketplaceAgentDetail> {
  return apiFetch<MarketplaceAgentDetail>(`/api/agents/${id}`);
}

export async function fetchCategories(): Promise<string[]> {
  return apiFetch<string[]>('/api/agents/categories');
}

export async function testAgent(id: string): Promise<TestResult> {
  return apiFetch<TestResult>(`/api/agents/${id}/test`, { method: 'POST' });
}

export async function checkoutAgent(agentId: string, token: string): Promise<CheckoutResult> {
  return apiFetch<CheckoutResult>(`/api/checkout/${agentId}`, withAuth(token, { method: 'POST' }));
}

export async function fetchMyAgents(token: string): Promise<PurchasedAgent[]> {
  return apiFetch<PurchasedAgent[]>('/api/my-agents', withAuth(token));
}

export async function downloadAgentWorkflow(agentId: string, token: string): Promise<Blob> {
  const res = await fetch(apiUrl(`/api/agents/${agentId}/download`), withAuth(token));
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    throw new Error(json?.error || `API error: ${res.status} ${res.statusText}`);
  }
  return res.blob();
}

export async function fetchCredentials(token: string): Promise<UserCredentialSafe[]> {
  return apiFetch<UserCredentialSafe[]>('/api/credentials', withAuth(token));
}

export async function createCredential(
  token: string,
  input: { provider: string; label: string; secret: string }
): Promise<UserCredentialSafe> {
  return apiFetch<UserCredentialSafe>('/api/credentials', withAuth(token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }));
}

export async function updateCredential(
  token: string,
  credentialId: string,
  input: { provider?: string; label?: string; secret?: string }
): Promise<UserCredentialSafe> {
  return apiFetch<UserCredentialSafe>(`/api/credentials/${credentialId}`, withAuth(token, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  }));
}

export async function deleteCredential(token: string, credentialId: string): Promise<{ deleted: boolean }> {
  return apiFetch<{ deleted: boolean }>(`/api/credentials/${credentialId}`, withAuth(token, { method: 'DELETE' }));
}

export async function registerUser(email: string, password: string, name: string) {
  return apiFetch<{ user: { id: string; email: string; name: string }; message: string }>('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
}

export async function loginUser(email: string, password: string) {
  return apiFetch<{ user: { id: string; email: string; name: string }; token: string }>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}

export async function verifyEmail(token: string) {
  return apiFetch<{ email: string; name: string; message: string }>('/api/auth/verify-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
}

export async function forgotPassword(email: string) {
  return apiFetch<{ message: string }>('/api/auth/forgot-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}

export async function resetPassword(token: string, password: string) {
  return apiFetch<{ message: string }>('/api/auth/reset-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });
}

export async function resendVerification(email: string) {
  return apiFetch<{ message: string }>('/api/auth/resend-verification', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}
