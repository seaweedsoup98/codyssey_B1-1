const CONFIG = {
  githubUser: 'seaweedsoup98',
  navScrollThreshold: 60,
  scrollTopThreshold: 300,
  revealThreshold: 0.2,
  themeStorageKey: 'portfolio-theme'
};

const state = {
  theme: 'light',
  menuOpen: false,
  projects: {
    status: 'idle',
    items: [],
    selectedLanguage: 'All',
    errorMessage: ''
  },
  form: {
    errors: {},
    submitStatus: 'idle'
  }
};

const DOM = {
  header: document.querySelector('.site-header'),
  menuButton: document.querySelector('.menu-toggle'),
  navLinks: document.querySelector('.nav-links'),
  themeButton: document.querySelector('.theme-toggle'),
  scrollTopButton: document.querySelector('.scroll-top'),
  typingTarget: document.querySelector('.typing'),
  projectFilters: document.querySelector('.project-filters'),
  projectsGrid: document.querySelector('.projects-grid'),
  form: document.querySelector('#contact-form'),
  formStatus: document.querySelector('.form-status'),
  submitButton: document.querySelector('.submit-button'),
  year: document.querySelector('#current-year')
};

const FORM_FIELDS = ['name', 'email', 'message'];

const getStoredTheme = () => localStorage.getItem(CONFIG.themeStorageKey);

const getInitialTheme = () => {
  const storedTheme = getStoredTheme();
  if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const renderTheme = (save = true) => {
  document.documentElement.dataset.theme = state.theme;
  const isDark = state.theme === 'dark';
  DOM.themeButton.textContent = isDark ? 'Light' : 'Dark';
  DOM.themeButton.setAttribute('aria-pressed', String(isDark));
  DOM.themeButton.setAttribute('aria-label', isDark ? '라이트 모드 전환' : '다크 모드 전환');
  if (save) localStorage.setItem(CONFIG.themeStorageKey, state.theme);
};

const renderMenu = () => {
  DOM.navLinks.classList.toggle('active', state.menuOpen);
  DOM.menuButton.classList.toggle('active', state.menuOpen);
  DOM.menuButton.setAttribute('aria-expanded', String(state.menuOpen));
  DOM.menuButton.setAttribute('aria-label', state.menuOpen ? '메뉴 닫기' : '메뉴 열기');
};

const handleScroll = () => {
  if (window.scrollY >= CONFIG.navScrollThreshold) DOM.header.classList.add('scrolled');
  else DOM.header.classList.remove('scrolled');

  if (window.scrollY >= CONFIG.scrollTopThreshold) DOM.scrollTopButton.classList.add('visible');
  else DOM.scrollTopButton.classList.remove('visible');
};

const startTyping = () => {
  const text = DOM.typingTarget.dataset.text;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    DOM.typingTarget.textContent = text;
    return;
  }

  let index = 0;
  const type = () => {
    index += 1;
    DOM.typingTarget.textContent = text.slice(0, index);
    if (index < text.length) setTimeout(type, 45);
  };
  setTimeout(type, 300);
};

const escapeHtml = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const projectCard = ({ name, description, html_url, language, stargazers_count }) => `
  <article class="project-card">
    <h3>${escapeHtml(name)}</h3>
    <p>${escapeHtml(description || '설명이 등록되지 않은 저장소입니다.')}</p>
    <div class="project-meta">
      <span>${escapeHtml(language || 'Language N/A')}</span>
      <span>★ ${stargazers_count}</span>
    </div>
    <a class="project-link" href="${escapeHtml(html_url)}" target="_blank" rel="noopener noreferrer">GitHub에서 보기 →</a>
  </article>
`;

const visibleProjects = () => {
  const { items, selectedLanguage } = state.projects;
  return selectedLanguage === 'All'
    ? items
    : items.filter(({ language }) => language === selectedLanguage);
};

const renderProjectFilters = () => {
  if (state.projects.status !== 'success') {
    DOM.projectFilters.innerHTML = '';
    return;
  }

  const languages = [...new Set(state.projects.items.map(({ language }) => language).filter(Boolean))].sort();
  const buttons = ['All', ...languages].map((language) => `
    <button class="filter-button ${state.projects.selectedLanguage === language ? 'active' : ''}"
      type="button" data-language="${escapeHtml(language)}">${escapeHtml(language)}</button>
  `).join('');

  DOM.projectFilters.innerHTML = buttons;
};

const renderProjects = () => {
  const { status, errorMessage } = state.projects;
  DOM.projectsGrid.setAttribute('aria-busy', String(status === 'loading'));

  if (status === 'loading') {
    DOM.projectsGrid.innerHTML = '<p class="status-message">프로젝트 로딩 중...</p>';
    return;
  }

  if (status === 'error') {
    DOM.projectsGrid.innerHTML = `
      <div class="status-message">
        <p>${escapeHtml(errorMessage)}</p>
        <button class="button secondary retry-projects" type="button">다시 시도</button>
      </div>
    `;
    return;
  }

  if (status === 'empty') {
    DOM.projectsGrid.innerHTML = '<p class="status-message">표시할 프로젝트가 없습니다.</p>';
    return;
  }

  const projects = visibleProjects();
  DOM.projectsGrid.innerHTML = projects.length
    ? projects.map(projectCard).join('')
    : '<p class="status-message">선택한 언어의 프로젝트가 없습니다.</p>';
};

const fetchProjects = async () => {
  state.projects.status = 'loading';
  state.projects.errorMessage = '';
  renderProjectFilters();
  renderProjects();

  try {
    const response = await fetch(`https://api.github.com/users/${CONFIG.githubUser}/repos?sort=updated&per_page=100`);
    if (!response.ok) {
      if (response.status === 403) throw new Error('RATE_LIMIT');
      throw new Error('REQUEST_FAILED');
    }

    const projects = await response.json();
    state.projects.items = projects;
    state.projects.status = projects.length ? 'success' : 'empty';
    state.projects.selectedLanguage = 'All';
  } catch (error) {
    state.projects.status = 'error';
    state.projects.errorMessage = error.message === 'RATE_LIMIT'
      ? 'GitHub API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.'
      : '프로젝트를 불러올 수 없습니다.';
  }

  renderProjectFilters();
  renderProjects();
};

const validateField = (name, value) => {
  const trimmed = value.trim();
  if (!trimmed) return '필수 입력 항목입니다.';
  if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return '올바른 이메일 형식을 입력해주세요.';
  return '';
};

const renderFieldError = (name) => {
  const field = DOM.form.elements[name];
  const message = state.form.errors[name] || '';
  const error = document.querySelector(`#${name}-error`);
  error.textContent = message;
  field.classList.toggle('invalid', Boolean(message));
  field.setAttribute('aria-invalid', String(Boolean(message)));
};

const renderFormStatus = (message = '', type = '') => {
  DOM.formStatus.textContent = message;
  DOM.formStatus.classList.remove('error', 'success');
  if (type) DOM.formStatus.classList.add(type);
};

const submitForm = async () => {
  const endpoint = DOM.form.dataset.endpoint.trim();
  if (!endpoint) {
    renderFormStatus('입력값 검증이 완료되었습니다. Formspree endpoint를 설정하면 실제로 전송됩니다.', 'success');
    return;
  }

  state.form.submitStatus = 'sending';
  DOM.submitButton.disabled = true;
  DOM.submitButton.textContent = '전송 중...';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(DOM.form),
      headers: { Accept: 'application/json' }
    });
    if (!response.ok) throw new Error('SUBMIT_FAILED');

    DOM.form.reset();
    state.form.errors = {};
    FORM_FIELDS.forEach(renderFieldError);
    renderFormStatus('메시지가 전송되었습니다.', 'success');
  } catch {
    renderFormStatus('메시지를 전송하지 못했습니다. 잠시 후 다시 시도해주세요.', 'error');
  } finally {
    state.form.submitStatus = 'idle';
    DOM.submitButton.disabled = false;
    DOM.submitButton.textContent = '보내기';
  }
};

DOM.menuButton.addEventListener('click', () => {
  state.menuOpen = !state.menuOpen;
  renderMenu();
});

DOM.themeButton.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  renderTheme();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
    state.menuOpen = false;
    renderMenu();
  });
});

DOM.scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', handleScroll, { passive: true });

DOM.projectFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-language]');
  if (!button) return;
  state.projects.selectedLanguage = button.dataset.language;
  renderProjectFilters();
  renderProjects();
});

DOM.projectsGrid.addEventListener('click', (event) => {
  if (event.target.closest('.retry-projects')) fetchProjects();
});

FORM_FIELDS.forEach((name) => {
  DOM.form.elements[name].addEventListener('input', (event) => {
    state.form.errors[name] = validateField(name, event.target.value);
    renderFieldError(name);
  });
});

DOM.form.addEventListener('submit', (event) => {
  event.preventDefault();
  FORM_FIELDS.forEach((name) => {
    state.form.errors[name] = validateField(name, DOM.form.elements[name].value);
    renderFieldError(name);
  });

  if (Object.values(state.form.errors).some(Boolean)) {
    renderFormStatus('입력 내용을 확인해주세요.', 'error');
    return;
  }

  submitForm();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, { threshold: CONFIG.revealThreshold });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
  if (getStoredTheme()) return;
  state.theme = event.matches ? 'dark' : 'light';
  renderTheme(false);
});

state.theme = getInitialTheme();
renderTheme(false);
renderMenu();
handleScroll();
startTyping();
fetchProjects();
DOM.year.textContent = new Date().getFullYear();
