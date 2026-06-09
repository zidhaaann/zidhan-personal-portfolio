document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Global Configuration Store & Page Router
    // ----------------------------------------------------
    let siteConfig = null;
    const isAdminPage = document.querySelector('.admin-layout') !== null;

    // Load configuration
    const initConfig = async () => {
        const localConfig = localStorage.getItem('websiteConfig');
        if (localConfig) {
            siteConfig = JSON.parse(localConfig);
            postConfigLoad();
        } else {
            try {
                const response = await fetch('config.json');
                siteConfig = await response.json();
                localStorage.setItem('websiteConfig', JSON.stringify(siteConfig));
                postConfigLoad();
            } catch (error) {
                console.error("Error loading config.json:", error);
            }
        }
    };

    const postConfigLoad = () => {
        if (isAdminPage) {
            initAdminPortal();
        } else {
            renderHomepageContent();
            initHomepageInteractions();
        }
    };

    // ----------------------------------------------------
    // Homepage Dynamic Rendering
    // ----------------------------------------------------
    const renderHomepageContent = () => {
        if (!siteConfig) return;

        // 1. Hero Content
        const heroStatus = document.getElementById('hero-status-badge');
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroStats = document.getElementById('hero-stats');

        if (heroStatus) heroStatus.textContent = siteConfig.hero.status;
        if (heroTitle) heroTitle.innerHTML = siteConfig.hero.title.replace(/\n/g, '<br>');
        if (heroSubtitle) heroSubtitle.textContent = siteConfig.hero.subtitle;

        if (heroStats && siteConfig.hero.stats) {
            heroStats.innerHTML = siteConfig.hero.stats.map(stat => `
                <div class="stat-item">
                    <span class="stat-val text-gradient">${stat.val}</span>
                    <span class="stat-lbl">${stat.lbl}</span>
                </div>
            `).join('');
        }

        // 2. About Me Bio & Timeline
        const aboutBio = document.getElementById('about-bio');
        const aboutTimeline = document.getElementById('about-timeline');

        if (aboutBio) {
            aboutBio.innerHTML = `
                <p class="lead-text">${siteConfig.about.lead}</p>
                <p>${siteConfig.about.bio1}</p>
                <p>${siteConfig.about.bio2}</p>
                <p>${siteConfig.about.bio3}</p>
            `;
        }

        if (aboutTimeline && siteConfig.about.timeline) {
            aboutTimeline.innerHTML = siteConfig.about.timeline.map(item => `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-date">${item.year}</div>
                    <h4 class="timeline-title">${item.title}</h4>
                    <p class="timeline-text">${item.text}</p>
                </div>
            `).join('');
        }

        // 3. Skills Grid
        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid && siteConfig.skills) {
            // Icon SVGs mapped by key
            const skillIcons = {
                "Penetration Testing": `<svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
                "Vulnerability Assessment": `<svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line></svg>`,
                "Security Tooling": `<svg class="skill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`
            };

            skillsGrid.innerHTML = siteConfig.skills.map(skill => `
                <div class="skill-card">
                    <div class="skill-icon-wrap">
                        ${skillIcons[skill.title] || skillIcons["Penetration Testing"]}
                    </div>
                    <h3 class="skill-card-title">${skill.title}</h3>
                    <p class="skill-card-text">${skill.text}</p>
                    <div class="skill-badges">
                        ${skill.badges.map(b => `<span class="skill-badge">${b}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }

        // 4. Services Grid
        const servicesGrid = document.getElementById('services-grid');
        if (servicesGrid && siteConfig.services) {
            const serviceIcons = [
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
                `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
            ];

            servicesGrid.innerHTML = siteConfig.services.map((service, idx) => `
                <div class="service-card">
                    <div class="service-icon">
                        ${serviceIcons[idx] || serviceIcons[0]}
                    </div>
                    <h3>${service.title}</h3>
                    <p>${service.text}</p>
                </div>
            `).join('');
        }

        // 5. Featured Projects & Accordions
        const projectsFeatured = document.getElementById('projects-featured');
        if (projectsFeatured && siteConfig.projects) {
            projectsFeatured.innerHTML = siteConfig.projects.map((proj, idx) => `
                <div class="project-featured-card" style="margin-bottom: ${idx === 0 ? '2.5rem' : '0'};">
                    <div class="project-tag">${proj.tag}</div>
                    <h3 class="project-featured-title">${proj.title}</h3>
                    <p class="project-featured-desc">${proj.desc}</p>
                    
                    <div class="vulns-list">
                        ${proj.vulns.map(vuln => `
                            <div class="vuln-item ${vuln.severityClass}">
                                <div class="vuln-header">
                                    <span class="severity-badge">${vuln.severity}</span>
                                    <span class="vuln-name">${vuln.name}</span>
                                    <span class="vuln-toggle">+</span>
                                </div>
                                <div class="vuln-details">
                                    <p>${vuln.details}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="project-footer">
                        <div class="project-tools">
                            ${proj.tools.map(t => `<span>${t}</span>`).join('')}
                        </div>
                        <div class="project-links-wrap">
                            <button class="btn btn-primary btn-sm run-simulation" data-project="${proj.id}">Launch Simulation</button>
                            <a href="${proj.linkedin}" target="_blank" rel="noopener noreferrer" class="project-link">
                                <span>LinkedIn</span>
                                <svg class="link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    };

    // ----------------------------------------------------
    // Homepage Interactions
    // ----------------------------------------------------
    const initHomepageInteractions = () => {
        // 1. Mobile Navigation
        const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileNavToggle && navMenu) {
            mobileNavToggle.addEventListener('click', () => {
                mobileNavToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    mobileNavToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }

        // 2. Active Navigation link on Scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
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

        // 3. Vulnerability Details Accordion (Re-bound since nodes are dynamic)
        document.querySelectorAll('.vuln-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                item.classList.toggle('active');
                
                const siblingItems = item.parentElement.querySelectorAll('.vuln-item');
                siblingItems.forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('active');
                    }
                });
            });
        });

        // 4. Contact Form Tabs & Submission Dispatcher
        const tabAuditInquiry = document.getElementById('tab-audit-inquiry');
        const tabQuickNote = document.getElementById('tab-quick-note');
        const detailedFields = document.getElementById('contact-detailed-fields');
        const messageFieldLabel = document.getElementById('message-field-label');
        const formNameInput = document.getElementById('form-name');
        const formEmailInput = document.getElementById('form-email');
        const formSubjectInput = document.getElementById('form-subject');
        const formMessageInput = document.getElementById('form-message');

        if (tabAuditInquiry && tabQuickNote && detailedFields) {
            tabAuditInquiry.addEventListener('click', () => {
                tabAuditInquiry.classList.add('active');
                tabQuickNote.classList.remove('active');
                detailedFields.style.display = 'block';
                if (formNameInput) formNameInput.setAttribute('required', 'true');
                if (formEmailInput) formEmailInput.setAttribute('required', 'true');
                if (formSubjectInput) formSubjectInput.setAttribute('required', 'true');
                if (messageFieldLabel) messageFieldLabel.textContent = 'Project Details / Message';
                if (formMessageInput) formMessageInput.setAttribute('placeholder', 'Describe your systems, tech stack, or inquiry details here...');
            });

            tabQuickNote.addEventListener('click', () => {
                tabQuickNote.classList.add('active');
                tabAuditInquiry.classList.remove('active');
                detailedFields.style.display = 'none';
                if (formNameInput) formNameInput.removeAttribute('required');
                if (formEmailInput) formEmailInput.removeAttribute('required');
                if (formSubjectInput) formSubjectInput.removeAttribute('required');
                if (messageFieldLabel) messageFieldLabel.textContent = 'Write Your Message';
                if (formMessageInput) formMessageInput.setAttribute('placeholder', 'Type your message here... (No name or email required)');
            });
        }

        const contactForm = document.getElementById('contact-form');
        const formStatus = document.getElementById('form-status');

        if (contactForm && formStatus) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;

                const isQuickTab = tabQuickNote && tabQuickNote.classList.contains('active');
                const name = isQuickTab ? 'Web Visitor (Anonymous)' : (formNameInput ? formNameInput.value.trim() : 'Web Visitor');
                const email = isQuickTab ? 'N/A' : (formEmailInput ? formEmailInput.value.trim() : 'N/A');
                const subject = isQuickTab ? 'Quick Web Note' : (formSubjectInput ? formSubjectInput.value.trim() : 'General Inquiry');
                const message = formMessageInput ? formMessageInput.value : '';

                formStatus.className = 'form-status sending';
                formStatus.innerHTML = '[System] Initializing secure socket connection...';

                // Save Inquiry locally
                const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
                inquiries.unshift({
                    name,
                    email,
                    subject,
                    message,
                    timestamp: new Date().toLocaleString(),
                    status: 'unread'
                });
                localStorage.setItem('inquiries', JSON.stringify(inquiries));

                setTimeout(() => {
                    formStatus.innerHTML = '[System] Encrypting connection payload with TLS 1.3...';
                    
                    setTimeout(() => {
                        formStatus.innerHTML = '[System] Transmitting message payload...';
                        
                        setTimeout(() => {
                            formStatus.className = 'form-status success';
                            formStatus.innerHTML = isQuickTab 
                                ? `[SUCCESS] Message sent anonymously to ZidhanSec Admin Panel!` 
                                : `[SUCCESS] Message dispatched successfully. Thank you for your inquiry, ${name}.`;
                            
                            contactForm.reset();
                            
                            // Reset state if it was in quick tab mode
                            if (isQuickTab) {
                                detailedFields.style.display = 'none';
                                if (formNameInput) formNameInput.removeAttribute('required');
                                if (formEmailInput) formEmailInput.removeAttribute('required');
                                if (formSubjectInput) formSubjectInput.removeAttribute('required');
                            }
                            
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = originalBtnText;

                            setTimeout(() => {
                                formStatus.innerHTML = '';
                                formStatus.className = 'form-status';
                            }, 8000);

                        }, 1500);
                    }, 1200);
                }, 1000);
            });
        }

        // 5. Threat Monitor Logging Feed
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
            setInterval(() => {
                const now = new Date();
                const timeStr = now.toTimeString().split(' ')[0];
                const randomMsg = sysLogs[Math.floor(Math.random() * sysLogs.length)];
                
                const line = document.createElement('div');
                line.className = 'feed-item';
                line.innerHTML = `<span class="feed-time">${timeStr}</span> <span class="feed-msg">${randomMsg}</span>`;
                dashboardLog.appendChild(line);
                
                while (dashboardLog.children.length > 3) {
                    dashboardLog.removeChild(dashboardLog.firstChild);
                }
                
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

        // 6. Security Incident Simulation Modal
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

        // 7. Scoping Calculator
        const scoperSlider = document.getElementById('scoping-assets-slider');
        const scoperTargets = document.getElementsByName('audit-target');
        const sliderValDisplay = document.getElementById('slider-current-val');
        const complexityDisplay = document.getElementById('result-complexity');
        const durationDisplay = document.getElementById('result-duration');
        const costDisplay = document.getElementById('result-cost');
        const applyScopeBtn = document.getElementById('apply-scope-btn');

        if (scoperSlider) {
            const calculateEstimates = () => {
                const assetsScale = parseInt(scoperSlider.value);
                let targetVal = 'webapp';
                let targetLabel = 'Web Application Audit';
                scoperTargets.forEach(radio => {
                    if (radio.checked) {
                        targetVal = radio.value;
                        targetLabel = radio.parentElement.querySelector('span').textContent;
                    }
                });

                scoperTargets.forEach(radio => {
                    if (radio.checked) {
                        radio.parentElement.classList.add('active');
                    } else {
                        radio.parentElement.classList.remove('active');
                    }
                });

                let scaleLabel = `${assetsScale} Page Views / Endpoints`;
                if (targetVal === 'network') {
                    scaleLabel = `${assetsScale} Host IPs / Subnet Nodes`;
                } else if (targetVal === 'codereview') {
                    scaleLabel = `${assetsScale} Target Modules / Repositories`;
                }
                sliderValDisplay.textContent = scaleLabel;

                let complexity = "Low Risk Profile";
                if (assetsScale > 8) {
                    complexity = "High Complexity Framework";
                } else if (assetsScale > 3) {
                    complexity = "Medium System Structure";
                }
                complexityDisplay.textContent = complexity;

                let baseDays = 3;
                if (targetVal === 'webapp') baseDays = 5;
                if (targetVal === 'codereview') baseDays = 4;
                const finalDays = Math.ceil(baseDays + (assetsScale * 0.4));
                durationDisplay.textContent = `${finalDays} Days`;

                costDisplay.textContent = "Free Pilot / Custom Quote";
            };

            scoperSlider.addEventListener('input', calculateEstimates);
            scoperTargets.forEach(radio => {
                radio.addEventListener('change', calculateEstimates);
            });

            calculateEstimates();

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
                        formSubject.value = `Inquiry: ${targetLabel}`;
                        formMessage.value = `Hello Zidhan,\n\nI scoped out my requirements using your interactive estimator:\n\n- Audit Target: ${targetLabel}\n- Scale of Assets: ${assetsScale}\n- System Complexity: ${complexity}\n- Estimated Duration: ${duration}\n\nPlease let me know your availability to discuss this audit!`;
                        
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                        
                        setTimeout(() => {
                            const nameField = document.getElementById('form-name');
                            if (nameField) nameField.focus();
                            
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

        // 8. Client Floating Messenger Widget
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

        if (messengerLauncher && messengerPanel) {
            messengerLauncher.addEventListener('click', () => {
                messengerPanel.classList.toggle('active');
                
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

        if (messengerSubmitBtn && messengerTextInput && messengerNameInput) {
            messengerSubmitBtn.addEventListener('click', () => {
                const name = messengerNameInput.value.trim() || 'Web Visitor (Anonymous)';
                const text = messengerTextInput.value.trim();

                if (!text) {
                    messengerTextInput.focus();
                    return;
                }

                const originalBtnText = messengerSubmitBtn.innerHTML;
                messengerSubmitBtn.disabled = true;
                messengerSubmitBtn.innerHTML = "<span>Encrypting Payload...</span>";

                // Save Inquiry locally
                const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
                inquiries.unshift({
                    name,
                    email: 'N/A (Chat Widget)',
                    subject: 'Quick Chat Submission',
                    message: text,
                    timestamp: new Date().toLocaleString(),
                    status: 'unread'
                });
                localStorage.setItem('inquiries', JSON.stringify(inquiries));

                setTimeout(() => {
                    if (messengerInputArea && messengerTransmissionArea) {
                        messengerInputArea.classList.add('hidden');
                        messengerTransmissionArea.classList.remove('hidden');

                        const subject = encodeURIComponent("Security Audit Inquiry - " + name);
                        const formattedMessage = `Hello Zidhan,\n\nMy name is ${name}.\n\nMessage Payload:\n${text}\n\n[Sent via Secure Portfolio Widget]`;
                        const escapedBody = encodeURIComponent(formattedMessage);
                        
                        const waNumber = "919999999999"; 
                        transWhatsappBtn.href = `https://api.whatsapp.com/send?phone=${waNumber}&text=${escapedBody}`;
                        transEmailBtn.href = `mailto:zidhaninfo.sec@gmail.com?subject=${subject}&body=${escapedBody}`;
                    }

                    messengerSubmitBtn.disabled = false;
                    messengerSubmitBtn.innerHTML = originalBtnText;
                }, 1000);
            });
        }

        if (transResetBtn && messengerInputArea && messengerTransmissionArea) {
            transResetBtn.addEventListener('click', () => {
                messengerNameInput.value = '';
                messengerTextInput.value = '';
                messengerTransmissionArea.classList.add('hidden');
                messengerInputArea.classList.remove('hidden');
            });
        }
    };

    // ----------------------------------------------------
    // Admin Portal Implementation
    // ----------------------------------------------------
    const initAdminPortal = () => {
        const tabInboxBtn = document.getElementById('tab-inbox-btn');
        const tabCmsBtn = document.getElementById('tab-cms-btn');
        const tabInboxSection = document.getElementById('tab-inbox');
        const tabCmsSection = document.getElementById('tab-cms');

        // 1. Tab Switching
        if (tabInboxBtn && tabCmsBtn) {
            tabInboxBtn.addEventListener('click', () => {
                tabInboxBtn.classList.add('active');
                tabCmsBtn.classList.remove('active');
                tabInboxSection.classList.add('active');
                tabCmsSection.classList.remove('active');
                renderInbox();
            });

            tabCmsBtn.addEventListener('click', () => {
                tabCmsBtn.classList.add('active');
                tabInboxBtn.classList.remove('active');
                tabCmsSection.classList.add('active');
                tabInboxSection.classList.remove('active');
                populateCmsForms();
            });
        }

        // 2. Inbox Functionality
        const renderInbox = () => {
            const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
            const indexList = document.getElementById('inbox-index-list');
            const badgeCount = document.getElementById('inbox-badge-count');
            const searchInput = document.getElementById('inbox-search');

            if (badgeCount) badgeCount.textContent = inquiries.length;

            const displayList = (list) => {
                if (!indexList) return;
                
                if (list.length === 0) {
                    indexList.innerHTML = `<div class="inbox-empty-state">No inquiries match the query.</div>`;
                    return;
                }

                indexList.innerHTML = list.map((item, idx) => `
                    <div class="inbox-card" data-idx="${idx}">
                        <div class="inbox-card-header">
                            <span class="inbox-card-name">${item.name}</span>
                            <span class="inbox-card-time">${item.timestamp.split(',')[0]}</span>
                        </div>
                        <div class="inbox-card-subject">${item.subject}</div>
                        <div class="inbox-card-snippet">${item.message}</div>
                    </div>
                `).join('');

                // Click event on card
                document.querySelectorAll('.inbox-card').forEach(card => {
                    card.addEventListener('click', () => {
                        document.querySelectorAll('.inbox-card').forEach(c => c.classList.remove('active'));
                        card.classList.add('active');
                        const idx = parseInt(card.getAttribute('data-idx'));
                        renderReader(list[idx], idx);
                    });
                });
            };

            // Reader view
            const renderReader = (item, idx) => {
                const readerPane = document.getElementById('inbox-reader-pane');
                if (!readerPane) return;

                readerPane.innerHTML = `
                    <div class="inbox-reader-header">
                        <h3 class="inbox-reader-subject">${item.subject}</h3>
                        <div class="inbox-reader-meta">
                            <div class="inbox-reader-sender">
                                <span>From: <strong>${item.name}</strong></span>
                                <span>Email: <a href="mailto:${item.email}" class="text-accent">${item.email}</a></span>
                            </div>
                            <span>Received: ${item.timestamp}</span>
                        </div>
                    </div>
                    <div class="inbox-reader-body">${item.message}</div>
                    <div class="inbox-reader-actions">
                        <a href="mailto:${item.email}?subject=Re: ${item.subject}" class="btn btn-primary btn-sm">Reply via Email</a>
                        <button class="btn btn-outline btn-sm delete-inquiry" data-idx="${idx}" style="border-color:var(--sev-critical); color:var(--sev-critical);">Delete Inquiry</button>
                    </div>
                `;

                // Delete click handler
                readerPane.querySelector('.delete-inquiry').addEventListener('click', () => {
                    const confirmDel = confirm("Are you sure you want to delete this message?");
                    if (confirmDel) {
                        inquiries.splice(idx, 1);
                        localStorage.setItem('inquiries', JSON.stringify(inquiries));
                        renderInbox();
                        readerPane.innerHTML = `
                            <div class="reader-placeholder">
                                <svg class="placeholder-mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <p>Select an inquiry to read the details.</p>
                            </div>
                        `;
                    }
                });
            };

            // Search filter
            if (searchInput) {
                searchInput.addEventListener('input', () => {
                    const query = searchInput.value.toLowerCase();
                    const filtered = inquiries.filter(item => 
                        item.name.toLowerCase().includes(query) || 
                        item.email.toLowerCase().includes(query) || 
                        item.subject.toLowerCase().includes(query) || 
                        item.message.toLowerCase().includes(query)
                    );
                    displayList(filtered);
                });
            }

            displayList(inquiries);
        };

        // Clear all inquiries
        const clearBtn = document.getElementById('btn-clear-inbox');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                const confirmClear = confirm("Are you sure you want to delete ALL inquiries?");
                if (confirmClear) {
                    localStorage.setItem('inquiries', '[]');
                    renderInbox();
                    const readerPane = document.getElementById('inbox-reader-pane');
                    if (readerPane) {
                        readerPane.innerHTML = `
                            <div class="reader-placeholder">
                                <svg class="placeholder-mail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                <p>Select an inquiry to read the details.</p>
                            </div>
                        `;
                    }
                }
            });
        }

        // 3. CMS Functionality
        const populateCmsForms = () => {
            if (!siteConfig) return;

            // Hero Settings
            const heroStatus = document.getElementById('cms-hero-status');
            const heroTitle = document.getElementById('cms-hero-title');
            const heroSubtitle = document.getElementById('cms-hero-subtitle');

            if (heroStatus) heroStatus.value = siteConfig.hero.status;
            if (heroTitle) heroTitle.value = siteConfig.hero.title;
            if (heroSubtitle) heroSubtitle.value = siteConfig.hero.subtitle;

            // Stats Settings
            if (siteConfig.hero.stats) {
                siteConfig.hero.stats.forEach((stat, idx) => {
                    const valField = document.getElementById(`cms-stat-val-${idx}`);
                    const lblField = document.getElementById(`cms-stat-lbl-${idx}`);
                    if (valField) valField.value = stat.val;
                    if (lblField) lblField.value = stat.lbl;
                });
            }

            // About Me settings
            const aboutLead = document.getElementById('cms-about-lead');
            const aboutBio1 = document.getElementById('cms-about-bio1');
            const aboutBio2 = document.getElementById('cms-about-bio2');
            const aboutBio3 = document.getElementById('cms-about-bio3');

            if (aboutLead) aboutLead.value = siteConfig.about.lead;
            if (aboutBio1) aboutBio1.value = siteConfig.about.bio1;
            if (aboutBio2) aboutBio2.value = siteConfig.about.bio2;
            if (aboutBio3) aboutBio3.value = siteConfig.about.bio3;
        };

        // Save CMS changes back to LocalStorage
        const saveCmsBtn = document.getElementById('btn-save-cms');
        if (saveCmsBtn) {
            saveCmsBtn.addEventListener('click', () => {
                if (!siteConfig) return;

                // Grab Form values
                siteConfig.hero.status = document.getElementById('cms-hero-status').value;
                siteConfig.hero.title = document.getElementById('cms-hero-title').value;
                siteConfig.hero.subtitle = document.getElementById('cms-hero-subtitle').value;

                siteConfig.hero.stats.forEach((stat, idx) => {
                    stat.val = document.getElementById(`cms-stat-val-${idx}`).value;
                    stat.lbl = document.getElementById(`cms-stat-lbl-${idx}`).value;
                });

                siteConfig.about.lead = document.getElementById('cms-about-lead').value;
                siteConfig.about.bio1 = document.getElementById('cms-about-bio1').value;
                siteConfig.about.bio2 = document.getElementById('cms-about-bio2').value;
                siteConfig.about.bio3 = document.getElementById('cms-about-bio3').value;

                // Write to LocalStorage
                localStorage.setItem('websiteConfig', JSON.stringify(siteConfig));
                alert("Website changes saved locally! Export the config file and commit it to GitHub to make it live for everyone.");
            });
        }

        // Export config.json download
        const exportBtn = document.getElementById('btn-export-config');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                if (!siteConfig) return;

                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(siteConfig, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", "config.json");
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
            });
        }

        // Initialize default view
        renderInbox();
    };

    // Initialize config pipeline
    initConfig();
});
