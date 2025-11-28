import React from 'react';
import { Bot, Globe, Video, Megaphone, Zap, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

const iconMap: Record<string, React.ReactNode> = {
  'Bot': <Bot size={32} />,
  'Globe': <Globe size={32} />,
  'Video': <Video size={32} />,
  'Megaphone': <Megaphone size={32} />,
  'Zap': <Zap size={32} />,
};

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
      <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
        {iconMap[service.iconName]}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
      <div className="flex items-center text-green-600 font-medium group-hover:gap-2 transition-all cursor-pointer">
        <span>Learn more</span>
        <ArrowRight size={16} className="ml-1" />
      </div>
    </div>
  );
};
