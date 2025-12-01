'use client';

import { useEffect, useState } from 'react';

interface Section {
  id: string;
  label: string;
}

const defaultSections: Section[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'specs', label: 'Classes' },
  { id: 'guidelines', label: 'Guidelines' },
  { id: 'examples', label: 'Examples' },
];

interface SectionTabsProps {
  sections?: Section[];
}

export function SectionTabs({ sections = defaultSections }: SectionTabsProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || 'overview');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="sticky top-16 z-10 bg-surface py-4 -mx-6 px-6 md:-mx-10 md:px-10 border-b border-default">
      <div className="inline-flex bg-surface-hover rounded-lg p-1 flex-wrap">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeSection === section.id
                ? 'bg-surface-raised text-default shadow-sm'
                : 'text-muted hover:text-default'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}
