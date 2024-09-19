import {
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from "../assets";

import collaboration from "../assets/collaboration.png";
import repo from "../assets/repo.png";
import bounty from "../assets/bounty-system.png";
import report from "../assets/bug-reporting.png";
import reward from "../assets/reward.png";
import debugging from "../assets/debugging.png";
import git from "../assets/git.png";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "2",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "3",
    title: "Sign in",
    url: "/signup",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const bugbountyServices = [
  "Robust security",
  "Repository integration",
  "Analytics and improvement",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "Bug Reporting",
    text: "Building the core functionality for developers and organizations to report bug in their code.",
    date: "June 2024",
    status: "progress",
    imageUrl: report,
    colorful: true,
  },
  {
    id: "1",
    title: "Bounty System",
    text: "Create the infrastructure for developers and enterprises to set bounties on bugs and for others to claim rewards for solving them.",
    date: "July 2024",
    status: "progress",
    imageUrl: bounty,
  },
  {
    id: "2",
    title: "Collaborative Debugging",
    text: "Enable developers to collaborate on bugs fixes within bugbounty fostering teamwork and knowledge sharing.",
    date: "August 2024",
    status: "progress",
    imageUrl: collaboration,
  },
  {
    id: "3",
    title: "Integration with Repositories",
    text: "Allow users to link their code repositories with BugBounty for easier bug tracking",
    date: "Sept 2024",
    status: "progress",
    imageUrl: repo,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: figma,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: notion,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: discord,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: slack,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: photoshop,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: protopie,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: framer,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: raindrop,
    width: 38,
    height: 32,
  },
];

export const benefits = [
  {
    id: "0",
    title: "Reward System",
    text: "Reward developers who successfully identify and fix bugs, encouraging participation and engagement within the BugBounty community.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: reward,
    imageUrl: benefitImage2,
  },
  {
    id: "1",
    title: "Collaborative Debugging",
    text: "Foster collaboration among developers by allowing them to work together to solve bugs and errors",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: debugging,
    imageUrl: benefitImage2,
    light: true,
  },
  {
    id: "2",
    title: "Version Control",
    text: "Utilize version control features to track changes and updates made to your codebase, ensuring transparency and accountability.",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: git,
    imageUrl: benefitImage2,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
