'use client';

import { useState, useEffect } from 'react';
import { Eye, EyeOff, Users, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useOnboardingStore } from '@/lib/store';
import { fetchYelpImages, generateMenuDraft } from '@/lib/mockApi';
import { YelpImage } from '@/types/onboarding';

export function Step2Sources() {
  const {
    restaurant,
    images,
    setImages,
    hideNonMenuPhotos,
    blurFaces,
    toggleHideNonMenuPhotos,
    toggleBlurFaces,
    isLoadingImages,
    isGeneratingDraft,
    setLoadingImages,
    setGeneratingDraft,
    setMenuDraft,
    nextStep,
  } = useOnboardingStore();

  const [selectedImage, setSelectedImage] = useState<YelpImage | null>(null);

  // Fetch images on mount
  useEffect(() => {
    const loadImages = async () => {
      if (!restaurant || images.length > 0) return;
      
      setLoadingImages(true);
      const fetchedImages = await fetchYelpImages(restaurant.id);
      setImages(fetchedImages);
      setLoadingImages(false);
    };

    loadImages();
  }, [restaurant, images.length, setImages, setLoadingImages]);

  const handleGenerateDraft = async () => {
    if (!restaurant) return;

    setGeneratingDraft(true);
    const menuImageIds = images
      .filter((img) => img.isMenuPhoto)
      .map((img) => img.id);
    
    const draft = await generateMenuDraft(restaurant.id, menuImageIds);
    setMenuDraft(draft);
    setGeneratingDraft(false);
    nextStep();
  };

  // Filter images based on toggles
  const filteredImages = images.filter((img) => {
    if (hideNonMenuPhotos && !img.isMenuPhoto) return false;
    return true;
  });

  const menuPhotoCount = images.filter((img) => img.isMenuPhoto).length;

  if (isLoadingImages) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Finding menu photos...
        </h3>
        <p className="text-slate-600">
          Scanning Yelp reviews for {restaurant?.name}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          We found these menu photos on public Yelp reviews
        </h2>
        <p className="text-lg text-slate-600 mb-2">
          <span className="font-semibold text-indigo-600">{menuPhotoCount} menu photos</span> from {images.length} public review images
        </p>
        <p className="text-sm text-slate-500">
          Source attribution shown for transparency
        </p>
      </div>

      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-white p-4 rounded-lg border border-slate-200">
        <button
          onClick={toggleHideNonMenuPhotos}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all
            ${hideNonMenuPhotos
              ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
              : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:bg-slate-200'
            }
          `}
        >
          {hideNonMenuPhotos ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          Hide food photos
        </button>
        
        <button
          onClick={toggleBlurFaces}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-all
            ${blurFaces
              ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
              : 'bg-slate-100 text-slate-700 border-2 border-transparent hover:bg-slate-200'
            }
          `}
        >
          <Users className="w-4 h-4" />
          {blurFaces ? 'Blur faces (On)' : 'Blur faces (Off)'}
        </button>

        <div className="flex items-center gap-2 ml-auto text-sm text-slate-600">
          <ImageIcon className="w-4 h-4" />
          <span>{filteredImages.length} photos showing</span>
        </div>
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredImages.map((image) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className={`
              relative group overflow-hidden rounded-lg border-2 transition-all
              hover:border-indigo-400 hover:shadow-lg
              ${image.isMenuPhoto ? 'border-green-300' : 'border-slate-200'}
            `}
          >
            {/* Image */}
            <div className="aspect-[4/3] bg-slate-200 relative">
              <div
                className={`
                  w-full h-full bg-gradient-to-br from-slate-300 to-slate-400
                  flex items-center justify-center text-slate-500
                  ${blurFaces && image.hasFaces ? 'blur-sm' : ''}
                `}
              >
                <ImageIcon className="w-8 h-8" />
              </div>
              
              {/* Badge */}
              {image.isMenuPhoto && (
                <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded">
                  Menu
                </div>
              )}
            </div>

            {/* Caption */}
            <div className="p-2 bg-white">
              <p className="text-xs text-slate-600 truncate">{image.caption}</p>
              <p className="text-xs text-slate-400">
                {new Date(image.date).toLocaleDateString()}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Trust message */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-indigo-900">
          <strong>Privacy note:</strong> All photos are from public Yelp reviews.
          No private data is collected. You have full control to edit or remove anything.
        </p>
      </div>

      {/* Continue button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 -mx-4 md:static md:border-0 md:p-0 md:m-0">
        <button
          onClick={handleGenerateDraft}
          disabled={isGeneratingDraft || menuPhotoCount === 0}
          className="w-full py-4 bg-indigo-600 text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          {isGeneratingDraft ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Loading your draft menu...
            </>
          ) : (
            `View My Draft Menu`
          )}
        </button>
      </div>

      {/* Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-[90vh] overflow-auto bg-white rounded-lg p-4">
            <div className="aspect-video bg-slate-200 mb-3 rounded flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-slate-400" />
            </div>
            <p className="font-medium text-slate-900">{selectedImage.caption}</p>
            <p className="text-sm text-slate-600">
              {new Date(selectedImage.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
