import { adjustMenu } from './ui.mjs';
import { loadWeather } from './modules/weather.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  await initAsync();
});

async function initAsync() {
  adjustMenu();
  loadWeather();
  initProjects();
  loadHackathons();
}
