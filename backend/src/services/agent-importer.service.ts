import { PrismaClient } from "@prisma/client";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import { getAgentsDir } from "./zip-extractor.service.js";

const CATEGORY_MAP: Record<string, string> = {
  slack: "Communication",
  discord: "Communication",
  telegram: "Communication",
  email: "Communication",
  gmail: "Communication",
  "microsoft-teams": "Communication",
  postgres: "Data",
  mysql: "Data",
  mongodb: "Data",
  redis: "Data",
  "google-sheets": "Data",
  airtable: "Data",
  notion: "Business",
  trello: "Business",
  asana: "Business",
  jira: "Business",
  salesforce: "Business",
  hubspot: "Business",
  openai: "AI",
  "langchain": "AI",
  "hugging-face": "AI",
  anthropic: "AI",
  github: "Development",
  gitlab: "Development",
  docker: "Development",
  aws: "Cloud",
  "google-cloud": "Cloud",
  azure: "Cloud",
  stripe: "Finance",
  paypal: "Finance",
  shopify: "E-Commerce",
  woocommerce: "E-Commerce",
  twitter: "Social Media",
  facebook: "Social Media",
  instagram: "Social Media",
  linkedin: "Social Media",
};

function deriveCategory(nodes: Array<{ type?: string }>): string {
  for (const node of nodes) {
    const type = (node.type ?? "").toLowerCase();
    for (const [key, category] of Object.entries(CATEGORY_MAP)) {
      if (type.includes(key)) return category;
    }
  }
  return "Utility";
}

function extractTags(nodes: Array<{ type?: string }>): string[] {
  const tags = new Set<string>();
  for (const node of nodes) {
    const type = node.type ?? "";
    const clean = type.replace(/^n8n-nodes-base\./, "").replace(/([A-Z])/g, " $1").trim();
    if (clean) tags.add(clean);
  }
  return Array.from(tags).slice(0, 10);
}

function randomPrice(): number {
  return Math.round((Math.random() * 94 + 5) * 100) / 100;
}

interface WorkflowJson {
  id?: string | number;
  name?: string;
  nodes?: Array<{ type?: string; name?: string }>;
  tags?: Array<{ name?: string }>;
  [key: string]: unknown;
}

export async function importAgents(prisma: PrismaClient): Promise<number> {
  const agentsDir = getAgentsDir();
  const files = readdirSync(agentsDir).filter((f) => f.endsWith(".json"));

  let imported = 0;
  const BATCH_SIZE = 50;

  for (let i = 0; i < files.length; i += BATCH_SIZE) {
    const batch = files.slice(i, i + BATCH_SIZE);
    const agents: Array<{
      workflowId: string;
      name: string;
      description: string;
      category: string;
      price: number;
      tags: string;
      nodeCount: number;
      rawJson: string;
    }> = [];

    for (const file of batch) {
      try {
        const raw = readFileSync(path.join(agentsDir, file), "utf-8");
        const workflow: WorkflowJson = JSON.parse(raw);
        const nodes = workflow.nodes ?? [];
        const workflowId = String(workflow.id ?? file.replace(".json", ""));
        const name = workflow.name ?? file.replace(".json", "").replace(/[-_]/g, " ");
        const description = `Automated workflow with ${nodes.length} nodes. ${
          nodes.length > 0
            ? `Includes: ${nodes.slice(0, 3).map((n) => n.name ?? n.type).join(", ")}.`
            : ""
        }`;
        const category = deriveCategory(nodes);
        const tags = extractTags(nodes);
        const workflowTags = (workflow.tags ?? []).map((t) => t.name).filter(Boolean) as string[];

        agents.push({
          workflowId,
          name,
          description,
          category,
          price: randomPrice(),
          tags: JSON.stringify([...new Set([...tags, ...workflowTags])].slice(0, 15)),
          nodeCount: nodes.length,
          rawJson: raw,
        });
      } catch {
        // Skip invalid JSON files
      }
    }

    if (agents.length > 0) {
      const result = await prisma.agent.createMany({
        data: agents,
        skipDuplicates: true,
      });
      imported += result.count;
    }
  }

  return imported;
}
