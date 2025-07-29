import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGlobalSettings } from '../hooks/useGlobalSettings';
import { useProjetoById } from '../hooks/useProjetoById';

interface MetaTagsProps {
  title?: string;
  description?: string;
  image?: string;
}

const DEFAULT_DESCRIPTION = "Encontre o projetos com preços abaixo do mercado. Qualidade, economia e design em um só lugar. Descubra o projeto ideal para você!";

export default function MetaTags({ title, description, image }: MetaTagsProps) {
  const location = useLocation();
  const { data: settings } = useGlobalSettings();
  
  // Extract project ID from URL if on project page
  const projectId = location.pathname.match(/\/projetos\/([^/]+)/)?.[1];
  const { data: projeto } = useProjetoById(projectId ?? '');

  useEffect(() => {
    // Default values
    let metaTitle = 'ArqPronto';
    let metaDescription = DEFAULT_DESCRIPTION;
    let metaImage = '/ImagemMeta.png'; // Default to meta image

    // Override with project data if on project page
    if (projeto) {
      metaTitle = `${projeto.titulo} | ArqPronto`;
      metaDescription = projeto.descricao;
      // Use the first project image if available
      if (projeto.imagens?.length > 0) {
        metaImage = projeto.imagens[0];
      }
    }

    // Override with custom props if provided
    if (title) metaTitle = title;
    if (description) metaDescription = description;
    if (image) metaImage = image;

    // Get current URL
    const currentUrl = window.location.href;

    // Ensure image URL is absolute
    const absoluteImageUrl = metaImage.startsWith('http') 
      ? metaImage 
      : `${window.location.origin}${metaImage}`;

    // Update meta tags
    document.title = metaTitle;

    // Basic meta tags
    updateMetaTag('description', metaDescription);

    // Open Graph meta tags
    updateMetaTag('og:title', metaTitle);
    updateMetaTag('og:description', metaDescription);
    updateMetaTag('og:image', absoluteImageUrl);
    updateMetaTag('og:url', currentUrl);
    updateMetaTag('og:type', projeto ? 'product' : 'website');
    updateMetaTag('og:site_name', 'ArqPronto');
    updateMetaTag('og:image:type', 'image/png');
    updateMetaTag('og:image:width', '1200');
    updateMetaTag('og:image:height', '630');

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', metaTitle);
    updateMetaTag('twitter:description', metaDescription);
    updateMetaTag('twitter:image', absoluteImageUrl);

  }, [title, description, image, settings, projeto, location]);

  return null;
}

function updateMetaTag(name: string, content: string) {
  // Try to find existing meta tag
  let element = document.querySelector(`meta[property="${name}"]`) || 
                document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    if (name.startsWith('og:')) {
      element.setAttribute('property', name);
    } else {
      element.setAttribute('name', name);
    }
    document.head.appendChild(element);
  }

  element.setAttribute('content', content || '');
}