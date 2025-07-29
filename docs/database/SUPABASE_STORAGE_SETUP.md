# Supabase Storage Setup Guide

## Initial Setup

1. Create Storage Buckets:
```sql
-- Create project-images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Create site-assets bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true);
```

2. Create Required Folders:
```
project-images/
  └── projects/

site-assets/
  ├── logos/
  ├── banners/
  └── meta/
```

## Upload Mock Images

1. Download sample images:
```bash
# Project Images
curl -o modern-house-1.jpg https://images.unsplash.com/photo-1600596542815-ffad4c1539a9
curl -o modern-house-2.jpg https://images.unsplash.com/photo-1600607687939-ce8a6c25118c
curl -o minimal-house-1.jpg https://images.unsplash.com/photo-1512917774080-9991f1c4c750
curl -o minimal-house-2.jpg https://images.unsplash.com/photo-1513584684374-8bab748fbf90

# Banner Images
curl -o banner-1-desktop.jpg https://images.unsplash.com/photo-1600585154340-be6161a56a0c
curl -o banner-1-mobile.jpg https://images.unsplash.com/photo-1600585154340-be6161a56a0c
curl -o banner-2-desktop.jpg https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
curl -o banner-2-mobile.jpg https://images.unsplash.com/photo-1486406146926-c627a92ad1ab
```

2. Upload to Supabase Storage:
```javascript
// Using Supabase JavaScript client
const uploadMockImages = async () => {
  const { supabase } = useSupabase();
  
  // Upload project images
  const projectImages = [
    'modern-house-1.jpg',
    'modern-house-2.jpg',
    'minimal-house-1.jpg',
    'minimal-house-2.jpg'
  ];
  
  for (const image of projectImages) {
    await supabase.storage
      .from('project-images')
      .upload(`projects/${image}`, imageFile);
  }
  
  // Upload banner images
  const bannerImages = [
    'banner-1-desktop.jpg',
    'banner-1-mobile.jpg',
    'banner-2-desktop.jpg',
    'banner-2-mobile.jpg'
  ];
  
  for (const image of bannerImages) {
    await supabase.storage
      .from('site-assets')
      .upload(`banners/${image}`, imageFile);
  }
  
  // Upload default logo and meta image
  await supabase.storage
    .from('site-assets')
    .upload('logos/logo-default.png', logoFile);
    
  await supabase.storage
    .from('site-assets')
    .upload('meta/meta-default.jpg', metaFile);
};
```

## Storage Policies

1. Project Images Policies:
```sql
-- Allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Allow authenticated uploads
CREATE POLICY "Auth Users Can Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' AND
  (storage.foldername(name))[1] = 'projects'
);
```

2. Site Assets Policies:
```sql
-- Allow public read access
CREATE POLICY "Public Access Site Assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Allow authenticated uploads to specific folders
CREATE POLICY "Auth Users Can Upload Site Assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'site-assets' AND
  (storage.foldername(name))[1] IN ('logos', 'banners', 'meta')
);
```

## Image Optimization

Supabase Storage provides automatic image transformations through URL parameters:

```
# Resize image to 800x600
?width=800&height=600

# Convert to WebP format
?format=webp

# Optimize quality
?quality=80
```

Example usage in application:
```javascript
const getOptimizedImageUrl = (url, { width, height, quality = 80 }) => {
  return `${url}?width=${width}&height=${height}&quality=${quality}&format=webp`;
};
```