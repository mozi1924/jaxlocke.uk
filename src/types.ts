import React from 'react';

export interface Project {
  id: string;
  title: string;
  category: 'Portfolio' | 'OC' | 'Personal' | 'WIP';
  imageUrl: string;
  description?: string;
  tags?: string[];
}

export interface Rig {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  software: string;
  price: string;
  downloadUrl: string;
  features: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ComponentType<any>;
  label: string;
}

export type SectionId = 'home' | 'portfolio' | 'projects' | 'oc' | 'photos' | 'rigs';