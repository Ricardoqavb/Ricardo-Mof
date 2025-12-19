export interface VisualPhysicsObject {
  liquid?: string;
  glassware?: string;
  condensation?: string;
  packaging?: string;
  rim?: string;
  bottle?: string;
  viscosity?: string;
  sediment?: string;
  props?: string;
  environment?: string;
  label?: string;
  [key: string]: string | undefined;
}

export type VisualPhysics = string | VisualPhysicsObject;

export interface Product {
  name: string;
  visual_physics: VisualPhysics;
  sensory: string; // Sometimes simple string, complex in theory but string in provided JSON mostly
  narrative: string;
  lighting?: string;
}

export interface Collection {
  name: string;
  tier: string;
  vibe: string;
  products: Product[];
}

export interface BrandDefinition {
  signature: string;
  archetype: string;
  visual_identity: string;
  values: string[];
  territories: string[];
  tone_of_voice?: string | string[]; // Can be array in Fonseca
  brand_statement?: string; // Fonseca specific
  brand_positioning?: string[];
  value_proposition?: string[];
  reference_landscape?: Record<string, string>;
  brand_personality?: string[];
  wine_style?: string[];
  range_focus?: string[];
  differentiators?: string[];
  primary_target?: string[];
  lifestyle_target?: string[];
  language_tone_of_voice?: string[];
  key_markets?: string[];
  estates?: Record<string, string>;
}

export interface Brand {
  brand_name: string;
  business_unit: string;
  brand_definition: BrandDefinition;
  collections: Collection[];
}

export interface Taxonomies {
  business_units: string[];
  tiers: string[];
  archetypes: string[];
}

export interface PromptFramework {
  goal: string;
  global_guardrails: string[];
  negative_prompt_default: string;
}

export interface MasterDB {
  schema_version: string;
  generated_at: string;
  purpose: string;
  taxonomies: Taxonomies;
  prompt_framework: PromptFramework;
  brands: Brand[];
}
