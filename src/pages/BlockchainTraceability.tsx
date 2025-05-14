import { ArrowPathIcon, DocumentCheckIcon, LinkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

// Interface para o histórico de transações
interface Transaction {
  id: string;
  timestamp: string;
  operation: string;
  actor: string;
  document: string;
  hash: string;
}

const BlockchainTraceability: React.FC = () => {
  const [trackingCode, setTrackingCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [certificateValid, setCertificateValid] = useState<boolean | null>(null);

  // Dados fictícios de transações
  const transactions: Transaction[] = [
    {
      id: '0x72f8b2a298b564a',
      timestamp: '2023-09-25T14:32:45',
      operation: 'Registro de Manifesto de Carga',
      actor: 'Operador Portuário',
      document: 'Manifesto #12345',
      hash: '0x6a91b456c82ad72d8e122f3b742a3e7a54e34c0e1d9fc2c7c5c9e9a20f5ee703'
    },
    {
      id: '0x9f7c1d6e36a42b5',
      timestamp: '2023-09-26T09:15:22',
      operation: 'Registro de Certificado de Origem',
      actor: 'Autoridade Certificadora',
      document: 'Certificado #A7890',
      hash: '0x3f8e2a567d91c40b12ae45f67d983ab21c9e5a74e86f2a3e5bce7f2d6f19a810'
    },
    {
      id: '0x3e8d57c19f2a6b4',
      timestamp: '2023-09-26T16:42:18',
      operation: 'Inspeção Aduaneira',
      actor: 'Auditor Fiscal',
      document: 'Laudo #F5432',
      hash: '0x5c7d23e8a41b69f07d82a5e3f9a762c8f36a9b12d5e7c4a8b32f1e56a897c342'
    },
    {
      id: '0x1a4c9e7d5b2f38a',
      timestamp: '2023-09-27T11:08:36',
      operation: 'Autorização de Liberação',
      actor: 'Analista Aduaneiro',
      document: 'Despacho #H9012',
      hash: '0x9e4f2a3c1d78b65a0e23d19f7c42a58e36b41c79a5d2e8f46b9c07a15e32d748'
    },
    {
      id: '0x8b5c2d4e9a7f36a',
      timestamp: '2023-09-28T08:25:10',
      operation: 'Saída da ZPE',
      actor: 'Sistema de Controle de Acesso',
      document: 'Registro de Saída #S7834',
      hash: '0x2c8a47f5e9d13b60c74a58e29f16d3a5b87c42e1f9a5d64c8b32a17e45f9d260'
    }
  ];

  // Função para simular a verificação do código
  const handleTrack = () => {
    if (!trackingCode.trim()) return;
    
    setIsLoading(true);
    
    // Simulação de verificação
    setTimeout(() => {
      setIsLoading(false);
      setSearchPerformed(true);
      // Simulação de validade - considera válido se o código tiver mais de 5 caracteres
      setCertificateValid(trackingCode.length > 5);
    }, 1500);
  };

  // Função para formatar data/hora
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-BR');
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Sistema de Rastreabilidade Blockchain</h1>
      <p className="mt-2 text-gray-600">
        Registro imutável e transparente de toda a cadeia logística e documental
      </p>

      {/* Área de busca */}
      <div className="mt-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Verificação de Documentos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Insira o código de rastreio ou hash do documento para verificar sua autenticidade e histórico.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="tracking-code" className="block text-sm font-medium text-gray-700">
                  Código de Rastreio / Hash do Documento
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="tracking-code"
                    id="tracking-code"
                    className="flex-1 focus:ring-primary-500 focus:border-primary-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                    placeholder="Ex: 0x3f8e2a567d91c40b12ae45f..."
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                  />
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    onClick={handleTrack}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                        Verificando...
                      </>
                    ) : (
                      'Verificar'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resultado da verificação */}
      {searchPerformed && (
        <div className="mt-8">
          <div className={`rounded-md p-4 ${certificateValid ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex">
              <div className="flex-shrink-0">
                {certificateValid ? (
                  <DocumentCheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                ) : (
                  <span className="h-5 w-5 flex items-center justify-center rounded-full bg-red-400">
                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${certificateValid ? 'text-green-800' : 'text-red-800'}`}>
                  {certificateValid
                    ? 'Documento verificado com sucesso'
                    : 'Documento não encontrado ou inválido'}
                </h3>
                <div className={`mt-2 text-sm ${certificateValid ? 'text-green-700' : 'text-red-700'}`}>
                  <p>
                    {certificateValid
                      ? 'O documento é autêntico e foi registrado no blockchain da ZPE Bacabeira.'
                      : 'Não foi possível verificar a autenticidade deste documento. Verifique o código inserido ou entre em contato com o suporte.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de transações */}
          {certificateValid && (
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Histórico de Transações
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Registros imutáveis de todas as operações relacionadas a este documento.
                </p>
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {transactions.map((transaction) => (
                    <li key={transaction.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <LinkIcon className="h-5 w-5 text-primary-500 mr-2" />
                          <p className="text-sm font-medium text-primary-600 truncate">
                            {transaction.operation}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Verificado
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {transaction.actor} - {transaction.document}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            {formatDateTime(transaction.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs text-gray-400 font-mono break-all">
                          Hash: {transaction.hash}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Visualização do certificado */}
          {certificateValid && (
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Certificado Digital
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Certificado de autenticidade registrado no blockchain.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <DocumentCheckIcon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Certificado de Origem</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Documento certificado pela ZPE Bacabeira
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span>ID do Certificado:</span>
                      <span className="font-medium">#A7890</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span>Data de Emissão:</span>
                      <span className="font-medium">26/09/2023</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span>Emissor:</span>
                      <span className="font-medium">Autoridade Certificadora</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <span>Status:</span>
                      <span className="font-medium text-green-600">Ativo</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Verificar Assinatura Digital
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlockchainTraceability; 