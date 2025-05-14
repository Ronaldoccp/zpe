import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    ShieldExclamationIcon
} from '@heroicons/react/24/outline';
import { ArcElement, Chart as ChartJS, Filler, Legend, LineElement, PointElement, RadialLinearScale, Tooltip } from 'chart.js';
import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';

// Registrar componentes de gráfico
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
);

const riskFactors = [
  { id: 1, name: 'Origem da Mercadoria', description: 'Avalia o risco baseado no país de origem da mercadoria' },
  { id: 2, name: 'Histórico do Importador', description: 'Analisa o comportamento anterior do importador em operações similares' },
  { id: 3, name: 'Tipo de Mercadoria', description: 'Determina o risco com base nas características do produto' },
  { id: 4, name: 'Rota de Transporte', description: 'Avalia riscos associados ao trajeto percorrido pela carga' },
  { id: 5, name: 'Consistência Documental', description: 'Verifica a coerência entre os documentos apresentados' },
  { id: 6, name: 'Valor Declarado', description: 'Compara o valor declarado com valores médios de mercadorias similares' },
];

const RiskAssessment: React.FC = () => {
  const [selectedShipment, setSelectedShipment] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Dados fictícios de carregamentos para análise
  const shipments = [
    { id: 1, reference: 'CNTR-1234567', description: 'Produtos Eletrônicos', origin: 'China', date: '2023-09-15', riskScore: 78 },
    { id: 2, reference: 'CNTR-7654321', description: 'Peças Automotivas', origin: 'Alemanha', date: '2023-09-18', riskScore: 32 },
    { id: 3, reference: 'CNTR-9876543', description: 'Produtos Químicos', origin: 'Índia', date: '2023-09-20', riskScore: 67 },
    { id: 4, reference: 'CNTR-5678901', description: 'Têxteis', origin: 'Bangladesh', date: '2023-09-22', riskScore: 45 },
    { id: 5, reference: 'CNTR-3456789', description: 'Alimentos Processados', origin: 'Brasil', date: '2023-09-25', riskScore: 22 },
  ];

  // Dados fictícios para o gráfico radar
  const radarData = {
    labels: ['Origem', 'Histórico', 'Mercadoria', 'Rota', 'Documentação', 'Valor'],
    datasets: [
      {
        label: 'Pontuação de Risco',
        data: [85, 65, 70, 60, 90, 75],
        backgroundColor: 'rgba(220, 38, 38, 0.2)',    // Secondary-500 com transparência
        borderColor: 'rgba(220, 38, 38, 0.8)',        // Secondary-500
        borderWidth: 1,
      },
    ],
  };

  // Função para calcular risco (simulação)
  const calculateRisk = () => {
    if (!selectedShipment) return;
    
    setIsCalculating(true);
    
    // Simulação de processamento
    setTimeout(() => {
      setIsCalculating(false);
    }, 2000);
  };

  // Função para obter classe de cor baseada na pontuação de risco
  const getRiskClass = (score: number) => {
    if (score >= 70) return 'text-secondary-600';
    if (score >= 40) return 'text-tertiary-600';
    return 'text-primary-600';
  };

  // Função para obter ícone baseado na pontuação de risco
  const getRiskIcon = (score: number) => {
    if (score >= 70) return <ExclamationTriangleIcon className="h-5 w-5 text-secondary-600" />;
    if (score >= 40) return <ShieldExclamationIcon className="h-5 w-5 text-tertiary-600" />;
    return <CheckCircleIcon className="h-5 w-5 text-primary-600" />;
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900 border-b-2 border-primary-500 pb-2">Sistema de Avaliação de Risco</h1>
      <p className="mt-2 text-neutral-600">
        Análise preditiva para identificação de cargas que necessitam inspeção detalhada
      </p>

      {/* Painel de carregamentos */}
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-neutral-300">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">
                      Referência
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">
                      Descrição
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">
                      Origem
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">
                      Data
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-neutral-900">
                      Pontuação de Risco
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Ações</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 bg-white">
                  {shipments.map((shipment) => (
                    <tr 
                      key={shipment.id} 
                      className={selectedShipment === shipment.id ? 'bg-primary-50' : 'hover:bg-neutral-50'}
                      onClick={() => setSelectedShipment(shipment.id)}
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-neutral-900 sm:pl-6">
                        {shipment.reference}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
                        {shipment.description}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
                        {shipment.origin}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-neutral-500">
                        {new Date(shipment.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex items-center">
                          {getRiskIcon(shipment.riskScore)}
                          <span className={`ml-1 ${getRiskClass(shipment.riskScore)}`}>
                            {shipment.riskScore}
                          </span>
                        </div>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          type="button"
                          className="text-primary-600 hover:text-primary-900 transition duration-150"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedShipment(shipment.id);
                          }}
                        >
                          Detalhar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Detalhes da avaliação de risco */}
      {selectedShipment && (
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-primary-600 to-primary-700 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-white">
                Análise Detalhada de Risco
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-primary-100">
                {shipments.find(s => s.id === selectedShipment)?.reference} - {shipments.find(s => s.id === selectedShipment)?.description}
              </p>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500 transition duration-150"
                onClick={calculateRisk}
                disabled={isCalculating}
              >
                {isCalculating ? 'Calculando...' : 'Recalcular Risco'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-5 sm:px-6">
            {/* Gráfico radar */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
              <h4 className="text-base font-medium text-neutral-900 mb-4 pb-2 border-b border-primary-200">Visualização de Fatores de Risco</h4>
              <div className="h-64">
                <Radar data={radarData} />
              </div>
            </div>

            {/* Fatores de risco */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-neutral-200">
              <h4 className="text-base font-medium text-neutral-900 mb-4 pb-2 border-b border-primary-200">Fatores de Risco Analisados</h4>
              <div className="space-y-4">
                {riskFactors.map((factor) => (
                  <div key={factor.id} className="border-b border-neutral-200 pb-2 hover:bg-neutral-50 p-2 rounded transition duration-150">
                    <h5 className="text-sm font-medium text-neutral-900">{factor.name}</h5>
                    <p className="text-xs text-neutral-500">{factor.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recomendações */}
          <div className="px-4 py-5 sm:px-6 border-t border-neutral-200">
            <h4 className="text-base font-medium text-neutral-900 mb-2">Recomendações</h4>
            <div className="bg-secondary-50 p-4 rounded-md border border-secondary-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <ExclamationTriangleIcon className="h-5 w-5 text-secondary-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-secondary-800">Atenção necessária</h3>
                  <div className="mt-2 text-sm text-secondary-700">
                    <p>
                      Esta carga apresenta fatores de risco que justificam uma inspeção física detalhada. 
                      Recomenda-se verificação da documentação e conferência da carga em scanner.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiskAssessment; 