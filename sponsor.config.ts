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
      preset: tierPresets.xs,
    },
    {
      title: "Backers",
      preset: tierPresets.base,
    },
    {
      title: "Sponsors",
      monthlyDollars: 10,
      preset: tierPresets.medium,
    },
  ],
  formats: ["svg"],
});
