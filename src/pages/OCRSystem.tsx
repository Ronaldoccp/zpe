import { CheckCircleIcon, DocumentTextIcon, XCircleIcon } from '@heroicons/react/24/outline';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createWorker } from 'tesseract.js';

const OCRSystem: React.FC = () => {
  const [documents, setDocuments] = useState<Array<any>>([]);
  const [processing, setProcessing] = useState(false);
  const [currentDocumentProgress, setCurrentDocumentProgress] = useState(0);
  const [currentDocument, setCurrentDocument] = useState<string | null>(null);

  // Configuração do Tesseract OCR
  const processDocuments = async (files: File[]) => {
    setProcessing(true);
    const newDocuments = [...documents];

    for (const file of files) {
      setCurrentDocument(file.name);
      setCurrentDocumentProgress(0);
      
      // Criar um objeto de documento
      const doc = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'processando',
        textContent: '',
        confidence: 0,
        dateProcessed: new Date(),
        preview: URL.createObjectURL(file)
      };

      newDocuments.push(doc);
      setDocuments([...newDocuments]);

      try {
        // Inicializar o worker do Tesseract
        const worker = await createWorker({
          logger: (m) => {
            if (m.status === 'recognizing text') {
              setCurrentDocumentProgress(m.progress * 100);
            }
          },
        });

        // Carregar idiomas
        await worker.loadLanguage('por+eng+spa');
        await worker.initialize('por+eng+spa');

        // Reconhecer texto no documento
        const { data } = await worker.recognize(file);
        await worker.terminate();

        // Atualizar documento com resultado
        const docIndex = newDocuments.findIndex(d => d.id === doc.id);
        if (docIndex !== -1) {
          newDocuments[docIndex] = {
            ...newDocuments[docIndex],
            status: 'concluído',
            textContent: data.text,
            confidence: data.confidence
          };
          setDocuments([...newDocuments]);
        }
      } catch (error) {
        console.error('Erro no processamento OCR:', error);
        // Atualizar documento com erro
        const docIndex = newDocuments.findIndex(d => d.id === doc.id);
        if (docIndex !== -1) {
          newDocuments[docIndex] = {
            ...newDocuments[docIndex],
            status: 'erro',
          };
          setDocuments([...newDocuments]);
        }
      }
    }

    setProcessing(false);
    setCurrentDocument(null);
    setCurrentDocumentProgress(0);
  };

  // Configuração do dropzone
  const onDrop = useCallback((acceptedFiles: File[]) => {
    processDocuments(acceptedFiles);
  }, [documents]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'application/pdf': []
    }
  });

  // Função para extrair tags/informações do texto
  const extractInfo = (text: string) => {
    const info = [];
    
    // Exemplo simples de extração de informações
    if (text.match(/cnpj|cpf/i)) info.push('Documento fiscal');
    if (text.match(/nf-?e|nota fiscal/i)) info.push('Nota Fiscal');
    if (text.match(/invoice|fatura/i)) info.push('Fatura');
    if (text.match(/bl|conhecimento|embarque/i)) info.push('Conhecimento de Embarque');
    if (text.match(/certificado|origem/i)) info.push('Certificado de Origem');
    
    return info.length > 0 ? info : ['Documento não classificado'];
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Sistema OCR</h1>
      <p className="mt-2 text-gray-600">
        Digitalização e processamento automático de documentos de importação/exportação
      </p>

      {/* Área de upload */}
      <div className="mt-6">
        <div {...getRootProps({
          className: `max-w-lg mx-auto flex justify-center px-6 pt-5 pb-6 border-2 ${isDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'} border-dashed rounded-md`
        })}>
          <div className="space-y-1 text-center">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                <span>Faça upload de arquivos</span>
                <input {...getInputProps()} className="sr-only" />
              </label>
              <p className="pl-1">ou arraste e solte</p>
            </div>
            <p className="text-xs text-gray-500">
              PNG, JPG, PDF até 10MB
            </p>
          </div>
        </div>
      </div>

      {/* Área de progresso */}
      {processing && (
        <div className="mt-6 max-w-lg mx-auto">
          <h3 className="text-sm font-medium text-gray-900">Processando: {currentDocument}</h3>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${currentDocumentProgress}%` }}
            ></div>
          </div>
          <p className="mt-1 text-sm text-gray-500 text-right">{Math.round(currentDocumentProgress)}%</p>
        </div>
      )}

      {/* Lista de documentos processados */}
      {documents.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Documentos Processados</h2>
          <div className="mt-4 flex flex-col">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                          Nome do Documento
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Status
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Tipo Detectado
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Confiança
                        </th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                          Data de Processamento
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {documents.map((doc) => (
                        <tr key={doc.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {doc.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            {doc.status === 'concluído' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <CheckCircleIcon className="mr-1 h-4 w-4 text-green-400" />
                                Concluído
                              </span>
                            ) : doc.status === 'erro' ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <XCircleIcon className="mr-1 h-4 w-4 text-red-400" />
                                Erro
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Processando
                              </span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {doc.textContent && extractInfo(doc.textContent).join(', ')}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {doc.confidence ? `${Math.round(doc.confidence)}%` : '-'}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {doc.dateProcessed.toLocaleString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview e validação de documento */}
      {documents.length > 0 && documents[documents.length - 1].status === 'concluído' && (
        <div className="mt-8 bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Validação de Documento
            </h3>
            <div className="mt-5 border-t border-gray-200">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Nome do arquivo</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {documents[documents.length - 1].name}
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Conteúdo extraído</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="max-h-60 overflow-y-auto p-2 bg-gray-50 rounded">
                      <pre className="whitespace-pre-wrap">{documents[documents.length - 1].textContent}</pre>
                    </div>
                  </dd>
                </div>
                <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                  <dt className="text-sm font-medium text-gray-500">Ações</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Validar e Aprovar
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Editar Manualmente
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Rejeitar
                      </button>
                    </div>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRSystem; 