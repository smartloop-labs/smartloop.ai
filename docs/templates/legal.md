# Legal template

**Halbrook Wren LLP** is a Docent Studio [project template](./project-templates.md) for legal work: a fictional law firm reviewing its client Halvorsen Analytics' contracts, with the contracts already in it and two skills for reviewing them. Import it to see how Studio works on privileged material, then make it the base for your own matters.

<a href="/starters/Halbrook-Wren-LLP.zip" download>**Download Halbrook Wren LLP**</a> (zip, 80 KB)

The firm, its client, and every company, person, and term in the template are made up.

## Import the template

1. In Studio, click **+ New Project**.
2. Choose **Import**, then pick the zip (or drop it onto the dialog), and click **Create**. The project is named **Halbrook Wren LLP**.
3. Turn web search off with the toggle under the prompt (⌘⌥S, or Ctrl+Alt+S), so the project works only from its own documents.
4. Enable the models below. An imported project starts with every model switched off.

The documents are indexed in the background; they show as **INDEXING** in the Documents panel for a few seconds.

:::tip Models for this template
Press `Ctrl+Shift+M`, or click **Auto** in the prompt box, and enable a model for each role:

| Role | Model | Used for |
|---|---|---|
| Vision | Qwen Vision (`qwen2-vl-2b`) | Reading scanned exhibits or photographed pages |
| Document processing | Ministral 3 (`ministral3-3b`) | Parsing and indexing the documents |
| Reasoning | Qwen 3.5 (`qwen3.5-2b`) | Answering your questions |

Bigger is better: if your machine has the memory, a larger model in each role gives better answers.
:::

## What's in it

| Document | What it is |
|---|---|
| `Halvorsen-Corvid-MSA-2024.pdf` | Signed master services agreement between Halvorsen Analytics and a cloud provider |
| `Halvorsen-Corvid-MSA-Amendment-1-2025.pdf` | Amendment that changes the non-renewal notice period |
| `Halvorsen-Corvid-MSA-2026-DRAFT.docx` | The provider's draft for the 2026 renewal, with less favorable terms |
| `Halvorsen-Brightwater-Mutual-NDA.pdf` | Mutual NDA with a residuals clause |
| `Pell-Crane-Supply-Agreement.docx` | One-sided office supply agreement |

| Skill | What it does |
|---|---|
| `/contract-review` | A first-pass review of one agreement against a fixed checklist |
| `/compare-versions` | What changed between two versions of an agreement |

Then try:

- *"Quote the limitation of liability in the 2026 draft."*
- *"Which agreements let the other side assign without our consent?"*
- `/contract-review` on the Pell & Crane supply agreement.
- `/compare-versions` for the 2024 MSA against the 2026 draft.

Every answer lists the documents it drew from in a **REFERENCES** block, so a claim can be checked against the agreement itself.

## Make it your own

The template is a starting point. To turn it into the base your team starts every matter from:

1. **Replace the documents.** Delete the sample contracts in the **Documents** panel and add your firm's own standard forms and precedent. PDFs, Word, Excel, scanned pages, and images are all supported; see [Bring your documents](../documents.md).
2. **Edit the skills.** Open `contract-review` in the skill editor and change the checklist to match how your team reviews. Add skills for the other reviews you repeat; see [Skills](../skills.md).
3. **Add instructions.** In **Project Settings**, tell Studio how answers should look, for example *"Quote the clause and give its section number."*
4. **Download it.** Open **Project Settings** (`Ctrl+Shift+,`) and click **Download**. The zip is your firm's template: each colleague imports it, and each new matter starts from it as its own project.

Before you share it, remove any client document or conversation that shouldn't travel with it; the zip carries both. See [Creating a template](./project-templates.md#creating-a-template).

### One project per matter

Each project has its own documents, [memory](../memory.md), and agent process, isolated from every other project. Import the template once for each matter or client, for example `acme-v-globex` or `acme-msa-renewal`, and add that matter's documents to it. A question in one matter never draws on another client's files.

:::caution Keep the matter fully offline
Two features reach off your machine, and only when you use them: [web search](../web-search.md) sends the search query, and [connections](../mcp-servers.md) send what a tool call needs to the service you connected. For a privileged matter, turn search off and leave connections off for that project. Everything else stays local.
:::

## The contract review skill

This is the `contract-review` skill from the template. It runs a first-pass review of any agreement in the project against a fixed checklist:

````markdown
---
name: contract-review
description: When the user asks to review a contract or agreement, run a first-pass review against the checklist and flag anything that needs attention
---

# Contract review
Review the named agreement in this project and produce a first-pass issues list.

## Checklist
- Parties, effective date, and term
- Renewal and the notice needed to stop it
- Termination rights and notice periods
- Limitation of liability and any carve-outs
- Indemnities, and whether they are mutual
- Assignment and change of control
- Governing law and dispute resolution
- Confidentiality and data protection obligations

## Guidelines
- Quote the clause and give its section number for every item
- If an amendment in the project changes a clause, use the amended version and say so
- Mark an item **Missing** if the agreement does not address it
- List anything unusual or one-sided under a separate "Attention" heading
- Do not give a legal conclusion; the output is for attorney review
````


Run it from the prompt with `/contract-review`.

:::info
Docent Studio assists with legal work; it does not replace professional judgment. Review every answer against its cited sources before relying on it, and check your own professional obligations on the use of AI tools.
:::
