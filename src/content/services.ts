/**
 * Service page content (migrated from the premium HTML site).
 * Text wrapped in *asterisks* renders in the gold gradient.
 */
import type { ImageName } from '@/lib/images';
import type { IconName } from '@/components/Icon';

export type Service = {
  slug: string;
  number: string;
  name: string;
  menuName: string;
  summary: string;
  icon: IconName;
  cardImage: ImageName;
  cardFlip: boolean;
  metaTitle: string;
  metaDescription: string;
  hero: { image: ImageName; alt: string; flip: boolean; kicker: string; title: string; lead: string };
  intro: { title: string; paragraphs: string[]; signs: { title: string; text: string }[] };
  included: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  related: string[];
  quoteTitle: string;
  formService: string;
};

export const services: Service[] = [
  {
    "slug": "roof-leak-repairs",
    "number": "01",
    "name": "Roof Leak Repairs",
    "menuName": "Roof Leak Repairs",
    "summary": "We find where water is really getting in and fix the cause, not just the stain.",
    "icon": "leak",
    "cardImage": "ceiling-leak",
    "cardFlip": false,
    "metaTitle": "Roof Leak Repairs Sydney | Find & Fix the Source | SPR Roofing",
    "metaDescription": "Roof leak repairs Sydney homeowners can rely on. We trace water to where it actually gets in and fix the cause. Send us a photo of the stain for a quote.",
    "hero": {
      "image": "ceiling-leak",
      "alt": "Brown water stain on a ceiling caused by a roof leak",
      "flip": false,
      "kicker": "Leak detection & repair",
      "title": "Roof leak repairs *Sydney*",
      "lead": "A stain on the ceiling is where the water ends up, not where it gets in. We trace the leak back to its source and fix it properly, so it doesn't come back with the next storm."
    },
    "intro": {
      "title": "We fix the cause, *not the symptom*",
      "paragraphs": [
        "Water can travel a long way along rafters, sarking and battens before it shows up inside. That's why patching the spot above the stain often doesn't work. We inspect the roof, follow the water path and find the real entry point.",
        "Common causes include cracked or slipped tiles, failed ridge capping, rusted or lifted metal sheets, worn flashings around chimneys and skylights, and blocked valleys or gutters. Once we know the cause, we explain it to you in plain English and quote the repair."
      ],
      "signs": [
        {
          "title": "Ceiling stains",
          "text": "New or growing brown marks on the ceiling or cornice."
        },
        {
          "title": "Drips during rain",
          "text": "Water dripping or pooling inside when it rains."
        },
        {
          "title": "Damp roof space",
          "text": "Wet insulation, musty smells or mould in the ceiling space."
        },
        {
          "title": "Peeling paint",
          "text": "Bubbling paint or swelling plaster near the ceiling."
        }
      ]
    },
    "included": [
      {
        "title": "Leak tracing",
        "text": "We follow the water path to the true entry point."
      },
      {
        "title": "Tile & sheet repairs",
        "text": "Broken tiles replaced, lifted or rusted sheets fixed."
      },
      {
        "title": "Flashing repairs",
        "text": "Chimney, skylight, wall and valley flashings resealed or replaced."
      },
      {
        "title": "Ridge capping",
        "text": "Re-bedding and re-pointing where ridge caps are letting water in."
      },
      {
        "title": "Gutter & valley clearing",
        "text": "Blockages that push water back under the roof removed."
      },
      {
        "title": "Clear report",
        "text": "Photos and an explanation of what we found and fixed."
      }
    ],
    "steps": [
      {
        "title": "Send photos",
        "text": "Share photos of the stain and the roof from the ground, plus your suburb."
      },
      {
        "title": "Inspect & trace",
        "text": "We inspect the roof and trace the water back to where it enters."
      },
      {
        "title": "Quote the fix",
        "text": "You get a written quote for the repair that addresses the cause."
      },
      {
        "title": "Repair & check",
        "text": "We complete the repair and check the area is watertight."
      }
    ],
    "faqs": [
      {
        "q": "How do you find where a roof leak is coming from?",
        "a": "We inspect the roof surface and, where needed, the roof space, then follow signs of water such as staining on timbers and sarking back to the entry point. The entry point is often some distance from the ceiling stain."
      },
      {
        "q": "Is a small ceiling stain worth getting checked?",
        "a": "Yes. A small stain usually means water has been getting in for a while. Catching it early can save damage to ceilings, insulation and timbers."
      },
      {
        "q": "Can you fix a leak on a metal roof and a tile roof?",
        "a": "Yes. We repair leaks on both tiled and metal roofs, including flashings, ridge caps, sheets and tiles."
      },
      {
        "q": "What do you need from me for a quote?",
        "a": "Your suburb, a short description of the problem, and a few photos of the stain and the roof taken from the ground."
      }
    ],
    "related": [
      "tile-roof-repairs",
      "gutter-repairs",
      "roof-inspections"
    ],
    "quoteTitle": "Get a quote for *roof leak repairs*",
    "formService": "Roof leak repair"
  },
  {
    "slug": "tile-roof-repairs",
    "number": "02",
    "name": "Tile Roof Repairs",
    "menuName": "Tile Roof Repairs & Replacement",
    "summary": "Cracked and slipped tiles replaced, ridge caps re-bedded and re-pointed.",
    "icon": "tile",
    "cardImage": "tile-texture",
    "cardFlip": false,
    "metaTitle": "Tile Roof Repairs Sydney | Broken Tiles & Ridge Capping | SPR",
    "metaDescription": "Tile roof repairs Sydney-wide: cracked and slipped tiles replaced, ridge caps re-bedded and re-pointed, and full re-tiles. Book an inspection and get a written quote.",
    "hero": {
      "image": "tile-texture",
      "alt": "Close-up of terracotta roof tiles",
      "flip": false,
      "kicker": "Tile repairs & replacement",
      "title": "Tile roof repairs *Sydney*",
      "lead": "Cracked, slipped or missing tiles and loose ridge capping are among the most common reasons a tiled roof starts to leak. We repair them properly and replace tiles to match where we can."
    },
    "intro": {
      "title": "Small tile problems, *fixed early*",
      "paragraphs": [
        "Tiles crack with age, foot traffic, falling branches and hail. Ridge caps rely on bedding and pointing that breaks down over time. Each gap is a path for water into your roof space.",
        "We replace damaged tiles, re-bed and re-point ridge and hip caps, and repair valleys and flashings. For roofs that are past repair, we can quote a full tile replacement or a change to metal roofing."
      ],
      "signs": [
        {
          "title": "Cracked tiles",
          "text": "Visible cracks, chips or broken corners on tiles."
        },
        {
          "title": "Slipped tiles",
          "text": "Tiles out of line or sliding down the roof."
        },
        {
          "title": "Loose ridge caps",
          "text": "Crumbling mortar or caps that move along the ridge."
        },
        {
          "title": "Debris in gutters",
          "text": "Pieces of tile or mortar collecting in the gutters."
        }
      ]
    },
    "included": [
      {
        "title": "Tile replacement",
        "text": "Broken, cracked or missing tiles replaced and matched where possible."
      },
      {
        "title": "Re-bedding",
        "text": "Ridge and hip caps re-bedded on fresh bedding."
      },
      {
        "title": "Re-pointing",
        "text": "Flexible pointing applied to hold caps firmly in place."
      },
      {
        "title": "Valley repairs",
        "text": "Valley irons cleared, repaired or replaced."
      },
      {
        "title": "Flashing repairs",
        "text": "Leaking flashings resealed or replaced."
      },
      {
        "title": "Full re-tiling",
        "text": "Complete tile replacement for roofs beyond repair."
      }
    ],
    "steps": [
      {
        "title": "Send details",
        "text": "Your suburb, a short description and photos from the ground."
      },
      {
        "title": "Roof inspection",
        "text": "We check tiles, ridges, valleys and flashings up close."
      },
      {
        "title": "Written quote",
        "text": "A clear quote listing exactly what needs repairing."
      },
      {
        "title": "Repair & clean up",
        "text": "We complete the work and clear away broken tiles and debris."
      }
    ],
    "faqs": [
      {
        "q": "Can you match my existing roof tiles?",
        "a": "In most cases we can source matching or very close replacement tiles. If an exact match isn't available, we'll talk you through the options before starting."
      },
      {
        "q": "What is the difference between re-bedding and re-pointing?",
        "a": "Re-bedding replaces the mortar the ridge caps sit on. Re-pointing is the flexible finishing layer that seals and holds the caps. Many older roofs need both."
      },
      {
        "q": "Should I repair or replace my tile roof?",
        "a": "If damage is limited, repairs are usually the most cost-effective option. If many tiles are failing or porous, a replacement may make more sense. We'll give you an honest recommendation."
      },
      {
        "q": "Can I walk on my tile roof to check it?",
        "a": "We don't recommend it. Tiles crack easily underfoot and working at height is risky. Photos from the ground are enough for us to get started."
      }
    ],
    "related": [
      "roof-restoration",
      "roof-leak-repairs",
      "storm-damage-repairs"
    ],
    "quoteTitle": "Get a quote for *tile roof repairs*",
    "formService": "Tile roof repair / replacement"
  },
  {
    "slug": "metal-roofing",
    "number": "03",
    "name": "Metal Roofing",
    "menuName": "Metal Roofing",
    "summary": "New metal roofs and full re-roofs in a range of popular colours.",
    "icon": "metal",
    "cardImage": "roof-dusk",
    "cardFlip": false,
    "metaTitle": "Metal Roofing Sydney | New Roofs & Re-Roofing | SPR Roofing",
    "metaDescription": "Metal roofing Sydney homes and businesses: new metal roofs, re-roofs from tile to metal and metal roof repairs in a range of colours. Request your free quote.",
    "hero": {
      "image": "roof-dusk",
      "alt": "Charcoal metal roof on a Sydney home at dusk",
      "flip": false,
      "kicker": "New roofs & re-roofing",
      "title": "Metal roofing *Sydney*",
      "lead": "Metal roofs are light, durable and suit both modern and classic Sydney homes. We install new metal roofs, re-roof from tile to metal and repair existing metal roofs."
    },
    "intro": {
      "title": "A roof built for *Sydney weather*",
      "paragraphs": [
        "Whether you're replacing an old tiled roof or an ageing metal one, a new metal roof is a long-term upgrade. We handle the full job, from removal of the old roof to new battens, sarking, sheets, flashings, ridge capping and gutters.",
        "Choose from a range of popular colours to suit your home. For existing metal roofs, we also repair rust, loose fixings, lifted sheets and leaking flashings."
      ],
      "signs": [
        {
          "title": "Rust spots",
          "text": "Rust patches or holes forming on sheets."
        },
        {
          "title": "Loose screws",
          "text": "Popped or missing fixings and lifting sheet edges."
        },
        {
          "title": "Noisy roof",
          "text": "Rattling or banging in wind from loose sheets."
        },
        {
          "title": "Old tile roof",
          "text": "A tired tile roof you'd like to replace with metal."
        }
      ]
    },
    "included": [
      {
        "title": "New metal roofs",
        "text": "Complete installation for new builds and extensions."
      },
      {
        "title": "Tile-to-metal re-roofs",
        "text": "Old tiles removed and replaced with a new metal roof."
      },
      {
        "title": "Metal-to-metal re-roofs",
        "text": "Ageing sheets replaced with new ones."
      },
      {
        "title": "Sarking & insulation",
        "text": "Sarking installed to help with condensation and heat."
      },
      {
        "title": "Flashings & capping",
        "text": "New ridge capping, barge and wall flashings."
      },
      {
        "title": "Metal roof repairs",
        "text": "Rust, fixings, lifted sheets and leaks repaired."
      }
    ],
    "steps": [
      {
        "title": "Tell us the plan",
        "text": "Repair, re-roof or new roof? Send details and photos."
      },
      {
        "title": "Measure & inspect",
        "text": "We inspect the roof structure and take measurements."
      },
      {
        "title": "Colour & quote",
        "text": "Choose your colour and receive a detailed written quote."
      },
      {
        "title": "Install & handover",
        "text": "We install, clean up and walk you through the finished roof."
      }
    ],
    "faqs": [
      {
        "q": "Can you replace a tile roof with a metal roof?",
        "a": "Yes. Tile-to-metal re-roofs are a common job. We remove the tiles and battens, check the frame, then install new battens, sarking and metal sheets."
      },
      {
        "q": "What colours are available?",
        "a": "Metal roofing comes in a wide range of colours, from charcoal and greys to greens and lighter shades. We can show you samples and help you choose one that suits your home."
      },
      {
        "q": "Is a metal roof noisy in the rain?",
        "a": "Correct installation with sarking and insulation reduces rain noise. Most homeowners find a modern metal roof no louder than other roof types."
      },
      {
        "q": "Do you repair existing metal roofs?",
        "a": "Yes. We repair rusted sections, replace damaged sheets, refix loose screws and reseal flashings."
      }
    ],
    "related": [
      "roof-painting",
      "gutter-repairs",
      "commercial-roofing"
    ],
    "quoteTitle": "Get a quote for *metal roofing*",
    "formService": "Metal roofing"
  },
  {
    "slug": "roof-restoration",
    "number": "04",
    "name": "Roof Restoration",
    "menuName": "Roof Restoration",
    "summary": "Clean, repair, re-point and re-coat to bring a tired roof back to life.",
    "icon": "restore",
    "cardImage": "house-sunset",
    "cardFlip": false,
    "metaTitle": "Roof Restoration Sydney | Clean, Repair & Re-Coat | SPR Roofing",
    "metaDescription": "Roof restoration Sydney-wide for tile and metal roofs: cleaning, repairs, re-bedding, re-pointing and protective coatings. Refresh your roof for less than a replacement.",
    "hero": {
      "image": "house-sunset",
      "alt": "Sydney home with a freshly restored roof",
      "flip": false,
      "kicker": "Restore instead of replace",
      "title": "Roof restoration *Sydney*",
      "lead": "A tired roof doesn't always need replacing. A full restoration cleans, repairs and re-coats your roof to bring back its look and help protect your home for years to come."
    },
    "intro": {
      "title": "New life for an *older roof*",
      "paragraphs": [
        "Over time, roofs collect moss, lichen and dirt, coatings fade, and ridge caps loosen. A restoration tackles all of it in one job, which is usually far more affordable than a new roof.",
        "We restore both tiled and metal roofs. Each restoration starts with an inspection, so we only quote the work your roof actually needs."
      ],
      "signs": [
        {
          "title": "Faded colour",
          "text": "Patchy, chalky or washed-out roof colour."
        },
        {
          "title": "Moss & lichen",
          "text": "Growth on tiles or sheets, especially on shaded sides."
        },
        {
          "title": "Loose ridge caps",
          "text": "Cracked bedding or pointing along ridges and hips."
        },
        {
          "title": "Tired look",
          "text": "A roof that drags down the look of your home."
        }
      ]
    },
    "included": [
      {
        "title": "High-pressure clean",
        "text": "Moss, lichen and dirt removed from the roof surface."
      },
      {
        "title": "Tile & sheet repairs",
        "text": "Broken tiles replaced and damaged sheets fixed."
      },
      {
        "title": "Re-bedding & re-pointing",
        "text": "Ridge and hip caps secured and sealed."
      },
      {
        "title": "Rust treatment",
        "text": "Rust on metal roofs treated before coating."
      },
      {
        "title": "Primer & coating",
        "text": "Protective coating applied in your chosen colour."
      },
      {
        "title": "Gutter clean",
        "text": "Gutters cleared of debris at the end of the job."
      }
    ],
    "steps": [
      {
        "title": "Send photos",
        "text": "Share your suburb and a few photos of the roof from the ground."
      },
      {
        "title": "Inspection",
        "text": "We check the roof condition and what it needs."
      },
      {
        "title": "Restoration quote",
        "text": "A written quote with each stage of work listed."
      },
      {
        "title": "Restore & reveal",
        "text": "We clean, repair and coat, then clean up the site."
      }
    ],
    "faqs": [
      {
        "q": "What is included in a roof restoration?",
        "a": "A typical restoration includes cleaning, repairs to tiles or sheets, re-bedding and re-pointing where needed, then priming and coating. Your quote lists exactly what your roof needs."
      },
      {
        "q": "Is roof restoration cheaper than replacing the roof?",
        "a": "In most cases, yes. If the roof structure and materials are still sound, restoration costs significantly less than a full replacement."
      },
      {
        "q": "Can you restore a metal roof?",
        "a": "Yes. Metal roof restorations include cleaning, rust treatment, refixing, priming and coating."
      },
      {
        "q": "How long does a restoration take?",
        "a": "It depends on the roof size, condition and weather. We give you an expected timeframe with your quote."
      }
    ],
    "related": [
      "roof-painting",
      "tile-roof-repairs",
      "roof-inspections"
    ],
    "quoteTitle": "Get a quote for *roof restoration*",
    "formService": "Roof restoration"
  },
  {
    "slug": "roof-painting",
    "number": "05",
    "name": "Roof Painting",
    "menuName": "Roof Painting",
    "summary": "Protective coatings that refresh your roof colour and kerb appeal.",
    "icon": "paint",
    "cardImage": "roof-colours",
    "cardFlip": false,
    "metaTitle": "Roof Painting Sydney | Protective Roof Coatings | SPR Roofing",
    "metaDescription": "Roof painting Sydney homeowners love: proper preparation and protective coatings for tile and metal roofs in the colour you choose. Refresh your roof – ask for a quote.",
    "hero": {
      "image": "roof-colours",
      "alt": "Roof sheet colour samples in grey and deep green",
      "flip": false,
      "kicker": "Protective roof coatings",
      "title": "Roof painting *Sydney*",
      "lead": "A fresh roof colour can transform the look of your home. Done properly, roof painting also adds a protective layer that helps your roof stand up to sun and rain."
    },
    "intro": {
      "title": "It's all in the *preparation*",
      "paragraphs": [
        "A roof coating is only as good as the surface underneath it. That's why we clean, repair and prime before any colour goes on. Skipping these steps is why some painted roofs start peeling within a few years.",
        "We paint both tiled and metal roofs and can help you choose a colour that suits your home and street."
      ],
      "signs": [
        {
          "title": "Fading",
          "text": "Colour that has faded or gone patchy in the sun."
        },
        {
          "title": "Chalky surface",
          "text": "A powdery residue on metal roof sheets."
        },
        {
          "title": "Selling soon",
          "text": "Freshening up kerb appeal before you sell."
        },
        {
          "title": "Colour change",
          "text": "You'd like a new look for your home."
        }
      ]
    },
    "included": [
      {
        "title": "Surface cleaning",
        "text": "High-pressure clean to remove dirt, moss and old loose coating."
      },
      {
        "title": "Repairs first",
        "text": "Broken tiles, ridge caps and rust dealt with before painting."
      },
      {
        "title": "Primer / sealer",
        "text": "The right primer for your roof type."
      },
      {
        "title": "Two-coat finish",
        "text": "Protective top coats in your chosen colour."
      },
      {
        "title": "Colour advice",
        "text": "Help choosing a shade that suits your home."
      },
      {
        "title": "Site clean-up",
        "text": "Gutters and surrounds left clean."
      }
    ],
    "steps": [
      {
        "title": "Choose your look",
        "text": "Tell us your roof type and the colours you're considering."
      },
      {
        "title": "Inspect & prep plan",
        "text": "We check condition and what prep is needed."
      },
      {
        "title": "Written quote",
        "text": "A clear quote for preparation and coating."
      },
      {
        "title": "Paint & finish",
        "text": "We prepare, prime and paint, then clean up."
      }
    ],
    "faqs": [
      {
        "q": "Can you paint both tile and metal roofs?",
        "a": "Yes. We use preparation and coatings suited to each roof type."
      },
      {
        "q": "Do I need repairs before painting?",
        "a": "Usually some repairs are needed, such as replacing broken tiles or treating rust. Painting over damage doesn't fix it, so we sort it out first."
      },
      {
        "q": "Will painting stop my roof from leaking?",
        "a": "Paint is not a leak repair. If your roof leaks, we'll fix the cause first. The coating then helps protect the surface."
      },
      {
        "q": "Can you help me choose a colour?",
        "a": "Yes. We can show you samples and talk through which colours suit your home's style."
      }
    ],
    "related": [
      "roof-restoration",
      "metal-roofing",
      "roof-inspections"
    ],
    "quoteTitle": "Get a quote for *roof painting*",
    "formService": "Roof painting"
  },
  {
    "slug": "gutter-repairs",
    "number": "06",
    "name": "Gutter Repairs",
    "menuName": "Gutter Repairs & Replacement",
    "summary": "Leaking, sagging or overflowing gutters and downpipes repaired or replaced.",
    "icon": "gutter",
    "cardImage": "gutter-rain",
    "cardFlip": false,
    "metaTitle": "Gutter Repairs Sydney | Gutter & Downpipe Replacement | SPR",
    "metaDescription": "Gutter repairs Sydney-wide: leaking joints, sagging runs, overflowing gutters and downpipes repaired or replaced. Send a photo from the ground for a quick quote.",
    "hero": {
      "image": "gutter-rain",
      "alt": "Gutter overflowing during heavy rain",
      "flip": false,
      "kicker": "Gutters & downpipes",
      "title": "Gutter repairs *Sydney*",
      "lead": "Gutters move rainwater away from your roof and walls. When they leak, sag or overflow, water ends up where it shouldn't. We repair and replace gutters and downpipes so rain goes where it should."
    },
    "intro": {
      "title": "Where does *the rain go?*",
      "paragraphs": [
        "Overflowing or leaking gutters can damage fascia boards, eaves, walls and even foundations. Water can also back up under the roof edge and leak inside.",
        "We repair leaking joints and corners, re-fall sagging gutters, clear blockages and replace rusted gutters and downpipes with new ones in a colour to suit your roof."
      ],
      "signs": [
        {
          "title": "Overflowing",
          "text": "Water spilling over the edge when it rains."
        },
        {
          "title": "Sagging",
          "text": "Gutters pulling away from the fascia or holding water."
        },
        {
          "title": "Rust & holes",
          "text": "Rust spots, holes or leaking joints."
        },
        {
          "title": "Stained walls",
          "text": "Water marks on walls or eaves below the gutter."
        }
      ]
    },
    "included": [
      {
        "title": "Leak repairs",
        "text": "Joints, corners and end caps resealed."
      },
      {
        "title": "Re-falling",
        "text": "Sagging gutters adjusted so water flows to the outlets."
      },
      {
        "title": "Gutter replacement",
        "text": "Rusted or damaged gutters replaced with new runs."
      },
      {
        "title": "Downpipe repairs",
        "text": "Downpipes cleared, repaired or replaced."
      },
      {
        "title": "Blockage clearing",
        "text": "Leaves and debris removed from gutters and outlets."
      },
      {
        "title": "Fascia check",
        "text": "Fascia and eaves checked for water damage."
      }
    ],
    "steps": [
      {
        "title": "Send a photo",
        "text": "A photo from the ground and your suburb is enough to start."
      },
      {
        "title": "Inspect",
        "text": "We check gutters, downpipes, outlets and fascia."
      },
      {
        "title": "Quote",
        "text": "Repair or replacement options with clear pricing."
      },
      {
        "title": "Fix & test",
        "text": "We complete the work and check water flows freely."
      }
    ],
    "faqs": [
      {
        "q": "Should I repair or replace my gutters?",
        "a": "If the gutters are mostly sound, repairs are often enough. Rusted-through or badly sagging gutters are usually better replaced. We'll recommend the most sensible option."
      },
      {
        "q": "Why do my gutters overflow even when they're clean?",
        "a": "Common causes include incorrect fall, too few downpipes or undersized gutters for the roof area. We can assess the cause and suggest a fix."
      },
      {
        "q": "Can you match my roof colour?",
        "a": "New gutters and downpipes are available in a range of colours to suit your roof and trims."
      },
      {
        "q": "Do you replace downpipes as well?",
        "a": "Yes. We repair and replace downpipes along with gutters."
      }
    ],
    "related": [
      "roof-leak-repairs",
      "storm-damage-repairs",
      "metal-roofing"
    ],
    "quoteTitle": "Get a quote for *gutter repairs*",
    "formService": "Gutter repair / replacement"
  },
  {
    "slug": "storm-damage-repairs",
    "number": "07",
    "name": "Storm Damage Repairs",
    "menuName": "Storm & Wind Damage Repairs",
    "summary": "Lifted sheets, broken tiles and debris damage made safe and repaired.",
    "icon": "storm",
    "cardImage": "roof-dusk",
    "cardFlip": true,
    "metaTitle": "Storm Damage Roof Repairs Sydney | Wind & Hail Damage | SPR",
    "metaDescription": "Storm damage roof repairs Sydney: lifted sheets, broken tiles, loose flashings and debris damage made safe and repaired properly. Message our team with photos today.",
    "hero": {
      "image": "roof-dusk",
      "alt": "Metal roof edge under a stormy sky",
      "flip": true,
      "kicker": "Wind, rain & hail damage",
      "title": "Storm damage roof repairs *Sydney*",
      "lead": "Sydney storms can lift sheets, crack tiles and tear flashings in minutes. We make your roof safe and repair the damage properly, so it's ready for the next downpour."
    },
    "intro": {
      "title": "Make it safe, then *make it right*",
      "paragraphs": [
        "After a storm, the priority is stopping water getting in. We can provide temporary protection where needed, then carry out permanent repairs once the roof is assessed.",
        "We can also document the damage with photos and a written report, which you can use when talking to your insurer."
      ],
      "signs": [
        {
          "title": "Lifted sheets",
          "text": "Metal sheets or capping lifted or bent by wind."
        },
        {
          "title": "Broken tiles",
          "text": "Cracked or missing tiles after hail or debris."
        },
        {
          "title": "Loose flashing",
          "text": "Flashings pulled away from walls or chimneys."
        },
        {
          "title": "New leaks",
          "text": "Water coming in where it didn't before."
        }
      ]
    },
    "included": [
      {
        "title": "Damage assessment",
        "text": "A full check of the roof after the storm."
      },
      {
        "title": "Temporary protection",
        "text": "Make-safe measures to stop water getting in."
      },
      {
        "title": "Sheet & tile repairs",
        "text": "Damaged sheets and tiles replaced."
      },
      {
        "title": "Flashing repairs",
        "text": "Torn or lifted flashings refixed or replaced."
      },
      {
        "title": "Gutter repairs",
        "text": "Storm-damaged gutters and downpipes fixed."
      },
      {
        "title": "Photo report",
        "text": "Photos and notes you can share with your insurer."
      }
    ],
    "steps": [
      {
        "title": "Message us",
        "text": "Send photos of the damage and your suburb."
      },
      {
        "title": "Assess & make safe",
        "text": "We assess the roof and protect it if needed."
      },
      {
        "title": "Repair quote",
        "text": "A written quote for permanent repairs."
      },
      {
        "title": "Repair properly",
        "text": "We complete the repairs and clean up storm debris."
      }
    ],
    "faqs": [
      {
        "q": "What should I do right after storm damage?",
        "a": "Stay safe and don't climb onto the roof. Take photos from the ground, move belongings away from leaks, and contact us with the photos."
      },
      {
        "q": "Can you help with my insurance claim?",
        "a": "We can provide photos and a written report describing the damage and repairs. Your insurer will advise on their own claims process."
      },
      {
        "q": "Do you repair both tile and metal roofs after storms?",
        "a": "Yes. We repair storm damage on tiled and metal roofs, including flashings and gutters."
      },
      {
        "q": "Can a tree branch damage my roof without me noticing?",
        "a": "Yes. Branches can crack tiles or dent sheets in ways that aren't visible from the ground. If a tree has dropped limbs near your home, a check is worthwhile."
      }
    ],
    "related": [
      "roof-leak-repairs",
      "gutter-repairs",
      "roof-inspections"
    ],
    "quoteTitle": "Get a quote for *storm damage repairs*",
    "formService": "Storm or wind damage"
  },
  {
    "slug": "roof-inspections",
    "number": "08",
    "name": "Roof Inspections",
    "menuName": "Roof Maintenance & Inspections",
    "summary": "Regular check-ups that catch small problems before they get expensive.",
    "icon": "inspect",
    "cardImage": "tile-ridge",
    "cardFlip": false,
    "metaTitle": "Roof Inspections Sydney | Roof Maintenance & Reports | SPR",
    "metaDescription": "Roof inspections Sydney property owners trust: a close-up check of tiles, sheets, flashings and gutters with a photo report. Catch small issues early – book yours.",
    "hero": {
      "image": "tile-ridge",
      "alt": "Close-up inspection of roof ridge capping",
      "flip": false,
      "kicker": "Maintenance & reports",
      "title": "Roof inspections & maintenance *Sydney*",
      "lead": "Most roof problems start small and stay hidden until they cause damage inside. A regular inspection catches them early, when they're quicker and cheaper to fix."
    },
    "intro": {
      "title": "Catch it before *it costs you*",
      "paragraphs": [
        "We check your roof up close: tiles or sheets, ridge capping, valleys, flashings, gutters and downpipes. Where accessible, we also look at the roof space for signs of water.",
        "You receive photos and a clear summary of what we found, what needs attention now, and what can wait. Inspections suit homeowners, buyers, sellers, landlords and strata managers."
      ],
      "signs": [
        {
          "title": "Older roof",
          "text": "A roof that hasn't been checked in years."
        },
        {
          "title": "Buying or selling",
          "text": "Peace of mind before a property sale."
        },
        {
          "title": "After storms",
          "text": "Checking for hidden damage after severe weather."
        },
        {
          "title": "Rental properties",
          "text": "Regular maintenance for landlords and strata."
        }
      ]
    },
    "included": [
      {
        "title": "Roof surface check",
        "text": "Tiles or sheets checked for cracks, rust and movement."
      },
      {
        "title": "Ridge & valleys",
        "text": "Ridge capping, hips and valleys inspected."
      },
      {
        "title": "Flashings",
        "text": "Chimney, skylight and wall flashings checked."
      },
      {
        "title": "Gutters & downpipes",
        "text": "Checked for blockages, rust and leaks."
      },
      {
        "title": "Roof space",
        "text": "Signs of water and damp checked where accessible."
      },
      {
        "title": "Photo report",
        "text": "Photos and a plain-English summary of findings."
      }
    ],
    "steps": [
      {
        "title": "Book a time",
        "text": "Tell us your suburb and the property type."
      },
      {
        "title": "On-site check",
        "text": "We inspect the roof and, where accessible, the roof space."
      },
      {
        "title": "Photo report",
        "text": "You get photos and a clear summary of findings."
      },
      {
        "title": "Plan & quote",
        "text": "If work is needed, we quote it. No pressure."
      }
    ],
    "faqs": [
      {
        "q": "How often should my roof be inspected?",
        "a": "Many owners have their roof checked every one to two years, and after major storms. Older roofs and properties with lots of trees may benefit from more frequent checks."
      },
      {
        "q": "Do I get a report?",
        "a": "Yes. You receive photos and a written summary explaining what we found and what we recommend."
      },
      {
        "q": "Is the inspection useful when buying a house?",
        "a": "Yes. A roof inspection gives you a clearer picture of the roof's condition before you commit. Coming from the team behind Sydney Property Realtor, we know how much it matters."
      },
      {
        "q": "Will you pressure me into repairs?",
        "a": "No. We tell you what needs attention now and what can wait. The decision is yours."
      }
    ],
    "related": [
      "roof-leak-repairs",
      "roof-restoration",
      "commercial-roofing"
    ],
    "quoteTitle": "Get a quote for *roof inspections*",
    "formService": "Maintenance / inspection"
  },
  {
    "slug": "commercial-roofing",
    "number": "09",
    "name": "Commercial Roofing",
    "menuName": "Residential & Commercial Roofing",
    "summary": "Strata buildings, shops and warehouses as well as family homes.",
    "icon": "commercial",
    "cardImage": "roof-plan",
    "cardFlip": false,
    "metaTitle": "Commercial Roofing Sydney | Strata, Retail & Industrial | SPR",
    "metaDescription": "Commercial roofing Sydney businesses and strata managers can count on: repairs, maintenance, metal re-roofs and gutters for shops, offices, warehouses and units. Get a quote.",
    "hero": {
      "image": "roof-plan",
      "alt": "Architectural roof plan drawing",
      "flip": false,
      "kicker": "Residential & commercial",
      "title": "Commercial roofing *Sydney*",
      "lead": "From family homes to strata blocks, shops and warehouses, one team handles it all. We work around your tenants and operations and keep you updated from start to finish."
    },
    "intro": {
      "title": "One team for *every roof*",
      "paragraphs": [
        "Commercial and strata roofs come with extra considerations: access, tenants, safety and scheduling. We plan the work carefully and communicate clearly with property managers, owners and occupants.",
        "Our commercial services cover leak repairs, maintenance programs, metal re-roofing, gutter and box gutter repairs, and storm damage."
      ],
      "signs": [
        {
          "title": "Strata buildings",
          "text": "Units, townhouse complexes and common property."
        },
        {
          "title": "Retail & offices",
          "text": "Shops, shopping strips and office buildings."
        },
        {
          "title": "Industrial",
          "text": "Warehouses, factories and workshops."
        },
        {
          "title": "Landlords",
          "text": "Investment properties and rental portfolios."
        }
      ]
    },
    "included": [
      {
        "title": "Leak repairs",
        "text": "Fast diagnosis and repair to limit disruption."
      },
      {
        "title": "Maintenance plans",
        "text": "Scheduled inspections and preventative maintenance."
      },
      {
        "title": "Metal re-roofing",
        "text": "Replacement of ageing metal roofs."
      },
      {
        "title": "Box gutters",
        "text": "Box gutter repairs, clearing and replacement."
      },
      {
        "title": "Storm repairs",
        "text": "Make-safe and repairs after severe weather."
      },
      {
        "title": "Reporting",
        "text": "Photo reports for owners, managers and strata committees."
      }
    ],
    "steps": [
      {
        "title": "Brief us",
        "text": "Tell us about the property, access and the issue."
      },
      {
        "title": "Site inspection",
        "text": "We inspect and plan access, safety and timing."
      },
      {
        "title": "Detailed quote",
        "text": "A written quote with scope and scheduling."
      },
      {
        "title": "Deliver & report",
        "text": "We complete the work and provide a photo report."
      }
    ],
    "faqs": [
      {
        "q": "Do you work with strata managers?",
        "a": "Yes. We work with strata managers and committees and provide quotes and reports suitable for approval processes."
      },
      {
        "q": "Can you work around our business hours?",
        "a": "We plan work to reduce disruption and will discuss timing and access with you before starting."
      },
      {
        "q": "Do you offer ongoing maintenance?",
        "a": "Yes. We can set up scheduled inspections and maintenance for single properties or portfolios."
      },
      {
        "q": "Do you also do residential roofing?",
        "a": "Yes. We work on homes, townhouses and units as well as commercial buildings."
      }
    ],
    "related": [
      "roof-inspections",
      "metal-roofing",
      "gutter-repairs"
    ],
    "quoteTitle": "Get a quote for *commercial roofing*",
    "formService": "Commercial roofing"
  }
];

export const serviceBySlug = (slug: string) => services.find(s => s.slug === slug);
