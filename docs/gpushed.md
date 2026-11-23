# gpushed

Docent runs its models on your own machine, so the models it can use are the ones your GPU can hold. **gpushed** (say "GPU shed") gives you a bigger machine when you need one: an NVIDIA GPU box, ready in a few minutes from your Mac or Linux machine, where you run Docent the same way you do at home, with larger local models such as Qwen3 Coder 30B.

The box is an Ubuntu 22.04 machine with the driver, CUDA, Python, Node.js and Rust ready, and everything Docent needs to run on its GPU. There's no cloud account, quota request or Terraform to set up. You sign in with your Smartloop account, pay per second from a prepaid balance, and stop or delete the box when you're done. See [gpushed.dev](https://gpushed.dev) for an overview.

## Requirements

* macOS (Intel or Apple silicon) or Linux. Windows isn't supported; WSL should work but isn't tested.
* `bash`, `curl`, `ssh` and `jq`. macOS and most Linux distributions ship all of them except, sometimes, `jq`. If it's missing, the installer tells you how to get it (`brew install jq`, `sudo apt-get install jq`, …).

The client is a bash script that talks to the gpushed API. There's nothing else to install, and no cloud credentials are kept on your machine.

## 1. Install and sign in

```bash
curl -fsSL gpushed.dev/install.sh | bash
```

The installer runs `gpushed init`, which checks for the tools above and signs you in. Signing in opens your browser: sign in to your Smartloop account there and approve the code shown in the terminal. Use `gpushed login --email` to get a code by email instead.

The installer also adds `gsh` as a short alias, so `gsh up` and `gsh ssh` work too, unless another `gsh` is already installed.

## 2. Add credit

```bash
gpushed topup
```

This opens Stripe Checkout. The minimum top-up is $10; pass an amount to add more, such as `gpushed topup 25`. To create or start a box, your balance needs at least one hour of its price. `gpushed balance` shows what's left.

## 3. Create your box

```bash
gpushed up
```

This creates a box on the default plan, one NVIDIA L4 with 24 GB, and streams its progress. It's ready a minute or two after it starts. To pick another GPU, name its plan:

```bash
gpushed plans        # the GPUs available and their prices for your region
gpushed up a100      # an A100 40 GB
```

A box goes to a region with GPUs to spare, nearest you first. Use `--region` to choose it yourself, for example `gpushed up l4 --region europe-west4`.

:::caution Spot or on-demand
The plain plans (`t4`, `l4`, `a100`, `h100`) run as Spot machines: 40–45% cheaper, but Google can reclaim one at any time with 30 seconds' notice. The box is then stopped with its disk kept, you get an email, and `gpushed start` resumes it once a GPU is free. Save your work often. For work that mustn't be interrupted, use the on-demand plan of the same GPU, such as `gpushed up l4-ondemand`.
:::

## 4. Use it

```bash
gpushed ssh                # connect, then try nvidia-smi
gpushed ssh nvidia-smi     # or run one command
gpushed cp data/ :         # copy a folder to your home directory on the box
gpushed cp :work/out ./    # copy results back
```

Box paths start with `:`. `gpushed cp` uses rsync over SSH, so it resumes partial transfers, skips unchanged files, and takes rsync options such as `--exclude=…`. `gpushed ssh` and `gpushed cp` start a stopped box first.

The box comes with:

* Ubuntu 22.04 with the NVIDIA driver and CUDA Toolkit 12.6
* Python 3.11 (`python`, `pip`, `uv`), Node.js 24 LTS with npm, and Rust stable
* `build-essential`, `git`, `cmake`, `tmux`, `htop` and `jq`, with root to add anything else
* A 100 GB SSD and a public IP, with only SSH (port 22) open

If `nvidia-smi` can't talk to the driver, run `sudo reboot` once.

## 5. Stop or delete it

```bash
gpushed stop      # pause; the disk is kept
gpushed start     # resume
gpushed down      # delete the box and its disk
```

A box is billed per second from when it's created until it's deleted. A stopped box costs only its disk, about $0.03 an hour, so delete it when you're done.

When your balance falls below $2, you get an email. When it's nearly used up, the box is stopped with its disk kept; top up and run `gpushed start` to carry on. A box that stays stopped with no credit for 24 hours is deleted.

## Run Docent on the box

With a box up, set Docent up on it once, and come back to it whenever a job needs the bigger GPU.

1. **Create a box with room for the models.** The default L4 has 24 GB of GPU memory; an A100 has 40 GB, for the largest local models.

   ```bash
   gpushed up a100
   ```

2. **Bring your project.** Copy it up, or clone it on the box:

   ```bash
   gpushed cp my-project :
   ```

3. **Connect and install Docent.** Start `tmux` first, so Docent keeps running if your connection drops; `tmux attach` picks it up again.

   ```bash
   gpushed ssh
   tmux
   curl -fsSL https://smartloop.ai/install | sh
   ```

4. **Open Docent in the project.** The first run starts the agent and downloads its models onto the box. See [Docent's first run](./command-line-tool.md#first-run).

   ```bash
   cd my-project
   docent
   ```

5. **Sign in.** Type `/login`: Docent shows a link and a code. Open the link in the browser on your own computer and confirm the code.

6. **Enable the bigger models.** Type `/models` and enable the larger coding models that now fit, such as Qwen3 Coder 30B A3B (`qwen3-coder-30b-a3b`). See [Choosing models](./getting-started.md#choosing-models).

Then work as you would at home: ask for changes, and Docent writes them, builds the project on the box, and fixes what fails. See [Coding with Docent](./coding.md).

When you're done, bring the work back with `git push` from the box, or copy it down:

```bash
gpushed cp :my-project/ ./my-project/
```

Then run `gpushed stop` rather than `gpushed down`. A stopped box keeps its disk, with Docent and its downloaded models, for about $0.03 an hour, so the next session starts straight away with `gpushed ssh`.

## Commands

| Command | What it does |
|---|---|
| `gpushed init` | Check for `curl`, `jq` and `ssh`, then sign in |
| `gpushed login` | Sign in with your Smartloop account in the browser (`--email` for an emailed code) |
| `gpushed logout` | Sign out on this computer |
| `gpushed balance` | Show your balance |
| `gpushed topup [usd]` | Add credit with Stripe (minimum $10) |
| `gpushed history` | Recent charges and top-ups |
| `gpushed plans` | GPUs available and their prices |
| `gpushed up [plan]` | Create your box |
| `gpushed status` | Show your box, including its IP |
| `gpushed ssh [cmd]` | Connect to the box, or run a command on it |
| `gpushed cp SRC... DEST` | Copy files to or from the box (box paths start with `:`) |
| `gpushed stop` / `start` | Pause and resume, keeping the disk |
| `gpushed down` | Delete the box and its disk |
| `gpushed update` | Upgrade to the latest release |
| `gpushed uninstall` | Remove gpushed from this computer |

Your API token and the box's SSH key are kept in `~/.gpushed/state`. To connect with plain `ssh`, use `ssh -i ~/.gpushed/state/box_ssh_key boxuser@<ip>`, with the IP from `gpushed status`; it changes after a stop and start.
