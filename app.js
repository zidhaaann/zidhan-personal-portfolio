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

    // ----------------------------------------------------
    // 7. Standard System Dashboard Logging
    // ----------------------------------------------------
    const dashboardLog = document.getElementById('dashboard-feed-log');
    const dashboardStatusBadge = document.querySelector('.dashboard-badge');
    
    const sysLogs = [
        "Network integrity audit: 100% operational.",
        "Static code analysis completed. 0 vulnerability flags.",
        "Checked active configurations: X-Frame-Options is SAMEORIGIN.",
        "Checked Content-Security-Policy: frame-ancestors verified.",
        "HTTPS connection active. TLS 1.3 handshake verified.",
        "Vulnerability assessment database updated.",
        "Security audit completed for Client #2. Status: Patched.",
        "Monitoring subnets for suspicious traffic... OK.",
        "IDS check: All firewall rules verified."
    ];

    if (dashboardLog) {
        // Randomly append logs to dashboard feed to make it look active
        setInterval(() => {
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            const randomMsg = sysLogs[Math.floor(Math.random() * sysLogs.length)];
            
            const line = document.createElement('div');
            line.className = 'feed-item';
            line.innerHTML = `<span class="feed-time">${timeStr}</span> <span class="feed-msg">${randomMsg}</span>`;
            dashboardLog.appendChild(line);
            
            // Keep logs limited
            while (dashboardLog.children.length > 3) {
                dashboardLog.removeChild(dashboardLog.firstChild);
            }
            
            // Randomly toggle badge status
            if (dashboardStatusBadge) {
                if (Math.random() > 0.8) {
                    dashboardStatusBadge.textContent = "SCANNING";
                    dashboardStatusBadge.style.color = "var(--color-secondary)";
                    dashboardStatusBadge.style.borderColor = "rgba(99, 102, 241, 0.3)";
                    dashboardStatusBadge.style.backgroundColor = "rgba(99, 102, 241, 0.05)";
                    
                    setTimeout(() => {
                        dashboardStatusBadge.textContent = "STANDBY";
                        dashboardStatusBadge.style.color = "var(--color-accent)";
                        dashboardStatusBadge.style.borderColor = "rgba(16, 185, 129, 0.3)";
                        dashboardStatusBadge.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
                    }, 2000);
                }
            }
        }, 5000);
    }

    // ----------------------------------------------------
    // 8. Hacker Text Scrambler Effect
    // ----------------------------------------------------
    const scrambleElements = document.querySelectorAll('.scramble-text');
    const scrambleChars = '0123456789%@$#&?/\<>{}[]';

    scrambleElements.forEach(element => {
        let originalText = element.getAttribute('data-text') || element.innerText;
        let isScrambling = false;

        element.addEventListener('mouseenter', () => {
            if (isScrambling) return;
            isScrambling = true;
            
            let iteration = 0;
            const interval = setInterval(() => {
                let scrambled = '';
                for (let i = 0; i < originalText.length; i++) {
                    if (originalText[i] === ' ') {
                        scrambled += ' ';
                        continue;
                    }
                    if (i < iteration) {
                        scrambled += originalText[i];
                    } else {
                        scrambled += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    }
                }
                
                const span = element.querySelector('.title-number');
                if (span) {
                    element.innerHTML = `<span class="title-number">${span.innerHTML}</span> ` + scrambled.replace(/^\d+\.\s*/, '');
                } else {
                    element.textContent = scrambled;
                }

                if (iteration >= originalText.length) {
                    clearInterval(interval);
                    if (span) {
                        element.innerHTML = `<span class="title-number">${span.innerHTML}</span> ` + originalText.replace(/^\d+\.\s*/, '');
                    } else {
                        element.textContent = originalText;
                    }
                    isScrambling = false;
                }
                iteration += originalText.length / 15;
            }, 50);
        });
    });

    // ----------------------------------------------------
    // 9. VAPT Lab Exploit Simulator
    // ----------------------------------------------------
    const modal = document.getElementById('vapt-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const runBtns = document.querySelectorAll('.run-simulation');
    const modalBody = document.getElementById('modal-terminal-body');
    const modalTitleText = document.getElementById('modal-title-text');
    const modalStatusText = document.getElementById('modal-status-text');

    const exploitPayloads = {
        django: [
            { text: "[!] INITIALIZING DJANGO DEBUG EXPLOIT PROTOCOL...", color: "cyan" },
            { text: "[*] TARGET URL: http://ecommerce-storefront.local", color: "muted" },
            { text: "[*] SENDING REQUEST WITH CUSTOM USER-AGENT...", color: "muted" },
            { text: "[*] PARSING HTTP RESPONSE CONTEXT...", color: "muted" },
            { text: "[!] VULNERABILITY DETECTED: django_settings_debug = True", color: "error" },
            { text: "[*] TRIGGERING STACKTRACE VIA BAD METHOD INJECTION...", color: "muted" },
            { text: "[!] SYSTEM VARIABLE DUMP IN PROGRESS...", color: "warn" },
            { text: "--------------------------------------------------------", color: "muted" },
            { text: "    SECRET_KEY = 'django-insecure-s#e!c!r!e!t!k!e!y!12345'", color: "success" },
            { text: "    AWS_ACCESS_KEY_ID = 'AKIAIOSFODNN7EXAMPLE'", color: "success" },
            { text: "    DB_PASSWORD = 'super_secure_client_pass_2026'", color: "success" },
            { text: "    ALLOWED_HOSTS = ['*']", color: "muted" },
            { text: "--------------------------------------------------------", color: "muted" },
            { text: "[+] EXPLOIT VERIFIED: Local variables successfully leaked.", color: "success" },
            { text: "[+] REPORTING STATUS: VAPT report generated successfully.", color: "success" },
            { text: "[+] MITIGATION PROTOCOL: Set 'DEBUG = False' in settings.py.", color: "cyan" }
        ],
        clickjacking: [
            { text: "[!] INITIALIZING CLICKJACKING EXPOSURE AUDIT...", color: "cyan" },
            { text: "[*] TARGET URL: http://storefront.local/login", color: "muted" },
            { text: "[*] EXAMINING PROXY BOUNDARIES & HTTP RESPONSE HEADER PACKETS...", color: "muted" },
            { text: "[!] WARNING: X-Frame-Options header not found in payload.", color: "warn" },
            { text: "[!] WARNING: Content-Security-Policy 'frame-ancestors' absent.", color: "warn" },
            { text: "[!] SYSTEM VULNERABILITY CONFIRMED: Missing UI Isolation Boundaries.", color: "error" },
            { text: "[*] DEPLOYING MOCK EXPLOIT WRAPPER...", color: "muted" },
            { text: "[*] CREATING ATTACKER LAYER WITH OPACITY = 0.005...", color: "muted" },
            { text: "[*] RENDERING store-login CONTAINER INSIDE IFRAME...", color: "muted" },
            { text: "[!] ALIGNING UI INJECTION DIRECTIVES...", color: "muted" },
            { text: "[+] FRAME BOUNDARY INTRUSION COMPLETED SUCCESSFULLY.", color: "success" },
            { text: "[+] POC VALIDATION: Store credentials capture overlay deployed.", color: "success" },
            { text: "[+] MITIGATION PROTOCOL: Configure web server to send X-Frame-Options: SAMEORIGIN.", color: "cyan" }
        ]
    };

    if (modal && closeBtn) {
        runBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const project = btn.getAttribute('data-project');
                const payload = exploitPayloads[project];
                
                modal.classList.add('active');
                modalStatusText.textContent = "RUNNING";
                modalStatusText.style.color = "#f43f5e";
                modalTitleText.textContent = `VAPT_EXPLOIT_LAB_SIMULATOR // POC_${project.toUpperCase()}`;
                
                modalBody.innerHTML = '';
                
                let step = 0;
                function runStep() {
                    if (step < payload.length) {
                        const line = document.createElement('div');
                        line.style.marginBottom = '0.4rem';
                        
                        const data = payload[step];
                        if (data.color === "cyan") {
                            line.style.color = "var(--color-primary)";
                        } else if (data.color === "error") {
                            line.style.color = "#f43f5e";
                        } else if (data.color === "warn") {
                            line.style.color = "#f97316";
                        } else if (data.color === "success") {
                            line.style.color = "#00ff66";
                        } else {
                            line.style.color = "var(--color-text-secondary)";
                        }
                        
                        line.textContent = data.text;
                        modalBody.appendChild(line);
                        
                        modalBody.scrollTop = modalBody.scrollHeight;
                        step++;
                        setTimeout(runStep, 600);
                    } else {
                        modalStatusText.textContent = "FINISHED";
                        modalStatusText.style.color = "var(--color-primary)";
                    }
                }
                
                setTimeout(runStep, 200);
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            modalStatusText.textContent = "STANDBY";
            modalStatusText.style.color = "var(--color-primary)";
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modalStatusText.textContent = "STANDBY";
                modalStatusText.style.color = "var(--color-primary)";
            }
        });
    }

    // ----------------------------------------------------
    // 10. Interactive Scope Calculator Portal
    // ----------------------------------------------------
    const scoperSlider = document.getElementById('scoping-assets-slider');
    const scoperTargets = document.getElementsByName('audit-target');
    const sliderValDisplay = document.getElementById('slider-current-val');
    const complexityDisplay = document.getElementById('result-complexity');
    const durationDisplay = document.getElementById('result-duration');
    const costDisplay = document.getElementById('result-cost');
    const applyScopeBtn = document.getElementById('apply-scope-btn');

    if (scoperSlider) {
        function calculateEstimates() {
            const assetsScale = parseInt(scoperSlider.value);
            
            // Get selected audit target value
            let targetVal = 'webapp';
            let targetLabel = 'Web Application Audit';
            scoperTargets.forEach(radio => {
                if (radio.checked) {
                    targetVal = radio.value;
                    targetLabel = radio.parentElement.querySelector('span').textContent;
                }
            });

            // Toggle active styling class on label options
            scoperTargets.forEach(radio => {
                if (radio.checked) {
                    radio.parentElement.classList.add('active');
                } else {
                    radio.parentElement.classList.remove('active');
                }
            });

            // Update scale label indicator
            let scaleLabel = `${assetsScale} Page Views / Endpoints`;
            if (targetVal === 'network') {
                scaleLabel = `${assetsScale} Host IPs / Subnet Nodes`;
            } else if (targetVal === 'codereview') {
                scaleLabel = `${assetsScale} Target Modules / Repositories`;
            }
            sliderValDisplay.textContent = scaleLabel;

            // Complexity calculation
            let complexity = "Low Risk Profile";
            if (assetsScale > 8) {
                complexity = "High Complexity Framework";
            } else if (assetsScale > 3) {
                complexity = "Medium System Structure";
            }
            complexityDisplay.textContent = complexity;

            // Duration calculation
            let baseDays = 3;
            if (targetVal === 'webapp') baseDays = 5;
            if (targetVal === 'codereview') baseDays = 4;
            const finalDays = Math.ceil(baseDays + (assetsScale * 0.4));
            durationDisplay.textContent = `${finalDays} Days`;

            // Cost calculation (Free/Freelance placeholder for student/freelancer)
            costDisplay.textContent = "Free Pilot / Custom Quote";
        }

        // Add event listeners
        scoperSlider.addEventListener('input', calculateEstimates);
        scoperTargets.forEach(radio => {
            radio.addEventListener('change', calculateEstimates);
        });

        // Initialize estimates
        calculateEstimates();

        // Apply Scope to Contact Form
        if (applyScopeBtn) {
            applyScopeBtn.addEventListener('click', () => {
                let targetLabel = 'Web Application Audit';
                scoperTargets.forEach(radio => {
                    if (radio.checked) {
                        targetLabel = radio.parentElement.querySelector('span').textContent;
                    }
                });

                const assetsScale = scoperSlider.value;
                const complexity = complexityDisplay.textContent;
                const duration = durationDisplay.textContent;

                const formSubject = document.getElementById('form-subject');
                const formMessage = document.getElementById('form-message');

                if (formSubject && formMessage) {
                    // Populate fields
                    formSubject.value = `Inquiry: ${targetLabel}`;
                    formMessage.value = `Hello Zidhan,\n\nI scoped out my project requirements using your interactive estimator:\n\n- Audit Target: ${targetLabel}\n- Scale of Assets: ${assetsScale}\n- System Complexity: ${complexity}\n- Estimated Duration: ${duration}\n\nPlease let me know your availability to discuss this audit!`;
                    
                    // Smooth scroll to contact section
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                    
                    // Highlight contact message box focus
                    setTimeout(() => {
                        const nameField = document.getElementById('form-name');
                        if (nameField) nameField.focus();
                        
                        // Alert feedback
                        const originalBtnText = applyScopeBtn.innerHTML;
                        applyScopeBtn.innerHTML = "<span>Scope Applied to Form!</span>";
                        setTimeout(() => {
                            applyScopeBtn.innerHTML = originalBtnText;
                        }, 2500);
                    }, 800);
                }
            });
        }
    }

    // ----------------------------------------------------
    // 11. Client Floating Messenger Logic
    // ----------------------------------------------------
    const messengerLauncher = document.getElementById('messenger-launcher');
    const messengerPanel = document.getElementById('messenger-panel');
    const messengerClose = document.getElementById('messenger-close');
    const quickOptionBtns = document.querySelectorAll('.quick-option-btn');
    const messengerNameInput = document.getElementById('messenger-name-input');
    const messengerTextInput = document.getElementById('messenger-text-input');
    const messengerSubmitBtn = document.getElementById('messenger-submit-btn');
    const messengerInputArea = document.getElementById('messenger-input-area');
    const messengerTransmissionArea = document.getElementById('messenger-transmission-area');
    const transWhatsappBtn = document.getElementById('trans-whatsapp-btn');
    const transEmailBtn = document.getElementById('trans-email-btn');
    const transResetBtn = document.getElementById('trans-reset-btn');

    // Toggle panel
    if (messengerLauncher && messengerPanel) {
        messengerLauncher.addEventListener('click', () => {
            messengerPanel.classList.toggle('active');
            
            // Remove pulse indicator once opened
            const pulseRing = messengerLauncher.querySelector('.pulse-ring');
            if (pulseRing) {
                pulseRing.style.display = 'none';
            }
        });
    }

    if (messengerClose && messengerPanel) {
        messengerClose.addEventListener('click', () => {
            messengerPanel.classList.remove('active');
        });
    }

    // Quick option templates
    const messageTemplates = {
        audit: "Hi Zidhan, I would like to scope a Web Application security audit for my platform. Please share your availability.",
        disclosure: "Hello Zidhan, I'm contacting you regarding a potential vulnerability disclosure coordination or security research query.",
        general: "Hi Zidhan, I am interested in hiring you for freelance cybersecurity consulting or security testing services."
    };

    quickOptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            if (messageTemplates[type] && messengerTextInput) {
                messengerTextInput.value = messageTemplates[type];
                messengerTextInput.focus();
            }
        });
    });

    // Package payload and show transmission options
    if (messengerSubmitBtn && messengerTextInput && messengerNameInput) {
        messengerSubmitBtn.addEventListener('click', () => {
            const name = messengerNameInput.value.trim();
            const text = messengerTextInput.value.trim();

            if (!name || !text) {
                // Focus on empty fields
                if (!name) messengerNameInput.focus();
                else if (!text) messengerTextInput.focus();
                return;
            }

            // Change button state
            const originalBtnText = messengerSubmitBtn.innerHTML;
            messengerSubmitBtn.disabled = true;
            messengerSubmitBtn.innerHTML = "<span>Encrypting Payload...</span>";

            setTimeout(() => {
                // Hide input area, show transmission
                if (messengerInputArea && messengerTransmissionArea) {
                    messengerInputArea.classList.add('hidden');
                    messengerTransmissionArea.classList.remove('hidden');

                    // Pre-fill WhatsApp and Email links
                    const subject = encodeURIComponent("Security Audit Inquiry - " + name);
                    const formattedMessage = `Hello Zidhan,\n\nMy name is ${name}.\n\nMessage Payload:\n${text}\n\n[Sent via Secure Portfolio Widget]`;
                    const escapedBody = encodeURIComponent(formattedMessage);
                    
                    // WhatsApp URL (replace 919999999999 with the real number if needed)
                    // We'll use 919999999999 as standard placeholder
                    const waNumber = "919999999999"; 
                    transWhatsappBtn.href = `https://api.whatsapp.com/send?phone=${waNumber}&text=${escapedBody}`;
                    
                    // Email Mailto link
                    transEmailBtn.href = `mailto:zidhaninfo.sec@gmail.com?subject=${subject}&body=${escapedBody}`;
                }

                // Restore submit btn for next reset
                messengerSubmitBtn.disabled = false;
                messengerSubmitBtn.innerHTML = originalBtnText;
            }, 1000);
        });
    }

    // Reset messaging workflow
    if (transResetBtn && messengerInputArea && messengerTransmissionArea) {
        transResetBtn.addEventListener('click', () => {
            messengerNameInput.value = '';
            messengerTextInput.value = '';
            messengerTransmissionArea.classList.add('hidden');
            messengerInputArea.classList.remove('hidden');
        });
    }
});
