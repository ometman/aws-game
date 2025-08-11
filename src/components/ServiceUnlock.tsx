import React from 'react';
import { Cloud, Server, Database, Shield, Zap, Globe } from 'lucide-react';

interface ServiceUnlockProps {
  service: string;
}

const serviceIcons: { [key: string]: React.ReactNode } = {
  'S3': <Database className="w-16 h-16 text-green-400" />,
  'EC2': <Server className="w-16 h-16 text-blue-400" />,
  'Lambda': <Zap className="w-16 h-16 text-yellow-400" />,
  'IAM': <Shield className="w-16 h-16 text-red-400" />,
  'CloudFront': <Globe className="w-16 h-16 text-purple-400" />,
  'RDS': <Database className="w-16 h-16 text-orange-400" />,
  'Default': <Cloud className="w-16 h-16 text-slate-400" />
};

export const ServiceUnlock: React.FC<ServiceUnlockProps> = ({ service }) => {
  const icon = serviceIcons[service] || serviceIcons['Default'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-xl p-12 border border-slate-700 shadow-2xl max-w-md mx-auto">
          <div className="animate-bounce mb-6">
            {icon}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            🎉 Service Unlocked!
          </h2>
          
          <div className="text-xl text-orange-400 font-bold mb-4">
            AWS {service}
          </div>
          
          <p className="text-slate-300 mb-6">
            Great job! You've unlocked a new AWS service. Keep answering correctly to unlock more!
          </p>
          
          <div className="text-sm text-slate-400">
            Loading next question...
          </div>
        </div>
      </div>
    </div>
  );
};