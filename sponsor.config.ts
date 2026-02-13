import { defineConfig, tierPresets } from "sponsorkit";

export default defineConfig({
  github: {
    login: "DaleStudy",
    type: "organization",
  },
  tiers: [
    {
      title: "Past Sponsors",
      monthlyDollars: -1,
      preset: tierPresets.medium,
    },
    {
      title: "Sponsors",
      preset: tierPresets.large,
    },
  ],
  formats: ["svg"],
});
