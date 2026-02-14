import React from 'react';

export type ControlDefinition = {
  name: string;
  label: string;
  type: 'range' | 'select' | 'color' | 'toggle';
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: any }[];
  unit?: string;
};

export interface ControlConfig {
  name: string;
  label: string;
  type: 'range' | 'select' | 'toggle';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { label: string; value: string }[];
}

export interface ComponentConfig {
  id: string;
  label: string;
  component: React.ComponentType<any>;
  icon?: React.ReactNode;
  description?: string;
  defaultProps: Record<string, any>;
  controls: ControlConfig[];
  componentPath: string;   // ← ADD THIS
  sourceCode: string;      // ← ADD THIS
}

export type NavCategory = {
  category: string;
  items: ComponentConfig[];
};