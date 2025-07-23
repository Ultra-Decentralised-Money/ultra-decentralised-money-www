'use client';

import { motion } from 'framer-motion';
import { Activity, Github, ExternalLink } from 'lucide-react';

export const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Ultra Decentralised Money
              </h1>
              <p className="text-xs text-gray-400">Cardano Analytics</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#validators"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Validators
            </a>
            <a
              href="#governance"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Governance
            </a>
            <a
              href="#defi"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              DeFi
            </a>
            <a
              href="#stablecoins"
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Stablecoins
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://github.com/Ultra-Decentralised-Money/ultra-decentralised-money-api"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            
            <motion.button
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              API Docs
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};