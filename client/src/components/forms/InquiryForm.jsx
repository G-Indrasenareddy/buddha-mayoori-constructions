import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CANONICAL_SERVICES } from '../../utils/constants';
import { submitEnquiry } from '../../services/api';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const InquiryForm = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: '',
    serviceRequired: preselectedService,
    budgetRange: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, serviceRequired: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^[0-9+\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City / District is required.';
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select a service.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const payload = {
        type: 'ESTIMATE_REQUEST',
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        location: formData.city.trim(),
        serviceRequested: formData.serviceRequired,
        estimatedBudget: formData.budgetRange,
        message: formData.message.trim() || `Estimate request for ${formData.serviceRequired} in ${formData.city}.`,
      };

      await submitEnquiry(payload);
      setIsSubmitted(true);
    } catch (err) {
      console.warn('API submission error:', err.message);
      setSubmitError(err.message || 'Unable to submit enquiry to server. Please try again or contact us directly by phone.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = CANONICAL_SERVICES.map(s => ({
    value: s.title,
    label: s.title,
  }));

  const budgetOptions = [
    { value: 'Under 10 Lakhs', label: 'Under 10 Lakhs' },
    { value: '10 Lakhs - 25 Lakhs', label: '10 Lakhs - 25 Lakhs' },
    { value: '25 Lakhs - 50 Lakhs', label: '25 Lakhs - 50 Lakhs' },
    { value: '50 Lakhs - 1 Crore', label: '50 Lakhs - 1 Crore' },
    { value: 'Above 1 Crore', label: 'Above 1 Crore' },
    { value: 'To Be Discussed', label: 'To Be Discussed' },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900">Building Estimate Request Form</h3>
        <p className="text-sm text-slate-600 mt-1">
          Fill out the form below to request a building estimate or consultation from Buddha Mayoori Constructions.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-900">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
              ✓
            </span>
            <h4 className="text-lg font-bold">Estimate Request Received</h4>
          </div>
          <p className="text-sm text-emerald-800 mb-4">
            Thank you, <strong>{formData.fullName}</strong>! Your details for <strong>{formData.serviceRequired}</strong> in <strong>{formData.city}</strong> have been received. Our team will review your request and get in touch with you shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setSubmitError('');
              setFormData({
                fullName: '',
                phone: '',
                email: '',
                city: '',
                serviceRequired: '',
                budgetRange: '',
                message: '',
              });
            }}
            className="mt-4 text-xs font-semibold text-emerald-800 underline hover:text-emerald-950"
          >
            Submit Another Request
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {submitError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
              ⚠️ {submitError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="fullName"
              name="fullName"
              label="Full Name"
              placeholder="e.g. Rahul Sharma"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              required
            />

            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Phone Number"
              placeholder="e.g. 9447453220"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="e.g. client@example.com"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText="Optional"
            />

            <Input
              id="city"
              name="city"
              label="City / District"
              placeholder="e.g. Pathanamthitta, Koodal, Trivandrum"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              id="serviceRequired"
              name="serviceRequired"
              label="Service Required"
              options={serviceOptions}
              value={formData.serviceRequired}
              onChange={handleChange}
              error={errors.serviceRequired}
              placeholder="Select from 9 Canonical Services"
              required
            />

            <Select
              id="budgetRange"
              name="budgetRange"
              label="Estimated Budget Range"
              options={budgetOptions}
              value={formData.budgetRange}
              onChange={handleChange}
              placeholder="Select budget range (Optional)"
            />
          </div>

          <Textarea
            id="message"
            name="message"
            label="Project Details / Requirements"
            placeholder="Provide any specific details about your plot size, building requirements, or site location..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
          />

          <div className="pt-2">
            <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
              {isSubmitting ? 'Submitting Request...' : 'Submit Building Estimate Request'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
