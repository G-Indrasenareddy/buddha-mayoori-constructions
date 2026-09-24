import { useEffect } from 'react';
import { COMPANY_INFO } from '../../utils/constants';

/**
 * Dynamic SEO Title & Meta Manager Component
 */
export const PageMeta = ({
  title = COMPANY_INFO.name,
  description = "Buddha Mayoori Construction — Civil construction and structural designing services in Kerala since 1990.",
}) => {
  useEffect(() => {
    // Dynamic document title
    const fullTitle = title === COMPANY_INFO.name
      ? title
      : `${title} | ${COMPANY_INFO.name}`;
    document.title = fullTitle;

    // Dynamic meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description;
  }, [title, description]);

  return null;
};
