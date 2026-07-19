# Auth.md

## Nuvo Peptide Labs - Agent Authentication Guidelines

Nuvo Peptide Labs is a fully static public catalog and informational resource. No user accounts, client registration, or API authentication are required to browse products, read scientific publications, or review lab-testing specifications.

### Agent Registration
No registration is necessary. All agents and autonomous clients may inspect public pages and structured configuration files freely.

### Public Resources Directory
| Resource Name | URL Path | Content Description |
|---|---|---|
| Product Catalog | https://DOMAIN.com/shop | High-purity peptides catalog grouped by biochemical categories |
| LLM Profile | https://DOMAIN.com/llms.txt | Plain-text brand details, shipping specs, and rules |
| API Catalog | https://DOMAIN.com/.well-known/api-catalog | RFC 9727 linkset for indexing service discovery |
| Agent Skills | https://DOMAIN.com/.well-known/agent-skills/index.json | Action capabilities list for navigation and order inquiries |
| Universal Commerce | https://DOMAIN.com/.well-known/ucp | Universal Commerce Protocol specifications |

### Authentication Metadata Block
```json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
```
