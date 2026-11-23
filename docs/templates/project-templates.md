# Project templates

A project template is a Docent Studio project packed into a zip file: its documents, its skills, and its connections, ready for someone else to import as a project of their own. Use one to hand a colleague a working setup, to start each new matter or client from the same base, or to try Studio with a ready-made project.

## Importing a template

1. In Docent Studio, click **+ New Project** in the left navigation bar.
2. Choose **Import**, then pick the zip file, or drop it onto the dialog.
3. Click **Create**. The project takes the template's name.

The new project gets its own ID, and its documents are indexed in the background: they show as **INDEXING** in the Documents panel for a few seconds.

Two things don't come across in a template:

* **Models.** An imported project starts with every model switched off. Press `Ctrl+Shift+M`, or click **Auto** in the prompt box, and enable the models it needs. A template's guide says which ones.
* **Sign-ins.** Connections come without their credentials, so connect each service again from the Connections panel.

Docent imports templates too: `/project import <zip>` in the chat, or drop the zip on an empty prompt. See [Docent - Command Line Interface](../command-line-tool.md#projects).

## Creating a template

Any project can become a template.

1. **Set the project up** the way you want others to start: add the [documents](../documents.md), write the [skills](../skills.md), and add the [connections](../mcp-servers.md) it needs.
2. **Open Project Settings** with `Ctrl+Shift+,`, or the gear icon in the right panel.
3. **Click Download.** Studio packs the project into a zip file.

![Project Settings, with the Download button](../project-settings.png)

The zip holds:

| Part | What comes across |
|---|---|
| Project | Its name and description |
| Documents | Every file in the project, indexed again on import |
| Skills | Every skill, as its `SKILL.md` file |
| Connections | The MCP servers it uses, without their sign-ins |
| Conversations | The project's conversation history |

:::caution Check what you share
The zip carries the project's documents and its conversations as they are. Before you share a template, remove any document or conversation that shouldn't leave your hands, or set up a clean project just for the template.
:::

## Best practices

[Best practices](./legal.md) builds a template step by step: **Halbrook Wren LLP**, a fictional law firm's client contracts, with skills for contract review and comparing versions. Follow it to set up your own projects the same way, or download the finished template and import it.
