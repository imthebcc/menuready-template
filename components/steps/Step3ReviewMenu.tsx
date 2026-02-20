'use client';

import { useState } from 'react';
import { Plus, Trash2, Edit2, AlertCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useOnboardingStore } from '@/lib/store';
import { MenuItem, MenuCategory } from '@/types/onboarding';
import { mockReviewQueue } from '@/lib/mockData';

export function Step3ReviewMenu() {
  const { menuDraft, setMenuDraft, nextStep } = useOnboardingStore();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(menuDraft?.categories.map((c) => c.id) || [])
  );
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [reviewQueue] = useState(mockReviewQueue);
  const [resolvedItems, setResolvedItems] = useState<Set<string>>(new Set());
  const [acknowledgedIssues, setAcknowledgedIssues] = useState(false);

  if (!menuDraft) return null;

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }
      return next;
    });
  };

  const unresolvedCount = reviewQueue.filter(
    (item) => !resolvedItems.has(item.itemId)
  ).length;

  const handleResolveItem = (itemId: string) => {
    setResolvedItems((prev) => new Set([...prev, itemId]));
  };

  const handleApprove = () => {
    if (menuDraft) {
      setMenuDraft({ ...menuDraft, status: 'approved' });
      nextStep();
    }
  };

  const getConfidenceBadge = (confidence: MenuItem['confidence']) => {
    if (confidence === 'high') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
          <CheckCircle className="w-3 h-3" />
          High confidence
        </span>
      );
    }
    if (confidence === 'medium') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded">
          <AlertCircle className="w-3 h-3" />
          Medium
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
        <AlertCircle className="w-3 h-3" />
        Needs review
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          We did the heavy lifting
        </h2>
        <p className="text-lg text-slate-600 mb-2">
          Extracted {menuDraft.categories.reduce((sum, cat) => sum + cat.items.length, 0)} items
          from {menuDraft.categories.length} categories
        </p>
        <p className="text-sm text-slate-500">
          You approve. Edit anything before publishing.
        </p>
      </div>

      {/* Review queue alert */}
      {unresolvedCount > 0 && (
        <div className="mb-6 bg-amber-50 border-2 border-amber-400 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-bold text-amber-900 mb-1 text-lg">
                {unresolvedCount} items need your attention
              </h3>
              <p className="text-sm text-amber-800 mb-3">
                We did the heavy lifting. Review these items before publishing.
              </p>
              <div className="space-y-2">
                {reviewQueue
                  .filter((item) => !resolvedItems.has(item.itemId))
                  .map((queueItem) => {
                    const category = menuDraft.categories.find(
                      (c) => c.id === queueItem.categoryId
                    );
                    const item = category?.items.find(
                      (i) => i.id === queueItem.itemId
                    );
                    
                    if (!item) return null;

                    return (
                      <div
                        key={queueItem.itemId}
                        className="bg-white border border-amber-200 rounded p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <p className="font-medium text-slate-900">
                              {item.name}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                              {queueItem.issue}
                            </p>
                            {queueItem.suggestion && (
                              <p className="text-sm text-indigo-600 mt-1">
                                Suggestion: {queueItem.suggestion}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleResolveItem(queueItem.itemId)}
                            className="px-3 py-1 bg-indigo-600 text-white text-sm font-medium rounded hover:bg-indigo-700"
                          >
                            Mark fixed
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
              
              {/* Acknowledgement option */}
              <div className="mt-4 pt-4 border-t border-amber-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acknowledgedIssues}
                    onChange={(e) => setAcknowledgedIssues(e.target.checked)}
                    className="mt-1 w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-100"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      I acknowledge these issues and want to publish anyway
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      You can always update your menu after publishing
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories and items */}
      <div className="space-y-4 mb-8">
        {menuDraft.categories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);
          
          return (
            <div
              key={category.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden"
            >
              {/* Category header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-slate-900">
                    {category.name}
                  </h3>
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-sm rounded">
                    {category.items.length} items
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </button>

              {/* Items */}
              {isExpanded && (
                <div className="border-t border-slate-200">
                  {category.items.map((item) => {
                    const isEditing = editingItem === item.id;
                    const needsAttention = reviewQueue.some(
                      (q) => q.itemId === item.id && !resolvedItems.has(item.id)
                    );

                    return (
                      <div
                        key={item.id}
                        className={`
                          p-4 border-b border-slate-100 last:border-0
                          ${needsAttention ? 'bg-amber-50' : 'hover:bg-slate-50'}
                          transition-colors
                        `}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-900">
                                {item.name}
                              </h4>
                              {getConfidenceBadge(item.confidence)}
                            </div>
                            
                            {item.description && (
                              <p className="text-sm text-slate-600 mb-2">
                                {item.description}
                              </p>
                            )}
                            
                            {item.price && (
                              <p className="text-lg font-bold text-indigo-600">
                                {item.price}
                              </p>
                            )}
                            
                            {item.modifiers && item.modifiers.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {item.modifiers.map((mod, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded"
                                  >
                                    {mod}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2 flex-shrink-0">
                            <button
                              onClick={() => setEditingItem(item.id)}
                              className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                              aria-label="Edit item"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              aria-label="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  
                  {/* Add item button */}
                  <button className="w-full p-4 text-left text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add item to {category.name}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Approve button */}
      <div className="sticky bottom-0 left-0 right-0 bg-white border-t p-4 -mx-4 md:static md:border-0 md:p-0 md:m-0">
        <button
          onClick={handleApprove}
          disabled={unresolvedCount > 0 && !acknowledgedIssues}
          className="w-full py-4 bg-indigo-600 text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg hover:shadow-xl"
        >
          {unresolvedCount > 0 && !acknowledgedIssues
            ? `Fix ${unresolvedCount} items or acknowledge to continue`
            : 'Approve Menu Draft'}
        </button>
        {unresolvedCount > 0 && acknowledgedIssues && (
          <p className="text-sm text-amber-600 text-center mt-2">
            ⚠️ Publishing with {unresolvedCount} unresolved items
          </p>
        )}
      </div>
    </div>
  );
}
