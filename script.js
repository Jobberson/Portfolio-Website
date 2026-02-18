(function ()
{
  document.addEventListener('DOMContentLoaded', function ()
  {
    // Theme toggle & persistence
    var root = document.documentElement;
    var btn = document.getElementById('themeToggle');
    var currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

    if (btn)
    {
      btn.setAttribute('aria-pressed', String(currentTheme === 'dark'));

      btn.addEventListener('click', function ()
      {
        var current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        var next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try
        {
          localStorage.setItem('theme', next);
        }
        catch (e)
        {
          /* no-op */
        }
        btn.setAttribute('aria-pressed', String(next === 'dark'));
      });
    }

    // Footer year (overwrites fallback)
    var yearEl = document.getElementById('year');
    if (yearEl)
    {
      yearEl.textContent = String(new Date().getFullYear());
    }

    // Reduced motion?
    var prefersReduced =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reveal on scroll
    var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

    if (prefersReduced || !('IntersectionObserver' in window))
    {
      revealEls.forEach(function (el)
      {
        el.classList.add('visible');
      });
    }
    else
    {
      var revealObserver = new IntersectionObserver(function (entries, io)
      {
        entries.forEach(function (entry)
        {
          if (entry.isIntersecting)
          {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.15
      });

      revealEls.forEach(function (el)
      {
        revealObserver.observe(el);
      });
    }

    // Header blur on scroll
    var header = document.querySelector('.site-header');
    if (header)
    {
      window.addEventListener('scroll', function ()
      {
        if (window.scrollY > 20)
        {
          header.classList.add('scrolled');
        }
        else
        {
          header.classList.remove('scrolled');
        }
      },
      { passive: true });
    }

    // Nav active state via aria-current
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
    var sectionMap = {};

    navLinks.forEach(function (link)
    {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section)
      {
        sectionMap[id] = { link: link, section: section };
      }
    });

    function setActiveLink(id)
    {
      navLinks.forEach(function (l)
      {
        l.removeAttribute('aria-current');
      });
      if (sectionMap[id] && sectionMap[id].link)
      {
        sectionMap[id].link.setAttribute('aria-current', 'page');
      }
    }

    if (!prefersReduced && 'IntersectionObserver' in window && Object.keys(sectionMap).length > 0)
    {
      var sectionsObserver = new IntersectionObserver(function (entries)
      {
        entries.forEach(function (entry)
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

      Object.keys(sectionMap).forEach(function (id)
      {
        sectionsObserver.observe(sectionMap[id].section);
      });
    }

    // Ensure target=_blank links are safe
    var externalLinks = Array.prototype.slice.call(document.querySelectorAll('a[target="_blank"]'));
    externalLinks.forEach(function (a)
    {
      var rel = (a.getAttribute('rel') || '').toLowerCase();
      if (!rel.includes('noopener') || !rel.includes('noreferrer'))
      {
        a.setAttribute('rel', 'noopener noreferrer');
      }
    });
  });
}());