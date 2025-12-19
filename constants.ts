import { MasterDB } from './types';

export const INITIAL_DB: MasterDB = {
  "schema_version": "6.0",
  "generated_at": "2025-12-18",
  "purpose": "Master Knowledge Base for Pocket Photographer AI (Gemini 3 Pro).",
  "taxonomies": {
    "business_units": ["Port Wine", "FSSW (Still & Sparkling)"],
    "tiers": ["Icon (Investment)", "Luxury (Collector)", "Premium (Connoisseur)", "Lifestyle (Everyday)"],
    "archetypes": ["Ruler", "Sage", "Creator", "Lover", "Jester", "Everyman", "Explorer", "Magician", "Innocent"]
  },
  "prompt_framework": {
    "goal": "Generate photorealistic, brand-accurate image prompts.",
    "global_guardrails": [
      "Must preserve label legibility.",
      "Must respect liquid physics (Tawny is Amber, not Red).",
      "Must respect glassware rules (No tumblers for Vintage Port).",
      "No CGI artifacts, no plastic textures, no impossible geometry."
    ],
    "negative_prompt_default": "illustration, 3d render, painting, bad anatomy, floating objects, closed bottle with poured glass, cartoon, low quality, watermark, cgi artifacts, bright neon (unless specified), plastic skin, deformed hands."
  },
  "brands": [
    {
      "brand_name": "TAYLOR'S",
      "business_unit": "Port Wine",
      "brand_definition": {
        "signature": "The Definitive Port House. The Global Benchmark.",
        "archetype": "The Sovereign (Ruler + Sage)",
        "visual_identity": "Dark Slate, Museum Lighting, Old Mahogany, Structure, Black Velvet.",
        "values": ["Permanence", "Precision", "Stewardship"],
        "territories": ["The Library", "The Gentleman's Club", "The Cellar"],
        "tone_of_voice": "Elevated, Confident, Educational."
      },
      "collections": [
        {
          "name": "The Icons (Vintage)",
          "tier": "Icon",
          "vibe": "The Vault. Power. Eternity. Chiaroscuro Lighting.",
          "products": [
            {
              "name": "Classic Vintage Port",
              "visual_physics": "Opaque Ink-Black / Pitch Black. Rim: Violet Halo. Mandatory Decanter.",
              "sensory": "Concentration, Graphite, Cassis, Violets, Granite, Massive Structure.",
              "narrative": "The Decanting Ritual: Candle flame behind neck. The Christmas Finale.",
              "lighting": "Chiaroscuro (Rembrandt). Deep shadows, gold reflections."
            },
            {
              "name": "Vargellas Vinha Velha",
              "visual_physics": "Deep Purple-Black. Special packaging (Wooden Box).",
              "sensory": "Silk, Multi-dimensional, Perfume, Rarity.",
              "narrative": "The Collector's Vault: White gloves holding the bottle.",
              "lighting": "Ethereal Light (Halo effect)."
            }
          ]
        },
        {
          "name": "The Time Capsules (Aged Tawny)",
          "tier": "Luxury",
          "vibe": "The Alchemist's Lab. Translucency. Wisdom. Backlit Glow.",
          "products": [
            {
              "name": "20 Year Old Tawny",
              "visual_physics": "Intense Amber-Gold (Jewel-like). NO Red tones. Glassware: Thin Crystal.",
              "sensory": "Dried Fig, Caramel, Orange Peel, Satin.",
              "narrative": "The Golden Hour: Sunlight turning liquid into gold.",
              "lighting": "Golden Glow (Strong backlighting is mandatory)."
            }
          ]
        }
      ]
    },
    {
      "brand_name": "FONSECA",
      "business_unit": "Port Wine",
      "brand_definition": {
        "signature": "The Cult Port House. The Organic Pioneer. The Vintage Port Specialist.",
        "archetype": "The Lover (Hedonist)",
        "visual_identity": "Lush Greenery, Rich Velvet, Exotic Fruit, Dappled Sunlight, Organic Textures.",
        "values": ["Exuberance", "Respect for Nature", "Individuality", "Family"],
        "territories": ["The Greenhouse", "Rich Gastronomy", "The Artist's Studio"],
        "brand_statement": "Fonseca is the connoisseur's choice...",
        "tone_of_voice": ["Sensory (Luscious, Opulent).", "Passionate.", "Organic."]
      },
      "collections": [
        {
          "name": "Ruby & Reserve Ports (The Nurturer)",
          "tier": "Premium",
          "vibe": "Generous. Organic. Deep. Unfiltered. Dappled Light.",
          "products": [
            {
              "name": "BIN 27",
              "visual_physics": { "liquid": "Intense Deep Ruby (Velvety)", "label": "Bold Stenciled Font (Iconic)" },
              "sensory": "Blackberry Jam, Cassis, Velvet, Generosity.",
              "narrative": "The Casual Gourmet: Chocolate fondant, scattered berries.",
              "lighting": "Soft Wrap (Diffused)."
            }
          ]
        }
      ]
    },
    {
      "brand_name": "FSSW - BELLA ELEGANCE",
      "business_unit": "FSSW",
      "brand_definition": {
        "signature": "The Fashionable Side of Dão. Everyday Sophistication.",
        "archetype": "The Socialite / The Host",
        "visual_identity": "Sunday Brunch, White Linen, Fresh Flowers, Soft Focus, Clean Luxury.",
        "values": ["Modernity", "Elegance", "Sociability"],
        "territories": ["Fashion", "Modern Gastronomy", "Golden Hour"]
      },
      "collections": [
        {
          "name": "Core Varietals",
          "tier": "Lifestyle",
          "vibe": "Joyful moments, open tables, shared plates. High-Key Lighting.",
          "products": [
            {
              "name": "Pinot Noir",
              "visual_physics": { "liquid": "Translucent Ruby", "glassware": "Burgundy Bowl" },
              "sensory": "Cherry, Earth, Rose Petal, Elegant.",
              "narrative": "The Solo Glass: Backlit against a sunset background."
            }
          ]
        }
      ]
    }
  ]
};
