# Getting Started

Docent comes two ways, and both run on the same local engine:

* **[Docent](#docent)** is your local AI coding agent in the terminal. Ask for a change and it writes the files, checks them with your build, and fixes what fails.
* **[Docent Studio](#docent-studio)** is the desktop app: your private AI assistant for documents, connected systems, and skills.

Use either one, or both: they keep their agent, models, and projects in `~/.smartloop`, and when Studio is already running, Docent uses its agent.

## Docent

### Install

macOS and Linux:

```sh
curl -fsSL https://smartloop.ai/install | sh
```

Windows (PowerShell):

```powershell
irm https://smartloop.ai/install.ps1 | iex
```

Open a new terminal, then check that it's on your `PATH`:

```sh
docent --version
```

### First run

Open Docent in a code project and ask for a change:

```sh
cd my-project
docent
```

```
> add a --verbose flag that prints each file as it's processed
```

The first run sets everything up: it starts the local agent, downloads the embeddings and the `sl-mini` decision model, and creates a project for the folder. Progress shows as a checklist, and later runs skip whatever is already on disk.

Some models and hosted features such as [web search](./web-search.md) need a Smartloop account. Type `/login` in the chat to sign in through your browser.

### Choosing models

Out of the box, Docent has only `sl-mini`, the orchestration model that decides who answers. Before you start coding, give it models to pick from. Type `/models` (or press `Ctrl+O`) to list the available models with their capabilities, then enable the ones you want:

* **Enabling a model downloads it first**, with the same checklist as the first run. Models are shared across projects, so each one downloads only once.
* **The orchestrator picks for every prompt.** It steps through the project's enabled models by size, by what they declare, and by your machine's resources, and takes the largest that fits. There is no "coding" tag to set: enable the strongest models your machine can hold and let it choose.
* **More context means more of your code in each prompt.** How much of the project goes to the agent follows the widest context window among the enabled models: about 60,000 characters for a 32k-token local model, and up to 400,000 for a cloud model with a million tokens.
* **Cloud models** are marked `(sign in)`. After `/login` they use your plan's credits, and when the credits run out, answers come from your local models.

Disabling a model also unloads it from memory, which is useful on a machine with less RAM.

:::tip Recommended models for coding
* **On your machine:** **Qwen3 Coder 30B A3B** (`qwen3-coder-30b-a3b`), a coding model with a 256k-token context window. **Qwen3.8 27B** (`qwen3.8-27b`) is built for coding too, and it runs in the cloud instead once you sign in. Both need plenty of memory; `/models` marks the models that fit your machine. On a smaller machine, start with **Qwen3.5 4B** (`qwen3.5-4b`).
* **In the cloud, with a Pro plan:** **GLM 5.3** (`glm-5.3`), **MiniMax M3** (`minimax-m3`), and **Qwen4 Max** (`qwen4-max`), large models built for coding and long agentic tasks, each with a context window of about a million tokens. That's room for much more of your project in every prompt.
:::

### Building a project

Here is how a small project comes together, from an empty folder to a commit.

1. **Start from an empty folder.** Create it, open Docent, and describe what you want:

   ```sh
   mkdir wordcount && cd wordcount
   docent
   ```

   ```
   > create a Rust CLI that counts words, lines and characters in the files passed to it
   ```

   A prompt that asks for something to be made is answered with files. Docent writes each file into the folder as soon as it is complete, without asking, and shows it as a diff.

2. **Docent checks the build and fixes what fails.** Once the files are written, Docent runs the check for the kind of project, here `cargo check` (`go build`, `tsc --noEmit`, and others for other languages). If the check fails, the errors go back to the agent, which answers with fixed files, round after round until the check passes. Press `Esc` to stop it early.

3. **Run it yourself.** Type `!` and a command to run it in the folder. The output goes to the agent with your next prompt, so you can point at a problem without pasting it:

   ```
   !cargo run -- README.md
   ```

4. **Keep asking for changes.** Now that `Cargo.toml` is there, the folder is a code project, and every prompt about it is answered with code:

   ```
   > add a --json flag that prints the counts as JSON
   ```

5. **Let it run commands.** Work that isn't a file, such as running the tests, installing a dependency, or committing, comes back as shell commands. Docent asks before running them: `Enter` runs them, `Tab` runs them and approves later commands automatically, and `Esc` skips them.

   ```
   > run the tests, then commit the changes
   ```

   A long-running command such as a dev server ends with `&` and runs in the background. `/tasks` (or `Ctrl+B`) lists the commands still running.

### Next steps

* [Coding with Docent](./coding.md): how Docent writes, checks, and fixes code.
* [Docent - Command Line Interface](./command-line-tool.md): every command, key binding, and option.

## Docent Studio

In order to create a project in Docent Studio, you will need to create an account; the login flow guides you through the process.

### First look

Download [Docent Studio](https://www.smartloop.ai/download/) for macOS, Linux, or Windows, then open the app.

On first launch, Docent Studio completes its initial setup. This can take a few minutes, depending on your configuration.

When setup is complete, you can start using the app immediately. The app then displays the prompt window shown below.

![Docent Studio's empty prompt window, with conversation tabs along the top, the prompt box with Attach and Auto buttons in the middle, starter prompts beneath it, and panel icons down the right edge](first-look.jpg)

* **Conversation tabs** run along the top; the **+** opens a new one.
* **The prompt box** takes your question. **Attach** adds a file, and **Auto** opens the model selector.
* **Starter prompts** beneath it are a quick way to try the app.
* **The icons on the right** open the side panels: documents, skills, connections, and the activity log.


By default, Docent Studio includes `sl-mini`, its base model. To select additional models, press `Ctrl+Shift+M` or click the `auto` button to open the model window. You can select one or more of the available free models, which are curated for vision, document processing, and skills. Docent Studio also considers your available system resources when selecting models.

:::tip Recommended models
For the best combination, enable **Qwen 3.5** (`qwen3.5-2b`) and **Ministral 3** (`ministral3-3b`). Between them they cover general chat, reasoning, document processing, and vision, giving orchestration a strong model for each step of a request.
:::


:::info Best Performance
Docent Studio needs an **Apple Silicon Mac (M3 or newer) with 16 GB of unified memory**, or a **Windows 11 / Linux x86_64 machine with 16 GB of system RAM and a Vulkan-capable GPU** — NVIDIA, AMD, or Intel, including integrated graphics. GPU acceleration runs through Vulkan (Metal on macOS), and the runtime is bundled — you don't need to install the Vulkan SDK on your machine.

More memory is better: 24 GB or above gives orchestration room to select larger models.

Larger GPUs allow orchestration to select larger models for better task quality and performance, instead of defaulting to smaller models such as a 1B parameter model.
:::


### Creating Project

A project is your workspace for documents, skills, and connected tools. Use it to collect information, extract insights, and tailor Docent Studio to your work. Within a project, you can:

* [Add personal documents](#adding-documents)
* [Create skills](/docs/skills)
* [Connect external services](/docs/mcp-servers), such as Notion and Linear

To create a project, select `+ New Project` in the left navigation bar. This opens the project creation dialog.


![New project](/img/blogs/new-project.png)

Enter a name and choose a color for your project. You can also import a project that you previously downloaded from Project Settings.

### Adding Documents

Bring up document section using `ctrl+shift+D` or click on the document icon on the right planel:

You can add documents of the following format:

* PDF 
* DOC 
* TXT 

OCR documents require vision capabilities and Smartloop v1.0.57+. Follow the orchestration documentation to understand how model selection works.


Here Docent Studio reviews five contracts in a project, routing the work between three open models on the device:

<video src="/img/studio-demo.mp4" aria-label="Docent Studio running a contract review across five agreements, routed between three open models on the device" autoPlay loop muted playsInline style={{width: '100%', borderRadius: '8px'}} />


### Attachments

Attachments are context documents, such as invoices, receipts, or ID cards, that you can quickly summarize or reference in a conversation. They are available only within the conversation where you attach them.

Click **Attach** in the prompt box, choose a file, and ask about it:

![The prompt box with an attached image file and the prompt "Based on the attached ID, extract the key information"](attachment-prompt.jpg)

The answer is drawn from the file itself. Here a vision model reads the ID card and pulls out its key fields:

![The conversation showing the attached driver's license image, the prompt, and an answer listing the issuing state, country, license number, and expiration date](attachment-answer.jpg)


### Project Instructions

Add project-wide instructions to control the format and style of responses. For example, you can instruct Docent Studio to recommend no more than three places to visit. These instructions apply to every conversation in the project.

![Instructions](./instructions.png)

Open Project Settings by pressing `Ctrl+Shift+,` or by clicking the gear icon in the right panel.


### Downloading a Project

You can download a project and all its content. To do so, open the project settings by clicking the settings icon, then click the **Download** button. This will package the project — including its documents and skills — into a zip file that you can send to others. The recipient can then import it as a new project. See [Best practices](./best-practices.md).

![Downloading Project](./project-settings.png)


### Monitoring

:::note Monitoring Logs
Once the app is installed, logs can be found at `~/.smartloop/server.log`. On macOS or Linux-based systems, you can view the logs with:

```bash
less ~/.smartloop/server.log
```

These logs provide information about whether the agent selected the expected model and whether it could not process a user prompt due to GPU limitations.
:::



Once you are logged in, each prompt you send uses tokens. The token count is reported to the console, which is used to render the dashboard that includes the tokens consumed over the last seven days and cost saved.

![dashboard](image-7.png)

We use the following API to report token usage:
https://api.smartloop.ai/redoc#tag/usage

None of your content or data is sent, since we use this product ourselves and we deeply value your privacy.


### Installing on Linux

Docent Studio for Linux is a `.deb` package for Debian, Ubuntu, and their derivatives on x86_64. It bundles everything the app needs, including the models and the Vulkan runtime. You only need a working graphics driver.

Download it from the [downloads page](https://smartloop.ai/download/), then install it with `apt`, which also pulls in any system libraries it depends on:

```bash
sudo apt install ./studio-*.deb
```

Docent Studio then appears in your applications menu.

#### Updating

Docent Studio does not update itself. When a new version is available, the app tells you. Download the new `.deb` and install it the same way; your projects and settings are kept.

#### Uninstalling

```bash
sudo apt remove smartloop-studio
```
