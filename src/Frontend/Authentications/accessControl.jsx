const allPages = [
  'admin-home',
  'directors',
  'all-consoles',
  'developer-dashboard',
  'all-records',
  'colleges-console',
  'leadership-profiles',
  'gallery-console',
  'event-gallery-console',
  'carousel-console',
  'news-console',
  'notification-console',
  'youtube-console',
  'site-navigation',
  'executive-council-console',
  'help',
  'profile',
];

const rolePages = {
  rootadmin: allPages,
  admin: allPages,
  developer: [
    'all-consoles',
    'developer-dashboard',
    'colleges-console',
    'leadership-profiles',
    'gallery-console',
    'event-gallery-console',
    'carousel-console',
    'news-console',
    'notification-console',
    'youtube-console',
    'site-navigation',
    'executive-council-console',
    'help',
    'profile',
  ],
  webadmin: [
    'all-consoles',
    'leadership-profiles',
    'gallery-console',
    'event-gallery-console',
    'news-console',
    'carousel-console',
    'youtube-console',
    'help',
    'profile',
  ],
  updates: ['notification-console', 'site-navigation', 'youtube-console', 'executive-council-console', 'help', 'profile'],
  affiliatedcolleges: ['colleges-console', 'help', 'profile'],
  affliatedcolleges: ['colleges-console', 'help', 'profile'],
  directors: ['directors', 'help', 'profile'],
};

const defaultPages = {
  rootadmin: 'admin-home',
  admin: 'admin-home',
  developer: 'news-console',
  webadmin: 'gallery-console',
  updates: 'notification-console',
  affiliatedcolleges: 'colleges-console',
  affliatedcolleges: 'colleges-console',
  directors: 'profile',
};

export const normalizeRole = (role) => String(role || '').trim().toLowerCase();

export const isAdminRole = (role) => ['admin', 'rootadmin'].includes(normalizeRole(role));

export const canDeleteRecords = (role) => isAdminRole(role);

export const canAccessPage = (role, page) => {
  const allowedPages = rolePages[normalizeRole(role)] || [];
  return allowedPages.includes(String(page || '').trim().toLowerCase());
};

export const getDefaultPage = (role) => defaultPages[normalizeRole(role)] || null;

export const getDashboardPath = (role) => {
  const page = getDefaultPage(role);
  return page ? `/dashboard/${page}` : '/restrictedaccess';
};
