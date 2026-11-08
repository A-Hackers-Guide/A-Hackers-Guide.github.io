// Everything on the page is generated from this file. Facts come straight
// from each repository's README, file tree, languages and releases.
window.SITE = {
  user: "A-Hackers-Guide",
  tagline: "Building tools that break the walls between platforms.",
  quote: "If it only runs on one OS, it isn't finished yet.",
  platforms: ["macOS", "Windows", "Linux", "FreeBSD", "iOS", "Android", "KVM / QEMU", "Jetson"],
  repos: [
    {
      id: "crossfire",
      name: "Crossfire",
      repo: "crossfire",
      accent: "#ff5c39",
      icon: "⇄",
      created: "2026-10-25",
      live: "https://a-hackers-guide.github.io/crossfire/",
      kicker: "Port any project between Windows, macOS, Linux and FreeBSD",
      summary: "Point it at your source code. It maps every OS-specific call, asks a few questions, writes a portable version, and builds it.",
      stats: [["674", "porting rules"], ["4", "target OSes"], ["50", "promises in the README"], ["3", "ways to run"]],
      langs: { Rust: 324868, TypeScript: 92365, CSS: 27806, "C++": 13543, C: 10247, Python: 9253, JavaScript: 4298, "C#": 4160, HTML: 362 },
      pipeline: [
        ["Source", "Pick a project folder. Crossfire detects which OS it was written for."],
        ["Analyze", "Every file is scanned against 674 rules in 9 tables. You get a portability score, a heat map, and a suggested fix for each finding."],
        ["Targets", "Choose any of Windows, macOS, Linux and FreeBSD."],
        ["Configure", "Questions based on what was found: porting strategy, graphics and audio backends, build system, C++ standard, packaging, CI, AI help."],
        ["Convert", "Writes a new copy and never touches the original: rule-based rewrites, a portability shim, CMake, CI workflow and a report."],
        ["Build", "Builds every target this machine can make: native compilers, MinGW, zig cross-compiling. The rest build in CI."],
        ["Test", "On a Mac, run the Windows build through Apple's Game Porting Toolkit right from the app."]
      ],
      features: [
        ["Rules cover", "Win32, DirectX, Cocoa/Metal, X11/Wayland, ALSA/PulseAudio, kqueue/epoll, the registry, filesystem paths, threading and timing"],
        ["Language APIs", "C#, Python, Go, Rust, Java and Node"],
        ["Game engines", "Unity, Unreal, Godot and Love2D projects are analyzed"],
        ["Porting strategies", "SDL3 portability layer, native per OS, translation layer, or hybrid"],
        ["Mechanical rewrites", "Sleep → portable sleep, QueryPerformanceCounter → std::chrono, __declspec(align) → alignas, path separators, include guards"],
        ["Generated output", "crossfire/cf_platform.h shim, CMakeLists.txt with presets, packaging scripts, and a GitHub Actions workflow for all four OSes"],
        ["Optional AI pass", "Claude, or any OpenAI-compatible endpoint including local models, for the hardest files, with diffs and confidence scores"],
        ["AI confidence gate", "AI diffs below a configurable threshold are refused, not applied"],
        ["Build systems", "Rules for CMake, Meson, MSBuild, Makefile, Cargo and npm"],
        ["Safety", "Never writes inside the source tree; no network calls outside the opt-in AI pass; API key held only in memory"],
        ["Quality gates", "cargo fmt, clippy with warnings as errors, cargo-deny, oxlint, tsc and a 3-OS test matrix on every PR"],
        ["Report", "CROSSFIRE_REPORT.md lists every change and what needs a human to look at"]
      ],
      terminal: [
        "$ crossfire-engine scan ./MyGame > scan.json",
        "$ crossfire-engine questions scan.json --targets linux,macos,freebsd",
        "$ crossfire-engine convert request.json",
        "$ crossfire-engine build build.json",
        "$ crossfire-engine toolchains"
      ],
      architecture: [
        ["ui/", "React + TypeScript GUI shared by both shells; runs in demo mode in a browser"],
        ["engine/", "Rust engine: scan, rules, questions, convert, AI, toolchains, build, GPTK"],
        ["engine/src/rules/", "674 rules in 9 TOML tables: win32, directx, macos, linux, bsd, posix, languages, engines, build"],
        ["apps/tauri/", "Main app: Tauri 2 with the engine linked in-process, one native executable per OS"],
        ["apps/electron/", "Backup app: Electron, engine runs as a sidecar CLI"],
        [".github/workflows/build.yml", "Builds every platform and publishes releases on tags"]
      ],
      downloads: [
        ["Windows", ".exe installer / .msi · Electron installer + portable .exe"],
        ["macOS", ".dmg / .app (universal) · Electron .dmg"],
        ["Linux", ".AppImage / .deb / .rpm · Electron .AppImage"],
        ["FreeBSD", "binary tarball (crossfire + crossfire-engine)"]
      ],
      limits: [
        "APIs with no portable equivalent (closed-source Windows-only DLLs, kernel drivers, anti-cheat) are flagged, not converted.",
        "Graphics rewrites (DirectX → SDL_GPU/Vulkan/Metal) and UI-toolkit changes rely on the AI pass and need review.",
        "Building a macOS app requires a Mac; the CI workflow uses GitHub's macOS runners.",
        "Unity, Unreal and Godot projects should be exported from their editors.",
        "Zig and Docker builds are implemented but less tested than native builds."
      ],
      license: "MIT",
      release: "v0.1.0"
    },
    {
      id: "sys1",
      name: "sys1",
      repo: "sys1",
      accent: "#818cf8",
      icon: "☁",
      created: "2026-10-31",
      live: "https://a-hackers-guide.github.io/sys1/",
      kicker: "Pool the spare power of every computer into one cloud",
      summary: "Most computers sit idle most of the day. sys1 pools their spare CPU, memory, disk and GPU into one place and runs websites, media servers, backups, AI models and game servers on it. Free, open source and public domain.",
      stats: [["21+", "OS/CPU builds"], ["2", "apps: sys0 + sys1"], ["~15 s", "failover"], ["v0.6", "today"]],
      langs: { Go: 513573, JavaScript: 448536, HTML: 43754, Kotlin: 14347, CSS: 13667, Shell: 10150, Swift: 6256, Dockerfile: 2354, PowerShell: 2190, Makefile: 719 },
      pipeline: [
        ["Start a node", "Run sys1 on the hub machine. The dashboard opens in your browser, and that machine is already in the pool."],
        ["Join machines", "Install sys0 on each machine and paste a join code: one for your own machines, one to share with other people."],
        ["Lowest priority", "sys0 runs at the lowest priority each OS offers, so your own apps and games always come first."],
        ["Place work", "The node puts work on the best machine by spare CPU, memory and GPU, skipping busy machines and laptops on battery."],
        ["Survive failures", "Crashed apps restart; after 5 crashes in a row they move to another machine and resume from a checkpoint."],
        ["Deploy", "Pick something from the Marketplace: Jellyfin, Plex, Ollama, Syncthing, websites, any container."]
      ],
      features: [
        ["Priority on every OS", "nice 19 + idle I/O on Linux, background QoS on macOS, IDLE_PRIORITY_CLASS on Windows, minimum container CPU weight"],
        ["Pooled storage", "Spare disk on every machine becomes one encrypted store; app data is snapshotted every minute and moves with the app"],
        ["Fast save", "An fsync'd, checksummed write-ahead journal: pull the plug and nothing acknowledged is lost"],
        ["AI across machines", "Split one llama.cpp model across several machines; schedule by free GPU memory on NVIDIA, AMD, Intel and Apple"],
        ["Clusters", "Run 3 nodes and any one can fail; join codes carry every address so machines join from anywhere"],
        ["VMs and desktops", "Whole operating systems as apps with QEMU, screens in the browser, and an experimental Moonlight game host"],
        ["Safe for strangers", "Shared machines only run hardened, sandboxed containers; packages must be Ed25519-signed by a key you trust"],
        ["Phones too", "An Android app that lends only while charging and idle, a Magisk module, and a sideloaded iPhone/iPad app"]
      ],
      terminal: [
        "$ brew install a-hackers-guide/tap/sys1",
        "$ curl -fsSL https://a-hackers-guide.github.io/sys1/install.sh | sh",
        "> scoop bucket add a-hackers-guide https://github.com/A-Hackers-Guide/scoop-bucket",
        "> scoop install a-hackers-guide/sys1",
        "$ sys1",
        "$ sys0 join sys1-join:eyJh…"
      ],
      architecture: [
        ["sys0 (client)", "A friendly installer, then it disappears into the background on every machine that lends power"],
        ["sys1 (node)", "The hub: scheduler, crash-safe journal, marketplace and a full dashboard"],
        ["Link", "TLS 1.3 with a pinned certificate between every client and the node"],
        ["homebrew-tap", "Homebrew formulae: brew install a-hackers-guide/tap/sys1"],
        ["scoop-bucket", "Scoop manifests, rewritten hourly from each release's SHA-256 checksums"],
        ["docs/", "Getting started, architecture, reliability, storage, security model, protocol, roadmap"]
      ],
      downloads: [
        ["Installers", "macOS .pkg, Windows .msi, .deb, .rpm, .apk, Arch, AppImage, snap, FreeBSD .pkg, OpenWrt .ipk"],
        ["Archives", "21 OS/CPU combinations: Windows, macOS, Linux, the BSDs, Solaris, illumos, AIX, Android"],
        ["From source", "Go 1.26+: go build ./cmd/sys0 && go build ./cmd/sys1"]
      ],
      limits: [
        "Automatic updates, crash reports and more integrations are still on the roadmap.",
        "Native programs run only on machines whose owner said “this is mine”; shared machines get sandboxed containers only.",
        "The iPhone and iPad app is sideloaded or a jailbreak package; it will never be in the App Store."
      ],
      license: "Unlicense",
      release: "v0.6"
    },
    {
      id: "ocmp",
      name: "OpenCore Modernity Patcher",
      repo: "OpenCore-Modernity-Patcher",
      accent: "#a78bfa",
      icon: "⏻",
      created: "2026-10-30",
      kicker: "Build a bootable OpenCore EFI for your PC from Windows or Linux, no Mac required",
      summary: "The interface works like OpenCore Legacy Patcher, but the target is different: Intel and AMD PCs, laptops and KVM/QEMU virtual machines, all the way up to macOS Tahoe.",
      stats: [["High Sierra → Tahoe", "macOS targets"], ["2", "host OSes"], ["51", "files"], ["Beta 2", "“First Light”"]],
      langs: { Python: 189886, Shell: 1581 },
      pipeline: [
        ["Detect", "Reads CPU, GPUs, network cards, chassis type and motherboard: WMI/CIM on Windows, /proc and /sys on Linux."],
        ["Plan", "Picks platform, SMBIOS model, kexts, ACPI tables, quirks and boot-args, following the Dortania OpenCore Install Guide."],
        ["Download", "Fetches OpenCorePkg, kexts, prebuilt SSDTs and AMD_Vanilla patches from their own release pages. Nothing third-party is bundled."],
        ["Build", "Writes config.plist from the same release's Sample.plist, generates serials with macserial, assembles EFI/, validates with ocvalidate."],
        ["Install", "Copies the EFI to a disk's EFI partition, keeps a backup, leaves Windows and Linux boot loaders untouched."],
        ["Installer USB", "Downloads macOS Recovery straight from Apple and writes a bootable USB with your EFI on it."]
      ],
      features: [
        ["Intel CPUs", "Haswell → Comet Lake native; Rocket, Alder, Raptor and Arrow Lake with a dGPU (spoofed as Comet Lake); Ice Lake laptops; HEDT"],
        ["AMD CPUs", "Ryzen and Threadripper Zen through Zen 5 with AMD_Vanilla kernel patches and your core count filled in"],
        ["AMD GPUs", "Polaris and Vega up to Tahoe; Navi 10/14/21/22/23 supported with agdpmod=pikera added automatically"],
        ["Unsupported GPUs", "Disabled automatically with disable-gpu-support or -wegnoegpu; the build stops clearly if no usable GPU is left"],
        ["Networking", "IntelMausi, RealtekRTL8111, LucyRTL8125, AtherosE2200, itlwm + HeliPort for Intel Wi-Fi, Intel Bluetooth firmware"],
        ["Tahoe SMBIOS", "Auto-upgrades to Tahoe-capable models: MacPro7,1, iMac20,1/20,2, MacBookPro16,1/16,2/16,4"],
        ["KVM profile", "ProvideCurrentCpuInfo and vmhide=on, no ACPI hacks needed on Q35; iMacPro1,1 or MacPro7,1"],
        ["Release channels", "Stable, Pre-release and Nightly kept strictly separate, with a codename per minor version"]
      ],
      terminal: [
        "# Windows",
        "> .\\OpenCore-Modernity-Patcher-0.1.0-beta.2-Windows-x64.exe",
        "# Linux",
        "$ chmod +x OpenCore-Modernity-Patcher-*.AppImage",
        "$ sudo -E ./OpenCore-Modernity-Patcher-*.AppImage",
        "$ sha256sum -c SHA256SUMS.txt --ignore-missing"
      ],
      architecture: [
        ["Main menu", "Same 600 px two-column layout as OCLP; Root Patch becomes Detect Hardware"],
        ["Build and Install", "Log view, then Install to disk, plus an extra Open EFI folder button"],
        ["Install OpenCore", "Disk → volume; boot disks get an extra warning, old EFI/OC backed up to EFI-backup-ocmp"],
        ["Create macOS Installer", "Downloads Recovery (BaseSystem.dmg) from Apple and flashes a USB stick"],
        ["Settings", "Tabs: Build, Hardware, Security, SMBIOS, Advanced; Target macOS plus SMBIOS override"],
        ["Icons", "Drawn by the app itself; OCLP's branded artwork isn't used"]
      ],
      downloads: [
        ["Windows 10 / 11", "Single .exe, no installer"],
        ["Linux x86_64", ".AppImage (glibc 2.35+, GTK 3)"],
        ["Checksums", "Every release ships SHA256SUMS.txt"]
      ],
      limits: [
        "Version 0.1 has only been checked with ocvalidate and simulated hardware profiles; it has not been booted on real hardware yet.",
        "Tahoe is the last macOS for Intel Macs, so no PC will run the release after it.",
        "Kaby Lake and older iGPUs have no Tahoe drivers; a supported AMD dGPU is needed.",
        "Broadcom Wi-Fi and NVIDIA Kepler need root patches that only macOS itself can apply."
      ],
      license: "See repo",
      release: "v0.1.0-beta.2"
    },
    {
      id: "fruitgpt",
      name: "FruitGPT",
      repo: "FruitGPT",
      accent: "#fb7185",
      icon: "❋",
      created: "2026-11-01",
      live: "https://a-hackers-guide.github.io/FruitGPT/",
      kicker: "Chat with a real fruit fly brain, and edit it",
      summary: "A desktop chat app that runs complete wiring diagrams of real brains on your computer and translates what their neurons do into English. There is no language model: nothing is generated or made up.",
      stats: [["165,122", "neurons"], ["25.6M", "connections"], ["3", "brains"], ["0", "language models"]],
      langs: { JavaScript: 84567, Python: 16876, HTML: 16802, CSS: 9502, Shell: 2037 },
      pipeline: [
        ["You type", "Sense words drive a real receptor: “shadow” → looming detectors, “smell” → the DA1 channel, “touch” → bristles."],
        ["Or it hears you", "Anything else reaches the fly as a sound near its antennae, the way a real fly would sense your voice."],
        ["The brain runs", "300 ms of the full 165,122-neuron leaky integrate-and-fire network, on your CPU."],
        ["Fly → English", "It reports how many neurons answered, in which brain regions, and which command neurons fired."],
        ["Behaviour", "DNp01 Giant Fiber = escape jump, MDN = walk backward, and so on."],
        ["Lives on", "The fly keeps running in the background; the header shows whether it's resting or escaping."]
      ],
      features: [
        ["Three brains", "Male fruit fly whole CNS (MaleCNS v1.0), female fly whole brain (FlyWire v783), and the worm C. elegans (279 neurons)"],
        ["Brain Editor", "Change the brain while it runs and watch the result in a 3D view of every neuron"],
        ["Sections", "Take out whole parts like the optic lobes, mushroom bodies, nerve cord or one half"],
        ["Neurons & wires", "Silence a cell type, force it on, flip it from go to stop, or cut the wires between groups (LPLC2 → DNp01)"],
        ["Presets", "Edits are temporary unless saved; built-ins include “No escape: Giant Fiber silenced”"],
        ["Your own brains", "Pack any connectome into one .fbrain file and load it with Add a brain file…"],
        ["Online answers", "General questions can look up Wikipedia, clearly labelled as not coming from the fly"],
        ["Gentle", "The background fly uses at most ~30% of one core, and nothing while minimised"]
      ],
      terminal: [
        "$ chmod +x FruitGPT-*-linux-x86_64.AppImage",
        "$ ./FruitGPT-*-linux-x86_64.AppImage",
        "# build a brain file from any connectome",
        "$ node tools/pack_brain.js data/brains/worm worm.fbrain"
      ],
      architecture: [
        ["Model", "Leaky integrate-and-fire neurons after Shiu et al. 2024 (Nature), with spike-frequency adaptation"],
        ["MaleCNS fly", "0.15 mV per synapse; 642,932 Kenyon-cell-to-Kenyon-cell synapses left out (kept in the data)"],
        ["FlyWire fly", "0.275 mV per synapse, Shiu et al.'s original value"],
        ["Worm", "1.5 mV per synapse, gap junctions as weak excitatory links: “nasty thing at the nose → reverse”"],
        ["tools/", "Fetch and convert MaleCNS (1.1 GB), FlyWire (850 MB) and worm data"],
        ["Release", "Pushing a v* tag builds all three apps in GitHub Actions"]
      ],
      downloads: [
        ["Linux", "FruitGPT-*-linux-x86_64.AppImage"],
        ["macOS", ".dmg for Apple silicon or Intel"],
        ["Windows", "Portable .exe, no install"],
        ["Needs", "About 1 GB of free RAM; no GPU, no account, works offline"]
      ],
      limits: [
        "Not modelled: neuromodulators, neuron shapes, a body, and learning.",
        "The worm model is rough: worm neurons mostly use graded signals, not spikes.",
        "Not notarized or code-signed yet, so macOS and Windows warn on first launch.",
        "Brain data is CC BY 4.0 from Janelia, FlyWire and OpenWorm; FruitGPT isn't affiliated with any of them."
      ],
      license: "MIT · data CC BY 4.0",
      release: "v0.2.0"
    },
    {
      id: "fruitos",
      name: "FruitOS",
      repo: "FruitOS",
      accent: "#a3e635",
      icon: "◉",
      created: "2026-10-31",
      live: "https://a-hackers-guide.github.io/FruitOS/",
      kicker: "A live Linux OS whose star is a real fruit fly brain",
      summary: "FruitOS boots straight into a 3D learning app that runs the complete wiring diagram of a male fruit fly's central nervous system. The fly's own command neurons decide what it does. Made for doctors, students and anyone curious about brains.",
      stats: [["124M", "synapses"], ["9", "guided lessons"], ["0", "internet needed"], ["v0.1.0", "ISO"]],
      langs: { Python: 58248, HTML: 15303, JavaScript: 13825, CSS: 6427, Shell: 4424 },
      pipeline: [
        ["Boot", "Arch Linux (archiso) with GRUB on UEFI; legacy-BIOS PCs fall back to syslinux."],
        ["See it in 3D", "Every neuron drawn where its cell body sits, coloured by brain part. Click a dot to inspect it."],
        ["Watch it live", "The brain runs continuously and neurons light up as they fire."],
        ["Poke a sense", "Press Shadow: looming detectors fire, drive the Giant Fiber, and the fly escapes. Nothing is scripted."],
        ["Talk to it", "Every answer is computed from the connectome or a fresh simulation, never invented."],
        ["Learn", "9 lessons with quizzes whose answers are calculated from the brain on screen."]
      ],
      features: [
        ["DNp01 Giant Fiber", "Escape jump and take-off (von Reyn et al. 2014)"],
        ["MDN", "The “moonwalker”: walk backward (Bidaye et al. 2014)"],
        ["DNa01, DNa02", "Steer left and right (Rayshubskiy et al. 2020; Yang et al. 2023)"],
        ["DNp09", "Walk forward (Bidaye et al. 2020)"],
        ["Honest gaps", "When other command neurons fire, the fly says so, and says when science doesn't know what they do"],
        ["Light on hardware", "At most half a CPU core, capped by systemd at 1 core and 2 GB, and it pauses after 60 s with nobody watching"],
        ["Website", "Spin all 165,122 neurons in your browser on the project site"],
        ["No ISO needed", "Run just the app on macOS, Linux or Windows with Python"]
      ],
      terminal: [
        "$ sha256sum -c fruitos-0.1.0-x86_64.iso.sha256",
        "# or run just the app:",
        "$ pip install numpy scipy pyarrow pandas",
        "$ bash tools/fetch_data.sh raw",
        "$ python3 tools/prepare_data.py --raw raw --out data",
        "$ cd app && FRUITOS_DATA=../data python3 -m fruitbrain.server"
      ],
      architecture: [
        ["app/fruitbrain/", "Brain engine, live behaviour loop, the fly's voice, lessons, local web server"],
        ["app/web/", "3D learning interface with vendored three.js, works offline"],
        ["tools/", "Download and convert the connectome (build time only)"],
        ["iso/", "archiso profile: packages, GRUB/syslinux branding, systemd service, kiosk session"],
        ["tests/", "Engine tests on a tiny synthetic brain"],
        [".github/workflows", "Tests, tag → ISO → Release, and the Pages website"]
      ],
      downloads: [
        ["ISO", "fruitos-0.1.0-x86_64.iso plus a SHA-256 checksum"],
        ["Minimum", "x86_64 with 2 cores and 4 GB RAM; any graphics, software rendering works"],
        ["Recommended", "4 cores, 8 GB RAM, any GPU with OpenGL"]
      ],
      limits: [
        "Turn Secure Boot off on a real PC; the boot files aren't signed for it.",
        "Not modelled: neuromodulators, gap junctions, neuron shapes, a body, and learning.",
        "Sight starts at the looming detectors; the photoreceptor → lamina step can't be represented by this neuron model.",
        "The fly lives in slow motion: about 1 second of brain time every 7 seconds on a laptop core."
      ],
      license: "MIT · data CC BY 4.0",
      release: "v0.1.0"
    },
    {
      id: "wiithemer",
      name: "WiiThemer Desktop",
      repo: "wiithemer-desktop",
      accent: "#60a5fa",
      icon: "◎",
      created: "2026-10-30",
      live: "https://a-hackers-guide.github.io/wiithemer-desktop/",
      kicker: "Build custom Wii System Menu themes on Windows, macOS and Linux",
      summary: "A cross-platform desktop port of scooby7402976's WiiThemer where you can change every setting. No server: builds run on your machine and nothing expires after 3 minutes.",
      stats: [["73", "built-in themes"], ["4 × 4", "versions × regions"], ["4", "channel spins"], ["v1.0.0", "release"]],
      langs: { Python: 55177 },
      pipeline: [
        ["Pick a theme", "Choose one of the 73 built-in themes, open a .mym from your computer, or add one by URL."],
        ["Version & region", "System Menu 4.3, 4.2, 4.1 or 4.0, in region U, E, J or K."],
        ["Spin", "nospin, spin, fastspin or transchan, with WiiThemer's “apply spin first” rule or your own choice."],
        ["Fetch", "The System Menu content is downloaded, or your own NAND-dumped .app is used instead."],
        ["Build", "themewii runs the exact steps from wiithemer.org's index.php, through Wine on macOS and Linux."],
        ["Save", "The finished .csm is copied to your folder, with the name from your template."]
      ],
      features: [
        ["MYM Editor", "Open, create and edit .mym theme mods: add, replace, extract and delete files, edit mym.ini as text, preview images"],
        ["Catalog tab", "Change the base URL themes come from, hide themes, remove custom ones, clear the download cache"],
        ["Appearance", "Widget style, font, size and every color of the app itself, each with a color picker"],
        ["Advanced (JSON)", "Every setting as editable JSON, including the build pipeline and extra System Menu versions"],
        ["Editable pipeline", "Separate normal and run_first command lists with placeholders like {themewii}, {appid}, {spin} and {output}"],
        ["Stack mods", "Any step that doesn't start with {themewii} runs as written, so you can call ASH.exe, 7z or your own scripts"],
        ["Log panel", "Every download, each build step with its exact command, all themewii output and full error details"],
        ["Shareable setup", "Import and export settings as JSON, or reset to defaults"]
      ],
      terminal: [
        "# macOS: install Wine for the build step",
        "$ brew install --cask wine-stable",
        "$ xattr -dr com.apple.quarantine /Applications/WiiThemerDesktop.app",
        "# Linux",
        "$ chmod +x WiiThemerDesktop-Linux-x86_64.AppImage",
        "$ ./WiiThemerDesktop-Linux-x86_64.AppImage"
      ],
      architecture: [
        ["app/wiithemer_desktop.py", "The whole app: GUI, builder and MYM editor"],
        ["app/catalog.json", "Built-in theme list: name, file, preview, regions"],
        ["app/spins/", "nospin / spin / fastspin / transchan .mym mods"],
        ["app/tools/", "themewii.exe, SharpZipLib, ASH.exe, 7z.exe from WiiThemer"],
        ["docs/", "GitHub Pages website with a theme gallery"],
        [".github/workflows/", "Cross-platform build and release"]
      ],
      downloads: [
        ["Windows 10/11", "WiiThemerDesktop-Windows.exe, a single file"],
        ["macOS (Apple Silicon)", "WiiThemerDesktop-macOS.dmg or .app.zip"],
        ["Linux x86_64", "WiiThemerDesktop-Linux-x86_64.AppImage"]
      ],
      limits: [
        "A bad theme, or one built for the wrong version or region, can brick a Wii. Make a NAND backup with BootMii first.",
        "themewii.exe is a Windows .NET program, so macOS and Linux need Wine for the build step.",
        "The apps aren't code-signed, so Windows and macOS warn on first launch."
      ],
      license: "GPL-2.0",
      release: "v1.0.0"
    },
    {
      id: "freemessenger",
      name: "FreeMessenger",
      repo: "FreeMessenger",
      accent: "#22d3ee",
      icon: "✉",
      created: "2026-10-29",
      live: "https://a-hackers-guide.github.io/FreeMessenger/",
      kicker: "Free texting, voice and video calls in any web browser",
      summary: "Your username is your phone number. No app to install, no email, phone number or password. Messages and call setup are end-to-end encrypted in your browser.",
      stats: [["0", "dependencies"], ["E2E", "encrypted"], ["$0", "to run"], ["12", "files"]],
      langs: { JavaScript: 36101, CSS: 10088, HTML: 5797 },
      pipeline: [
        ["Pick a name", "Choose a username like @sam: 3 to 20 characters of a–z, 0–9 and _."],
        ["Keys are made", "Your browser makes an ECDSA P-256 key pair for identity and an ECDH P-256 key pair for encryption."],
        ["Back up", "Download the backup file: a copy of your keys, the only way to sign in on another device."],
        ["Sign in", "The relay sends a random challenge; your browser signs it."],
        ["Chat", "Messages are encrypted with AES-256-GCM using a key both people derive with ECDH."],
        ["Call", "WebRTC voice and video go directly between browsers whenever possible."]
      ],
      features: [
        ["Verify encryption", "A 12-digit code you compare with your friend; if they match, nobody is listening in"],
        ["Invite links", "Share a link like …/FreeMessenger/#sam that lands people right in a chat with you"],
        ["Offline inbox", "Up to 500 messages, still encrypted, kept on the relay for up to 30 days"],
        ["No impersonation", "The relay sets the sender's name itself"],
        ["Notifications", "While the tab is open, via ⋯ → Turn on notifications"],
        ["Hosting", "Web app on GitHub Pages; relay on Cloudflare Workers + Durable Objects, one per username"],
        ["Zero maintenance", "No libraries to update, pinned compatibility date, capped storage, keep-alives that don't wake the relay"],
        ["Self-host", "Fork, deploy the relay with wrangler, set RELAY_URL, publish with GitHub Actions"]
      ],
      terminal: [
        "$ cd relay && npm install && npx wrangler dev",
        "$ cd client && python3 -m http.server 8080",
        "# open http://localhost:8080 and http://127.0.0.1:8080",
        "# they count as two separate people"
      ],
      architecture: [
        ["client/", "Plain HTML, CSS and JavaScript, no build step, no dependencies, on GitHub Pages"],
        ["client/crypto.js", "Key generation, ECDH key agreement and AES-256-GCM"],
        ["client/app.js", "The chat and call interface"],
        ["relay/src/index.js", "Username directory, sign-in check, message passing, offline inbox"],
        [".github/workflows/deploy.yml", "Publishes the site on push to main"]
      ],
      downloads: [
        ["Any browser", "Phones, tablets and computers"],
        ["Message length", "8,000 characters"],
        ["Roadmap", "Installable app, native apps, and an optional broadcaster for real phone lines"]
      ],
      limits: [
        "Group chats, photos and files aren't supported yet.",
        "Notifications only work while the site is open in a tab.",
        "Lose both your browser data and the backup file and the account can't be recovered.",
        "Restoring a backup brings back your account, not your old chat history."
      ],
      license: "See repo",
      release: "Live"
    },
    {
      id: "questclassic",
      name: "QuestClassic",
      repo: "QuestClassic",
      accent: "#2dd4bf",
      icon: "⬡",
      created: "2026-11-07",
      kicker: "A sideloadable companion app for Meta Quest 2 and newer",
      summary: "A nostalgic Oculus-style launcher, a programmable AI companion, self-diagnostics that buzz your controllers in Morse-like patterns, a build-your-own HUD and an AR semicircle menu. It survives every Meta update and updates itself.",
      stats: [["16", "HUD widgets"], ["3", "AI backends"], ["1", "host it talks to"], ["v0.2.0", "release"]],
      langs: { Kotlin: 199822, Python: 33751, Makefile: 2633 },
      pipeline: [
        ["Developer Mode", "Enable Meta's official developer flag. No account unlock, no bootloader unlock."],
        ["USB debugging", "Settings → System → Developer: turn on the USB connection dialog and ADB."],
        ["Sideload", "adb install the APK from Releases."],
        ["Open it", "Find it under Library → Unknown Sources on the headset."],
        ["Survives OTAs", "User-installed APKs aren't wiped by Meta's A/B updates, so the app and its data stay."],
        ["Self-update", "Once per launch it checks this repo's GitHub Releases and offers newer APKs through PackageInstaller."]
      ],
      features: [
        ["Launcher", "A retro Oculus grid of every launchable app, tagged VR (teal) or 2D (amber)"],
        ["Diagnostics", "Battery, storage, RAM, network, fingerprint and performance tests; failures buzz the controllers in a code you can look up"],
        ["AI Companion", "Name it, pick Claude, OpenAI or local Ollama, use your own key and system prompt; the key stays on-device"],
        ["Build Tools", "A minimizable HUD built from 16 widgets you switch on and off"],
        ["About", "What your headset really is: model, HorizonOS branch, codename, SoC and both security patch levels"],
        ["AR Home", "A preview of the 90° semicircular hand menu"],
        ["Root panels", "Strip Meta, firmware dump, boot animation and more: dry-run on stock, active only on already-rooted devices"],
        ["Privacy", "It phones home to exactly one host: api.github.com, for updates"]
      ],
      terminal: [
        "$ adb install QuestClassic-release.apk",
        "# or build it yourself (JDK 17 + Android SDK)",
        "$ ./gradlew :app:assembleDebug",
        "$ adb install app/build/outputs/apk/debug/app-debug.apk"
      ],
      architecture: [
        ["app/", "Android app source in Kotlin + Compose"],
        ["tools/", "Zero-dependency Python tools for reading Meta OTAs you obtained yourself"],
        ["docs/", "Architecture, buzz patterns, AR path, widget SDK, AI backends, achievements"],
        ["build.yml", "Builds a debug APK on every push and PR"],
        ["release.yml", "Builds a signed or unsigned release APK on every v* tag"]
      ],
      downloads: [
        ["Headset", "Meta Quest 2 or newer"],
        ["File", "app-release-unsigned.apk from Releases"]
      ],
      limits: [
        "A stock Quest can't replace the boot animation or strip Meta apps; those panels need a device rooted by other means.",
        "It includes no root exploit, and won't.",
        "The boot menu, signing keys, signature permissions and kernel modules are off-limits even with root.",
        "It ships only original code: no Meta firmware, OTAs or decompiled APKs."
      ],
      license: "MIT",
      release: "v0.2.0"
    },
    {
      id: "numberlock",
      name: "NumberLock",
      repo: "NumberLock",
      accent: "#facc15",
      icon: "#",
      created: "2026-10-26",
      kicker: "Turn any file, folder or app into a password-locked .txt of numbers, and back",
      summary: "Lock something and you get a .txt full of digits. Send it however you like. Anyone with NumberLock and the password turns it back into the original. Everything happens offline.",
      stats: [["~5 MB", "portable app"], ["3", "platforms"], ["0", "installers"], ["v1.0.0", "released"]],
      langs: { Rust: 31021, Shell: 3229, Python: 2727 },
      pipeline: [
        ["Drop", "Drop a file, folder or app onto the window, or use Choose files… / Choose folder…"],
        ["Password", "Type a password twice."],
        ["Lock it", "The data is compressed, encrypted and written as nothing but digits."],
        ["Send", "Small things fit in a text message; large apps go as an attachment."],
        ["Unlock", "Drop the .txt in or paste the numbers, type the password, press Unlock."],
        ["Restored", "Files, folders, permissions and links come back exactly, so locked apps still run."]
      ],
      features: [
        ["Tamper detection", "A wrong password, or a single changed digit, is detected and refused"],
        ["Cross-platform files", "Lock on a Mac, unlock on Windows or Linux"],
        ["Size", "Expect a .txt roughly 2× the size of a zipped copy"],
        ["Interface", "Rust with egui; native file dialogs via rfd"],
        ["Fidelity", "src/fsio.rs rebuilds permissions, links and empty folders"],
        ["Private core", "src/core.rs (encryption, password hashing, number conversion) isn't published"]
      ],
      terminal: [
        "# macOS: right-click NumberLock.app → Open → Open",
        "# Windows: SmartScreen → More info → Run anyway",
        "$ chmod +x NumberLock-Linux.AppImage",
        "$ ./NumberLock-Linux.AppImage"
      ],
      architecture: [
        ["src/main.rs", "The window, buttons and app flow"],
        ["src/fsio.rs", "Reading files and folders and rebuilding them"],
        ["src/core.rs", "Not published: encryption, password hashing, number conversion"],
        ["assets/", "App icon and the script that draws it"],
        ["package.sh", "Builds and packages all three apps from a Mac"]
      ],
      downloads: [
        ["macOS", "NumberLock-Mac.zip (Apple Silicon + Intel)"],
        ["Windows 10/11", "NumberLock-Windows.exe"],
        ["Linux", "NumberLock-Linux.AppImage"]
      ],
      limits: [
        "There is no password recovery. Without the password, nobody can unlock the data.",
        "The apps aren't signed with a paid certificate, so the OS warns on first launch.",
        "Because src/core.rs is private, the repository doesn't build on its own; use Releases."
      ],
      license: "See repo",
      release: "v1.0.0"
    },
    {
      id: "quoder",
      name: "Quoder",
      repo: "Quoder",
      accent: "#e879f9",
      icon: "⌘",
      created: "2026-11-03",
      kicker: "Let a model on your own computers use your Mac",
      summary: "A native macOS app that gives a locally hosted model the terminal, your files and the screen: reading it, clicking and typing. No cloud, no account. It talks to any OpenAI-compatible server such as llama.cpp's llama-server.",
      stats: [["12", "tools"], ["3", "safety layers"], ["0", "cloud"], ["macOS 15+", "Apple Silicon"]],
      langs: { Swift: 64819, Shell: 462 },
      pipeline: [
        ["Connect", "Quoder opens an SSH tunnel to the computer running the model, so the server only listens on 127.0.0.1."],
        ["Ask", "Type a task. The model picks tools: run a command, edit a file, read the screen, click."],
        ["Self-check", "Before any action that changes something, the model gets a second look and confirms or corrects it."],
        ["Hard stop", "Commands that could wipe the Mac always ask you first, whatever the model decided."],
        ["Act", "Every action shows as a card you can open to see exactly what ran and what came back."],
        ["Stop", "A Stop button ends it at any time."]
      ],
      features: [
        ["run_command", "Runs any zsh command and returns its output"],
        ["Files", "read_file, write_file, edit_file and list_directory"],
        ["screen_text", "Reads every piece of text on screen with its position using Apple Vision OCR, for models that can't see images"],
        ["ui_elements", "Lists the frontmost app's buttons, fields and menus with positions via Accessibility"],
        ["Hands", "click, type_text, press_keys, scroll and open: uses the Mac like a person would"],
        ["Disaster list", "Erasing disks, rm -rf / or ~, mkfs, dd to a disk and disabling SIP always need your OK"],
        ["Built for", "Qwen2.5 Coder 32B split across GPUs on several machines with llama.cpp's RPC backend"],
        ["Headless", "--run executes one task without a window and prints every step"]
      ],
      terminal: [
        "$ git clone https://github.com/A-Hackers-Guide/Quoder.git",
        "$ cd Quoder",
        "$ packaging/build-app.sh",
        "$ ~/Applications/Quoder.app/Contents/MacOS/Quoder --run \"How many files are in my Downloads folder?\""
      ],
      architecture: [
        ["packaging/build-app.sh", "Builds and signs ~/Applications/Quoder.app"],
        ["docs/SERVER.md", "Running Qwen2.5 Coder 32B across a Windows PC's GPUs and a Mac's GPU, and what didn't work"],
        ["Permissions", "Two start-screen buttons grant Accessibility (click and type) and Screen Recording (read the screen)"]
      ],
      downloads: [
        ["Requires", "macOS 15 or later on Apple Silicon, plus Xcode or the Swift toolchain"],
        ["Model server", "Any OpenAI-compatible endpoint, e.g. llama-server"]
      ],
      limits: [
        "You give it full use of your Mac; keep the self-check on.",
        "Text the model reads, like web pages and files, can try to steer it, so be careful what you point it at.",
        "There's no prebuilt download yet; you build it from source."
      ],
      license: "MIT",
      release: "source"
    },
    {
      id: "scoreforge",
      name: "ScoreForge",
      repo: "scoreforge",
      accent: "#fbbf24",
      icon: "♪",
      created: "2026-11-01",
      kicker: "Audio to sheet music, with a full MIDI editor. No AI.",
      summary: "Load a song, pull out its melody with classic signal processing, fix it in a piano roll, play it back and print a real score. Pure DSP from start to finish.",
      stats: [["4", "pitch detectors"], ["8", "audio formats"], ["3", "export types"], ["0", "AI"]],
      langs: { JavaScript: 46856, HTML: 4572, CSS: 3737 },
      pipeline: [
        ["Load", "mp3, wav, flac, ogg, m4a, aac, opus or webm."],
        ["Clean up", "Vocal reduce (karaoke-style L−R subtract) or vocal isolate (center emphasis)."],
        ["Transcribe", "Pull the dominant melody into MIDI with YIN, AMDF, Dynamic Wavelet or Autocorrelation."],
        ["Edit", "Draw, erase, move and resize notes in a canvas piano roll; add tracks and swap instruments."],
        ["Play", "Hear it through a built-in Tone.js synth, one instrument per track."],
        ["Engrave", "Render sheet music with VexFlow, then export MIDI, MusicXML or a printed PDF."]
      ],
      features: [
        ["Piano roll", "Tempo, time signature, snap, key and zoom are all adjustable"],
        ["Keyboard", "Arrows nudge pitch and time, Shift+↑/↓ jumps octaves, Ctrl/Cmd+A selects all"],
        ["Score", "Clef, key signature and time signature are configurable"],
        ["MusicXML", "Hand-rolled export that loads in MuseScore, Finale, Sibelius, Dorico and Flat.io"],
        ["MIDI", "Export via @tonejs/midi"],
        ["Simple project model", "Tempo, beats per bar and tracks of notes with pitch, start, duration and velocity"]
      ],
      terminal: [
        "$ npm install",
        "$ npm start",
        "$ npm run build:all   # AppImage, dmg and NSIS .exe"
      ],
      architecture: [
        ["Transcription", "Monophonic pitch tracking, frame by frame"],
        ["Playback", "Tone.js synth presets"],
        ["Notation", "VexFlow"],
        ["Shell", "Electron, packaged for Linux, macOS and Windows"]
      ],
      downloads: [
        ["Linux", ".AppImage"],
        ["macOS", ".app / .dmg"],
        ["Windows", ".exe installer"]
      ],
      limits: [
        "It assumes one dominant melody per frame; full band mixes drift to whatever is loudest.",
        "Vocal reduction only works when the vocal is panned center, and it also removes kick, snare and bass.",
        "No AI stem separation, by design.",
        "What you do with transcriptions of copyrighted recordings is up to you."
      ],
      license: "MIT",
      release: "v0.1.0"
    },
    {
      id: "apivis",
      name: "APIvis",
      repo: "APIvis-public",
      accent: "#34d399",
      icon: "{ }",
      created: "2026-09-21",
      kicker: "A native macOS visual development environment for APIs",
      summary: "Import, explore, test and document REST, OpenAPI, Postman and HAR. Pure AppKit written in code, with secrets kept in the macOS Keychain.",
      stats: [["4", "import formats"], ["4", "code generators"], ["25", "runs of history"], ["v0.2.0", "status"]],
      langs: { Swift: 272033, Makefile: 2053, Shell: 691 },
      pipeline: [
        ["Import", "cURL, OpenAPI/Swagger 3.x and 2.0 (JSON or YAML), Postman v2.0/2.1, or HAR."],
        ["Explore", "Collections → tag groups → endpoints in a sidebar with a live filter."],
        ["Request", "Method, URL, headers, query params, body, and {{VARIABLE}} environments."],
        ["Authenticate", "Bearer, Basic, or API key per collection; secrets live in the Keychain."],
        ["Assert", "Checks on status, body, headers, duration or a JSON path."],
        ["Run", "The collection runner runs every endpoint with a pass/fail report."]
      ],
      features: [
        ["OpenAPI import", "Tags become groups, parameters become editable rows, bodies get samples from the schema with local $refs followed"],
        ["HAR import", "Static assets filtered out and repeated calls collapsed into one endpoint"],
        ["Responses", "Status, timing and byte count; JSON tree, pretty, raw and headers views"],
        ["Filtering", "By substring or JSON path like $.data.items[0].name"],
        ["Code generation", "cURL, JavaScript (fetch), Python (requests) and Swift (URLSession)"],
        ["Git-friendly", "Projects save as a .apivis folder, one JSON file per collection"],
        ["Secret masking", "Generated code, exports and tooltips show YOUR_SECRET_HERE instead of live values"],
        ["Tested core", "Model, Import and Net have no AppKit dependency and are covered by tests"]
      ],
      terminal: [
        "$ make            # compile and assemble build/APIvis.app",
        "$ make install    # replace /Applications/APIvis.app",
        "$ make run        # install, then launch",
        "$ make test       # run the unit tests",
        "$ make dist       # snapshot a versioned zip"
      ],
      architecture: [
        ["Sources/APIvis/Model/", "Project, auth, assertions, history, JSON tree + path"],
        ["Sources/APIvis/Import/", "cURL, OpenAPI, Postman and HAR importers"],
        ["Sources/APIvis/Export/", "Code generation, OpenAPI and Markdown export"],
        ["Sources/APIvis/Net/", "Request execution, collection runner, Keychain"],
        ["Sources/APIvis/UI/", "AppKit view controllers and the menu bar, Auto Layout in code"],
        ["Tests/APIvisTests/", "Unit tests for the non-UI layers"]
      ],
      downloads: [
        ["Requires", "macOS 13+ and Xcode command line tools (Swift 5.10+)"],
        ["Signing", "Ad-hoc: runs locally, not yet distributable"]
      ],
      limits: [
        "One window, and no request tabs yet.",
        "The collection runner is sequential, with no concurrency control or retries.",
        "JSONPath is a deliberate subset: $.a.b, [0], [-1], [*].",
        "Not built yet: the visual node canvas, MCP Studio, AI model hub, agents and workflow automation."
      ],
      license: "See repo",
      release: "v0.2.0"
    },
    {
      id: "duomap",
      name: "iPhone Duo Hardware Map",
      repo: "iphone-duo-hardware-map",
      accent: "#86efac",
      icon: "⌗",
      created: "2026-10-30",
      kicker: "How every part of the iPhone Duo is wired to, and driven by, iOS 27.2",
      summary: "A map from silicon block, bus, interrupt and IOMMU up to the daemons and frameworks, for the iPhone Duo (iPhone19,4, board V68AP, A20 Pro t8160). Built from the device's own restore image, with every claim labelled by its evidence.",
      stats: [["43,258", "pages"], ["3.5M", "lines"], ["552", "device-tree nodes"], ["150", "claims re-checked"]],
      langs: { HTML: 366504, Python: 123686, Shell: 5207 },
      pipeline: [
        ["Read the image", "The iOS 27.2 restore image (build 24B91020) is read with blacktop's ipsw tool."],
        ["Parse", "The device tree is parsed byte-exact: properties decoded, register windows turned into physical addresses."],
        ["Bind", "Each hardware node is matched to the kernel driver that binds it and the firmware its processor runs."],
        ["Climb", "From kexts up to the userland daemons and frameworks that own each subsystem."],
        ["Label", "Every claim is tagged [DT], [KC], [FW], [DSC], [PUB], [RD] or [INF] for inference."],
        ["Fact-check", "Four passes re-checked 150 claims and corrected 35."]
      ],
      features: [
        ["15 chapters", "From SoC, boot and security through GPU, sensors, power and radios to a cold boot traced across every processor"],
        ["What makes it a Duo", "A device-tree diff against an iPhone 18 Pro and the virtual iPhone: the 51 Duo-only nodes"],
        ["Kernel", "All 322 kexts and 3,388 C++ classes, one page each, plus BSD syscalls, Mach traps and MIG routines"],
        ["Firmware", "All 56 firmware images and 277 standalone ramdisk firmware files"],
        ["Userland", "All 4,776 dyld-cache images and 33,249 Objective-C classes and protocols from hardware-facing frameworks"],
        ["Explorer", "A single-file HTML browser that searches all 552 device-tree nodes"],
        ["duomap.py", "Command-line queries: who binds a driver, which block owns an interrupt or address"],
        ["Honest depth", "No transistor layouts, internal register specs or encrypted firmware contents: it says where it stops"]
      ],
      terminal: [
        "$ python3 tools/duomap.py node display1",
        "$ python3 tools/duomap.py who gpu,t8160",
        "$ python3 tools/duomap.py irq 1226",
        "$ python3 tools/duomap.py addr 0x2a8000000",
        "$ python3 tools/duomap.py unbound"
      ],
      architecture: [
        ["docs/", "The 15 chapters, plus ARCHITECTURE, TOUR and the master MAP"],
        ["reference/", "Generated pages: device tree, kexts, kernel classes, firmware, ramdisks, userland, Obj-C classes"],
        ["reference/compare/", "Duo vs iPhone 18 Pro, and Duo vs the vphone600 VM"],
        ["explorer/index.html", "Offline device-tree browser"],
        ["tools/", "2,806 lines of Python that generate everything"],
        ["data/", "Raw and structured inputs with per-chapter evidence"]
      ],
      downloads: [
        ["Read it", "Start with docs/TOUR.md"],
        ["Device", "iPhone19,4 · V68AP · t8160 / A20 Pro"],
        ["OS", "iOS 27.2, build 24B91020"]
      ],
      limits: [
        "No transistor-level layouts, schematics or board netlists: those aren't public.",
        "No Apple internal register specifications.",
        "Encrypted firmware, including most of the SEP and parts of the baseband, can't be read.",
        "Apple firmware and binaries aren't included, only derived tables, short excerpts and analysis.",
        "tools/build_all.sh is syntax-checked but hasn't been run end to end yet."
      ],
      license: "See repo",
      release: "iOS 27.2"
    },
    {
      id: "vphoneduo",
      name: "vphone Duo",
      repo: "vphone-duo",
      accent: "#cbd5e1",
      icon: "▯▯",
      created: "2026-10-30",
      fork: true,
      kicker: "A virtual foldable iPhone Duo on an Apple Silicon Mac",
      summary: "This fork of Lakr233's vphone-cli adds the iPhone Duo: it boots iOS 27.2 for Apple's foldable and shows it as a 3D phone you fold with a slider while iOS reads the exact hinge angle. Everything else is vphone-cli, under its MIT license.",
      stats: [["iOS 27.2", "guest"], ["2", "finishes"], ["64 GB", "virtual disk"], ["2.14.2", "Duo bundle"]],
      langs: { Swift: 9240930, C: 1361308, "Objective-C": 1049681, Shell: 198836, Python: 41018, Makefile: 31982, "Objective-C++": 9039 },
      pipeline: [
        ["Get Launchpad", "Install vphone-launchpad 2.13 or newer from vphone-cli's releases."],
        ["Prepare the Mac", "Apple Silicon on macOS 15+, with SIP's debugging restrictions relaxed in Recovery."],
        ["Download the Duo", "Grab the VPhone-Duo bundle from this repo's Releases and unzip it."],
        ["Add the bundle", "Install it into Launchpad with vphone-launchpad-cli."],
        ["Create the Duo", "It downloads the iPhone Duo firmware and restores iOS 27.2."],
        ["Fold it", "Fold with a slider, click its screens and keys from any side, in Star White or Space Black."]
      ],
      features: [
        ["Hinge angle", "iOS reads the exact angle you set with the slider"],
        ["3D phone", "Click the screens and keys from any side"],
        ["Graphical window", "Use the virtual iPhone's screen on your Mac, with screenshots and recordings (from vphone-cli)"],
        ["Backup & cloning", "Export, import and clone VMs (from vphone-cli)"],
        ["Automation API", "Optional local HTTP and WebSocket interface (from vphone-cli)"],
        ["Open boot ROMs", "New VMs start from OpenAVB and OpenSEP, so nothing Apple wrote runs before iBoot and SEPOS (from vphone-cli)"]
      ],
      terminal: [
        "# in macOS Recovery, then restart",
        "$ csrutil enable --without debug",
        "$ csrutil allow-research-guests enable",
        "$ /Applications/vphone-launchpad.app/Contents/MacOS/vphone-launchpad-cli bundle install-local ~/Downloads/VPhone.bundle --keep-default"
      ],
      architecture: [
        ["Documents/Guides/iphone-duo.md", "The iPhone Duo guide"],
        ["VPhone.bundle", "The bundle Launchpad runs; the Duo ships as one"],
        ["~/.vphone/", "Where VMs are stored"],
        ["Upstream", "vphone-cli by Lakr233: Virtualization.framework + PCC research VMs"]
      ],
      downloads: [
        ["Bundle", "VPhone-Duo-2.14.2.zip"],
        ["Host", "A physical Apple Silicon Mac on macOS 15+ (not a macOS VM)"],
        ["Space", "64 GB per VM by default, plus firmware"]
      ],
      limits: [
        "It's a bundle for vphone-launchpad, not a standalone app.",
        "It needs SIP's debugging restrictions relaxed (SIP stays on).",
        "Restoring fetches signing tickets online.",
        "Most of the code is upstream vphone-cli, so it's left out of this page's language totals."
      ],
      license: "MIT",
      release: "duo-2.14.2"
    },
    {
      id: "usbkit",
      name: "usb-overclock-kit",
      repo: "usb-overclock-kit",
      accent: "#f87171",
      icon: "⚡",
      created: "2026-11-01",
      kicker: "Recon, backup, benchmarking and honest tuning for USB flash drives",
      summary: "A USB flash controller has no clock multiplier. The real knobs, like over-provisioning, pSLC cache, link mode and thermal setpoint, live in the vendor MPTool INI. This kit generates those INIs for a workload, with a revert path.",
      stats: [["5", "profiles"], ["7", "docs chapters"], ["+400%", "4K random write"], ["v0.1.0", "release"]],
      langs: { Python: 35030, Shell: 9848 },
      pipeline: [
        ["Recon", "recon.py enumerates USB drives and maps VID:PID to a controller family."],
        ["Back up", "bench.sh backs up the drive before anything destructive."],
        ["Benchmark", "Measure stock performance."],
        ["Generate", "tune.py writes an INI overlay with just the lines to change, plus a host script."],
        ["Flash", "Merge the overlay into your MPTool base INI and flash it with the vendor tool on Windows."],
        ["Revert", "tune.py revert prints the procedure to restore the stock firmware and INI."]
      ],
      features: [
        ["swap-aggressive", "Tuned for a Linux swap workload"],
        ["balanced", "Fixes the stock defaults"],
        ["undervolt-cool", "Low power, low heat"],
        ["endurance", "Maximum lifetime"],
        ["max-throughput", "Peak numbers for benchmarks"],
        ["Controllers", "Phison, Silicon Motion, Alcor and Innostor families"],
        ["Teardown docs", "Opening the drive, chip ID, safety and bricking modes"],
        ["Honest numbers", "Nobody doubles a drive's peak sequential read by firmware tuning"]
      ],
      terminal: [
        "$ ./tools/recon.py",
        "$ ./tools/bench.sh backup /dev/diskN ~/usbdrive-backup.img",
        "$ ./tools/tune.py apply --vid-pid 13fe:5500 --profile swap-aggressive",
        "$ ./tools/tune.py list-profiles"
      ],
      architecture: [
        ["tools/recon.py", "Enumerate USB drives and controllers"],
        ["tools/bench.sh", "Backup, restore and benchmark"],
        ["tools/tune.py", "Generate INI overlays and host scripts, or a revert runbook"],
        ["data/controllers.json", "VID:PID → controller family lookup"],
        ["data/profiles/", "The five workload profiles"],
        ["docs/", "From opening the drive to the Phison MPALL PS2309 workflow"]
      ],
      downloads: [
        ["macOS & Linux", "Recon, backup, benchmark and INI generation"],
        ["Windows", "INI generation, plus the vendor MPTool for the actual flash"]
      ],
      limits: [
        "The firmware flash step needs closed-source Windows vendor tools; there's no macOS or Linux equivalent.",
        "Tuning trades capacity for speed: a 64 GB stick may end up at 30–50 GB.",
        "Peak sequential read stays the same; the gains are in random and sustained writes.",
        "Always back up first: flashing can brick a drive."
      ],
      license: "MIT",
      release: "v0.1.0"
    },
    {
      id: "blockflow",
      name: "BlockFlow",
      repo: "BlockFlow",
      accent: "#38bdf8",
      icon: "▤",
      created: "2026-10-17",
      kicker: "A reimagined block-based exe maker for Windows",
      summary: "Snap blocks together to build a little program, like asking questions, copying files, making folders, looping and branching. Then turn it into a standalone .exe you can hand to anyone.",
      stats: [["16+", "block types"], ["1", "file: the .exe"], ["CC0", "public domain"], ["Win 10/11", "platform"]],
      langs: { "C#": 170551, PowerShell: 11143 },
      pipeline: [
        ["Drag", "Pull blocks from the palette onto the canvas."],
        ["Configure", "Fill in each block's settings."],
        ["Run order", "Blocks run top to bottom, like a recipe, with If/Else and Repeat for logic."],
        ["Pack files", "Anything in the project's copy folder gets packed inside the finished .exe."],
        ["Save as .exe", "File → Save (as .exe), and optionally set the name, icon, details or a desktop shortcut."],
        ["Edit later", "The project lives inside the .exe: open it in BlockFlow to keep editing, or export a .bflow."]
      ],
      features: [
        ["Ask the user", "For text, yes or no, a choice from a list, or a file or folder"],
        ["Files and folders", "Write text files; copy, move or copy many files; create files or folders"],
        ["Logic", "If / Else / End If, Repeat / Exit Repeat, variables, and next free number"],
        ["Output", "Show a message, open a folder, write to the log, wait, or stop the flow"],
        ["Copy folder", "Bundle files into the .exe so it can install them wherever the user chooses"],
        ["Crash recovery", "If BlockFlow closes unexpectedly, it offers to recover the project next time"]
      ],
      terminal: [
        "# build from source (.NET 10 SDK on Windows)",
        "> dotnet build src/BlockFlow.csproj -c Release"
      ],
      architecture: [
        ["src/BlockFlow.csproj", "The C# app"],
        [".exe output", "A standalone program with the project embedded inside it"],
        [".bflow", "The project exported as its own file"]
      ],
      downloads: [
        ["Windows 10/11", "BlockFlow.exe from Releases"],
        ["Mirror", "Also on SourceForge as ahg-blockflow"]
      ],
      limits: [
        "Windows only.",
        "Blocks run strictly top to bottom; branching is through If/Else and Repeat blocks."
      ],
      license: "CC0 1.0",
      release: "v21.76.91"
    },
    {
      id: "archaeologist",
      name: "Digital Archaeologist",
      repo: "digital-archaeologist",
      accent: "#fb923c",
      icon: "⌕",
      created: "2026-09-13",
      live: "https://a-hackers-guide.github.io/digital-archaeologist/",
      kicker: "Extension-independent binary archaeology for any file",
      summary: "Identifies what a file really is from its bytes, not its name: files, disk images, archives, firmware, databases, executables and unknown data. Read-only on the input, with zero third-party runtime dependencies.",
      stats: [["70+", "formats"], ["14", "carvable formats"], ["50", "promises in the README"], ["0", "runtime deps"]],
      langs: { "C++": 21903, Shell: 990, CMake: 736, PowerShell: 556, Batchfile: 441 },
      pipeline: [
        ["Identify", "Magic-number detection for 70+ formats, independent of the file extension."],
        ["Score", "Every detection gets weighted evidence and a confidence, not a flat yes or no."],
        ["Fingerprint", "Streaming SHA-256 and CRC-32 over the whole file, even files larger than RAM."],
        ["Dig", "Entropy, ASCII + UTF-16LE strings, hex dumps, and substring or byte-pattern search with every offset."],
        ["Timeline", "Filesystem mtime plus timestamps inside ZIP, PE, GZIP and PDF files."],
        ["Carve", "Optionally pull embedded streams out of unknown blobs by signature into a separate folder."]
      ],
      features: [
        ["Multi-detection", "One file can match several signatures, e.g. ZIP + CRX or Mach-O FAT + Java class, each reported"],
        ["ISOBMFF dispatcher", "One ftyp check resolves MP4, M4A, MOV, HEIF/HEIC, AVIF, 3GP and Canon CR3"],
        ["Carving", "ZIP, GZIP, PNG, JPEG, PDF, ELF, PE, 7z, RAR, BZIP2, XZ, Ogg, Matroska and SQLite; nothing decompressed or executed"],
        ["Containers", "Lists what's inside ZIP, TAR and GZIP files"],
        ["Partitions", "MBR and GPT evidence for disk images"],
        ["Directory scans", "--scan lists path, format, size and SHA-256 for every file"],
        ["Hard limits", "No shell execution, no network calls, and a --max-size cap on in-memory analysis (default 2 GiB)"],
        ["Tested hard", "NIST SHA-256 vectors, CRC-32 vectors, carver round-trips, ASan + UBSan, and libFuzzer on every PR"]
      ],
      terminal: [
        "$ archaeologist suspicious.bin",
        "$ archaeologist --json suspicious.bin",
        "$ archaeologist --hash --crc32 --entropy --strings suspicious.bin",
        "$ archaeologist --partitions disk.img",
        "$ archaeologist --timeline report.pdf",
        "$ archaeologist --carve ./out firmware.img",
        "$ archaeologist --scan ./evidence"
      ],
      architecture: [
        ["tests/", "Detection, SHA-256, CRC-32, Base64, strings, carver and timeline tests"],
        ["Fuzzing", "libFuzzer targets on analyze_bytes and carve, run under ASan + UBSan"],
        ["macos/", "An Xcode project alongside the CMake build"],
        ["Docs site", "Full CLI reference, format catalog and JSON schema"],
        ["CMake", "One tree builds natively on Linux, macOS and Windows"]
      ],
      downloads: [
        ["Linux", "archaeologist-linux"],
        ["macOS", "archaeologist-macos"],
        ["Windows", "archaeologist-windows.exe"],
        ["From source", "CMake 3.20+ and a C++17 compiler"]
      ],
      limits: [
        "Read-only on the input: it never mounts, modifies or repairs media.",
        "Carving is opt-in and writes only to the folder you give it; carved lengths are conservative estimates.",
        "Structural analysis is capped by --max-size, though SHA-256 still covers the whole file."
      ],
      license: "MIT",
      release: "v2.0.1"
    },
    {
      id: "prism",
      name: "Prism OS",
      repo: "Macbook-World",
      accent: "#c4b5fd",
      icon: "◭",
      created: "2026-11-08",
      kicker: "A retro-computing desktop simulator in your browser",
      summary: "Boot a chime, pick an era, and land in a themed, working desktop. Everything is original art and original code: a parody love letter to four decades of personal computers.",
      stats: [["4", "eras"], ["7", "apps"], ["1", "HTML file export"], ["0", "build step"]],
      langs: { JavaScript: 7571, HTML: 6556, CSS: 5274 },
      pipeline: [
        ["Boot", "An original chime and mascot splash."],
        ["Pick an era", "Choose which decade's look to boot into."],
        ["Set up", "A first-run Setup Assistant with a welcome and a parody license."],
        ["Use it", "Menu bar, dock, draggable windows and a control center."],
        ["Open apps", "Settings, Notes, Calculator, Files, Browser, Transfer and About."],
        ["Take it with you", "Transfer exports the current era as one standalone HTML file that works offline."]
      ],
      features: [
        ["Dawn", "Early pixel era: black and white, a 1-bit vibe"],
        ["Noon", "Beveled platinum: grey and chunky"],
        ["Dusk", "Glossy glass: saturated and wet"],
        ["Nightfall", "Frosted modern: translucent and blurred"],
        ["Original everything", "Imagery, icons, wallpapers, sound and text are original; fonts use the system stack"],
        ["Parody", "Not produced by, endorsed by, or affiliated with any computer company"]
      ],
      terminal: [
        "$ python3 -m http.server 8000",
        "# then open http://localhost:8000"
      ],
      architecture: [
        ["HTML + CSS + JS", "A static site: any file server works"],
        ["Shell", "Menu bar, dock, windows and control center"],
        ["Transfer app", "Writes the current era out as a single HTML file"]
      ],
      downloads: [
        ["Run it", "Any static file server, or GitHub Pages"]
      ],
      limits: [
        "It's a simulator: the apps are small, self-contained parodies, not real system apps."
      ],
      license: "MIT",
      release: "new"
    },
    {
      id: "nin64",
      name: "Nin64",
      repo: "Nin64",
      accent: "#ff4d4d",
      icon: "◓",
      created: "2026-11-08",
      live: "https://a-hackers-guide.github.io/Nin64/",
      kicker: "Walk into classic console home menus and play your own ROMs in the browser",
      summary: "A fancy in-browser boot picker with hand-built recreations of classic Nintendo console home menus. When your machine is powerful enough, it plays your own ROMs inside them. Everything runs locally: no uploads, no server, no accounts.",
      stats: [["9", "consoles"], ["7", "playable in-browser"], ["4", "hardware tiers"], ["0", "Nintendo assets"]],
      langs: { JavaScript: 122527, CSS: 69010, HTML: 42696 },
      pipeline: [
        ["Benchmark", "A client-side check scores your GPU, WebAssembly features (SIMD, threads, bulk memory) and raw CPU speed."],
        ["Unlock", "Each console needs a tier: Light (NES, SNES), Moderate (N64), Demanding (GameCube, Wii), Extreme (Wii U, Switch)."],
        ["Pick", "Choose a console card from the boot picker."],
        ["Walk in", "Land in a hand-built HTML/CSS/JS recreation of that console's home menu."],
        ["Add ROMs", "Your own ROM files go into a local library in your browser's IndexedDB."],
        ["Play", "EmulatorJS runs a libretro core in WebAssembly right in the tab."]
      ],
      features: [
        ["Menus", "Wii, Wii U, Switch, GameCube, N64, NES and SNES, plus Game Boy and Game Boy Advance"],
        ["Cores", "fceumm (NES), snes9x, mupen64plus_next (N64), dolphin (GameCube and Wii), gambatte (GB), mgba (GBA)"],
        ["Emulator controls", "Save and load states, screenshots, screen recording, cheats, gamepads and fullscreen"],
        ["Honest gating", "A card only unlocks when your machine clears its tier"],
        ["Local only", "ROMs stay in your browser's storage; nothing is uploaded"]
      ],
      terminal: [
        "# open the live site, or serve it yourself",
        "$ python3 -m http.server 8000"
      ],
      architecture: [
        ["assets/js/hardware.js", "Client-only benchmark and tier gating"],
        ["assets/js/emulator.js", "A thin wrapper around EmulatorJS, loaded from its CDN at runtime"],
        ["assets/js/roms.js", "Your local ROM library in IndexedDB"],
        ["assets/js/sound.js", "Menu sounds"],
        ["consoles/", "One folder per console: wii, wiiu, switch, gamecube, n64, nes, snes, gb, gba"]
      ],
      downloads: [
        ["Live", "a-hackers-guide.github.io/Nin64"],
        ["You bring", "Your own legally-owned ROM files"]
      ],
      limits: [
        "Wii U and Switch have no practical browser cores, so they show a friendly message instead.",
        "GameCube and Wii need a Demanding-tier machine to unlock.",
        "It ships no Nintendo code, art, firmware, BIOS or ROMs."
      ],
      license: "See repo",
      release: "live"
    },
    {
      id: "son64",
      name: "Son64",
      repo: "Son64",
      accent: "#3b82f6",
      icon: "△",
      created: "2026-11-08",
      kicker: "A PlayStation-era-inspired boot picker with seven original console menus",
      summary: "Pick a generation and drop into a full-screen HTML recreation of that era's menu style, with animated backdrops, synthesized sound, and keyboard, mouse and touch navigation. Every visual and sound is original.",
      stats: [["7", "console menus"], ["0", "sampled sounds"], ["1", "file per export"], ["0", "Sony assets"]],
      langs: { HTML: 94410, JavaScript: 3763, CSS: 3266 },
      pipeline: [
        ["Carousel", "Seven cards, each painting its own era-themed canvas so you see what you're choosing."],
        ["Detect", "CPU cores, device memory, WebAssembly, WebGL/WebGL2, renderer, screen and pixel ratio."],
        ["Verdict", "Each card says whether its UI will run smoothly and whether in-browser games are possible for that era."],
        ["Boot", "Enter boots a console: Son 1 through Son 5, plus Son Portable and Son Vita."],
        ["Navigate", "Arrows, Enter, Esc, M to mute, and C for Son 5's Control Center."],
        ["Export", "Settings downloads any console as a single HTML file that runs without a server."]
      ],
      features: [
        ["Son 1", "1994-era CRT look with memory cards, config and a scanline overlay"],
        ["Son 2", "Floating wireframe cubes and a 4×2 app grid"],
        ["Son Portable", "A horizontal category list with per-category item strips"],
        ["Son 3", "An animated wave backdrop and a column-of-columns layout"],
        ["Son Vita", "A pastel aurora and two pages of color bubbles"],
        ["Son 4 & 5", "A function rail over a blue sweep; a dark particle sheen with a slide-up Control Center"],
        ["Synth audio", "Ticks, confirms, backs and startup chimes, all generated with Web Audio"],
        ["Uploader", "Every console reads a ROM or disc image into memory only; nothing is sent anywhere"]
      ],
      terminal: [
        "# a static site: open index.html, or",
        "$ python3 -m http.server 8000"
      ],
      architecture: [
        ["index.html", "The boot picker"],
        ["consoles/<name>/index.html", "Each console as its own self-contained page"],
        ["settings/index.html", "Settings and single-file export"],
        [".github/workflows/pages.yml", "Deploys GitHub Pages on every push to main"]
      ],
      downloads: [
        ["Run it", "Any static server or GitHub Pages"]
      ],
      limits: [
        "No emulation core is bundled; the uploaders are shells.",
        "In-browser PS3, PS4 and PS5 emulation doesn't exist, and every uploader says so.",
        "Device memory only shows up in browsers that expose it.",
        "It's an original interpretation per era, not Sony's firmware or assets."
      ],
      license: "MIT",
      release: "new"
    },
    {
      id: "mic64",
      name: "Mic64",
      repo: "Mic64",
      accent: "#22c55e",
      icon: "✕",
      created: "2026-11-08",
      kicker: "A multi-era console dashboard homage with seven original dashboards",
      summary: "A boot picker that drops you into seven fan-made dashboards from 2001 to 2020, each hand-written in plain HTML, CSS, SVG and the Web Audio API. Not an emulator, not firmware, not a game.",
      stats: [["7", "eras"], ["3", "verdict chips"], ["2001→2020", "timeline"], ["0", "Microsoft assets"]],
      langs: { HTML: 149110, JavaScript: 23212, CSS: 12671 },
      pipeline: [
        ["Power on", "A pre-boot splash with a procedural power-on sound."],
        ["Detect", "Cores, memory, WebGL and a synthetic benchmark."],
        ["Verdicts", "Each era tile shows UI / APPS / EMU chips for what your browser can handle."],
        ["Pick an era", "Arrow-key through seven tiles and boot one with an original spin-up sound."],
        ["Use it", "Menus, hover sounds, tab transitions, and Media, Settings, Store and Friends apps."],
        ["Export", "Download any era as one HTML file from the picker's Settings."]
      ],
      features: [
        ["Era I (2001)", "An original green blade wheel"],
        ["Era II (2005)", "HD tabs and a panorama"],
        ["Era II Slim (2010)", "Colored tiles"],
        ["Era III (2013)", "Wide tiles and a snap view"],
        ["Era III Slim (2016)", "A light theme and a 4K HDR media mode"],
        ["Era IV (2020)", "A compact green ribbon-and-resume dashboard, and a flagship hero-tile dashboard"],
        ["Media app", "Opens a local file in an audio or video element"],
        ["ROM drop", "Shows a themed boot-screen simulation only; nothing is uploaded or emulated"]
      ],
      terminal: [
        "$ python3 -m http.server 8000",
        "# then open http://localhost:8000"
      ],
      architecture: [
        ["index.html", "The picker, hardware detection and Settings"],
        ["consoles/*.html", "Seven self-contained dashboard files"],
        ["Audio", "Every sound is procedural, made with Web Audio"]
      ],
      downloads: [
        ["Run it", "Any static server; double-clicking index.html works in some browsers"]
      ],
      limits: [
        "There's no real emulation: in-browser emulation of even the earliest era would be a multi-year project.",
        "Store and Friends are simulated.",
        "Some browsers block local-file navigation between folders, so a tiny static server works better.",
        "It's a non-affiliated fan homage with no Microsoft code, firmware, games, graphics, fonts or audio."
      ],
      license: "MIT",
      release: "new"
    },
    {
      id: "hearth",
      name: "HearthOS",
      repo: "palpod-os",
      accent: "#f472b6",
      icon: "⌂",
      created: "2026-08-04",
      kicker: "The software layer of Hearth, a fully-offline luxury home AI and media server",
      summary: "Everything a single NVIDIA Jetson AGX Orin needs to boot into a working Pod after one install.sh. Nothing leaves the house.",
      stats: [["1,248", "files"], ["35", "commits"], ["14", "services"], ["11", "languages"]],
      langs: { Python: 623839, Swift: 118155, Kotlin: 114991, Shell: 47726, ANTLR: 20864, OpenSCAD: 18872, JavaScript: 14780, PLpgSQL: 9455, CSS: 5177, HTML: 4567, Dockerfile: 1570 },
      pipeline: [
        ["GPU", "Detects the NVIDIA GPU and installs the NVIDIA Container Toolkit."],
        ["Docker", "Installs Docker Engine and the docker compose plugin."],
        ["Configure", "Copies .env.example → .env and asks for the missing values."],
        ["Pull", "Pulls every image in docker-compose.yml."],
        ["First boot", "Creates ZFS datasets if TrueNAS is present, or directories under /var/lib/palpod."],
        ["Up", "docker compose up -d, then prints the URLs to open."]
      ],
      features: [
        ["Media", "Plex, Jellyfin and Audiobookshelf"],
        ["Live TV", "xTeVe feeds M3U/EPG into Plex and Jellyfin as first-class channels"],
        ["Streaming", "Sunshine (GPU-accelerated, Moonlight-compatible) and headless Steam Big Picture"],
        ["Remote desktop", "Self-hosted RustDesk rendezvous + relay; AnyDesk as an opt-in profile"],
        ["Permissions", "View-only by default; AI control is opt-in per device and every session is logged"],
        ["Data", "Postgres 16 backing the pal-web control app"],
        ["Networking", "Traefik reverse proxy with LAN-local TLS on *.palpod.local"],
        ["Sibling repos", "pal-web (control app), pal-voice (LLM + STT + TTS + wake), pal-face (Pygame Sphere face)"]
      ],
      terminal: [
        "$ git clone https://github.com/palpod/palpod-os.git",
        "$ cd palpod-os",
        "$ ./install.sh",
        "$ scripts/pair-remote-device.sh",
        "$ docker compose --profile anydesk up -d"
      ],
      architecture: [
        ["Traefik", "https://traefik.palpod.local · 80/443"],
        ["Plex / Jellyfin", "plex.palpod.local :32400 · jelly.palpod.local :8096"],
        ["Audiobookshelf", "books.palpod.local :13378"],
        ["Sunshine", "sunshine.palpod.local :47990 · streams on 47984–48010"],
        ["pal-web", "pod.palpod.local :3000"],
        ["RustDesk", "hbbs 21115–21116 · hbbr 21117"]
      ],
      downloads: [
        ["MVP hardware", "One Jetson AGX Orin 64GB Developer Kit, Ubuntu 22.04 aarch64"],
        ["Production (future)", "10× Orin NX + 10× Ryzen AI 9 HX 370 on TrueNAS SCALE, 5 TB ECC DDR5, 35 TB NVMe"],
        ["License", "Apache 2.0, Python 3.11+, KiCad 8"]
      ],
      limits: [
        "No Kubernetes here; production Pods use TrueNAS SCALE's app catalog.",
        "No ZFS by default on plain Ubuntu.",
        "Single-node: role reassignment on primary loss is planned for v1.1.",
        "On the Jetson, Steam runs under Proton via Box64 and only part of a library is playable.",
        "TLS uses a self-signed LAN root; nothing should touch the public internet."
      ],
      license: "Apache 2.0",
      release: "MVP"
    }
  ]
};
