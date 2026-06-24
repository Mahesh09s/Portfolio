document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    // Custom Cursor Logic - Disabled on Touch Devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        const cursorOutline = document.createElement('div');
        cursorOutline.classList.add('cursor-outline');
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Dot moves instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        // Smooth Animation Loop for Outline
        const animateCursor = () => {
            // Linear interpolation for smooth lag
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;

            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(animateCursor);
        }

        animateCursor();

        // Hover Effect for Cursor
        document.querySelectorAll('a, button, .js-tree-node, [role="button"]').forEach(elem => {
            elem.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
            elem.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
        });
    } else {
        document.body.classList.add('touch-device');
    }

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Desktop Sidebar Collapse (Click/Keyboard on Logo to Toggle)
    const logoToggle = document.getElementById('sidebar-toggle');
    const toggleSidebar = (e) => {
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        sidebar.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-collapsed');
    };
    if (logoToggle) {
        logoToggle.addEventListener('click', toggleSidebar);
        logoToggle.addEventListener('keydown', toggleSidebar);
    }

    // Smooth Scrolling for Sidebar Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });

                // Close sidebar on mobile after click
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // Scroll Animations (Advanced)
    const animateElems = document.querySelectorAll('.animate-on-scroll, .fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible'); // Trigger exit animation
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% visible

    animateElems.forEach(elem => observer.observe(elem));

    // Active Link Highlighting
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // Typewriter Effect & Interactive Terminal
    const textToType = "./profile.sh";
    const typingElement = document.getElementById('typing-command') || document.querySelector('.typing-command');
    let typeIndex = 0;

    // Interactive Terminal Elements
    const terminalInput = document.getElementById('terminal-input');
    const terminalInputLine = document.getElementById('terminal-input-line');
    const terminalHistory = document.getElementById('terminal-history');
    const terminalBody = document.querySelector('.terminal-body');

    // Focus input when clicking anywhere in terminal
    if (terminalBody) {
        terminalBody.addEventListener('click', () => {
            if (terminalInput && terminalInputLine.style.display !== 'none') terminalInput.focus();
        });
    }

    const commands = {
        help: () => `
Available commands:
  <span class="code-func">help</span>           - Show this help message
  <span class="code-func">whoami</span>         - Display user info
  <span class="code-func">experience</span>     - Display professional experience timeline
  <span class="code-func">internships</span>    - Display list of internships & traineeships
  <span class="code-func">projects</span>       - List my key projects
  <span class="code-func">skills</span>         - Display all technical skills
  <span class="code-func">certifications</span> - Display all certifications
  <span class="code-func">contact</span>        - Show contact details
  <span class="code-func">resume</span>         - Download resume
  <span class="code-func">clear</span>          - Clear terminal history
  <span class="code-func">ls</span>             - List files
`,
        whoami: () => `
<span style="color: #00ff9d;">Name:</span> Seerla Mahesh
<span style="color: #00ff9d;">Role:</span> Cybersecurity Student | Full Stack Developer | SOC & VAPT Enthusiast
<span style="color: #00ff9d;">College:</span> MITS
<span style="color: #00ff9d;">Department:</span> CSE (Cybersecurity)
<span style="color: #00ff9d;">Current Role:</span> Advanced Cybersecurity Student Intern at Supraja Technologies
`,
        experience: () => `
<span style="color: #00ff9d;">[+] June 2026 – Present:</span> Cybersecurity Research Intern at REVA University
<span style="color: #00ff9d;">[+] May 2026 – Present:</span> Advanced Cybersecurity Student Intern at Supraja Technologies
<span style="color: #00ff9d;">[+] Nov 2025 – Jan 2026:</span> Networking & Security Trainee at Cisco Networking Academy
<span style="color: #00ff9d;">[+] May 2025 – July 2025:</span> Cybersecurity Intern at Redynox Cybersecurity
<span style="color: #00ff9d;">[+] Jan 2025 – Mar 2025:</span> Software Development Intern at Supraja Technologies
<span style="color: #00ff9d;">[+] 2023 – 2027:</span> B.Tech in CSE (Cybersecurity) at MITS (CGPA: 8.1/10)
`,
        internships: () => `
<span style="color: #ffc66d;">Professional Internships:</span>

<span style="color: #00ff9d;">1. Cybersecurity Research Intern</span>
   REVA University | June 2026 – Present
   Threat intelligence research, vulnerability assessment & penetration testing (VAPT), literature reviews, network security analysis.

<span style="color: #00ff9d;">2. Advanced Cybersecurity Student Intern</span>
   Supraja Technologies | May 2026 – Present | Online
   Learning SOC concepts, performing Web Application VAPT, vulnerability assessments, Splunk, Burp Suite, Wireshark, Nmap, Kali Linux.

<span style="color: #00ff9d;">3. Networking & Security Trainee</span>
   Cisco Networking Academy | Nov 2025 – Jan 2026
   Cisco Packet Tracer, VLAN configs, ACL implementations, network security design.

<span style="color: #00ff9d;">4. Cybersecurity Intern</span>
   Redynox Cybersecurity | May 2025 – July 2025
   Security architecture assessment, vulnerability scans, network monitoring, incident response.

<span style="color: #00ff9d;">5. Software Development Intern</span>
   Supraja Technologies | Jan 2025 – Mar 2025
   Backend APIs, secure coding, full-stack web applications.
`,
        projects: () => `
<span class="code-string">1. Prescripto</span>                 - MERN Doctor Booking & Secure Healthcare Portal
<span class="code-string">2. Secure Auth System</span>         - React/Node.js Cyber Defense Authentication System
<span class="code-string">3. Intelligent QR Phishing</span>    - AI-powered QR Phishing Identification & Threat Intel
<span class="code-string">4. Student Teacher Portal</span>      - Supabase Learning Management System
<span class="code-string">5. SIH Alumni Portal</span>           - Smart India Hackathon Alumni Networking Hub
<span class="code-string">6. SecureScan</span>                  - Network Vulnerability Scanner using Nmap APIs
`,
        skills: () => `
<span style="color: #00ff9d;">[+] Programming:</span> Java, C, JavaScript
<span style="color: #00ff9d;">[+] Frontend:</span>    HTML5, CSS3, React.js, Tailwind CSS, Bootstrap
<span style="color: #00ff9d;">[+] Backend:</span>     Node.js, Express.js
<span style="color: #00ff9d;">[+] Database:</span>    MySQL, MongoDB
<span style="color: #00ff9d;">[+] CyberSec:</span>    Kali Linux, Burp Suite, Wireshark, Nmap, Metasploit, OWASP Top 10, Splunk
<span style="color: #00ff9d;">[+] Cloud:</span>       Oracle Cloud Infrastructure (OCI), Microsoft Azure (Basics)
<span style="color: #00ff9d;">[+] OS:</span>          Linux, Kali Linux
<span style="color: #00ff9d;">[+] Tools:</span>       Git, GitHub, VS Code, Linux, Cisco Packet Tracer
`,
        certifications: () => `
- Oracle Cloud Infrastructure 2025 Generative AI Professional
- Google Cybersecurity Certificate
- NPTEL Programming in Java (Elite)
- NPTEL Big Data Computing (Elite)
- Cisco Cybersecurity
- HackerRank Java, C
- Infosys Springboard
`,
        contact: () => `
<span style="color: #00ff9d;">Email:</span>    seerlamahesh17@gmail.com
<span style="color: #00ff9d;">GitHub:</span>   https://github.com/Mahesh09s
<span style="color: #00ff9d;">LinkedIn:</span> https://linkedin.com/in/seerla-mahesh-ba970a290
`,
        resume: () => {
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = 'assets/Seerla_Mahesh_Resume.pdf';
                link.download = 'Seerla_Mahesh_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }, 1000);
            return `<span style="color: #00ff9d;">Downloading Resume...</span>`;
        },
        sudo: () => `<span style="color: #ff5f56;">Permission denied:</span> You are not Mahesh. Nice try!`,
        ls: () => `
<span style="color: #3d8bff;">Documents/</span>
<span style="color: #3d8bff;">Projects/</span>
<span style="color: #fff;">Seerla_Mahesh_Resume.pdf</span>
<span style="color: #fff;">secret.txt</span>
`,
        cat: (args) => {
            if (!args) return "Usage: cat [filename]";
            if (args === "secret.txt") return "You found the flag! {CTF_FLAG_MAHESH_1337}";
            if (args === "Seerla_Mahesh_Resume.pdf") {
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = 'assets/Seerla_Mahesh_Resume.pdf';
                    link.download = 'Seerla_Mahesh_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, 1000);
                return "Downloading Resume...";
            }
            return `cat: ${args}: No such file or directory`;
        }
    };

    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const input = terminalInput.value;
                const parts = input.trim().split(' ');
                const command = parts[0].toLowerCase();
                const args = parts[1];

                // Create command line in history
                const cmdLine = document.createElement('div');
                cmdLine.className = 'shell-line';
                cmdLine.innerHTML = `<span style="color: #00ff9d;">root@kali</span>:<span style="color: #3d8bff;">~</span># ${input}`;
                terminalHistory.appendChild(cmdLine);

                // Process command
                if (command) {
                    let output = '';
                    if (command === 'clear') {
                        terminalHistory.innerHTML = '';
                    } else if (commands[command]) {
                        output = typeof commands[command] === 'function' ? commands[command](args) : commands[command];
                    } else if (command === 'cat') { // Specific handle for cat since it's in the object but needs args
                        output = commands.cat(args);
                    } else {
                        output = `<span style="color: #ff5f56;">bash: ${command}: command not found</span>`;
                    }

                    if (output && command !== 'clear') {
                        const outputDiv = document.createElement('div');
                        outputDiv.className = 'command-output';
                        outputDiv.innerHTML = output;
                        outputDiv.style.marginBottom = '10px';
                        terminalHistory.appendChild(outputDiv);
                    }
                }

                // Reset input and scroll
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    function typeWriter() {
        if (typeIndex < textToType.length) {
            if (typingElement) {
                typingElement.textContent += textToType.charAt(typeIndex);
                typeIndex++;
                setTimeout(typeWriter, 100);
            }
        } else {
            // Typing finished, enable input
            setTimeout(() => {
                const initBr = document.getElementById('initial-br');
                const initOutput = document.getElementById('initial-output');
                const initBr2 = document.getElementById('initial-br-2');
                if (initBr) initBr.style.display = 'block';
                if (initOutput) initOutput.style.display = 'block';
                if (initBr2) initBr2.style.display = 'block';

                if (terminalInputLine) {
                    terminalInputLine.style.display = 'flex';
                    terminalInput.focus();
                }
            }, 500);
        }
    }

    // Start typing when hero (or about) is visible
    // We already have observer logic, but let's make sure it triggers this
    const aboutSection = document.getElementById('about');
    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && typeIndex === 0) {
            typeWriter(); // Reuse the same function
        }
    }, { threshold: 0.5 });

    if (aboutSection) aboutObserver.observe(aboutSection);

    // Hero Section Logic
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        // Scroll Exit Animation
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                heroSection.classList.add('hero-scroll-exit');
            } else {
                heroSection.classList.remove('hero-scroll-exit');
            }
        });
    }

    // Dynamic Torch Effect Logic
    const badges = document.querySelectorAll('.hero-id-badge, #experience');
    badges.forEach(badge => {
        badge.addEventListener('mousemove', (e) => {
            const rect = badge.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            badge.style.setProperty('--x', `${x}px`);
            badge.style.setProperty('--y', `${y}px`);
        });

        // Optional: Reset light when leaving (or keep it at last position)
        badge.addEventListener('mouseleave', () => {
            // Move light off-screen to "turn it off"
            badge.style.setProperty('--x', '-1000px');
            badge.style.setProperty('--y', '-1000px');
        });
    });

    // Interactive Particle Background
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        // Create Particle
        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }
            // Method to draw individual particle
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            // Move the particle, draw the particle
            update() {
                // Check if particle is still within canvas
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }

                // Move particle
                this.x += this.directionX;
                this.y += this.directionY;
                // Draw particle
                this.draw();
            }
        }

        // Create particle array
        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 2) - 1; // Speed
                let directionY = (Math.random() * 2) - 1;
                let color = '#00ff9d'; // Neon Green

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, innerWidth, innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        // Check if particles are close enough to draw line between them
        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = 'rgba(0, 255, 157,' + opacityValue + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        window.addEventListener('resize', function () {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            init();
        });

        init();
        animate();
    }

    // --- SVG Skill Tree Implementation ---
    const skillData = {
        name: "CORE SYSTEM",
        icon: "fas fa-shield-halved",
        open: true, // Root always open initially
        children: [
            {
                name: "Programming",
                icon: "fas fa-laptop-code",
                children: [
                    { name: "Java", icon: "fab fa-java" },
                    { name: "C", icon: "fas fa-file-code" },
                    { name: "JavaScript", icon: "fab fa-js" }
                ]
            },
            {
                name: "Frontend",
                icon: "fas fa-desktop",
                children: [
                    { name: "HTML5", icon: "fab fa-html5" },
                    { name: "CSS3", icon: "fab fa-css3-alt" },
                    { name: "React.js", icon: "fab fa-react" },
                    { name: "Tailwind CSS", icon: "fab fa-css3" },
                    { name: "Bootstrap", icon: "fab fa-bootstrap" }
                ]
            },
            {
                name: "Backend",
                icon: "fas fa-server",
                children: [
                    { name: "Node.js", icon: "fab fa-node-js" },
                    { name: "Express.js", icon: "fas fa-route" }
                ]
            },
            {
                name: "Database",
                icon: "fas fa-database",
                children: [
                    { name: "MySQL", icon: "fas fa-table" },
                    { name: "MongoDB", icon: "fas fa-leaf" }
                ]
            },
            {
                name: "Cybersecurity",
                icon: "fas fa-user-secret",
                children: [
                    { name: "Kali Linux", icon: "fab fa-linux" },
                    { name: "Burp Suite", icon: "fas fa-bug" },
                    { name: "Wireshark", icon: "fas fa-network-wired" },
                    { name: "Nmap", icon: "fas fa-search" },
                    { name: "Metasploit", icon: "fas fa-terminal" },
                    { name: "OWASP Top 10", icon: "fas fa-shield-halved" },
                    { name: "Splunk", icon: "fas fa-chart-line" }
                ]
            },
            {
                name: "Cloud",
                icon: "fas fa-cloud",
                children: [
                    { name: "Oracle Cloud Infrastructure (OCI)", icon: "fas fa-cloud" },
                    { name: "Microsoft Azure (Basics)", icon: "fab fa-microsoft" }
                ]
            },
            {
                name: "Operating Systems",
                icon: "fas fa-display",
                children: [
                    { name: "Linux", icon: "fab fa-linux" },
                    { name: "Kali Linux", icon: "fab fa-linux" }
                ]
            },
            {
                name: "Tools",
                icon: "fas fa-tools",
                children: [
                    { name: "Git", icon: "fab fa-git-alt" },
                    { name: "GitHub", icon: "fab fa-github" },
                    { name: "VS Code", icon: "fas fa-code" },
                    { name: "Linux", icon: "fab fa-linux" },
                    { name: "Cisco Packet Tracer", icon: "fas fa-network-wired" }
                ]
            }
        ]
    };

    const treeContainer = document.getElementById('skill-tree-container');
    const treeSvg = document.getElementById('tree-svg');

    if (treeContainer && treeSvg) {
        // Configuration
        const config = {
            nodeHeight: 40, // Height allocated for each node
            nodeWidth: 200, // Width for calculation purpose (visual width is dynamic)
            levelSpacing: 250, // Horizontal space between levels
            duration: 300 // Animation duration
        };

        // Flatten data to list of visible nodes with coordinates
        function calculateLayout(node, x, y, visibleNodes) {
            node.x = x;
            node.y = y;
            visibleNodes.push(node);

            let currentY = y;
            let totalHeight = 0;

            if (node.children && node.open) {
                // Calculate total height of children to center the parent relative to them
                // Note: Simple tree layout - Parent at top-left of children block, or optimized?
                // Visual preference: Parent aligned with the MIDDLE of its children.

                // First pass: Calculate height of children
                // We need to recursively calculate layout.
                // But we don't know the Y yet if we center.
                // Simplified approach: Just stack children below relative to parent's Y? 
                // No, standard tree: Parent is centered vertically against children.

                // Let's use a naive layout first: simple spacing.
                const childX = x + config.levelSpacing;
                // We need to know how many leaf-nodes the children expand to.
            }
        }

        // Better Approach: Recursive Mind Map Layout (Dendrogram)
        function updateTree() {
            treeContainer.innerHTML = ''; // Clear DOM
            treeSvg.innerHTML = ''; // Clear SVG lines

            // 1. Calculate Layout
            let leafIndex = 0;

            // Helper: Calculate positions recursively
            // node.y will represent the VERTICAL CENTER of the node
            function computeNodePositions(node, level) {
                if (!node) return;

                node.level = level;

                if (node.children && node.open && node.children.length > 0) {
                    // It's a branch - Process children first
                    node.children.forEach(child => computeNodePositions(child, level + 1));

                    // Position Parent at average of First and Last Child
                    const firstChild = node.children[0];
                    const lastChild = node.children[node.children.length - 1];
                    node.y = (firstChild.y + lastChild.y) / 2;
                } else {
                    // It's a leaf (or collapsed) - Stack it
                    // Center of this slot = (index * height) + (height / 2)
                    node.y = (leafIndex * config.nodeHeight) + (config.nodeHeight / 2);
                    leafIndex++;
                }

                // X position: Fixed by level
                node.x = (level * config.levelSpacing) + 50; // 50px padding left
            }

            // Run Layout calculation
            computeNodePositions(skillData, 0);

            // 2. Center Root Vertically
            // Find container center
            const containerHeight = treeContainer.clientHeight || 600;
            const rootY = skillData.y;
            const targetY = containerHeight / 2;
            const yOffset = targetY - rootY;

            // 3. Render Pass
            function renderRecursive(node) {
                // Apply Offset
                const finalX = node.x;
                const finalY = node.y + yOffset;

                // Render Node (HTML)
                const divTop = finalY - 12; // Adjusted for smaller font

                const el = document.createElement('div');
                el.className = 'js-tree-node';
                el.id = `node-${node.name.replace(/\s+/g, '-')}`; // Unique ID
                if (!node.children) el.classList.add('leaf');
                if (node.open) el.classList.add('expanded');

                el.style.left = finalX + 'px';
                el.style.top = divTop + 'px';
                el.innerHTML = `<i class="${node.icon} node-icon"></i> <span>${node.name}</span>`;

                // Interaction: Toggle
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (node.children) {
                        node.open = !node.open;
                        updateTree();
                    }
                });

                // Interaction: Hover Highlight Path
                el.addEventListener('mouseenter', () => highlightPath(node, true));
                el.addEventListener('mouseleave', () => highlightPath(node, false));

                treeContainer.appendChild(el);

                node.finalX = finalX;
                node.finalY = finalY;
                node.width = el.offsetWidth;

                // Render Children & Lines
                if (node.children && node.open) {
                    node.children.forEach(child => {
                        child.parent = node; // Link parent for traversal
                        renderRecursive(child);
                        drawConnector(node, child);
                    });
                }
            }

            renderRecursive(skillData);
        }

        function highlightPath(node, active) {
            let current = node;
            while (current) {
                // Highlight Node
                const el = document.getElementById(`node-${current.name.replace(/\s+/g, '-')}`);
                if (el) {
                    active ? el.classList.add('active-path') : el.classList.remove('active-path');
                }

                // Highlight Connector to Parent
                if (current.parent) {
                    const linkId = `link-${current.parent.name.replace(/\s+/g, '-')}-${current.name.replace(/\s+/g, '-')}`;
                    const path = document.getElementById(linkId);
                    if (path) {
                        active ? path.classList.add('highlighted') : path.classList.remove('highlighted');
                    }
                    current = current.parent;
                } else {
                    current = null;
                }
            }
        }

        function drawConnector(parent, child) {
            const startX = parent.finalX + parent.width + 12;
            const startY = parent.finalY;
            const endX = child.finalX - 12;
            const endY = child.finalY;

            const cp1x = startX + 50;
            const cp1y = startY;
            const cp2x = endX - 50;
            const cp2y = endY;

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            const d = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

            path.setAttribute("d", d);
            path.setAttribute("class", "connector");
            path.id = `link-${parent.name.replace(/\s+/g, '-')}-${child.name.replace(/\s+/g, '-')}`; // Unique ID for path

            if (parent.open) path.classList.add("active");

            treeSvg.appendChild(path);
        }

        // Reset Button
        const resetBtn = document.getElementById('reset-tree');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                // Reset state
                function closeAll(n) {
                    if (n.children) {
                        n.open = false;
                        n.children.forEach(closeAll);
                    }
                }
                closeAll(skillData);
                skillData.open = true; // Keep root open
                updateTree();
            });
        }

        // Initial Render
        updateTree();
    }

    // --- Certifications Dropdown Keyboard-Accessible Logic ---
    const googleCertToggle = document.getElementById('google-cert-toggle');
    const googleCertList = document.getElementById('google-cert-list');
    const googleCertArrow = document.getElementById('google-cert-arrow');

    if (googleCertToggle && googleCertList && googleCertArrow) {
        const toggleGoogleCert = (e) => {
            if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
            if (e.target.tagName === 'A') return;
            
            // If space is pressed, prevent default browser scroll behavior
            if (e.key === ' ') {
                e.preventDefault();
            }

            const isExpanded = googleCertList.style.maxHeight !== '0px' && googleCertList.style.maxHeight !== '0' && googleCertList.style.maxHeight !== '';

            if (isExpanded) {
                // Collapse
                googleCertList.style.maxHeight = '0';
                googleCertList.style.opacity = '0';
                googleCertArrow.style.transform = 'rotate(0deg)';
                googleCertList.style.marginTop = '0';
                googleCertToggle.setAttribute('aria-expanded', 'false');
            } else {
                // Expand
                googleCertList.style.maxHeight = googleCertList.scrollHeight + 'px';
                googleCertList.style.opacity = '1';
                googleCertArrow.style.transform = 'rotate(180deg)';
                googleCertToggle.setAttribute('aria-expanded', 'true');
            }
        };

        googleCertToggle.addEventListener('click', toggleGoogleCert);
        googleCertToggle.addEventListener('keydown', toggleGoogleCert);
    }

    // --- Hero Section Typewriter Animation ---
    const heroTitles = [
        "Cybersecurity Student",
        "Full Stack Developer",
        "SOC Analyst Aspirant",
        "VAPT Enthusiast",
        "Secure Web Developer"
    ];
    let heroTitleIndex = 0;
    let heroCharIndex = 0;
    let isDeleting = false;
    const heroTypingSpeed = 100;
    const heroDeletingSpeed = 50;
    const heroDelayBetweenTitles = 1500;
    const heroTypingElement = document.getElementById('typing-text');

    function animateHeroTypewriter() {
        if (!heroTypingElement) return;
        const currentTitle = heroTitles[heroTitleIndex];
        
        if (isDeleting) {
            heroTypingElement.textContent = currentTitle.substring(0, heroCharIndex - 1);
            heroCharIndex--;
        } else {
            heroTypingElement.textContent = currentTitle.substring(0, heroCharIndex + 1);
            heroCharIndex++;
        }

        let nextSpeed = isDeleting ? heroDeletingSpeed : heroTypingSpeed;

        if (!isDeleting && heroCharIndex === currentTitle.length) {
            nextSpeed = heroDelayBetweenTitles;
            isDeleting = true;
        } else if (isDeleting && heroCharIndex === 0) {
            isDeleting = false;
            heroTitleIndex = (heroTitleIndex + 1) % heroTitles.length;
            nextSpeed = 500; // Small pause before typing next
        }

        setTimeout(animateHeroTypewriter, nextSpeed);
    }
    
    // Start hero typewriter animation
    animateHeroTypewriter();
});

/* Global Proximity Secrets Logic */
document.addEventListener('DOMContentLoaded', () => {
    initGlobalSecrets();
});

function initGlobalSecrets() {
    const container = document.getElementById('global-secrets');
    if (!container) return;

    const secretTexts = [
        'SYSTEM', 'ROOT', 'ACCESS', 'DENIED', 'GRANTED',
        '0x4F', '0xA1', '0xFF', 'CONFIDENTIAL', 'RESTRICTED',
        'IP: 192.168.0.1', 'Analyzing...', 'Decrypted', 'ENCRYPTED',
        'BACKDOOR', 'SHELL', 'SSH', 'PORT:22', 'TRACE',
        // User Requested Tools
        'KALI LINUX', 'SPLUNK', 'WIRESHARK', 'METASPLOIT', 'NMAP',
        'BURP SUITE', 'OWASP TOP 10', 'OCI', 'AZURE', 'GIT',
        'GITHUB', 'VS CODE', 'LINUX', 'REACT.JS', 'NODE.JS',
        'EXPRESS.JS', 'MYSQL', 'MONGODB', 'JAVA', 'C',
        'JAVASCRIPT', 'HTML5', 'CSS3', 'TAILWIND CSS', 'BOOTSTRAP',
        'SQL INJECTION', 'XSS PAYLOAD', 'BUFFER OVERFLOW', 'ZERO DAY'
    ];
    const secretIcons = [
        'fas fa-lock', 'fas fa-user-secret', 'fas fa-code', 'fas fa-terminal',
        'fas fa-shield-alt', 'fas fa-bug', 'fas fa-fingerprint', 'fas fa-network-wired', 'fas fa-eye',
        'fab fa-linux', 'fab fa-git-alt', 'fab fa-docker', 'fab fa-react', 'fab fa-node-js', 'fas fa-database'
    ];

    const bodyHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
    );
    // Increased Density: 1 item per 100px height for complete coverage
    const count = Math.floor(bodyHeight / 100);

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.classList.add('secret-item');

        // Random Content
        if (Math.random() > 0.4) {
            // Text
            el.innerText = secretTexts[Math.floor(Math.random() * secretTexts.length)];
            if (Math.random() > 0.8) el.classList.add('danger');
        } else {
            // Icon
            const iconClass = secretIcons[Math.floor(Math.random() * secretIcons.length)];
            el.innerHTML = `<i class="${iconClass}"></i>`;
            el.style.fontSize = (Math.random() * 2 + 1) + 'rem'; // 1rem to 3rem
            if (Math.random() > 0.7) el.classList.add('tech');
        }

        // Random Position (0-95% width, 0-100% height)
        el.style.left = Math.random() * 95 + '%';
        el.style.top = Math.random() * bodyHeight + 'px';

        // Random Rotation (-30 to +30 deg)
        el.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;

        container.appendChild(el);
    }

    // Global Tracking for Secrets Container
    document.addEventListener('mousemove', (e) => {
        // We update variables on the CONTAINER
        // e.pageX / e.pageY includes scroll, which matches absolute positioning relative to document
        container.style.setProperty('--cursor-x', `${e.pageX}px`);
        container.style.setProperty('--cursor-y', `${e.pageY}px`);
    });
}

/* ==========================================
   Cyberpunk Enhancements JS Implementations
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Boot Sequence
    const loadingScreen = document.getElementById('loading-screen');
    const loadingOutput = document.getElementById('loading-output');
    
    if (loadingScreen && loadingOutput) {
        const bootLines = [
            "Initializing kernel core sequence...",
            "Loading security sub-modules...",
            "Establishing neural link interface...",
            "Connecting to database servers... [ OK ]",
            "Starting firewall daemon...",
            "Injecting security filters...",
            "Clearing cache tables...",
            "Ready. Starting system interface...",
            "ACCESS GRANTED."
        ];
        
        let lineIdx = 0;
        
        function printBootLine() {
            if (lineIdx < bootLines.length) {
                const line = document.createElement('div');
                line.className = 'loading-line';
                line.innerHTML = `<span class="terminal-green">[ * ]</span> ${bootLines[lineIdx]}`;
                loadingOutput.appendChild(line);
                loadingOutput.scrollTop = loadingOutput.scrollHeight;
                
                lineIdx++;
                setTimeout(printBootLine, 120 + Math.random() * 150); // Fast realistic boot
            } else {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transition = 'opacity 0.6s ease';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        document.body.style.overflowY = 'auto';
                    }, 600);
                }, 600);
            }
        }
        
        document.body.style.overflowY = 'hidden';
        setTimeout(printBootLine, 300);
    }

    // 2. Scroll Progress Bar
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const progress = (window.scrollY / totalHeight) * 100;
                scrollProgress.style.width = `${progress}%`;
            } else {
                scrollProgress.style.width = '0%';
            }
        });
    }

    // 3. Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Animated Statistics Counter
    const statsSection = document.querySelector('.stats-banner');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    if (statsSection && statNumbers.length > 0) {
        const countUp = (el) => {
            const target = parseFloat(el.getAttribute('data-target'));
            const isDecimal = el.getAttribute('data-decimal') === 'true';
            const duration = 1500;
            const stepTime = 15;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                current += increment;
                if (step >= steps) {
                    clearInterval(timer);
                    el.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
                } else {
                    el.textContent = isDecimal ? current.toFixed(1) : Math.round(current);
                }
            }, stepTime);
        };

        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    statNumbers.forEach(num => countUp(num));
                }
            });
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    }
});
