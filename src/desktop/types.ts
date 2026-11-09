export type AppId =
  | 'terminal'
  | 'finder'
  | 'about'
  | 'experience'
  | 'skills'
  | 'education'
  | 'mail'
  | 'resume';

export type Theme = 'mac' | 'ubuntu';

export type WindowState = {
  id: AppId;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

export type AppContext = {
  openApp: (id: AppId) => void;
  closeApp: (id: AppId) => void;
  theme: Theme;
};
