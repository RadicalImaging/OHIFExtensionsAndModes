import { loadSearchConfigPoint } from 'config-point';
import initToolGroups from './initToolGroups';
import toolbarButtons from './toolbarButtons';
import sopClassHandlers from './sopClassHandlers';
import defaultExtensions from './defaultExtensions';
import defaultRoutes from './defaultRoutes';
import onModeExit from './onModeExit';
import defaultTool from './defaultTool';
import defaultToolBarSections from './defaultToolBarSections';
import onModeEnter from './onModeEnter';
import volumeToolBarSections from './volumeToolBarSections';
import isValidMode from './isValidMode';

const windowAny = window as any;

const themeLoad = loadSearchConfigPoint(
  windowAny.config.defaultTheme,
  `${windowAny.PUBLIC_URL || '/'}theme`,
  'theme'
);

export {
  themeLoad,
  initToolGroups,
  toolbarButtons,
  sopClassHandlers,
  defaultExtensions,
  defaultRoutes,
  onModeEnter,
  onModeExit,
  defaultTool,
  defaultToolBarSections,
  volumeToolBarSections,
  isValidMode,
};
