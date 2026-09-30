import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ESTIMATION_PACKAGES } from '../../utils/constants';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Calculator,
  X,
  RotateCcw,
  Check,
  ArrowRight,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

export const BuildingEstimationCalculator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [area, setArea] = useState('1000');
  const [selectedPackageId, setSelectedPackageId] = useState('standard');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Area Change & Validation
  const handleAreaChange = (val) => {
    setArea(val);
    const num = parseFloat(val);
    if (!val || isNaN(num) || num <= 0) {
      setError('Please enter a valid built-up area greater than 0 sq.ft');
    } else {
      setError('');
    }
  };

  // Quick Area Presets
  const areaPresets = [500, 1000, 1500, 2000];

  // Selected package details
  const selectedPackage =
    ESTIMATION_PACKAGES.find((pkg) => pkg.id === selectedPackageId) ||
    ESTIMATION_PACKAGES[0];

  // Calculation Logic
  const numericArea = parseFloat(area);
  const isValidArea = !isNaN(numericArea) && numericArea > 0;
  const totalCost = isValidArea ? Math.round(numericArea * selectedPackage.rate) : 0;

  // Indian Currency Formatter
  const formatINR = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Reset Handler
  const handleReset = () => {
    setArea('1000');
    setSelectedPackageId('standard');
    setError('');
  };

  // Navigate to Quote Page
  const handleRequestQuote = () => {
    setIsOpen(false);
    navigate('/request-a-quote');
  };

  return (
    <>
      {/* Floating Access Button (Right Side, Positioned Above WhatsApp CTA) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open Building Estimation Calculator"
        className="fixed bottom-22 right-6 z-50 inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-amber-600 text-white font-semibold text-sm shadow-xl hover:bg-amber-500 active:bg-amber-700 transition-all duration-200 hover:scale-105 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 min-h-[48px] cursor-pointer group"
      >
        <Calculator className="w-5 h-5 text-amber-100 group-hover:rotate-12 transition-transform duration-200" />
        <span className="hidden sm:inline font-bold tracking-wide">Building Estimate</span>
      </button>

      {/* Modal / Overlay Container */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 my-auto overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="amber">Instant Tool</Badge>
                  <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Frontend Estimator
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-amber-600 shrink-0" />
                  Building Cost Calculator
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close calculator modal"
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-5 space-y-6">
              {/* 1. Area Input & Quick Presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="builtUpArea" className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Built-Up Area (sq.ft) <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs font-semibold text-amber-800">
                    Enter total floor area
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="builtUpArea"
                    type="number"
                    min="1"
                    step="any"
                    value={area}
                    onChange={(e) => handleAreaChange(e.target.value)}
                    placeholder="e.g. 1000"
                    className={`w-full px-4 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border rounded-lg focus:outline-hidden transition-all ${
                      error
                        ? 'border-red-400 focus:ring-2 focus:ring-red-200'
                        : 'border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200'
                    }`}
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded">
                    sq.ft
                  </span>
                </div>

                {error && (
                  <p className="mt-1.5 text-xs font-semibold text-red-600 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" /> {error}
                  </p>
                )}

                {/* Quick Area Preset Buttons */}
                <div className="mt-2.5 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-slate-500">Quick Select:</span>
                  {areaPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handleAreaChange(String(preset))}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                        numericArea === preset
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {preset.toLocaleString('en-IN')} sq.ft
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Construction Package Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Select Construction Package <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Construction Packages">
                  {ESTIMATION_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        onKeyDown={(e) => {
                          if (e.key === ' ' || e.key === 'Enter') {
                            e.preventDefault();
                            setSelectedPackageId(pkg.id);
                          }
                        }}
                        className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/50 shadow-md ring-1 ring-amber-500/20'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                              {isSelected && <Check className="w-4 h-4 text-amber-600 shrink-0" />}
                              {pkg.name}
                            </span>
                            <Badge variant={isSelected ? 'amber' : 'neutral'} className="text-[10px] px-1.5 py-0.5">
                              {pkg.badge}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                            {pkg.desc}
                          </p>
                        </div>

                        <div className="mt-3 pt-2 border-t border-slate-200/80 flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500">Rate / sq.ft:</span>
                          <span className="text-sm font-extrabold text-amber-800">
                            {formatINR(pkg.rate)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. Calculation Result Breakdown Card */}
              <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 border border-slate-800 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                      Estimated Total Construction Cost
                    </span>
                    <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight block mt-0.5">
                      {isValidArea ? formatINR(totalCost) : '₹0'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors self-start sm:self-auto cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
                  <span>
                    Formula: <strong className="text-white">{isValidArea ? numericArea.toLocaleString('en-IN') : 0} sq.ft</strong> × <strong className="text-amber-300">{formatINR(selectedPackage.rate)}/sq.ft</strong>
                  </span>
                  <span className="font-semibold text-slate-400">
                    Package: {selectedPackage.name}
                  </span>
                </div>
              </div>

              {/* 4. Action CTA & Business Disclaimer */}
              <div className="space-y-3 pt-1">
                <Button
                  type="button"
                  variant="primary"
                  size="lg"
                  onClick={handleRequestQuote}
                  className="w-full flex items-center justify-center gap-2 text-base font-bold shadow-md cursor-pointer"
                >
                  Request Official Quote <ArrowRight className="w-5 h-5" />
                </Button>

                <p className="text-[11px] text-slate-500 leading-normal text-center italic">
                  * Estimated construction cost. Final pricing may vary based on design, materials, specifications, site conditions, and other project requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
