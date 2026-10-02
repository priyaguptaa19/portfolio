// RentzGo case study. [[double brackets]] mark the highlighted words.
window.STORIES = window.STORIES || {};
window.STORIES["rentzgo"] = {
  base: "assets/projects/rentzgo/",
  wide: true,
  dims: {"reality.webp":[1376,768],"personas.webp":[1376,768],"competitors.webp":[1376,768],"architecture.webp":[1376,768],"ssn.webp":[1376,768],"referral.webp":[1376,768],"tip.webp":[1376,768],"edgecases.webp":[1376,768],"result.webp":[1376,768],"notebook.webp":[1800,1531],"ia-tree.webp":[960,1900],"flow-ssn.webp":[1170,2640],"sketch-tenant.webp":[1800,715],"sketch-owner.webp":[1800,1761],"sketch-common.webp":[1800,1723],"sketch-admin.webp":[1780,1185],"screens-referral.webp":[1800,889],"screens-moveout.webp":[1800,1174]},
  summary: {
    outcome: "One rental platform for [[four kinds of people]] who rarely agree: tenants, landlords, service partners and admins.",
    problem: "Renting looks simple until it doesn\u2019t. Verification, payments, referrals and move-out all have to work for people with different goals, and too many things can go wrong.",
    approach: "I talked to real users, mapped what each role needs, designed one information architecture for all of them, and solved the sequence of flows before the screens.",
  },
  sections: [
    {
      id: "reality", n: "01", label: "The reality", note: "Different people. Different expectations. Too many things can go wrong.",
      h: "Renting looks simple, [[until it doesn\u2019t.]]",
      blocks: [{ t: "img", src: "reality.webp", alt: "Illustration of tenants, a landlord and a service partner voicing the problems: a property that is not available after payment, a deposit cut with no proof, an SSN request, unclear referral points, a fixed tip option and no move-out checklist" }],
    },
    {
      id: "people", n: "02", label: "Understanding the people", note: "I started by talking to real users and stakeholders.",
      h: "Different people. [[Different goals.]]",
      lede: "I mapped what each role actually needs before designing anything.",
      blocks: [
        { t: "img", src: "personas.webp", alt: "Four roles: Tenant, Landlord, Service Partner and Admin, each with a one-line goal" },
        { t: "img", src: "notebook.webp", alt: "Handwritten notes with three personas (a tenant, an owner and an admin) and their goals, pain points, needs and behaviours", cap: "Handwritten notes after talking to real users." },
      ],
    },
    {
      id: "competitors", n: "03", label: "Competitive analysis", note: "The opportunity was in the gaps between them.",
      h: "Everyone solved a [[piece]] of the rental journey.",
      blocks: [{ t: "img", src: "competitors.webp", alt: "Airbnb for trust signals and bookings, Zillow for property discovery, Avail for lease and document tooling, Buildium for property management and Apartments.com as a rental marketplace" }],
    },
    {
      id: "ia", n: "04", label: "Information architecture", note: "Same system, different responsibilities.",
      h: "One product. [[Different journeys.]]",
      blocks: [
        { t: "img", src: "architecture.webp", alt: "Journeys per role. Tenant: discover, apply, pay, manage. Landlord: list, tenants, payments, maintenance. Service Partner: verify, get jobs, earn, tips. Admin: users, verification, disputes, oversight" },
        { t: "h3", text: "The real information architecture of the platform." },
        { t: "duo2",
          left: { src: "ia-tree.webp", alt: "Sitemap of the platform for Tenant, Owner, Handyman and Admin roles", cap: "Information architecture.", pan: true, ar: 0.8, arm: 0.8 },
          right: { src: "flow-ssn.webp", alt: "SSN verification flow with approval, rejection and a 48-hour pending state", cap: "SSN verification flow.", pan: true, ar: 0.8, arm: 0.8 } },
      ],
    },
    {
      id: "flows", n: "05", label: "Flows and wireframes", note: "Sequence first, screens second.",
      h: "I solved the sequence [[before the screens.]]",
      lede: "Paper first, for every role.",
      blocks: [
        { t: "gallery", items: [
          { src: "sketch-tenant.webp", alt: "Hand-drawn tenant app flow and wireframes", cap: "Tenant app flow" },
          { src: "sketch-owner.webp", alt: "Hand-drawn owner app flow and wireframes", cap: "Owner app flow" },
          { src: "sketch-common.webp", alt: "Hand-drawn common app flow and wireframes", cap: "Common app flow" },
          { src: "sketch-admin.webp", alt: "Hand-drawn admin flow and wireframes", cap: "Admin flow" },
        ] },
      ],
    },
    {
      id: "ssn", n: "06", label: "SSN verification",
      h: "Identity was [[part of the product logic.]]",
      blocks: [
        { t: "img", src: "ssn.webp", alt: "A user asking why an SSN is needed, next to a four-step verify-identity card: personal details, SSN verification, background check, complete" },
        { t: "note", text: "SSN verification is needed to confirm your identity and prevent fraud or unauthorized access. It helps ensure that the information or account belongs to the right person." },
      ],
    },
    {
      id: "referral", n: "07", label: "Referral and point logic", note: "Different roles, different motivations.",
      h: "Same action, [[different rewards.]]",
      blocks: [
        { t: "img", src: "referral.webp", alt: "Referral reward table: tenant 500 points, landlord 300 points, service partner 200 dollars cash, agent 250 points" },
        { t: "p", text: "We introduced role-based referral rewards, cash and points, to turn service providers into active growth partners." },
        { t: "img", src: "screens-referral.webp", alt: "Refer now, earn rewards and wallet screens in the app", cap: "Referral and wallet screens." },
      ],
    },
    {
      id: "tipping", n: "08", label: "Tipping decision",
      h: "A small interaction. [[A real product discussion.]]",
      blocks: [
        { t: "img", src: "tip.webp", alt: "A developer suggests keeping only a custom tip; the designer argues that users should not have to calculate it and wants helpful options first" },
        { t: "p", text: "I introduced both percentage-based and custom tipping to make the decision effortless. Percentage options automatically scale with the bill amount, while custom tipping gives users control when they want it, reducing cognitive load and creating a more flexible, fair tipping experience for service providers." },
      ],
    },
    {
      id: "moveout", n: "09", label: "Move-out and consent", note: "Silence is not consent.",
      h: "A proposal isn\u2019t an [[agreement.]]",
      blocks: [
        { t: "img", src: "screens-moveout.webp", alt: "Move-out management in three states: in progress, accepted and completed, and disputed" },
      ],
    },
    {
      id: "edge", n: "10", label: "Edge cases", note: "I mapped and designed for all the messy scenarios.",
      h: "The happy path was [[the easy part.]]",
      blocks: [{ t: "img", src: "edgecases.webp", alt: "Sticky notes of edge cases: property unavailable after payment, role switch after earning a reward, unverified identity, damage dispute without proof, wallet balance confusion, no move-out consent, no in-out-move content" }],
    },
    {
      id: "result", n: "11", label: "The result", dark: true,
      h: "One rental experience, [[multiple measurable opportunities.]]",
      lede: "A clearer journey for everyone.",
      blocks: [
        { t: "cards", cols: 2, dark: true, stat: true, items: [
          ["", "-30%", "fewer steps across key booking flows."],
          ["", "+25%", "projected referral participation through role-based rewards."],
          ["", "-40%", "less cognitive effort with simplified tipping and payment choices."],
          ["", "+20%", "more provider earning opportunities through referrals, tips and rewards."],
        ] },
        { t: "img", src: "result.webp", alt: "Tenant, landlord, service partner and admin working together in one room under a RentzGo sign" },
      ],
    },
  ],
};
