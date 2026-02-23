// -----------------------------
// Tiny DOM helpers
// -----------------------------
function $(sel, root = document)
{
  return root.querySelector(sel);
}
function $all(sel, root = document)
{
  return Array.from(root.querySelectorAll(sel));
}

// -----------------------------
// Reduced motion (global)
// -----------------------------
const PREFERS_REDUCED =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// -----------------------------
// Year
// -----------------------------
function initYear()
{
  const y = $('#year');
  if (y)
  {
    y.textContent = String(new Date().getFullYear());
  }
}

// -----------------------------
// Theme toggle
// -----------------------------
function getSavedTheme()
{
  try
  {
    return localStorage.getItem('theme');
  }
  catch (e)
  {
    return null;
  }
}

function setSavedTheme(value)
{
  try
  {
    localStorage.setItem('theme', value);
  }
  catch (e)
  {
    // no-op
  }
}

function initThemeToggle()
{
  const btn = $('#themeToggle');
  if (!btn)
  {
    return;
  }

  const doc = document.documentElement;
  const current = doc.getAttribute('data-theme') || getSavedTheme() || 'light';
  doc.setAttribute('data-theme', current);
  btn.setAttribute('aria-pressed', current === 'dark' ? 'true' : 'false');

  btn.addEventListener('click', () =>
  {
    const now = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    doc.setAttribute('data-theme', now);
    setSavedTheme(now);
    btn.setAttribute('aria-pressed', now === 'dark' ? 'true' : 'false');
  });
}

// -----------------------------
// i18n dictionary
//  - You can replace &lt;strong&gt; with <strong> if you want rendered markup.
// -----------------------------
const I18N =
{
  en:
  {
    common:
    {
      skip_to_content: 'Skip to content',
      product_page: 'Product Page',
      github: 'GitHub',
      demo_trailer: 'Demo / Trailer',
      design_notes: 'Design Notes',
      design_doc: 'Design Doc',
      design_brief: 'Design Brief',
      blockouts: 'Blockouts',
      download_pdf: 'Download PDF',
      itchio: 'Itch.io'
    },
    nav:
    {
      projects: 'Projects',
      game_design: 'Game Design',
      writing: 'Writing',
      resume: 'Resume',
      contact: 'Contact'
    },
    hero:
    {
      title: 'Crafting atmospheric and immersive games, tools, and stories',
      subtitle:
        "I'm Pedro — solo game developer and designer focused on " +
        "&lt;strong&gt;psychological tension&lt;/strong&gt;, &lt;strong&gt;environmental storytelling&lt;/strong&gt;, " +
        "and &lt;strong&gt;polished tools&lt;/strong&gt; that help others build."
    },
    cta:
    {
      see_work: 'See my work',
      get_in_touch: 'Get in touch'
    },
    sections:
    {
      projects:
      {
        title: 'Projects',
        subtitle: 'Highlights from my Unity tooling, prototypes, and modding work.'
      },
      game_design:
      {
        title: 'Game Design',
        subtitle: "Systems, encounters, and narrative structures I've designed or prototyped."
      },
      writing:
      {
        title: 'Writing',
        subtitle: 'Design notes and more.'
      },
      resume:
      {
        title: 'Resume',
        subtitle: 'Game Developer and Designer • Unity Toolsmith',
        download_blurb:
          'Download a concise resume with selected projects, responsibilities, skills, and links.',
        download_btn: 'See Resume'
      },
      contact:
      {
        title: 'Contact',
        subtitle: "Let's collaborate or chat about your project.",
        email_label: 'Email:',
        github_label: 'GitHub:',
        itch_label: 'Itch.io:',
        linkedin_label: 'LinkedIn:',
        asset_store_label: 'Unity Asset Store:'
      }
    },
    cards:
    {
      timer_manager:
      {
        title: "Snog's Timer Manager",
        desc: 'Commercial Unity asset to manage all types of timers within Unity through code.',
        meta1: 'Unity • C# • IMGUI',
        meta2: 'Editor Tools • Timers • Clean Code'
      },
      shooter2d:
      {
        title: '2D platformer shooter prototype',
        desc:
          'A simple wave-based platformer shooter in 2D with store, inventory, ' +
          'upgrades, and different equipment',
        meta1: '2D • Platformer • Adaptable for Mobile',
        meta2: 'Upgrades • Store',
        demo: 'Demo'
      },
      sans_sheriff:
      {
        title: 'Sans Sheriff',
        desc: 'An endless 3D wave-based wild west shooter',
        meta1: 'Unity • Shooter • 3D',
        meta2: 'Design • Balancing'
      },
      heart_garden:
      {
        title: 'The Heart of the Garden',
        desc:
          'A short emotional adventure gift: non-Euclidean puzzles, time-linked rooms, ' +
          'and a core message — "My life only began after you."',
        meta1: 'Unity • Narrative Design • Puzzle Design',
        meta2: 'Visual Metaphors • Atmosphere'
      },
      audio_manager:
      {
        title: 'Studio-Grade Audio Manager (Unity)',
        desc:
          'Event-driven triggers, mixer snapshots, priority handling for overlapping sounds, ' +
          'zones with reverb and blending, and editor tooling for quick iteration.',
        meta1: 'Systems Design',
        meta2: 'UX for Tools',
        meta3: 'Iteration Pipelines'
      },
      routine:
      {
        title: 'The Routine: Text Horror Loop',
        desc:
          'A narrative focused text horror game that takes a twist on the mundane transforming ' +
          'it into something difficult to comprehend.',
        meta1: 'Game Design',
        meta2: 'Environmental Storytelling',
        meta3: 'Pacing',
        gdd: 'Game Design Document'
      },
      tunnels_galore:
      {
        title: 'Tunnels Galore Project',
        desc:
          'A psychological horror game in the tunnels of Paranapiacaba, full of anomalies ' +
          'thick Silent Hill-like fog and weird things amongst your normal work as a patrol guard',
        meta1: 'Psychological Horror',
        meta2: 'Enemies Logic',
        gdd: 'Game Design Document',
      },
      temporal_mod:
      {
        title: 'Temporal Engineering Minecraft Mod (1.18.2)',
        desc:
          'Multiblock reactors with heat &amp;amp; coolant, temporal zones (slow/speed), ' +
          'and Exotic Matter stability. Focus on readable HUD, tuning curves, ' +
          'and failure states that teach the system.',
        meta1: 'Balancing',
        meta2: 'HUD Clarity',
        meta3: 'Onboarding',
        doc: 'Project Design Document',
        repo: 'GitHub'
      }
    },
    writing:
    {
      item1: 'Fantasy/Sci-Fi Book — Across the Mirror (Love across worlds, non-euclidean)',
    }
  },

  pt:
  {
    common:
    {
      skip_to_content: 'Ir para o conteúdo',
      product_page: 'Página do Produto',
      github: 'GitHub',
      demo_trailer: 'Demo / Trailer',
      design_notes: 'Notas de Design',
      design_doc: 'Documento de Design',
      design_brief: 'Brief de Design',
      blockouts: 'Blockouts',
      download_pdf: 'Baixar PDF',
      itchio: 'Itch.io'
    },
    nav:
    {
      projects: 'Projetos',
      game_design: 'Game Design',
      writing: 'Escrita',
      resume: 'Currículo',
      contact: 'Contato'
    },
    hero:
    {
      title: 'Criando jogos, ferramentas e histórias atmosféricos e imersivos',
      subtitle:
        'Sou o Pedro — desenvolvedor e designer solo de jogos focado em ' +
        '&lt;strong&gt;tensão psicológica&lt;/strong&gt;, &lt;strong&gt;narrativa ambiental&lt;/strong&gt; ' +
        'e &lt;strong&gt;ferramentas polidas&lt;/strong&gt; que ajudam outras pessoas a construir.'
    },
    cta:
    {
      see_work: 'Ver meus trabalhos',
      get_in_touch: 'Entrar em contato'
    },
    sections:
    {
      projects:
      {
        title: 'Projetos',
        subtitle: 'Destaques das minhas ferramentas para Unity, protótipos e trabalhos de modding.'
      },
      game_design:
      {
        title: 'Game Design',
        subtitle: 'Sistemas, encontros e estruturas narrativas que projetei ou prototipei.'
      },
      writing:
      {
        title: 'Escrita',
        subtitle: 'Notas de design e mais.'
      },
      resume:
      {
        title: 'Currículo',
        subtitle: 'Desenvolvedor e Designer de Jogos • Ferramenteiro Unity',
        download_blurb:
          'Baixe um currículo conciso com projetos selecionados, responsabilidades, habilidades e links.',
        download_btn: 'Ver Currículo'
      },
      contact:
      {
        title: 'Contato',
        subtitle: 'Vamos colaborar ou conversar sobre o seu projeto.',
        email_label: 'Email:',
        github_label: 'GitHub:',
        itch_label: 'Itch.io:',
        linkedin_label: 'LinkedIn:',
        asset_store_label: 'Unity Asset Store:'
      }
    },
    cards:
    {
      timer_manager:
      {
        title: "Snog's Timer Manager",
        desc: 'Asset comercial para Unity que gerencia todos os tipos de timers via código.',
        meta1: 'Unity • C# • IMGUI',
        meta2: 'Ferramentas de Editor • Timers • Código Limpo'
      },
      shooter2d:
      {
        title: 'Protótipo 2D de um shooter de plataforma',
        desc:
          'Um simples shooter de plataforma 2D baseado em ondas de inimigos ' +
          'com loja, inventário, melhorias, e diferentes equipamentos',
        meta1: '2D • Platformer • Adaptável para Mobile',
        meta2: 'Melhorias • Loja',
        demo: 'Demo'
      },
      sans_sheriff:
      {
        title: 'Sans Sheriff',
        desc: 'Um shooter 3D de ondas infinitas no velho oeste',
        meta1: 'Unity • Shooter • 3D',
        meta2: 'Design • Balanceamento'
      },
      heart_garden:
      {
        title: 'The Heart of the Garden',
        desc:
          'Uma curta aventura emocional: puzzles não-euclidianos, salas ligadas ao tempo ' +
          'e a mensagem central — "Minha vida só começou depois de você."',
        meta1: 'Unity • Design Narrativo • Design de Puzzles',
        meta2: 'Metáforas Visuais • Atmosfera'
      },
      audio_manager:
      {
        title: 'Audio Manager de nível de estúdio (Unity)',
        desc:
          'Gatilhos orientados a eventos, snapshots de mixer, prioridade para sons sobrepostos, ' +
          'zonas com reverb e blending, e ferramentas de editor para iteração rápida.',
        meta1: 'Design de Sistemas',
        meta2: 'UX para Ferramentas',
        meta3: 'Pipelines de Iteração'
      },
      routine:
      {
        title: 'The Routine: Text Horror Loop',
        desc:
          'Um jogo de horror textual focado em narrativa que faz um desvio do banal ' +
          'e o transforma em algo difícil de compreender.',
        meta1: 'Game Design',
        meta2: 'Narrativa Ambiental',
        meta3: 'Ritmo',
        gdd: 'Documento de Game Design'
      },
      tunnels_galore:
      {
        title: 'Tunnels Galore Project',
        desc:
          'Um jogo de terror psicológico nos túneis funiculares de Paranapiacaba, cheio de anomalias, ' +
          'uma névoa espessa como em Silent Hill e coisas estranhas no meio do seu trabalho normal ' +
          'como um guarda noturno dos túneis',
        meta1: 'Terror psicológico',
        meta2: 'Lógica de inimigos',
        gdd: 'Documento de Game Design',
      },
      temporal_mod:
      {
        title: 'Mod de Minecraft Temporal Engineering (1.18.2)',
        desc:
          'Reatores multibloco com calor &amp;amp; resfriamento, zonas temporais (lento/rápido) ' +
          'e estabilidade de Matéria Exótica. Foco em HUD legível, curvas de ajuste ' +
          'e estados de falha que ensinam o sistema.',
        meta1: 'Balanceamento',
        meta2: 'Clareza de HUD',
        meta3: 'Onboarding',
        doc: 'Documento de Design do Projeto',
        repo: 'GitHub'
      }
    },
    writing:
    {
      item1: 'Livro Fantasia/Sci-Fi — Across the Mirror (Amor entre mundos, não-euclidiano)',
    }
  }
};

// -----------------------------
// i18n helpers
// -----------------------------
function getSavedLang()
{
  try
  {
    const saved = localStorage.getItem('lang');
    return (saved === 'pt' || saved === 'en') ? saved : 'en';
  }
  catch (e)
  {
    return 'en';
  }
}

function setLang(lang)
{
  try
  {
    localStorage.setItem('lang', lang);
  }
  catch (e)
  {
    // no-op
  }
  document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');
}

function getByPath(obj, path)
{
  return path.split('.').reduce((acc, part) =>
  {
    return (acc && Object.prototype.hasOwnProperty.call(acc, part)) ? acc[part] : undefined;
  }, obj);
}

function applyTranslations(lang)
{
  const dict = I18N[lang] || I18N.en;

  // Swap innerHTML for all [data-i18n]
  $all('[data-i18n]').forEach((el) =>
  {
    const key = el.getAttribute('data-i18n');
    const value = getByPath(dict, key);
    if (typeof value === 'string')
    {
      el.innerHTML = value;
    }
  });

  // Update language button label (shows the target language the user can switch to)
  const label = $('#langLabel');
  if (label)
  {
    label.textContent = (lang === 'en') ? 'PT' : 'EN';
  }

  // Optional: swap a localized resume file if you have both
  swapLocalizedAssets(lang);
}

function swapLocalizedAssets(lang)
{
  const resume = $('#resumeBtn');
  if (!resume)
  {
    return;
  }

  if (lang === 'pt')
  {
    // Ensure pdfs/curriculo.pdf exists on your server
    resume.setAttribute('href', 'pdfs/curriculo.pdf');
    resume.textContent = I18N.pt.sections.resume.download_btn;
  }
  else
  {
    resume.setAttribute('href', 'pdfs/resume.pdf');
    resume.textContent = I18N.en.sections.resume.download_btn;
  }
}

// -----------------------------
// Reveal on scroll
// -----------------------------
function initRevealOnScroll()
{
  const revealEls = $all('.reveal');

  if (PREFERS_REDUCED || !('IntersectionObserver' in window))
  {
    revealEls.forEach((el) =>
    {
      el.classList.add('visible');
    });
    return;
  }

  const io = new IntersectionObserver((entries, obs) =>
  {
    entries.forEach((entry) =>
    {
      if (entry.isIntersecting)
      {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  });

  revealEls.forEach((el) => io.observe(el));
}

// -----------------------------
// Header blur on scroll
// -----------------------------
function initHeaderOnScroll()
{
  const header = $('.site-header');
  if (!header)
  {
    return;
  }

  window.addEventListener('scroll', () =>
  {
    header.classList.toggle('scrolled', window.scrollY > 20);
  },
  { passive: true });
}

// -----------------------------
// Nav active state via aria-current
// -----------------------------
function initActiveNav()
{
  const navLinks = $all('.nav a[href^="#"]');
  const sectionMap = {};

  navLinks.forEach((link) =>
  {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section)
    {
      sectionMap[id] = { link, section };
    }
  });

  function setActiveLink(id)
  {
    navLinks.forEach((l) => l.removeAttribute('aria-current'));
    if (sectionMap[id])
    {
      sectionMap[id].link.setAttribute('aria-current', 'page');
    }
  }

  if (PREFERS_REDUCED || !('IntersectionObserver' in window) || Object.keys(sectionMap).length === 0)
  {
    return;
  }

  const io = new IntersectionObserver((entries) =>
  {
    entries.forEach((entry) =>
    {
      if (entry.isIntersecting)
      {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    root: null,
    rootMargin: '-60% 0px -35% 0px',
    threshold: 0
  });

  Object.keys(sectionMap).forEach((id) => io.observe(sectionMap[id].section));
}

// -----------------------------
// External links safety
// -----------------------------
function hardenExternalLinks()
{
  $all('a[target="_blank"]').forEach((a) =>
  {
    const rel = (a.getAttribute('rel') || '').toLowerCase();
    const needsNoopener = !rel.includes('noopener');
    const needsNoreferrer = !rel.includes('noreferrer');

    if (needsNoopener || needsNoreferrer)
    {
      a.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// -----------------------------
// Mobile menu (hamburger) toggle
// -----------------------------
function initMenuToggle()
{
  const btn = $('#menuToggle');
  const nav = $('#primaryNav');
  if (!btn || !nav)
  {
    return;
  }
  const firstLink = nav.querySelector('a');

  btn.addEventListener('click', () =>
  {
    const isOpen = document.body.classList.toggle('nav-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    if (isOpen && firstLink)
    {
      firstLink.focus();
    }
  });

  nav.addEventListener('click', (e) =>
  {
    const t = e.target;
    if (t && t.tagName === 'A')
    {
      document.body.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
      btn.focus();
    }
  });

  document.addEventListener('keydown', (e) =>
  {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open'))
    {
      document.body.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
      btn.focus();
    }
  });
}

// -----------------------------
// Language toggle init
// -----------------------------
function detectLang()
{
  try
  {
    const saved = localStorage.getItem('lang');
    if (saved === 'pt' || saved === 'en')
    {
      return saved;
    }
  }
  catch (e)
  {
    // no-op
  }
  const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return nav.startsWith('pt') ? 'pt' : 'en';
}

function initLanguage()
{
  const current = detectLang();
  setLang(current);
  applyTranslations(current);
  const btn = $('#langToggle');
  if (btn)
  {
    btn.setAttribute('aria-pressed', current === 'pt' ? 'true' : 'false');
    btn.addEventListener('click', () =>
    {
      const next = (getSavedLang() === 'en') ? 'pt' : 'en';
      setLang(next);
      applyTranslations(next);
      btn.setAttribute('aria-pressed', next === 'pt' ? 'true' : 'false');
    });
  }
}

// -----------------------------
// DOM Ready
// -----------------------------
document.addEventListener('DOMContentLoaded', () =>
{
  initYear();
  initThemeToggle();
  initLanguage();
  initMenuToggle();
  initRevealOnScroll();
  initHeaderOnScroll();
  initActiveNav();
  hardenExternalLinks();
});