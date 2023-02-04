import { defineConfig } from "cypress";
import { nxComponentTestingPreset } from '@nrwl/angular/plugins/component-testing';

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
  },
  component: {
    ...nxComponentTestingPreset(__filename),
    
  },
  
});
