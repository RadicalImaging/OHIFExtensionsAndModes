import { loadSearchConfigPoint } from "config-point";
import initToolGroups from "./initToolGroups";
import toolbarButtons from "./toolbarButtons";
import sopClassHandlers from "./sopClassHandlers";
import defaultExtensions from "./defaultExtensions";
import defaultRoutes from "./defaultRoutes";
import onModeExit from "./onModeExit";
import defaultTool from "./defaultTool";
import defaultToolBarSections from "./defaultToolBarSections";
import onModeEnter from "./onModeEnter";
import volumeToolBarSections from './volumeToolBarSections';
import isValidMode from './isValidMode';

/** Load method for dynamic loading of modes and extensions. */
const hotLoad = async (defaultTheme='theme') => {
  // Load themes from the "theme" parameter on the URL before returning the modes
  
};

const themeLoad = loadSearchConfigPoint((window as any).config.defaultTheme, '/theme', 'theme');

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
