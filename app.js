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
    // 4. Contact Form Submission Dispatcher
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

            // Secure connection simulation
            formStatus.className = 'form-status sending';
            formStatus.innerHTML = '[System] Initializing secure socket connection...';

            setTimeout(() => {
                formStatus.innerHTML = '[System] Encrypting connection payload with TLS 1.3...';
                
                setTimeout(() => {
                    formStatus.innerHTML = '[System] Transmitting message payload...';
                    
                    setTimeout(() => {
                        // Success Feedback
                        formStatus.className = 'form-status success';
                        formStatus.innerHTML = `[SUCCESS] Message dispatched successfully. Thank you for your inquiry, ${name}.`;
                        
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
    // 5. Standard System Dashboard Logging
    // ----------------------------------------------------
    const dashboardLog = document.getElementById('dashboard-feed-log');
    const dashboardStatusBadge = document.querySelector('.dashboard-badge');
    
    const sysLogs = [
        "Securing network endpoints: 100% operational.",
        "Static code analysis completed. 0 high severity flags.",
        "Checked SSL configurations: Cipher suites verified.",
        "Checked Content-Security-Policy: frame-ancestors verified.",
        "Active connections monitoring: No anomalies detected.",
        "Threat exposure index updated.",
        "Security audit completed for Client #15. Status: Closed.",
        "Vulnerability assessment database synced.",
        "System logs audit: All audit rules compliant."
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
                    dashboardStatusBadge.style.color = "var(--color-primary-light)";
                    dashboardStatusBadge.style.borderColor = "rgba(99, 102, 241, 0.3)";
                    dashboardStatusBadge.style.backgroundColor = "rgba(99, 102, 241, 0.05)";
                    
                    setTimeout(() => {
                        dashboardStatusBadge.textContent = "STANDBY";
                        dashboardStatusBadge.style.color = "var(--color-accent)";
                        dashboardStatusBadge.style.borderColor = "rgba(16, 185, 129, 0.25)";
                        dashboardStatusBadge.style.backgroundColor = "rgba(16, 185, 129, 0.05)";
                    }, 2000);
                }
            }
        }, 5000);
    }

    // ----------------------------------------------------
    // 6. Security Incident Simulation Lab
    // ----------------------------------------------------
    const modal = document.getElementById('vapt-modal');
    const closeBtn = document.getElementById('modal-close-btn');
    const runBtns = document.querySelectorAll('.run-simulation');
    const modalBody = document.getElementById('modal-terminal-body');
    const modalTitleText = document.getElementById('modal-title-text');
    const modalStatusText = document.getElementById('modal-status-text');

    const exploitPayloads = {
        django: [
            { text: "[!] INITIATING SECURE COMPLIANCE AUDIT...", color: "cyan" },
            { text: "[*] TARGET URL: https://enterprise-storefront.com", color: "muted" },
            { text: "[*] ANALYZING HTTP RESPONSE HEADERS...", color: "muted" },
            { text: "[*] PARSING DJANGO APPLICATION SETTINGS...", color: "muted" },
            { text: "[!] RISK IDENTIFIED: django_settings_debug = True", color: "error" },
            { text: "[*] TESTING ACCESS CONTROLS...", color: "muted" },
            { text: "[!] ADVISORY: System settings and configuration variables exposed.", color: "warn" },
            { text: "--------------------------------------------------------", color: "muted" },
            { text: "    SECRET_KEY = 'django-insecure-s#e!c!r!e!t!k!e!y!12345'", color: "success" },
            { text: "    AWS_ACCESS_KEY_ID = 'AKIAIOSFODNN7EXAMPLE'", color: "success" },
            { text: "    DB_PASSWORD = 'super_secure_client_pass_2026'", color: "success" },
            { text: "    ALLOWED_HOSTS = ['*']", color: "muted" },
            { text: "--------------------------------------------------------", color: "muted" },
            { text: "[+] RISK CONFIRMED: Stack configuration details are readable.", color: "success" },
            { text: "[+] COMPLIANCE AUDIT: Vulnerability report compiled.", color: "success" },
            { text: "[+] MITIGATION STRATEGY: Define 'DEBUG = False' in production settings.", color: "cyan" }
        ],
        clickjacking: [
            { text: "[!] INITIATING CLICKJACKING COMPLIANCE AUDIT...", color: "cyan" },
            { text: "[*] TARGET URL: https://enterprise-storefront.com/login", color: "muted" },
            { text: "[*] ANALYZING RESPONSE HEADERS FOR ISOLATION DIRECTIVES...", color: "muted" },
            { text: "[!] RISK IDENTIFIED: X-Frame-Options header not found in payload.", color: "warn" },
            { text: "[!] RISK IDENTIFIED: Content-Security-Policy 'frame-ancestors' absent.", color: "warn" },
            { text: "[!] COMPLIANCE FAILURE: Missing UI isolation boundaries.", color: "error" },
            { text: "[*] VERIFYING UI INTRUSIONS...", color: "muted" },
            { text: "[*] GENERATING PROOF-OF-CONCEPT CONTAINER...", color: "muted" },
            { text: "[+] AUDIT RESULTS: Storefront page successfully embedded in cross-origin frame.", color: "success" },
            { text: "[+] MITIGATION STRATEGY: Enforce X-Frame-Options: SAMEORIGIN header.", color: "cyan" }
        ]
    };

    if (modal && closeBtn) {
        runBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const project = btn.getAttribute('data-project');
                const payload = exploitPayloads[project];
                
                modal.classList.add('active');
                modalStatusText.textContent = "RUNNING";
                modalStatusText.style.color = "#ef4444";
                modalTitleText.textContent = `Audit Simulation Lab // POC_${project.toUpperCase()}`;
                
                modalBody.innerHTML = '';
                
                let step = 0;
                function runStep() {
                    if (step < payload.length) {
                        const line = document.createElement('div');
                        line.style.marginBottom = '0.4rem';
                        
                        const data = payload[step];
                        if (data.color === "cyan") {
                            line.style.color = "var(--color-primary-light)";
                        } else if (data.color === "error") {
                            line.style.color = "#ef4444";
                        } else if (data.color === "warn") {
                            line.style.color = "#f97316";
                        } else if (data.color === "success") {
                            line.style.color = "var(--color-accent)";
                        } else {
                            line.style.color = "var(--color-text-secondary)";
                        }
                        
                        line.textContent = data.text;
                        modalBody.appendChild(line);
                        
                        modalBody.scrollTop = modalBody.scrollHeight;
                        step++;
                        setTimeout(runStep, 600);
                    } else {
                        modalStatusText.textContent = "COMPLETED";
                        modalStatusText.style.color = "var(--color-accent)";
                    }
                }
                
                setTimeout(runStep, 200);
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            modalStatusText.textContent = "READY";
            modalStatusText.style.color = "var(--color-accent)";
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modalStatusText.textContent = "READY";
                modalStatusText.style.color = "var(--color-accent)";
            }
        });
    }

    // ----------------------------------------------------
    // 7. Interactive Scope Calculator Portal
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

            // Cost calculation (Free/Custom Quote)
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
                        applyScopeBtn.innerHTML = "<span>Scope Applied!</span>";
                        setTimeout(() => {
                            applyScopeBtn.innerHTML = originalBtnText;
                        }, 2500);
                    }, 800);
                }
            });
        }
    }

    // ----------------------------------------------------
    // 8. Client Floating Messenger Logic
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
                    
                    // WhatsApp URL
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
