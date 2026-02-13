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
      preset: tierPresets.base,
    },
    {
      title: "Sponsors",
      preset: tierPresets.medium,
    },
    {
      title: "Silver Sponsors",
      monthlyDollars: 5,
      preset: tierPresets.large,
    },
    {
      title: "Silver Sponsors",
      monthlyDollars: 10,
      preset: tierPresets.large,
    },
    {
      title: "Gold Sponsors",
      monthlyDollars: 50,
      preset: tierPresets.xl,
    },
  ],
  formats: ["svg"],
});
