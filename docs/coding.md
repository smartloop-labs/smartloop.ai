# Coding with Docent

Docent is your local AI coding agent. Open it in a code project, ask for a change, and the answer comes back as files written into the folder, checked with the project's own build, and fixed until the check passes. Work that isn't a file, such as committing, installing a dependency or running the tests, comes back as shell commands that Docent runs for you once you say so.

```sh
cd my-project
docent
```

```
> add a --verbose flag that prints each file as it's processed
```

## Engine and harness

The work is split in two:

- **The framework** is the engine, the same one behind Docent Studio. It takes a prompt with its sources and returns the best answer it can. Its orchestrator picks the model that answers and decides on its own whether to search the web, for code as for anything else. See [Model orchestration](./model-orchestration.md).
- **Docent** is the harness around it. It builds the prompt from your folder, then takes the answer apart into files to write, checks to run and commands to run, and sends what happened back to the agent.

So the models run on your machine, the same as for documents and chat, and only a web search query ever leaves it. See [Web search](./web-search.md).

## When a prompt is coding work

A folder is a **code project** when a manifest sits at its top: `Cargo.toml`, `package.json`, `pyproject.toml`, `go.mod`, `pom.xml` and the like. This is read off the folder on every prompt, so a project you scaffold after linking the folder counts from then on.

In a code project, a prompt that asks for a change or asks about the code is answered with code. Anywhere else, a prompt that asks for something to be made (create, generate, scaffold, write, add, fix…) is answered with files too, and so is one that's plainly about programming.

## What the agent is sent

Each coding turn, Docent sends the agent:

1. The project's file list, its git state (branch, remotes and changed files) and its manifests.
2. The contents of the files the prompt concerns.
3. Your request last, with how to answer it: from the files, with the web for what they don't tell, such as a library's current API.

How much goes in follows the widest context window among the project's enabled models: about 60,000 characters for a 32k-token local model, up to 400,000 for a cloud model with a million. If the orchestrator picks a smaller model, the framework fits the prompt to that model's window by keeping the head and the tail and dropping the middle. That's why the file list, git state and manifests come first and the request closes the message: what's cut is file contents, never the question.

## Files in the reply

The agent answers with files. A new file comes whole; a change to a file that's already there comes as an edit, a block of search-and-replace pairs. As each one streams in, the chat shows it as a diff against the file in the folder: only the changed hunks, each under its `@@` header with a few lines of context, every line numbered in the old and new file, additions on green and removals on red. A new file shows as additions, folded past 40 lines.

Each file is written into the folder as soon as its block is complete, without asking; only shell commands are asked about. When the reply finishes, the chat lists what each file gained and lost by lines.

An edit whose search text isn't in the file can't be applied. Docent sends the file back to the agent and asks for the edit again, twice at most, before leaving it to you.

## Checks and the fix loop

Once the files are written, the project is checked with a quick command for its kind:

| Project | Check |
|---|---|
| Rust | `cargo check` |
| Go | `go build ./...` |
| JavaScript / TypeScript | the package's `build` script, or `tsc --noEmit` |
| Scripts with no build | each file by what it is: `bash -n`, `python3 -m py_compile`, `node --check`, `ruby -c`, `php -l`… |

When a language server for the file's language is on your `PATH` (`rust-analyzer`, `gopls`, `typescript-language-server`, `pyright` or `clangd`), each written file also goes to it, and the errors it reports are part of the check.

The check runs in the chat like a shell command, its output showing as it comes. If it fails, the errors go back to the agent, which answers with fixed files, which are checked again, round after round until the check passes. It stops after five rounds (three when it's the tests that fail, since a test can want more than the code changed), when a round gives the same failure as an earlier one, or when you press **Esc**.

## Shell commands

Work that isn't a file the agent answers with shell commands, in a fenced block marked `sh` with no path. After the reply's files are written and checked, Docent shows the commands and asks before running anything:

| Key | Action |
|---|---|
| Enter | Run them in the folder, each block as one script in turn |
| Tab | Run them, and turn on auto-approve so later replies' commands run without asking |
| Esc | Skip them |

Tab on an empty prompt turns auto-approve on or off at any time, and the footer says when it's on. A command with a placeholder to fill in, like `<your-username>`, is left out and the chat says so.

Each command shows on its own `$` line over what it printed, streaming as it runs, so a build or test run is watched, not waited on. What the commands print goes back to the agent, the way a tool's result does: a failure to be put right with other commands or files, and the last result so it can say what was done and what's left. That goes on until the work is done, or until Esc. So "commit and push the changes" ends in a commit, a push and a line saying so.

### Running your own

Type `!` followed by a command to run it in the working directory. The prompt turns pink and the footer says shell mode. The output shows as it comes and goes to the agent with your next prompt, so it stays part of the session:

```
!cargo test
!git log --oneline -5
```

### Background tasks

A command that keeps running, such as a dev server or a watcher, ends with `&`: the agent writes `npm run dev &`, and so can you after `!`. It starts in the background, the next command and the next prompt don't wait for it, and several can run at once. Each one still running is listed under the prompt with how long it's been going.

| Action | How |
|---|---|
| See all it printed | Click its line under the prompt, or its command in its entry; Esc closes it |
| Pick one from the keyboard | `/tasks` or Ctrl+B (twice under tmux), then ↑ ↓ and Enter |
| Stop one | `x` in `/tasks`, or click its `✕ stop` |

Quitting Docent ends them all.

## Models for coding

Which model answers is the orchestrator's call: it steps through the project's enabled models by size, what they declare and your machine's resources, and takes the largest that fits. There is no "coding" tag to set. Capabilities describe what a model has (`text`, `vision`, `reasoning`, `thinking`), and `/models` shows each one's.

For a model the catalog doesn't describe, set its capabilities yourself:

```
/models my-model caps text,reasoning
/models my-model caps auto
```

`auto` goes back to the catalog's.

## Commands at a glance

| Command | Action |
|---|---|
| `!<command>` | Run a shell command; its output goes to the agent with your next prompt |
| `!<command> &` | Run it in the background |
| `/tasks`, Ctrl+B | The commands still running: Enter shows all one printed, `x` stops it |
| Enter, Tab, Esc | When the agent's commands are asked about: run them, run them and auto-approve from now on, or skip them |
| Tab (empty prompt) | Auto-approve the agent's commands, on or off |
| Enter while a reply runs | Queue the prompt; it goes once the reply, its checks and its commands are done |
| `/memory` | What Docent was asked to remember in this folder; `/memory clear` forgets it |
| `/models <name> caps <list\|auto>` | Set a model's capabilities |
| `/models <name> thinking on\|off` | Have a model reason first, or answer sooner |
