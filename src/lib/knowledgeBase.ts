import type { AIResult, KnowledgePermissionState, KnowledgeSourceId, MemoryDay, MemoryEntryType } from "../types";

export interface LifeOSKnowledgeQuery {
  prompt: string;
  sources: KnowledgeSourceId[];
}

export interface KnowledgeIndexPayload {
  source: KnowledgeSourceId;
  granted: boolean;
  detail?: string;
}

export function buildKnowledgeIndex(states: KnowledgePermissionState[]): KnowledgeIndexPayload[] {
  return states.map((state) => ({
    source: state.id,
    granted: state.status === "authorized",
    detail: state.detail
  }));
}

export async function queryLifeOSKnowledge(query: LifeOSKnowledgeQuery): Promise<AIResult | null> {
  const response = await fetch("/api/lifeos/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(query)
  });

  if (!response.ok) return null;
  return response.json();
}

export async function syncKnowledgePermissions(states: KnowledgePermissionState[]) {
  const payload = buildKnowledgeIndex(states);
  await fetch("/api/lifeos/permissions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ sources: payload })
  });
}

export async function fetchMemoryMonth(month: string): Promise<MemoryDay[] | null> {
  const response = await fetch(`/api/memory/month?month=${encodeURIComponent(month)}`);
  if (!response.ok) return null;
  return response.json();
}

export async function queryMemoryDatabase(input: {
  query: string;
  date?: string;
  types?: MemoryEntryType[];
}): Promise<AIResult | null> {
  const response = await fetch("/api/memory/query", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  if (!response.ok) return null;
  return response.json();
}
