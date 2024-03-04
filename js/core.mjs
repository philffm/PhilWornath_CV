import { adjustMenu } from './ui.mjs';
import { loadWeather } from './modules/weather.mjs';
import { initProjects, loadHackathons } from './project.mjs';

async function initAsync() {
  adjustMenu();
  loadWeather();
  initProjects();
  loadHackathons();
}

initAsync();
