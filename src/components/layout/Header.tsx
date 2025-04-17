import React from 'react';
import { Link } from 'react-router-dom';
import {
  LogOut,
  Bell,
  User,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { useFinance } from '@/context/FinanceContext';

const Header = () => {
  const isMobile = useIsMobile();
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const { user, profile, logout } = useFinance();

  const handleLogout = async () => {
    await logout();
  };

  const userInitials = React.useMemo(() => {
    if (profile?.firstName && profile?.lastName) {
      return `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'NA';
  }, [profile, user]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md animate-fade-in">
      <div className="flex h-16 items-center justify-between w-full px-4">
        {/* Left side - PortWiz logo */}
        <div className="flex items-center">
          {isMobile && (
            <Button
              variant="ghost"
              className="mr-2"
              size="icon"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-finance-teal flex items-center justify-center mr-2">
              <span className="text-black font-bold">PW</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline-block">PortWiz</span>
          </Link>
        </div>

        {/* Right side - Notifications and User menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:flex hover:bg-white/10"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-finance-teal"></span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-9 w-9 rounded-full hover:bg-white/10"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={profile?.avatarUrl || ''} alt={user?.email || 'User'} />
                  <AvatarFallback className="bg-finance-teal text-black font-medium">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-500 focus:text-red-500"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && showMobileMenu && (
        <>
          {/* Backdrop - blurred overlay for the main area */}
          <div 
            className="fixed inset-0 top-16 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
            style={{ zIndex: 100 }}
            onClick={() => setShowMobileMenu(false)}
          />
          
          {/* Actual sidebar with navigation items */}
          <div 
            className="fixed top-16 left-0 bottom-0 w-64 bg-background/95 border-r border-white/20 animate-in slide-in-from-left duration-200 shadow-xl"
            style={{ zIndex: 101 }}
          >
            <nav className="flex flex-col h-full p-4 space-y-4">
              <div className="flex flex-col space-y-1">
                <Button variant="ghost" className="justify-start" asChild onClick={() => setShowMobileMenu(false)}>
                  <Link to="/">Dashboard</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setShowMobileMenu(false)}>
                  <Link to="/portfolio">Portfolio</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setShowMobileMenu(false)}>
                  <Link to="/watchlist">Watchlist</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setShowMobileMenu(false)}>
                  <Link to="/transactions">Transactions</Link>
                </Button>
              </div>
              
              <div className="mt-auto">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start" 
                  onClick={() => {
                    setShowMobileMenu(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
