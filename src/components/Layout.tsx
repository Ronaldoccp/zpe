import {
    BellIcon,
    DocumentTextIcon,
    HomeIcon,
    LinkIcon,
    ShieldCheckIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, href: '/' },
  { name: 'Sistema OCR', icon: DocumentTextIcon, href: '/ocr' },
  { name: 'Avaliação de Risco', icon: ShieldCheckIcon, href: '/risk-assessment' },
  { name: 'Rastreabilidade Blockchain', icon: LinkIcon, href: '/blockchain' },
];

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar para mobile */}
      <div 
        className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`} 
        role="dialog" 
        aria-modal="true"
      >
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          aria-hidden="true"
          onClick={() => setSidebarOpen(false)}
        ></div>

        <div className="relative flex-1 flex flex-col max-w-64 w-full pt-5 pb-4 bg-maranhao-green">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center">
              <img
                className="h-10 w-auto"
                src="/logo.svg"
                alt="ZPE Bacabeira"
              />
            </div>
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Fechar sidebar</span>
              <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item, index) => {
                // Alternando cores conforme a identidade visual do Maranhão
                const colors = [
                  'bg-maranhao-red hover:bg-opacity-90', // Vermelho
                  'bg-maranhao-blue hover:bg-opacity-90', // Azul
                  'bg-maranhao-green hover:bg-opacity-90', // Verde
                  'bg-maranhao-yellow hover:bg-opacity-90', // Amarelo
                ];
                const activeColor = colors[index % colors.length];
                const defaultColor = 'bg-opacity-80 hover:bg-opacity-90';
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? activeColor
                        : defaultColor
                    } ${colors[index % colors.length]} text-white group flex items-center px-2 py-2 text-base font-medium rounded-md transition-all duration-150`}
                  >
                    <item.icon className="mr-4 h-6 w-6 text-white" aria-hidden="true" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Sidebar para desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 bg-white border-b-2 border-maranhao-green">
              <img
                className="h-12 w-auto"
                src="/logo.svg"
                alt="ZPE Bacabeira"
              />
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto bg-white">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item, index) => {
                  // Alternando cores conforme a identidade visual do Maranhão
                  const colors = [
                    'bg-maranhao-red hover:bg-opacity-90 text-white', // Vermelho
                    'bg-maranhao-blue hover:bg-opacity-90 text-white', // Azul
                    'bg-maranhao-green hover:bg-opacity-90 text-white', // Verde
                    'bg-maranhao-yellow hover:bg-opacity-90 text-white', // Amarelo
                  ];
                  const defaultColors = [
                    'text-maranhao-red hover:bg-maranhao-red hover:bg-opacity-10', // Vermelho
                    'text-maranhao-blue hover:bg-maranhao-blue hover:bg-opacity-10', // Azul
                    'text-maranhao-green hover:bg-maranhao-green hover:bg-opacity-10', // Verde
                    'text-maranhao-yellow hover:bg-maranhao-yellow hover:bg-opacity-10', // Amarelo
                  ];
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`${
                        location.pathname === item.href
                          ? colors[index % colors.length]
                          : defaultColors[index % defaultColors.length]
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-all duration-150`}
                    >
                      <item.icon 
                        className={`mr-3 h-6 w-6 ${
                          location.pathname === item.href
                            ? 'text-white'
                            : defaultColors[index % defaultColors.length].split(' ')[0]
                        }`} 
                        aria-hidden="true" 
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Abrir sidebar</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex-1 px-4 flex justify-end">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="text-sm font-medium text-maranhao-black mr-4">
                Zona de Processamento de Exportação - Maranhão
              </div>
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maranhao-green"
              >
                <span className="sr-only">Ver notificações</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maranhao-green"
                    id="user-menu-button"
                  >
                    <span className="sr-only">Abrir menu de usuário</span>
                    <UserCircleIcon className="h-8 w-8 text-maranhao-blue" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 