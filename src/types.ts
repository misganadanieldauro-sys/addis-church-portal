export type PageKey =
  | "home"
  | "about"
  | "sermons"
  | "events"
  | "contact"
  | "ministers";

export interface NavItem {
  key: PageKey;
  label: string;
}

export interface ServiceTime {
  id: string;
  title: string;
  day: string;
  time: string;
  place: string;
  detail: string;
  icon: "sunrise" | "children" | "prayer" | "youth" | "choir" | "book";
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  topic: string;
  date: string;
  duration: number;
  scripture: string;
  summary: string;
  notes: string[];
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  minutes: number;
  author: string;
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  since: string;
}

export interface FullTimeMinister {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  initials: string;
  since: string;
  verse: string;
  phone: string;
  email: string;
}

export interface FaithPoint {
  id: string;
  title: string;
  verse: string;
  text: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  place: string;
  type: string;
  description: string;
}

export interface GivingPurpose {
  id: string;
  title: string;
  detail: string;
}

export interface BankAccount {
  holder: string;
  number: string;
  branch: string;
}

export interface TelebirrInfo {
  number: string;
  merchant: string;
  ussd: string;
  steps: string[];
}

export interface PrayerRequest {
  name: string;
  phone: string;
  topic: string;
  message: string;
}

export interface Ministry {
  id: string;
  title: string;
  tagline: string;
  detail: string;
  meets: string;
  lead: string;
  icon: "children" | "youth" | "women" | "men" | "choir" | "charity";
}

export interface VerseDay {
  id: string;
  text: string;
  reference: string;
  reflection: string;
}