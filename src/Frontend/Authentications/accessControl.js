const allPages = [
  'admin-home',
  'directors',
  'all-consoles',
  'all-records',
  'all-stored-files',
  'affiliated-college',
  'add-new-affliated-college',
  'gallery',
  'dmcupload',
  'eventphotosupload',
  'carousel',
  'galleryimagesupload',
  'updates',
  'hods',
  'help',
  'profile',
];

const rolePages = {
  rootadmin: allPages,
  admin: allPages,
  developer: [
    'affiliated-college',
    'add-new-affliated-college',
    'gallery',
    'dmcupload',
    'eventphotosupload',
    'carousel',
    'galleryimagesupload',
    'updates',
    'hods',
    'help',
    'profile',
  ],
  webadmin: [
    'gallery',
    'galleryimagesupload',
    'eventphotosupload',
    'dmcupload',
    'carousel',
    'help',
    'profile',
  ],
  updates: ['updates', 'help', 'profile'],
  affiliatedcolleges: ['affiliated-college', 'add-new-affliated-college', 'help', 'profile'],
  affliatedcolleges: ['affiliated-college', 'add-new-affliated-college', 'help', 'profile'],
  directors: ['hods', 'help', 'profile'],
};

const defaultPages = {
  rootadmin: 'admin-home',
  admin: 'admin-home',
  developer: 'gallery',
  webadmin: 'gallery',
  updates: 'updates',
  affiliatedcolleges: 'affiliated-college',
  affliatedcolleges: 'affiliated-college',
  directors: 'hods',
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
