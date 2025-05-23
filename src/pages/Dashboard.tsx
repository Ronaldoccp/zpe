import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

// Registrar componentes de gráfico necessários
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard: React.FC = () => {
  // Dados para gráfico de rosca - Status de Processos
  const statusData = {
    labels: ['Pendente', 'Em Andamento', 'Concluído', 'Rejeitado'],
    datasets: [
      {
        data: [12, 19, 35, 5],
        backgroundColor: [
          'rgba(220, 38, 38, 0.7)',    // Vermelho (secondary-500)
          'rgba(59, 130, 246, 0.7)',   // Azul (tertiary-500)
          'rgba(52, 142, 52, 0.7)',    // Verde (primary-500)
          'rgba(107, 114, 128, 0.7)',  // Cinza (neutral)
        ],
        borderColor: [
          'rgb(220, 38, 38)',          // Vermelho (secondary-500)
          'rgb(59, 130, 246)',         // Azul (tertiary-500) 
          'rgb(52, 142, 52)',          // Verde (primary-500)
          'rgb(107, 114, 128)',        // Cinza (neutral)
        ],
        borderWidth: 1,
      },
    ],
  };

  // Dados para gráfico de barras - Cargas por Origem
  const cargaData = {
    labels: ['EUA', 'China', 'Brasil', 'União Europeia', 'Japão', 'Outros'],
    datasets: [
      {
        label: 'Quantidade de Cargas',
        data: [65, 59, 80, 81, 56, 40],
        backgroundColor: 'rgba(52, 142, 52, 0.7)', // Verde (primary-500)
      },
    ],
  };

  // Opções para o gráfico de barras
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cargas por País de Origem',
      },
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-neutral-900 border-b-2 border-primary-500 pb-2">Dashboard</h1>
      
      {/* Cartões de estatísticas */}
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-primary-500">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-neutral-500 truncate">
              Total de Processos
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-neutral-900">
              71
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-tertiary-500">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-neutral-500 truncate">
              Documentos Processados
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-neutral-900">
              254
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-secondary-500">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-neutral-500 truncate">
              Alertas de Risco
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-secondary-600">
              8
            </dd>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg border-l-4 border-primary-500">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-neutral-500 truncate">
              Média de Tempo de Processamento
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-neutral-900">
              2.5 dias
            </dd>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-neutral-900 mb-4 border-b border-primary-200 pb-2">Status de Processos</h2>
          <div className="h-64">
            <Doughnut data={statusData} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-neutral-900 mb-4 border-b border-primary-200 pb-2">Cargas por Origem</h2>
          <div className="h-64">
            <Bar options={barOptions} data={cargaData} />
          </div>
        </div>
      </div>

      {/* Alertas recentes */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-primary-500 to-primary-600">
          <h3 className="text-lg leading-6 font-medium text-white">
            Alertas Recentes
          </h3>
        </div>
        <ul className="divide-y divide-neutral-200">
          <li>
            <div className="px-4 py-4 sm:px-6 hover:bg-neutral-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-secondary-600 truncate">
                  Alerta de Inconsistência Documental
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary-100 text-secondary-800">
                    Alto Risco
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-neutral-500">
                    Processo #1234 - Carga de Eletrônicos
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-neutral-500 sm:mt-0">
                  <p>
                    Há 3 horas
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="px-4 py-4 sm:px-6 hover:bg-neutral-50">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-tertiary-600 truncate">
                  Detecção de Discrepância em Manifesto
                </p>
                <div className="ml-2 flex-shrink-0 flex">
                  <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-tertiary-100 text-tertiary-800">
                    Médio Risco
                  </p>
                </div>
              </div>
              <div className="mt-2 sm:flex sm:justify-between">
                <div className="sm:flex">
                  <p className="flex items-center text-sm text-neutral-500">
                    Processo #0987 - Carga de Químicos Industriais
                  </p>
                </div>
                <div className="mt-2 flex items-center text-sm text-neutral-500 sm:mt-0">
                  <p>
                    Há 5 horas
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard; 