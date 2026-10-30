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
      kicker: "Port any project between Windows, macOS, Linux and FreeBSD",
      summary: "Point it at your source code. It maps every OS-specific call, asks a few questions, writes a portable version, and builds it.",
      stats: [["599", "porting rules"], ["4", "target OSes"], ["129", "files"], ["3", "ways to run"]],
      langs: { Rust: 324868, TypeScript: 92365, CSS: 27806, "C++": 13543, C: 10247, Python: 9253, JavaScript: 4298, "C#": 4160, HTML: 362 },
      pipeline: [
        ["Source", "Pick a project folder. Crossfire detects which OS it was written for."],
        ["Analyze", "Every file is scanned against 599 rules. You get a portability score, a heat map, and a suggested fix for each finding."],
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
        ["engine/src/rules/", "599 rules in TOML tables"],
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
      id: "archaeologist",
      name: "Digital Archaeologist",
      repo: "digital-archaeologist",
      accent: "#fb923c",
      icon: "⌕",
      created: "2026-09-13",
      kicker: "Extension-independent binary archaeology for any file",
      summary: "One read-only CLI for files, disk images, archives, firmware blobs, databases, executables and unknown data. It never mounts, modifies or repairs your media.",
      stats: [["20+", "capabilities"], ["3", "native builds"], ["0", "writes to evidence"], ["v2.0.1", "release"]],
      langs: { "C++": 21903, Shell: 990, CMake: 736, PowerShell: 556, Batchfile: 441 },
      pipeline: [
        ["Identify", "Magic and signature detection that ignores file extensions."],
        ["Fingerprint", "SHA-256 integrity hashes."],
        ["Measure", "Entropy and printable-byte analysis."],
        ["Dig", "Strings extraction, hex inspection, ASCII and hex searching."],
        ["Partitions", "MBR and GPT evidence inspection."],
        ["Report", "Human-readable forensic reports or JSON with evidence and confidence."]
      ],
      features: [
        ["Archives", "ZIP, GZIP, BZIP2, XZ, 7z and RAR detection"],
        ["Executables", "PE, ELF and Mach-O-adjacent identification"],
        ["Media & data", "PDF, image, audio and database identification with MIME-style classification"],
        ["Directory scans", "Recursive inventory of a whole evidence folder"],
        ["Unknown formats", "A research mode plus OS-focused unknown modes like --unknown=macos"],
        ["Transport", "Base64 mode for moving data around"],
        ["Safety model", "No kernel driver is silently installed; encryption support is metadata and recovery-path analysis only"],
        ["Builds", "Windows native, macOS (Xcode + Command Line Tools) and Linux"]
      ],
      terminal: [
        "$ archaeologist suspicious.bin",
        "$ archaeologist --json suspicious.bin",
        "$ archaeologist --hash --entropy --strings suspicious.bin",
        "$ archaeologist --partitions disk.img",
        "$ archaeologist --scan ./evidence",
        "$ archaeologist --unknown=macos mystery.img"
      ],
      architecture: [
        ["docs/FEATURES.md", "Feature catalog"],
        ["docs/CLI.md", "Command reference"],
        ["docs/ARCHITECTURE.md", "Internals"],
        ["docs/FORENSICS.md", "Evidence workflow"],
        ["docs/UNKNOWN_FORMATS.md", "Unknown-format research"],
        ["macos/", "Xcode project that checks for Command Line Tools first"]
      ],
      downloads: [
        ["Linux", "archaeologist-linux"],
        ["macOS", "archaeologist-macos"],
        ["Windows", "archaeologist-windows.exe"]
      ],
      limits: [
        "Intentionally read-only: it doesn't mount, modify or repair media.",
        "Experimental filesystem-driver directories are documentation only.",
        "No unrestricted password cracking or security bypass."
      ],
      license: "MIT",
      release: "v2.0.1"
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
