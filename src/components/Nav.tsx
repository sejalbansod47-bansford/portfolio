import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from 'react'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToSection, type SectionId } from '../lib/sections'
import {
  ChevronIcon,
  EmailIcon,
  GithubIcon,
  HomeIcon,
  LinkedInIcon,
  PersonIcon,
  ResumeIcon,
} from './NavIcons'
import { ResumeViewer } from './ResumeViewer'
import './Nav.css'

type MenuKey = 'projects' | 'experience' | 'engagement' | 'contact' | null
type MenuItem = { label: string; target: SectionId }

const projectItems: MenuItem[] = [
  { label: 'Is This For Real', target: 'projects' },
  { label: 'Cyber Shield', target: 'projects' },
]

const experienceItems: MenuItem[] = [
  { label: 'Test Engineer', target: 'experience' },
]
const engagementItems: MenuItem[] = [
  { label: 'Coming soon', target: 'engagement' },
]

const sectionHref = (id: SectionId) => (id === 'home' ? '/' : `#${id}`)

/** Nav order: Home · Resume · Experience · Projects · About Me · Engagement · Contact */
export function Nav() {
  const [open, setOpen] = useState<MenuKey>(null)
  const [resumeOpen, setResumeOpen] = useState(false)
  const active = useActiveSection()
  const navRef = useRef<HTMLElement>(null)
  const contactId = useId()
  const contactMenuRef = useRef<HTMLUListElement>(null)
  const focusContactFirst = useRef(false)

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpen(null)
      }
    }
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Escape') return
      const trigger = navRef.current?.querySelector<HTMLElement>(
        '[aria-expanded="true"]',
      )
      setOpen(null)
      trigger?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (open !== 'contact' || !focusContactFirst.current) return
    focusContactFirst.current = false
    contactMenuRef.current && menuItems(contactMenuRef.current)[0]?.focus()
  }, [open])

  const toggle = (key: MenuKey) => {
    setOpen((current) => (current === key ? null : key))
  }

  const go = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setOpen(null)
    scrollToSection(id)
  }

  return (
    <header className="mp-nav" ref={navRef}>
      <div className="mp-nav__glass" aria-hidden="true" />
      <nav
        className="mp-nav__row"
        aria-label="Primary"
        data-testid="primary-nav"
      >
        <a
          href={sectionHref('home')}
          className={
            active === 'home' ? 'mp-nav__home is-active' : 'mp-nav__home'
          }
          aria-label="Home"
          aria-current={active === 'home' ? 'location' : undefined}
          data-testid="nav-home"
          onClick={go('home')}
        >
          <span className="mp-nav__home-box">
            <HomeIcon />
          </span>
        </a>

        <button
          type="button"
          className="mp-nav__pill mp-nav__resume"
          aria-haspopup="dialog"
          aria-expanded={resumeOpen}
          onClick={() => {
            setOpen(null)
            setResumeOpen(true)
          }}
        >
          Resume
          <span className="mp-nav__resume-box">
            <ResumeIcon />
          </span>
        </button>

        <Dropdown
          label="Experience"
          open={open === 'experience'}
          onToggle={() => toggle('experience')}
          items={experienceItems}
          onNavigate={go}
          widthClass="mp-nav__dropdown--experience"
          active={active === 'experience'}
        />

        <Dropdown
          label="Projects"
          open={open === 'projects'}
          onToggle={() => toggle('projects')}
          items={projectItems}
          onNavigate={go}
          widthClass="mp-nav__dropdown--projects"
          active={active === 'projects'}
        />

        <a
          href={sectionHref('about')}
          data-testid="nav-about"
          className={
            active === 'about'
              ? 'mp-nav__pill mp-nav__about is-active'
              : 'mp-nav__pill mp-nav__about'
          }
          aria-current={active === 'about' ? 'location' : undefined}
          onClick={go('about')}
        >
          About Me
        </a>

        <Dropdown
          label="Engagement"
          open={open === 'engagement'}
          onToggle={() => toggle('engagement')}
          items={engagementItems}
          onNavigate={go}
          widthClass="mp-nav__dropdown--engagement"
          active={active === 'engagement'}
        />

        <div className="mp-nav__contact">
          <button
            type="button"
            className={['mp-nav__pill', open === 'contact' ? 'is-open' : '']
              .filter(Boolean)
              .join(' ')}
            aria-expanded={open === 'contact'}
            aria-haspopup="menu"
            aria-controls={contactId}
            aria-label="Contact links"
            onClick={() => toggle('contact')}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault()
                focusContactFirst.current = true
                if (open !== 'contact') toggle('contact')
                else
                  contactMenuRef.current &&
                    menuItems(contactMenuRef.current)[0]?.focus()
              }
            }}
          >
            <span className="mp-nav__person-box">
              <PersonIcon />
            </span>
            <span
              className={
                open === 'contact'
                  ? 'mp-nav__chevron-box is-up'
                  : 'mp-nav__chevron-box'
              }
            >
              <ChevronIcon />
            </span>
          </button>
          {open === 'contact' ? (
            <ul
              id={contactId}
              className="mp-nav__contact-menu"
              role="menu"
              ref={contactMenuRef}
              onKeyDown={(event) => onMenuKey(event, () => setOpen(null))}
            >
              <li role="none">
                <a
                  className="mp-nav__social"
                  role="menuitem"
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="mp-nav__social-icon">
                    <GithubIcon />
                  </span>
                  <span className="visually-hidden">GitHub</span>
                </a>
              </li>
              <li role="none">
                <a
                  className="mp-nav__social"
                  role="menuitem"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="mp-nav__social-icon">
                    <LinkedInIcon />
                  </span>
                  <span className="visually-hidden">LinkedIn</span>
                </a>
              </li>
              <li role="none">
                <a
                  className="mp-nav__social"
                  role="menuitem"
                  href="mailto:hello@example.com"
                >
                  <span className="mp-nav__social-icon">
                    <EmailIcon />
                  </span>
                  <span className="visually-hidden">Email</span>
                </a>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>

      {resumeOpen ? (
        <ResumeViewer onClose={() => setResumeOpen(false)} />
      ) : null}
    </header>
  )
}

function Dropdown({
  label,
  open,
  onToggle,
  items,
  onNavigate,
  widthClass,
  active = false,
}: {
  label: string
  open: boolean
  onToggle: () => void
  items: MenuItem[]
  onNavigate: (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => void
  widthClass: string
  active?: boolean
}) {
  const menuId = useId()
  const menuRef = useRef<HTMLUListElement>(null)
  const focusFirst = useRef(false)

  useEffect(() => {
    if (!open || !focusFirst.current) return
    focusFirst.current = false
    menuRef.current && menuItems(menuRef.current)[0]?.focus()
  }, [open])

  return (
    <div className={`mp-nav__dropdown ${widthClass}`}>
      <button
        type="button"
        className={[
          'mp-nav__pill',
          active ? 'is-active' : '',
          open ? 'is-open' : '',
        ]
          .filter(Boolean)
          .join(' ')}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault()
            focusFirst.current = true
            if (!open) onToggle()
            else menuRef.current && menuItems(menuRef.current)[0]?.focus()
          }
        }}
      >
        {label}
        <span className={open ? 'mp-nav__chevron-box is-up' : 'mp-nav__chevron-box'}>
          <ChevronIcon />
        </span>
      </button>
      {open ? (
        <ul
          id={menuId}
          className="mp-nav__menu"
          role="menu"
          ref={menuRef}
          onKeyDown={(event) => onMenuKey(event, onToggle)}
        >
          {items.map((item) => (
            <li key={item.label} role="none">
              <a
                className="mp-nav__menu-item"
                role="menuitem"
                href={sectionHref(item.target)}
                onClick={onNavigate(item.target)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

function menuItems(menu: HTMLElement) {
  return Array.from(
    menu.querySelectorAll<HTMLElement>('[role="menuitem"]'),
  )
}

function onMenuKey(event: KeyboardEvent<HTMLUListElement>, close: () => void) {
  const items = menuItems(event.currentTarget)
  const index = items.indexOf(document.activeElement as HTMLElement)
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    items[(index + 1) % items.length]?.focus()
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    items[(index - 1 + items.length) % items.length]?.focus()
  } else if (event.key === 'Home') {
    event.preventDefault()
    items[0]?.focus()
  } else if (event.key === 'End') {
    event.preventDefault()
    items[items.length - 1]?.focus()
  } else if (event.key === 'Escape') {
    event.preventDefault()
    close()
  }
}
