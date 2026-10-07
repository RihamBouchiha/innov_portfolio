import { eventMemories, hackathonMemories, workshopMemories } from "./events";
import { members, teamPhoto } from "./members";

const firstPhotoForEvent = (event) =>
  hackathonMemories.find((memory) => memory.event === event)?.photo;

const photosForEvent = (event) =>
  hackathonMemories
    .filter((memory) => memory.event === event)
    .map((memory) => memory.photo);

const integrationDayPhotos = eventMemories
  .filter((memory) => memory.type === "photo")
  .map((memory) => memory.photo);

const firstWorkshopForTopic = (topic) =>
  workshopMemories.find((memory) => memory.topic === topic);

export const homepageStats = {
  members: members.length,
  events: new Set([
    "INTEGRATION DAY",
    ...hackathonMemories.map((memory) => memory.event),
  ]).size,
  workshops: new Set(workshopMemories.map((memory) => memory.topic)).size,
};

export const homepageHeroImage = teamPhoto;

export const homepageEvents = [
  {
    id: "enigmaVerse",
    label: "ENIGMA VERSE",
    photo: firstPhotoForEvent("ENIGMA VERSE"),
    album: photosForEvent("ENIGMA VERSE"),
  },
  {
    id: "integrationDay",
    label: "INTEGRATION DAY",
    photo: eventMemories.find((memory) => memory.type === "photo")?.photo,
    album: integrationDayPhotos,
  },
  {
    id: "techConnect",
    label: "TECH CONNECT",
    photo: firstPhotoForEvent("TECH CONNECT"),
    album: photosForEvent("TECH CONNECT"),
  },
];

export const homepageWorkshops = [
  "GIT & GITHUB",
  "WEB SECURITY",
  "UI / UX DESIGN",
  "AGILITÉ & COLLABORATION",
]
  .map((topic) => ({ topic, ...firstWorkshopForTopic(topic) }))
  .filter((workshop) => workshop.photo);

export const homepageGallery = [
  eventMemories[1]?.photo,
  hackathonMemories[2]?.photo,
  workshopMemories[1]?.photo,
  eventMemories[5]?.photo,
  hackathonMemories[1]?.photo,
].filter(Boolean);

export const homepageMembers = members;
