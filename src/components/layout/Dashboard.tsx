'use client';

import { motion, type Variants } from 'framer-motion';
import { Section } from './Section';
import { ActiveValidatorsWidget } from '@/components/widgets/metrics/ActiveValidatorsWidget';
import { TotalStakeWidget } from '@/components/widgets/metrics/TotalStakeWidget';
import { DecentralizationWidget } from '@/components/widgets/metrics/DecentralizationWidget';
import { VotingParticipationWidget } from '@/components/widgets/metrics/VotingParticipationWidget';
import { TreasuryBalanceWidget } from '@/components/widgets/metrics/TreasuryBalanceWidget';
import { TotalValueLockedWidget } from '@/components/widgets/metrics/TotalValueLockedWidget';
import { StablecoinSupplyWidget } from '@/components/widgets/metrics/StablecoinSupplyWidget';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
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

          {/* Quick Navigation */}
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="flex items-center gap-6 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-full">
              <a
                href="#validators"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-200"
              >
                Validators
              </a>
              <a
                href="#governance"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-200"
              >
                Governance
              </a>
              <a
                href="#defi"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-200"
              >
                DeFi
              </a>
              <a
                href="#stablecoins"
                className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-200"
              >
                Stablecoins
              </a>
            </div>
          </motion.nav>
        </div>

        {/* Validator Network Section */}
        <Section
          id="validators"
          title="Validator Network"
          description="Track the health and decentralization of Cardano's validator network"
          className="border-t border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            <ActiveValidatorsWidget />
            <TotalStakeWidget />
            <DecentralizationWidget />
          </div>
        </Section>

        {/* Governance Section */}
        <Section
          id="governance"
          title="Governance Activity"
          description="Monitor democratic participation and treasury management"
          className="border-t border-gray-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VotingParticipationWidget />
            <TreasuryBalanceWidget />
          </div>
        </Section>

        {/* DeFi Section */}
        <Section
          id="defi"
          title="DeFi Ecosystem"
          description="Explore the growth and activity of decentralized finance on Cardano"
          className="border-t border-gray-800"
        >
          <div className="grid grid-cols-1 gap-8">
            <TotalValueLockedWidget />
          </div>
        </Section>

        {/* Stablecoins Section */}
        <Section
          id="stablecoins"
          title="Stablecoin Market"
          description="Track the supply and growth of stablecoins in the Cardano ecosystem"
          className="border-t border-gray-800"
        >
          <div className="grid grid-cols-1 gap-8">
            <StablecoinSupplyWidget />
          </div>
        </Section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-gray-800 py-16 mt-16"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 text-sm">
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
          </div>
        </motion.footer>
      </div>
    </div>
  );
};