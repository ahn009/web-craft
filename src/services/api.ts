const BASE_URL = 'http://localhost:3000';

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

interface ApiResponse<T> {
  success: boolean;
  data: T;
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
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const json: ApiResponse<T> = await res.json();
  return json.data;
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

export async function registerUser(email: string, password: string, name: string) {
  return apiFetch<{ token: string }>('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });
}

export async function loginUser(email: string, password: string) {
  return apiFetch<{ token: string }>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
}
