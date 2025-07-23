'use client';

import { motion, type Variants } from 'framer-motion';
import { ValidatorWidget } from '@/components/widgets/ValidatorWidget';
import { GovernanceWidget } from '@/components/widgets/GovernanceWidget';
import { DeFiWidget } from '@/components/widgets/DeFiWidget';
import { StablecoinWidget } from '@/components/widgets/StablecoinWidget';

export const Dashboard = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Cardano
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent ml-3">
                Analytics
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Real-time insights into Cardano&apos;s decentralization, governance activity, 
              and DeFi ecosystem growth. Track validators, proposals, TVL, and more.
            </p>
            
            <motion.div
              className="flex items-center justify-center gap-8 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live Data
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                Ultra Decentralised
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full" />
                Open Source
              </div>
            </motion.div>
          </motion.div>

          {/* Dashboard Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-12 gap-6"
          >
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-6">
              <ValidatorWidget />
            </motion.div>
            
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-6">
              <GovernanceWidget />
            </motion.div>
            
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8">
              <DeFiWidget />
            </motion.div>
            
            <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
              <StablecoinWidget />
            </motion.div>
          </motion.div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-20 text-center text-gray-500 text-sm"
          >
            <div className="flex items-center justify-center gap-6 mb-4">
              <a 
                href="https://cardano.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Cardano Foundation
              </a>
              <a 
                href="https://github.com/Ultra-Decentralised-Money" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                GitHub
              </a>
              <a 
                href="https://twitter.com/cardano" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Twitter
              </a>
            </div>
            <p>
              Built with ❤️ for the Cardano community • Data powered by{' '}
              <a 
                href="https://github.com/Ultra-Decentralised-Money/ultra-decentralised-money-api" 
                className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ultra Decentralised Money API
              </a>
            </p>
          </motion.footer>
        </div>
      </div>
    </div>
  );
};