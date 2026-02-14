import { ComponentConfig } from '@/app/components/types';
import textAnimationsData from './text-animations.json';
import buttonAnimationsData from './button-animations.json';
import cardEffects from './card-effects.json';
import cursorAnimations from './cursor-animations.json';
import loaders from './loader.json';
import backGroundEffects from './background-effects.json';
import { componentRegistry } from './componentRegistry';
import { getIcon } from './iconRegistry';

const categoryFiles = {
  "Text Animations": textAnimationsData,
  "Button Animations": buttonAnimationsData,
  "Card Effects": cardEffects,
  "Cursor Animations": cursorAnimations,
  "Loaders": loaders,
  "Background Effects": backGroundEffects,
};

export const loadNavigation = () => {
  return Object.entries(categoryFiles).map(([category, items]) => ({
    category,
    items: items.map((item: any) => ({
      id: item.id,
      label: item.label,
      component: componentRegistry[item.componentPath],
      icon: getIcon(item.icon),
      description: item.description,
      defaultProps: item.defaultProps,
      controls: item.controls,
      componentPath: item.componentPath,
    })),
  }));
};

export type { ComponentConfig };