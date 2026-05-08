import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ========================================
// FORMATTING UTILITIES
// ========================================

export function formatCurrency(amount: number, currency = 'FCFA'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(amount).replace('XOF', currency);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  }).format(dateObj);
}

export function formatTime(time: string): string {
  return time.replace(':00', 'h');
}

export function formatPhoneNumber(phone: string): string {
  // Format for Burkina Faso phone numbers
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('226') && cleaned.length === 11) {
    return `+226 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
  }
  
  if (cleaned.length === 8) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 4)} ${cleaned.slice(4, 6)} ${cleaned.slice(6, 8)}`;
  }
  
  return phone;
}

// ========================================
// VALIDATION UTILITIES
// ========================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+226)?[2-7]\d{7}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

// ========================================
// STRING UTILITIES
// ========================================

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

export function capitalizeWords(text: string): string {
  return text.split(' ').map(word => capitalize(word)).join(' ');
}

// ========================================
// ARRAY UTILITIES
// ========================================

export function groupBy<T, K extends keyof any>(
  array: T[],
  key: (item: T) => K
): Record<K, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = key(item);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

export function uniqueBy<T, K extends keyof any>(
  array: T[],
  key: (item: T) => K
): T[] {
  const seen = new Set<K>();
  return array.filter(item => {
    const itemKey = key(item);
    if (seen.has(itemKey)) {
      return false;
    }
    seen.add(itemKey);
    return true;
  });
}

export function sortBy<T>(
  array: T[],
  key: keyof T | ((item: T) => any),
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aValue = typeof key === 'function' ? key(a) : a[key];
    const bValue = typeof key === 'function' ? key(b) : b[key];
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

// ========================================
// MATH UTILITIES
// ========================================

export function percentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ========================================
// COLOR UTILITIES
// ========================================

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// ========================================
// URL UTILITIES
// ========================================

export function buildUrl(base: string, path: string, params?: Record<string, string>): string {
  const url = new URL(path, base);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
  }
  
  return url.toString();
}

export function getUrlParams(url: string): Record<string, string> {
  const urlObj = new URL(url);
  const params: Record<string, string> = {};
  
  urlObj.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  return params;
}

// ========================================
// STORAGE UTILITIES
// ========================================

export function getLocalStorage(key: string, defaultValue?: any): any {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setLocalStorage(key: string, value: any): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

// ========================================
// DELAY UTILITIES
// ========================================

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// ERROR UTILITIES
// ========================================

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    return String(error.message);
  }
  return 'Une erreur inconnue est survenue';
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof Error && (
    error.message.includes('Network Error') ||
    error.message.includes('fetch') ||
    error.message.includes('timeout')
  );
}

// ========================================
// FILE UTILITIES
// ========================================

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

export function isImageFile(filename: string): boolean {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'];
  const extension = getFileExtension(filename).toLowerCase();
  return imageExtensions.includes(extension);
}

export function isPdfFile(filename: string): boolean {
  return getFileExtension(filename).toLowerCase() === 'pdf';
}

// ========================================
// BUSINESS LOGIC UTILITIES
// ========================================

export function calculateRegistrationDeadline(): Date {
  // Configurable via NEXT_PUBLIC_REGISTRATION_DEADLINE (ISO string), sinon +30 jours
  const envDeadline = process.env.NEXT_PUBLIC_REGISTRATION_DEADLINE;
  if (envDeadline) {
    const d = new Date(envDeadline);
    if (!isNaN(d.getTime())) return d;
  }
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 30);
  return deadline;
}

export function calculateTrainingStartDate(): Date {
  // Configurable via NEXT_PUBLIC_TRAINING_START_DATE (ISO string)
  const envStart = process.env.NEXT_PUBLIC_TRAINING_START_DATE;
  if (envStart) {
    const d = new Date(envStart);
    if (!isNaN(d.getTime())) return d;
  }
  // Fallback : prochain lundi
  const d = new Date();
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  return d;
}

export function calculateTrainingEndDate(): Date {
  // Configurable via NEXT_PUBLIC_TRAINING_END_DATE (ISO string)
  const envEnd = process.env.NEXT_PUBLIC_TRAINING_END_DATE;
  if (envEnd) {
    const d = new Date(envEnd);
    if (!isNaN(d.getTime())) return d;
  }
  // Fallback : start + 4 jours
  const start = calculateTrainingStartDate();
  start.setDate(start.getDate() + 4);
  return start;
}

export function isRegistrationOpen(): boolean {
  const deadline = calculateRegistrationDeadline();
  return new Date() < deadline;
}

export function getRemainingDays(): number {
  const deadline = calculateRegistrationDeadline();
  const now = new Date();
  const diffTime = deadline.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

export function generateRegistrationReference(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `XL-${timestamp.toUpperCase()}-${random.toUpperCase()}`;
}
