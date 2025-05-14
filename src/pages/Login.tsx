import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de autenticação
    if (username === 'admin' && password === 'admin123') {
      // Normalmente você usaria um token JWT ou similar
      localStorage.setItem('authToken', 'sample-token');
      navigate('/');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex justify-center">
            <img
              className="h-24 w-auto"
              src="/logo.svg"
              alt="ZPE Bacabeira"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-neutral-900">
            Sistema de Gestão Aduaneira
          </h2>
          <p className="mt-2 text-center text-sm text-neutral-600">
            ZPE Bacabeira - Maranhão
          </p>
        
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Nome de usuário
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-maranhao-green focus:border-maranhao-green focus:z-10 sm:text-sm"
                  placeholder="Nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-b-md focus:outline-none focus:ring-maranhao-green focus:border-maranhao-green focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-maranhao-red text-sm text-center bg-red-50 p-2 rounded">{error}</div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-maranhao-green focus:ring-maranhao-green border-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-900">
                  Lembrar-me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-maranhao-blue hover:text-maranhao-blue hover:underline">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 pt-4">
              <button
                type="submit"
                className="col-span-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-maranhao-green hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-maranhao-green transition duration-150"
              >
                Entrar
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-2 pt-4 mt-4">
              <div className="col-span-1">
                <button type="button" className="w-full py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maranhao-red hover:bg-opacity-90 focus:outline-none transition duration-150"></button>
              </div>
              <div className="col-span-1">
                <button type="button" className="w-full py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maranhao-blue hover:bg-opacity-90 focus:outline-none transition duration-150"></button>
              </div>
              <div className="col-span-1">
                <button type="button" className="w-full py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maranhao-green hover:bg-opacity-90 focus:outline-none transition duration-150"></button>
              </div>
              <div className="col-span-1">
                <button type="button" className="w-full py-2 border border-transparent text-sm font-medium rounded-md text-white bg-maranhao-yellow hover:bg-opacity-90 focus:outline-none transition duration-150"></button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login; 