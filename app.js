document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Mobile Navigation Menu Toggle
    // ----------------------------------------------------
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when nav link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ----------------------------------------------------
    // 2. Active Navigation link on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ----------------------------------------------------
    // 3. Vulnerability Details Accordion
    // ----------------------------------------------------
    const vulnHeaders = document.querySelectorAll('.vuln-header');
    
    vulnHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Close other items
            const siblingItems = item.parentElement.querySelectorAll('.vuln-item');
            siblingItems.forEach(sibling => {
                if (sibling !== item) {
                    sibling.classList.remove('active');
                }
            });
        });
    });

    // ----------------------------------------------------
    // 4. Interactive Terminal Console Simulator
    // ----------------------------------------------------
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const terminalBody = document.getElementById('terminal-body');

    // Commands dictionary
    const commands = {
        help: () => {
            return `
Available commands:
  <span class="text-accent">about</span>       Display biographical profile.
  <span class="text-accent">skills</span>      List operational skills & tooling.
  <span class="text-accent">services</span>    Show provided cybersecurity audits.
  <span class="text-accent">projects</span>    Details of security disclosures & research.
  <span class="text-accent">vulns</span>       Review discovered e-commerce vulnerabilities.
  <span class="text-accent">contact</span>     Get secure communication endpoints.
  <span class="text-accent">clear</span>       Purge terminal output history.
  <span class="text-accent">help</span>        Print this help menu.
            `;
        },
        about: () => {
            return `
[PROFILE REPORT - ZIDHAN]
- Age: 19 Years Old
- Base: Calicut, Kerala, India
- Education: CA Commerce Grad (2025) // Ethical Hacking Diploma (Oct 2025 - Apr 2026)
- Focus: Cyber Security Researcher & Penetration Tester.
- Description: Made the leap from commerce to tech to pursue a deep curiosity in cybersecurity. Attended Avodha Institute, Calicut. Specialized in ethical hacking, network analysis, and securing public web systems.
            `;
        },
        skills: () => {
            return `
[OPERATIONAL CAPABILITIES]
- Tools: Burp Suite, Nmap, Wireshark, Metasploit, Linux Terminal, Netcat, Nessus.
- Focus Areas: Web Application Auditing, Vulnerability Assessment, Network Traffic Analysis.
- Methodologies: OWASP Top 10 Audits, Responsible Disclosures, Security Reporting.
            `;
        },
        services: () => {
            return `
[CYBERSECURITY SERVICES]
- Web App Audits: Identification of authorization bypass, XSS, SQLi, and configuration flaws.
- Vulnerability Scanning: Host discovery, service detection, and system exposure audits.
- Disclosure Documentation: Formulating PoC reports with reproduction steps & mitigation advice.
            `;
        },
        projects: () => {
            return `
[COMPLETED AUDITS & PROJECTS]
1. E-Commerce Platform Vulnerability Assessment (Responsible Disclosure)
   - Scope: Audited active e-commerce application for security flaws.
   - Identified: Django Debug Mode Enabled, Lack of Rate Limiting, Server Info Leaks.
   - Outcome: Responsibly disclosed findings. Client secured database & satisfied.
2. Storefront Clickjacking Vulnerability (Responsible Disclosure)
   - Scope: Inspected HTTP server boundary defenses on live system.
   - Identified: Missing X-Frame-Options & CSP frame-ancestors directives.
   - Outcome: Confirmed bypass via lightweight HTML container. Disclosed for patch.
3. Port Scanner & Banner Grabber (Python script)
   - Scans system ports and grabs running service banners.
            `;
        },
        vulns: () => {
            return `
[VULNERABILITIES DISCLOSED]
- <span class="text-success">[CRITICAL]</span> Django Debug Mode Enabled:
  Allowed exposure of technical config settings, database models, system paths, and raw variables.
- <span class="text-success">[HIGH]</span> Missing Rate Limiting on Admin Portal:
  Administrative login portal susceptible to brute-force attacks.
- <span class="text-success">[MEDIUM]</span> Clickjacking UI Redirection:
  Missing frame security headers allowed storefront injection in third-party iframe overlays.
- <span class="text-success">[MEDIUM]</span> Server Info Leakage:
  Headers revealed underlying software component models and version numbers.
            `;
        },
        contact: () => {
            return `
[SECURE CHANNELS]
- Primary Email: <a href="mailto:zidhaninfo.sec@gmail.com" class="text-accent">zidhaninfo.sec@gmail.com</a>
- LinkedIn: <a href="https://www.linkedin.com/in/muhammad-zidhan-508b98357" target="_blank" class="text-accent">linkedin.com/in/muhammad-zidhan-508b98357</a>
- Location: Calicut, Kerala, India
            `;
        },
        clear: () => {
            terminalOutput.innerHTML = '';
            return null;
        }
    };

    if (terminalInput) {
        // Automatically focus terminal input on click inside terminal body
        terminalBody.addEventListener('click', () => {
            terminalInput.focus();
        });

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawInput = terminalInput.value;
                const cmd = rawInput.trim().toLowerCase();
                
                // Add command line to history
                const cmdLine = document.createElement('div');
                cmdLine.className = 'terminal-line';
                cmdLine.innerHTML = `<span class="terminal-prompt">guest@zidhan-sec:~$</span> <span>${rawInput}</span>`;
                terminalOutput.appendChild(cmdLine);

                // Execute command
                if (cmd !== '') {
                    const outputLine = document.createElement('div');
                    outputLine.className = 'terminal-line';
                    
                    if (commands[cmd]) {
                        const result = commands[cmd]();
                        if (result !== null) {
                            outputLine.innerHTML = result.trim().replace(/\n/g, '<br>');
                            terminalOutput.appendChild(outputLine);
                        }
                    } else {
                        outputLine.innerHTML = `sh: command not found: <span class="text-success">${cmd}</span>. Type <span class="text-accent">'help'</span> for operations list.`;
                        terminalOutput.appendChild(outputLine);
                    }
                }

                // Reset input
                terminalInput.value = '';
                
                // Auto-scroll terminal body
                terminalBody.scrollTop = terminalBody.scrollHeight;
            }
        });
    }

    // ----------------------------------------------------
    // 5. Contact Form Cryptographic Simulation
    // ----------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Change submit button status
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;

            // Step 1: Encrypting simulation
            formStatus.className = 'form-status sending';
            formStatus.innerHTML = '[System] Initializing secure socket connection...';

            setTimeout(() => {
                formStatus.innerHTML = '[System] Encrypting connection payload with RSA-4096...';
                
                setTimeout(() => {
                    formStatus.innerHTML = '[System] Handshake completed. Broadcasting packet stream...';
                    
                    setTimeout(() => {
                        // Success Feedback
                        formStatus.className = 'form-status success';
                        formStatus.innerHTML = `[SUCCESS] Secure packet broadcasted successfully! Connection request authorized for ${name}.`;
                        
                        // Clear form input fields
                        contactForm.reset();
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnText;

                        // Auto-clear success message after 8 seconds
                        setTimeout(() => {
                            formStatus.innerHTML = '';
                            formStatus.className = 'form-status';
                        }, 8000);

                    }, 1500);
                }, 1200);
            }, 1000);
        });
    }

    // ----------------------------------------------------
    // 6. Dynamic System Timestamps
    // ----------------------------------------------------
    const sysTimestamp = document.getElementById('sys-timestamp');
    if (sysTimestamp) {
        const updateTimestamp = () => {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            sysTimestamp.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds} UTC`;
        };
        updateTimestamp();
        setInterval(updateTimestamp, 1000);
    }
});
