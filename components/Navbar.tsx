'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Heart, Sun, Moon, UtensilsCrossed } from 'lucide-react'
import { useFavorites } from '@/hooks/useFavorites'

export default function Navbar() {
    const pathname = usePathname()
    const [isDark, setIsDark] = useState(false)
    const { favorites } = useFavorites()
    const favCount = favorites.length

  useEffect(() => {
        // Initialize dark mode from localStorage / system preference
                const saved = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setIsDark(saved === 'dark' || (!saved && prefersDark))
  }, [])

  const toggleDark = () => {
        const next = !isDark
        setIsDark(next)
        if (next) {
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
        } else {
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
        }
  }

  return (
        <header
                className="sticky top-0 z-50 glass border-b transition-all duration-300"
                style={{ borderColor: 'var(--border)' }}
              >
              <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Logo */}
                      <Link href="/" className="flex items-center gap-2 group">
                                <div
                                              className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-sm transition-transform duration-200 group-hover:scale-110"
                                              style={{ background: 'var(--accent)' }}
                                            >
                                            <UtensilsCrossed size={16} />
                                </div>div>
                                <span className="font-bold text-base tracking-tight" style={{ color: 'var(--text-primary)' }}>
                                            SAR YA AUNG
                                </span>span>
                      </Link>Link>
              
                {/* Right side actions */}
                      <div className="flex items-center gap-2">
                        {/* Favorites */}
                                <Link
                                              href="/favorites"
                                              className="relative flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                                              style={{
                                                              background: pathname === '/favorites' ? 'var(--accent)' : 'var(--bg-card)',
                                                              boxShadow: 'var(--shadow-sm)',
                                              }}
                                              aria-label="お気に入り"
                                            >
                                            <Heart
                                                            size={17}
                                                            className={pathname === '/favorites' ? 'text-white fill-white' : ''}
                                                            style={{ color: pathname === '/favorites' ? 'white' : 'var(--text-secondary)' }}
                                                          />
                                  {favCount > 0 && (
                                                            <span
                                                                              className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-[10px] font-bold flex items-center justify-center"
                                                                              style={{ background: 'var(--accent)' }}
                                                                            >
                                                              {favCount > 9 ? '9+' : favCount}
                                                            </span>span>
                                            )}
                                </Link>Link>
                      
                        {/* Dark mode toggle */}
                                <button
                                              onClick={toggleDark}
                                              className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
                                              style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
                                              aria-label="ダークモード切替"
                                            >
                                  {isDark ? (
                                                            <Sun size={17} style={{ color: 'var(--text-secondary)' }} />
                                                          ) : (
                                                            <Moon size={17} style={{ color: 'var(--text-secondary)' }} />
                                                          )}
                                </button>button>
                      </div>div>
              </div>div>
        </header>header>
      )
}</header>
