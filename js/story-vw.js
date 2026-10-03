// Virtual Waiter case study. [[double brackets]] mark the highlighted words.
// Block types: p, img, flow, big, note, versus, keepcut, pair, cards, model, steps, instead
window.STORIES = window.STORIES || {};
const IMG = "assets/projects/virtual-waiter/";
window.STORIES["virtual-waiter"] = {
  base: IMG,
  dims: { "flow.webp": [1260, 760], "onboarding.webp": [1320, 2040], "modals.webp": [1478, 3495], "kanban.webp": [1255, 1470], "orderdetail.webp": [1205, 1390], "amenity.webp": [1215, 1860], "requests.webp": [1245, 1670], "confirm.webp": [1080, 940], "booking-phone.webp": [1190, 2430], "request-received.webp": [530, 800] },
  summary: {
    outcome: "A resort ordering app turned out to be an [[operating system]]. Three shifts made it understandable.",
    problem: "One guest tap triggers a kitchen, runners, providers and managers. The original onboarding asked a resort to configure everything up front, before the product knew what that resort offered.",
    approach: "I stopped shortening forms and started questioning what the system was actually modelling. Each contradiction forced the model to move, until space, item and session became the units, with state connecting the roles.",
  },
  sections: [
    {
      id: "order", n: "01", label: "It started with an order", note: "1 tap, 5 roles. One connected experience.",
      h: "A guest places an order. An entire [[resort]] sees a system.",
      lede: "One simple tap triggers a chain of people, places and decisions.",
      blocks: [
        { t: "img", src: "flow.webp", alt: "Diagram of one live order connecting guest, kitchen, runner, manager, provider and sub-amenity", wide: true },
        { t: "note", text: "And suddenly, the “ordering app” becomes an operating system." },
      ],
    },
    {
      id: "map", n: "02", label: "First, I mapped the mess", note: "Who needs to know what, and when?",
      h: "Before touching the UI, I mapped the [[system]] around one thing.",
      lede: "The interface was only the surface. The real design problem was underneath.",
      blocks: [
        { t: "eyebrow", text: "A request moves through different realities", note: "The order was only the beginning." },
        { t: "flow", chips: [["Guest", "request"], ["Space", "where it happens"], ["Kitchen / Provider", "who fulfils it"], ["Runner / Provider", "handoff"], ["Guest", "outcome"]] },
        { t: "p", text: "A guest needs a different answer from a chef. A runner needs a different state from a provider. The same object couldn’t carry every operational reality equally well." },
        { t: "big", lines: ["The first crack was", "[[onboarding.]]"] },
      ],
    },
    {
      id: "crack", n: "03", label: "The first crack", note: "Why am I asking for this?",
      h: "Seven screens. [[One]] linear path.",
      blocks: [
        { t: "p", text: "The original onboarding asked the resort to configure everything up front, before we knew what the resort actually offered. Every field had a reason. Collectively, the flow treated different capabilities as if they were equally relevant to every resort. The problem wasn’t simply form length. Incomplete onboarding meant an unconfigured product." },
        { t: "img", src: "onboarding.webp", alt: "The original seven-screen resort onboarding flow", pan: true, ar: 1.35, cap: "The original flow: seven screens in one path." },
        { t: "note", text: "The sequence kept expanding because the product was trying to ask about the whole resort before understanding the context of each part of it." },
      ],
    },
    {
      id: "obvious", n: "04", label: "I tried the obvious answers", note: "Cut the branches. Don’t hide the mess.",
      h: "So I tested the [[obvious]] ways out.",
      blocks: [
        { t: "versus", rows: [
          ["#1", "One long form", "More visibility. Less navigation.", "everything looks equally important."],
          ["#2", "Add “Skip”", "More flexibility.", "seven skips are still seven decisions."],
          ["#3", "Configure later", "Less pressure upfront.", "setup can remain incomplete while the product’s commercial state has already moved forward."],
        ] },
        { t: "lead", text: "The billing question changed the UX question." },
        { t: "note", tone: "red", text: "“Do it later” wasn’t a neutral UX choice. It created a business state the system had to understand." },
        { t: "p", text: "If onboarding can be postponed, when is the resort actually ready to be considered active? Starting subscription charges before the resort is genuinely using the service creates a fairness problem; delaying setup also makes activation and revenue harder to track cleanly." },
        { t: "keepcut", keep: ["Contextual setup", "Relevant configuration only", "Clear activation point"], cut: ["Seven-screen module", "Ask users to skip what doesn’t apply", "Leave the system in an undefined “later” state"] },
        { t: "note", text: "I wasn’t shortening a form. I was removing unnecessary system states." },
        { t: "big", lines: ["None of these", "solved the [[model.]]"] },
        { t: "note", ink: true, text: "So I asked a different question: why am I asking a resort to configure things that may not even exist in that space?" },
      ],
    },
    {
      id: "model", n: "05", label: "The business model", note: "Changed the mental model.",
      h: "A resort wasn’t one operational environment.",
      lede: "It could contain a restaurant, spa, pool, bar or other spaces. Each space could have different capabilities, rules and people responsible for them.",
      blocks: [
        { t: "model", root: ["Property", "Resort", "The container"], items: [["Restaurant", "Food · kitchen · menu"], ["Spa", "Amenities · providers"], ["Pool", "Seats · availability"], ["Bar", "Service · hours"]] },
        { t: "pair", arrow: true,
          a: { k: "Before", h: "Resort", p: "show every configuration", q: "“Please decide what applies.”", tone: "red" },
          b: { k: "After", h: "Space", p: "understand capabilities, then configure what applies", q: "“The system already knows the context.”" } },
      ],
    },
    {
      id: "space", n: "06", label: "The space became the unit", note: "Context decides what appears.",
      h: "Instead of configuring a resort, I started configuring [[what exists]] inside it.",
      lede: "If this space has food, show food configuration. If it doesn’t, don’t make the operator configure it just to skip it.",
      blocks: [
        { t: "compare", before: { src: "onboarding.webp", alt: "The original seven-screen onboarding flow, spread across many screens", label: "Before" }, after: { src: "modals.webp", alt: "The final add-a-new-space form, one modal for each space", label: "After" }, cap: "Before: seven screens in one path. After: one form for each space." },
        { t: "img", src: "modals.webp", alt: "The add-a-new-space form in the final onboarding: space details, manager, media, category, billing, timings and facilities", pan: true, cap: "Real product screen: adding a space." },
        { t: "big", lines: ["The space", "became the [[unit.]]"] },
        { t: "note", text: "The form didn’t become shorter by hiding fields. It became shorter by understanding what the space needed." },
      ],
    },
    {
      id: "kitchen", n: "07", label: "Then the order hit the kitchen", note: "Which item is actually late?",
      h: "One order could contain several different operational realities.",
      blocks: [
        { t: "p", text: "Pizza A: 12 min. Pizza B: 28 min. Pizza C: 18 min. The order was one thing to the guest. It wasn’t one thing to the kitchen." },
        { t: "p", text: "An order-level status could look healthy while one item was already becoming the problem. That created a blame loop because the system couldn’t answer the question that mattered: where did the time go?" },
        { t: "pair",
          a: { k: "The tempting simplification", h: "One Kanban card per order.", p: "Fewer cards. A simpler board. But the status hides the item the kitchen actually needs to act on." },
          b: { k: "The useful abstraction", h: "Track the item.", p: "Each item gets its own stage and timing while remaining connected to its parent order." } },
        { t: "img", src: "kanban.webp", alt: "Live orders board where each item moves through queue, preparation, dispatch and delivered", narrow: true },
        { t: "cards", cols: 3, items: [["", "Queue", "What hasn’t started?"], ["", "Preparation", "What’s actively cooking?"], ["", "Timer", "Which exact item is running late?"]] },
        { t: "big", lines: ["The item", "became the [[unit.]]"] },
        { t: "note", text: "The order remained the container. The item became the thing the operation could actually act on." },
      ],
    },
    {
      id: "status", n: "08", label: "Status started mattering", note: "The unit changed. So did the state.",
      h: "Once the unit changed, “status” stopped being decoration.",
      lede: "State had to tell the next role what could happen next.",
      blocks: [
        { t: "flow", chips: [["Queued", "waiting to start"], ["Preparing", "work in progress"], ["Ready", "handoff possible"], ["Delivered", "outcome complete"]] },
        { t: "p", text: "This made the model more useful across roles: the kitchen can act on preparation state, the runner can act on ready state, and operations can see where work is actually slowing down." },
        { t: "img", src: "orderdetail.webp", alt: "Order details with a per-item timeline", narrow: true },
      ],
    },
    {
      id: "amenities", n: "09", label: "The problem changed completely", note: "Now we’re scheduling time.",
      h: "Amenities weren’t about moving an item through a kitchen.",
      lede: "They were about matching a service, a provider, a place and a time.",
      blocks: [
        { t: "p", text: "The product now had to represent sub-amenities, session classifications, provider ownership, customer booking, time windows, price and service location." },
        { t: "img", src: "amenity.webp", alt: "Spa management with a day-by-day slot calendar and colour-coded booking states", narrow: true },
        { t: "h3", text: "The edge case broke the “just automate it” answer." },
        { t: "p", text: "When provider availability, duration, service location, booking changes and cancellations interact, the system can narrow the possibilities, but it should not pretend every ambiguous combination can be resolved safely without a person." },
        { t: "note", tone: "red", text: "Automation should reduce search. It shouldn’t invent certainty." },
        { t: "h3", text: "Let the system narrow. Let a person decide." },
        { t: "flow", chips: [["Request", "incoming intent"], ["System", "finds candidates"], ["Operator", "decides"]] },
        { t: "p", text: "The useful boundary became: automation can find candidates and surface constraints; human confirmation owns the uncertain decision." },
        { t: "duo",
          left: { src: "booking-phone.webp", alt: "Customer booking flow on mobile: pick a session type, a provider, a place, then review the price and request the booking", pan: true, ar: 0.8, cap: "Customer requesting the booking." },
          right: { src: "request-received.webp", alt: "Request received confirmation with an estimated wait time", cap: "Then the system hands the decision to a person." } },
        { t: "img", src: "requests.webp", alt: "Manager view of all amenity booking requests with confirm and reject states", narrow: true, cap: "Manager managing all the booking requests." },
      ],
    },
    {
      id: "session", n: "10", label: "The session became the unit",
      h: "A booking wasn’t just a time slot.",
      lede: "It was a bounded service session with a provider, place, duration, price and state.",
      blocks: [
        { t: "img", src: "confirm.webp", alt: "Booking confirmation and success screens", narrow: true },
        { t: "big", lines: ["The session", "became the [[unit.]]"] },
      ],
    },
    {
      id: "evidence", n: "11", label: "The product evidence",
      h: "These screens aren’t decoration. They’re the trail of the thinking.",
      lede: "The final system makes the discovered abstractions visible: resort → space, order → item, service → session, with state connecting what can happen next.",
      blocks: [
        { t: "cards", cols: 2, items: [
          ["Core equation", "Space is the context.", "The setup flow describes what exists and only then expresses the capabilities that belong there."],
          ["Execution", "Item is the work.", "The kitchen sees the smallest useful unit moving through real operational states."],
          ["Scheduling", "Session is the commitment.", "The amenity floor captures the bounded service that actually occupies time and provider capacity."],
          ["System role", "State tells the next role what can happen.", "Different views can change without breaking the underlying operational model."],
        ] },
      ],
    },
    {
      id: "zoom", n: "12", label: "Zoom out", dark: true,
      h: "Three shifts. One operating model.",
      blocks: [
        { t: "cards", cols: 3, dark: true, items: [
          ["01 · Core equation", "Space", "The resort becomes understandable through the spaces it contains."],
          ["02 · Execution", "Item", "The order becomes actionable through the individual item moving through states."],
          ["03 · Scheduling", "Session", "The service becomes schedulable through a bounded session with real constraints."],
        ] },
        { t: "state", left: "State", right: "defines what can happen next" },
      ],
    },
    {
      id: "process", n: "13", label: "The design process wasn’t linear", note: "Not a recipe. An investigation.",
      h: "The problems didn’t arrive neatly. So the process couldn’t either.",
      lede: "There wasn’t a clean Research → Ideate → Design → Test sequence. Each operational contradiction forced the model to move.",
      blocks: [
        { t: "steps", items: [
          ["01", "Question", "Something doesn’t make sense."], ["02", "Investigate", "Map roles, dependencies and constraints."],
          ["03", "Challenge", "What assumption are we making?"], ["04", "Break", "Find the edge case."],
          ["05", "Explore", "Try multiple possible models."], ["06", "Choose", "Pick the model that represents reality."],
          ["07", "Validate", "See where the model holds, and where it breaks again."], ["08", "Systemize", "Turn the learning into a reusable product rule."],
        ] },
      ],
    },
    {
      id: "changed", n: "14", label: "What changed",
      h: "The biggest changes weren’t visual. They were [[conceptual.]]",
      blocks: [
        { t: "instead", rows: [
          ["How can we make this screen simpler?", "What complexity actually belongs here?"],
          ["How can we add automation?", "What can the system confidently decide?"],
          ["How can we shorten the form?", "What are we actually configuring?"],
          ["How do we track the order?", "What actually moves through the operation?"],
        ] },
      ],
    },
    {
      id: "final", n: "15", label: "The final shift",
      h: "Virtual Waiter started as a product with many screens.",
      lede: "But the deeper work was deciding what each screen represented. Complexity doesn’t always need to disappear. It needs to live at the right level, for the right person, at the right moment.",
      blocks: [
        { t: "note", text: "I didn’t simplify the resort. I simplified the way the system understood it." },
        { t: "big", lines: ["Space.", "Item.", "[[Session.]]"] },
      ],
    },
  ],
};
