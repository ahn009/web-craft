import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, Sparkles, LogIn, LogOut, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { navLinks } from '@/lib/agents';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-navy-900/80 backdrop-blur-xl border-b border-cyan/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 gap-2">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" className="flex items-center gap-1 sm:gap-2 group flex-shrink-0">
              <div className="relative">
                <Sparkles className="w-7 sm:w-10 h-7 sm:h-10 text-cyan transition-all duration-300 group-hover:text-cyan-400" />
                <div className="absolute inset-0 bg-cyan/40 blur-2xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="hidden sm:inline text-xl sm:text-2xl font-bold gradient-text">
                WebCraft AI
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    to={link.href}
                    className={`relative text-xs xl:text-sm transition-all duration-300 group px-2 xl:px-3 py-1.5 rounded-lg hover:bg-gradient-to-r hover:from-cyan/10 hover:to-purple/10 ${
                      isActive
                        ? 'text-cyan font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan to-purple transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* CTA + Auth Buttons */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 text-foreground hover:bg-cyan/10 rounded-full px-3 xl:px-4 text-xs xl:text-sm py-1.5"
                  >
                    <div className="w-6 xl:w-8 h-6 xl:h-8 rounded-full bg-gradient-to-r from-cyan to-purple flex items-center justify-center text-navy-900 font-semibold text-xs">
                      {user?.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden xl:inline text-sm">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-navy-900/95 backdrop-blur-xl border-border/50"
                >
                  <DropdownMenuItem className="text-muted-foreground text-xs" disabled>
                    {user?.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem asChild className="text-foreground focus:text-cyan focus:bg-cyan/10 cursor-pointer">
                    <Link to="/my-agents">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      My Agents
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-400 focus:text-red-400 focus:bg-red-500/10 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground hover:bg-cyan/10 rounded-full px-2 xl:px-4 gap-1 xl:gap-2 text-xs xl:text-sm py-1.5"
                  >
                    <LogIn className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign In</span>
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="relative overflow-hidden bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold px-4 xl:px-6 py-1.5 xl:py-2 rounded-full transition-all duration-300 hover:shadow-glow hover:scale-105 text-xs xl:text-sm"
                  >
                    <span className="relative z-10">Get Started</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-cyan-300"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </Link>
              </>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/deploy">
                <Button
                  variant="outline"
                  className="border-cyan/30 text-cyan hover:bg-cyan/10 rounded-full px-3 xl:px-4 py-1.5 text-xs xl:text-sm"
                >
                  Deploy Agent
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground h-10 w-10">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80vw] max-w-[300px] bg-navy-900/95 backdrop-blur-xl border-l border-cyan/20 p-4"
            >
              <div className="flex flex-col gap-6 mt-6">
                {/* Mobile Logo */}
                <Link to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                  <Sparkles className="w-6 h-6 text-cyan" />
                  <span className="text-base font-bold gradient-text">WebCraft AI</span>
                </Link>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className={`block text-sm py-2 px-3 rounded-lg border-b border-border/50 transition-all duration-300 hover:bg-gradient-to-r hover:from-cyan/10 hover:to-purple/10 ${
                            isActive
                              ? 'text-cyan font-medium'
                              : 'text-muted-foreground hover:text-cyan'
                          }`}
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Mobile Auth */}
                <div className="flex flex-col gap-2 border-t border-border/50 pt-4">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan to-purple flex items-center justify-center text-navy-900 font-semibold text-xs">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-xs font-medium">{user?.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                      </div>
                      <Link to="/my-agents" onClick={() => setIsOpen(false)} className="w-full">
                        <Button
                          variant="outline"
                          className="w-full gap-2 border-cyan/30 text-cyan hover:bg-cyan/10 rounded-lg text-xs py-1.5"
                        >
                          <ShoppingBag className="w-3 h-3" /> My Agents
                        </Button>
                      </Link>
                      <Button
                        onClick={() => { logout(); setIsOpen(false); }}
                        variant="outline"
                        className="w-full gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-lg text-xs py-1.5"
                      >
                        <LogOut className="w-3 h-3" /> Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                        <Button variant="outline" className="w-full gap-2 border-border/50 hover:border-cyan/30 rounded-lg text-xs py-1.5">
                          <LogIn className="w-3 h-3" /> Sign In
                        </Button>
                      </Link>
                      <Link to="/register" onClick={() => setIsOpen(false)} className="w-full">
                        <Button className="w-full bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold py-2 rounded-lg text-xs">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}

                  <Link to="/deploy" onClick={() => setIsOpen(false)} className="w-full">
                    <Button
                      variant="outline"
                      className="w-full border-cyan/30 text-cyan hover:bg-cyan/10 rounded-lg text-xs py-1.5"
                    >
                      Deploy Agent
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
