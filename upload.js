const axios = require("axios");
const fs = require("fs");

const { SPACE_ID, API_KEY } = require("./config");
const MAP_ID = "dance-hall";
const WIDTH = 41;
const HEIGHT = 40;

const videoImg = "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FizvOgTcmAe5BY4A2?alt=media&token=4e6badb8-5b17-4e48-8868-9be941efa59a"
const videoHighlightedImg = "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F6TOxzV06OuWpOIYT?alt=media&token=271a1c85-fdd9-4498-a57c-e466b597a86b"
const backgroundImg = "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fmaps%2Fbc63e95a-8917-4d32-bd54-830ff2c3eb24?alt=media&token=5e836461-9d63-4955-a7e9-c0d992f70570"

// Kiss Me - Sixpence None the Richer
// https://youtu.be/hII0JXUJNDo?t=38
// She’s So High - Tal Bachman
// https://youtu.be/_ElORM9O-0U?t=39
// I Will Always Love You - Whitney Houston
// https://youtu.be/3JWTaaS7LdU?t=107
// Losing My Religion - R.E.M.
// https://youtu.be/xwtdhWltSIg?t=63
// Scar Tissue - Red Hot Chili Peppers
// https://youtu.be/mzJj5-lubeM?t=43
// I Believe I Can Fly - R. Kelly (Space Jam clip)
// https://youtu.be/vgEMfqPZGLQ?t=20
// The Rhythm of the Night - Corona
// https://youtu.be/OnT58cIJSpw?t=64
// Gangsta’s Paradise - Coolio feat. LV
// https://youtu.be/fPO76Jlnz6c?t=62
// Bye Bye Bye - *NSYNC
// https://youtu.be/Eo-KmOd3i7s?t=62
// Vogue - Madonna
// https://youtu.be/GuJQSAiODqI?t=100
// What’s Up - 4 Non Blondes
// https://youtu.be/6NXnxTNIWkc?t=74
// Wonderwall - Oasis
// https://youtu.be/bx1Bh8ZvH84?t=103
// Truly Madly Deeply - Savage Garden
// https://youtu.be/WQnAxOQxQIU?t=49
// Ironic - Alanis Morissette
// https://youtu.be/Jne9t8sHpUc?t=43
// Unbreak My Heart - Toni Braxton
// https://youtu.be/p2Rch6WvPJE?t=52
// Barbie Girl - Aqua
// https://youtu.be/ZyhrYis509A?t=70
// Iris - Goo Goo Dolls
// https://youtu.be/NdYWuo9OFAw?t=49
// No Scrubs - TLC
// https://youtu.be/FrLequ6dUdM?t=39
// Say My Name - Destiny’s Child
// https://youtu.be/sQgd6MccwZc?t=71
// Oops I Did It Again - Britney Spears
// https://youtu.be/CduA0TULnow?t=87
// Smells Like Teen Spirit - Nirvana
// https://youtu.be/hTWKbfoikeg?t=132
// I Want It That Way- Backstreet Boys
// https://youtu.be/4fndeDfaWCg?t=54
// Genie in a Bottle - Christina Aguilera
// https://youtu.be/kIDWgqDBNXA?t=46
// My Heart Will Go On - Celine Dion
// https://youtu.be/A3QAqZQYLIQ?t=78
// MMMBop - Hanson
// https://youtu.be/NHozn0YXAeE?t=55
// Lady Butterfly - Crazy Town
// https://www.youtube.com/watch?v=6FEDrU85FLE
// Ice Ice Baby - Vanilla Ice
// https://youtu.be/rog8ou-ZepE?t=18
// Save Tonight - Eagle Eye Cherry
// https://youtu.be/Nntd2fgMUYw?t=50
// Don’t Speak - No Doubt
// https://youtu.be/TR3Vdo5etCQ?t=75
// Blue - Eiffel 65
// https://youtu.be/68ugkg9RePc?t=49
// Livin la Vida Loca - Ricky Martin
// https://youtu.be/p47fEXGabaY?t=53
// Believe - Cher
// https://youtu.be/nZXRV4MezEw?t=59
// What is Love - Haddaway
// https://youtu.be/HEXWRTEbj1I?t=58
// Wannabe - The Spice Girls
// https://youtu.be/gJLIiF15wjQ?t=49
// U Can’t Touch This - MC Hammer
// https://youtu.be/otCpCn0l4Wo?t=15

const videoData = [
    {videoUrl: "https://youtu.be/hII0JXUJNDo?t=38"},
    {videoUrl: "https://youtu.be/_ElORM9O-0U?t=39"},
    {videoUrl: "https://youtu.be/3JWTaaS7LdU?t=107"},
    {videoUrl: "https://youtu.be/xwtdhWltSIg?t=63"},
    {videoUrl: "https://youtu.be/mzJj5-lubeM?t=43"},
    {videoUrl: "https://youtu.be/vgEMfqPZGLQ?t=20"},
    {videoUrl: "https://youtu.be/OnT58cIJSpw?t=64"}, // 7
    {videoUrl: "https://youtu.be/fPO76Jlnz6c?t=62"},
    {videoUrl: "https://youtu.be/Eo-KmOd3i7s?t=62"},
    {videoUrl: "https://youtu.be/GuJQSAiODqI?t=100"},
    {videoUrl: "https://youtu.be/6NXnxTNIWkc?t=74"},
    {videoUrl: "https://youtu.be/bx1Bh8ZvH84?t=103"},
    {videoUrl: "https://youtu.be/WQnAxOQxQIU?t=49"},
    {videoUrl: "https://youtu.be/Jne9t8sHpUc?t=43"}, // 14
    {videoUrl: "https://youtu.be/p2Rch6WvPJE?t=52"},
    {videoUrl: "https://youtu.be/ZyhrYis509A?t=70"},
    {videoUrl: "https://youtu.be/NdYWuo9OFAw?t=49"},
    {videoUrl: "https://youtu.be/FrLequ6dUdM?t=39"},
    {videoUrl: "https://youtu.be/sQgd6MccwZc?t=71"},
    {videoUrl: "https://youtu.be/CduA0TULnow?t=87"},
    {videoUrl: "https://youtu.be/hTWKbfoikeg?t=132"}, // 21
    {videoUrl: "https://youtu.be/NHozn0YXAeE?t=55"},
    {videoUrl: "https://youtu.be/kIDWgqDBNXA?t=46"},
    {videoUrl: "https://youtu.be/A3QAqZQYLIQ?t=78"},
    {videoUrl: "https://youtu.be/NHozn0YXAeE?t=55"},
    {videoUrl: "https://www.youtube.com/watch?v=6FEDrU85FLE"},
    {videoUrl: "https://youtu.be/rog8ou-ZepE?t=18"},
    {videoUrl: "https://youtu.be/Nntd2fgMUYw?t=50"}, // 28
    {videoUrl: "https://youtu.be/TR3Vdo5etCQ?t=75"},
    {videoUrl: "https://youtu.be/68ugkg9RePc?t=49"},
    {videoUrl: "https://youtu.be/p47fEXGabaY?t=53"},
    {videoUrl: "https://youtu.be/nZXRV4MezEw?t=59"},
    {videoUrl: "https://youtu.be/HEXWRTEbj1I?t=58"},
    {videoUrl: "https://youtu.be/gJLIiF15wjQ?t=49"},
    {videoUrl: "https://youtu.be/otCpCn0l4Wo?t=15"}, // 35

];

const BASE_MAP = {
  id: MAP_ID,
  backgroundImagePath: backgroundImg,
  dimensions: [WIDTH, HEIGHT],
  spawns: [
    // generally, adding many more than one is good practice so people don't all stack up in the same place
    { x: 19, y: 39 },
    { x: 20, y: 39 },
    { x: 21, y: 39 },
  ],
  objects: [
    { // rickroll
      x: 39,
      y: 8,
      type: 3,
      distThreshold: 4,
      width: 1,
      height: 1,
      normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F3401e160-6f6b-487a-aa74-b1768cf49d77?alt=media&token=365b1975-d5d4-41e0-b76e-c807b5e763b9",
      highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2Ff751640d-547c-4b7a-ae41-f2bbe72d5ea7?alt=media&token=4487f66b-91e6-46df-8c11-1f9694f84bdc",
      properties: {
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=1"
      },
    },
    { // fresh prince
      x: 1,
      y: 8,
      type: 3,
      distThreshold: 4,
      width: 1,
      height: 1,
      normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2Ffc5b03c2-441a-4a3f-9d81-3983bf2a86f2?alt=media&token=65d1ed76-fe86-4b57-b4a1-358a38744b4f",
      highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2Fb536bf53-b998-42da-96c3-3b7519e6c1aa?alt=media&token=e4f696ad-f99f-4601-bc79-9e52ad84466a",
      properties: {
        video: "https://youtu.be/1nCqRmx3Dnw?t=9"
      },
    },
    { // lisa frank
        x: 11,
        y: 34,
        type: 0,
        width: 5,
        height: 4,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F342d1d4c-12ea-4f55-bc32-8282e01b7ac5?alt=media&token=fb21489f-9aef-4f23-a7dd-6b3786850d1e",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2Ff8169f8a-0305-4f79-b938-264358771a0e?alt=media&token=e5884386-ef66-4c97-a8a9-f3972e57693b",
    },
    { // the simpsons
        x: 3,
        y: 2,
        type: 0,
        width: 5,
        height: 4,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2Fff50f7c5-2a0a-4c71-b64c-1734cc2f3d28?alt=media&token=0db3cf68-8aa8-46b9-a9ea-7800178864af",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F3039efb2-320e-4da4-8a16-02ca2566da31?alt=media&token=ebcce37f-a413-4f3f-aec5-c11b23b6a9b1",
    },
    { // blockbuster
        x: 9,
        y: 2,
        type: 0,
        width: 5,
        height: 4,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2Ff1c8ae43-7357-4284-b66c-1184ad0f07ab?alt=media&token=6731b718-604a-418e-955b-669e90886455",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F8b58caf8-5f98-48a1-8e27-e192a3f18484?alt=media&token=ee91aa77-95a4-4e87-ad16-a079c84b33ef",
    },
    { // mr. sketch
        x: 15,
        y: 2,
        type: 0,
        width: 5,
        height: 4,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F3e2a6664-8574-4b80-bf83-0701eb10c263?alt=media&token=0e2d16f9-af3f-4d4c-9bd3-0767a878fa8c",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2Fec89fa95-f3bc-4201-9447-00cf1abaa083?alt=media&token=267a5143-dd40-4bfb-897a-2da2f8ec2c9d",
    },
    { // kodak
        x: 21,
        y: 2,
        type: 0,
        width: 5,
        height: 4,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F7e2e279f-f04e-411f-b170-8a465f08043a?alt=media&token=a5418b6d-c513-40a1-aca7-2ada1c75ddfc",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F1616c53c-6e6e-43dd-b18f-dc2bf9e7458b?alt=media&token=1ac5f7f8-6cbe-4e2d-a8ca-83887787ae68",
    },
    { // friends
        x: 27,
        y: 2,
        type: 0,
        width: 5,
        height: 4,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F1c2734ca-51be-41b7-90d1-590bac139d92?alt=media&token=65cda692-4497-4cc2-8e7f-20bf156eb840",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F48e0deaa-e89f-4945-99ff-70fc1c5282d9?alt=media&token=7b2bc13c-67e0-4523-96dc-a2099945a3c7",
    },
    { // cassette
        x: 33,
        y: 2,
        type: 0,
        width: 5,
        height: 4,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F558a5b3f-65d1-46f4-86e8-0ccfefbb8d47?alt=media&token=ea47e1f0-83bf-4366-bd2d-7d13ff72ebdb",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/uploads%2Fz790wag4LDTH1C0d%2Fassets%2F6fd2f8ff-cd8e-4272-8f56-0889186f8077?alt=media&token=3d75eec2-d865-4ca4-a5d8-a0682033f08c",
    },
    { // couch right side
        x: 39,
        y: 24,
        type: 0,
        width: 1,
        height: 3,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F0SFnJHXca15w7wHQ?alt=media&token=0cab075f-3306-4059-a8c9-d3801d462f58",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FZ6Ghy2JxhT1QwaEm?alt=media&token=7f8aafea-2fa5-40ac-b09c-d992cece7a55",
        _name: "Couch",
    },
    { // couch right side
        x: 39,
        y: 10,
        type: 0,
        width: 1,
        height: 3,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F0SFnJHXca15w7wHQ?alt=media&token=0cab075f-3306-4059-a8c9-d3801d462f58",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FZ6Ghy2JxhT1QwaEm?alt=media&token=7f8aafea-2fa5-40ac-b09c-d992cece7a55",
        _name: "Couch",
    },
    { // couch left side
        x: 1,
        y: 24,
        type: 0,
        width: 1,
        height: 3,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FCCqWBqaPSXxgLY82?alt=media&token=b8be6ebb-ef10-4131-b85d-1f467896f92f",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F3TBcbbL8dIP49ziG?alt=media&token=7b8256d2-8131-4a43-9e03-f8b3c0dc83d9",
        _name: "Couch",
    },
    { // couch left side
        x: 1,
        y: 10,
        type: 0,
        width: 1,
        height: 3,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FCCqWBqaPSXxgLY82?alt=media&token=b8be6ebb-ef10-4131-b85d-1f467896f92f",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F3TBcbbL8dIP49ziG?alt=media&token=7b8256d2-8131-4a43-9e03-f8b3c0dc83d9",
        _name: "Couch",
    },
    { // side table
        x: 1,
        y: 9,
        type: 0,
        width: 1,
        height: 1,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2Fpv4UZg2W0RKZTskR?alt=media&token=08fdd5d7-9812-4761-a78e-876d8ad3b3ff",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FJmYTBifIhAXJk9wg?alt=media&token=668e1c88-0377-4f42-a465-507ea3185c56",
        _name: "Side Table",
    },
    { // side table
        x: 39,
        y: 9,
        type: 0,
        width: 1,
        height: 1,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2Fpv4UZg2W0RKZTskR?alt=media&token=08fdd5d7-9812-4761-a78e-876d8ad3b3ff",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FJmYTBifIhAXJk9wg?alt=media&token=668e1c88-0377-4f42-a465-507ea3185c56",
        _name: "Side Table",
    },
    { // side table
        x: 1,
        y: 23,
        type: 0,
        width: 1,
        height: 1,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2Fpv4UZg2W0RKZTskR?alt=media&token=08fdd5d7-9812-4761-a78e-876d8ad3b3ff",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FJmYTBifIhAXJk9wg?alt=media&token=668e1c88-0377-4f42-a465-507ea3185c56",
        _name: "Side Table",
    },
    { // side table
        x: 39,
        y: 23,
        type: 0,
        width: 1,
        height: 1,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2Fpv4UZg2W0RKZTskR?alt=media&token=08fdd5d7-9812-4761-a78e-876d8ad3b3ff",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FJmYTBifIhAXJk9wg?alt=media&token=668e1c88-0377-4f42-a465-507ea3185c56",
        _name: "Side Table",
    },
    { // potted plant
        x: 39,
        y: 26,
        type: 0,
        width: 1,
        height: 2,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2Fb4RXbTaLAoYiTOJ2?alt=media&token=f2183b73-ae50-4973-b754-b2c953550e8e",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FFtP2tXrUjUOO7NJS?alt=media&token=db5aae6e-74cb-4493-a1f4-94a77ea1f237",
        _name: "Potted Plant (Skinny)",
    },
    { // potted plant
        x: 39,
        y: 12,
        type: 0,
        width: 1,
        height: 2,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2Fb4RXbTaLAoYiTOJ2?alt=media&token=f2183b73-ae50-4973-b754-b2c953550e8e",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FFtP2tXrUjUOO7NJS?alt=media&token=db5aae6e-74cb-4493-a1f4-94a77ea1f237",
        _name: "Potted Plant (Skinny)",
    },
    { // potted plant
        x: 1,
        y: 26,
        type: 0,
        width: 1,
        height: 2,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2Fb4RXbTaLAoYiTOJ2?alt=media&token=f2183b73-ae50-4973-b754-b2c953550e8e",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FFtP2tXrUjUOO7NJS?alt=media&token=db5aae6e-74cb-4493-a1f4-94a77ea1f237",
        _name: "Potted Plant (Skinny)",
    },
    { // potted plant
        x: 1,
        y: 12,
        type: 0,
        width: 1,
        height: 2,
        normal: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2Fb4RXbTaLAoYiTOJ2?alt=media&token=f2183b73-ae50-4973-b754-b2c953550e8e",
        highlighted: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FFtP2tXrUjUOO7NJS?alt=media&token=db5aae6e-74cb-4493-a1f4-94a77ea1f237",
        _name: "Potted Plant (Skinny)",
    },
  ],
  portals: [
    // for example:
    // {
    //   x: 2,
    //   y: 3,
    //   targetUrl:
    //     "https://gather.town/app/nO9uzqf6ZhzsXJ68/Grand%20Central%20Station",
    // },
  ],
};

// takes basic video data, and generates the map from it
const writeMap = async (videoData) => {
  let impassable = {}; // maps r,c to true if impassable
  let videos = [];
  let privateSpaces = [];

  // arrange the videos in rows
  videoData.forEach((video, index) => {
    const topleft = {
      x: (index % 7) * 5 + 3,
      y: parseInt(index / 7) * 5 + 6,
    };

    // the video object
    videos.push({
      x: topleft.x + 2,
      y: topleft.y + 2,
      type: 3,
      distThreshold: 2,
      width: 1,
            height: 2,
      normal: videoImg,
      highlighted: videoHighlightedImg,
      properties: {
        video: video.videoUrl
      },
    });

    // video private space
    for (let x = topleft.x; x < topleft.x + 5; x++) {
      for (let y = topleft.y; y < topleft.y + 5; y++) {
        privateSpaces.push({ x, y, spaceId: "p" + index });
      }
    }
  });

  // generate impassable bytemask
  let collBytes = [];
  for (let r = 0; r < HEIGHT; r++) {
    for (let c = 0; c < WIDTH; c++) {
      // edges are just definitely impassable
      if ((r < 2 || r > HEIGHT - 3 || c < 1 || c > WIDTH - 2) &&
          !(r > HEIGHT - 3 && (c >= ((WIDTH - 1) / 2 - 1) && c <= ((WIDTH - 1) / 2 + 1)))) {
        collBytes.push(0x01);
      } // otherwise see if it's marked or not
      else collBytes.push(impassable[[r, c]] ? 0x01 : 0x00);
    }
  }

  await axios.post("https://gather.town/api/setMap", {
    apiKey: API_KEY,
    spaceId: SPACE_ID,
    mapId: MAP_ID,
    mapContent: Object.assign(BASE_MAP, {
      objects: BASE_MAP.objects.concat(videos),
      spaces: privateSpaces,
      collisions: new Buffer(collBytes).toString("base64"),
      // ^ base64 encoded array of dimensions[1] x dimensions[0] bytes (each either 0x00 or 0x01)
    }),
  });
};

writeMap(videoData);
