// Nexus case study. [[double brackets]] mark the highlighted words.
window.STORIES = window.STORIES || {};
window.STORIES["nexus"] = {
  base: "assets/projects/nexus/",
  wide: true,
  dims: {"s0.webp":[1440,1024],"s1.webp":[1440,1024],"s2.webp":[1440,1024],"s3.webp":[1440,1182],"s4.webp":[1440,1223],"s7.webp":[1440,1182],"s8.webp":[1440,1223]},
  summary: {
    outcome: "A research system that turns questions into evidence, execution and actionable insights, while keeping the [[researcher in control]].",
    problem: "Research is messy. Everything the researcher needed already existed, but the relationship between the pieces didn’t.",
    approach: "I designed the thinking first: one research loop, four moments, and states for waiting, failing and reviewing. Then the screens followed.",
  },
  sections: [
    {
      id: "start", n: "01", label: "The starting point", note: "Everything existed. The relationship didn’t.",
      h: "Six things. One system. [[Not another dashboard.]]",
      lede: "Nexus was not a screen-design problem. It was a thinking-system problem.",
      blocks: [
        { t: "cards", cols: 3, items: [
          ["01", "Persona", "who are we learning for?"],
          ["02", "Data", "what do we know?"],
          ["03", "Task", "what are we running?"],
          ["04", "Agents", "what can the system do?"],
          ["05", "Failure", "what if it breaks?"],
          ["06", "Output", "what becomes knowledge?"],
        ] },
        { t: "note", text: "One research loop. A system that knows what comes next." },
      ],
    },
    {
      id: "question", n: "02", label: "The question", note: "Where does a researcher actually begin?",
      h: "Not with a tab. Not with a dashboard. [[With a question]] that still has missing pieces.",
      blocks: [
        { t: "flow", chips: [["Context", "who is asking"], ["Evidence", "what it can use"], ["Capability", "who does the work"], ["Judgement", "what to keep"]] },
      ],
    },
    {
      id: "ai", n: "03", label: "The AI layer", note: "Co-research, not chat.",
      h: "The researcher doesn’t open a chatbot. [[The chatbot becomes part of the research.]]",
      lede: "The conversation is the entry point. The workspace remembers the persona, sources, task and agents, so the researcher moves from asking to investigating without starting over.",
      blocks: [
        { t: "flow", chips: [["Ask", "the question"], ["Clarify", "what is missing"], ["Set context", "persona, sources"], ["Run", "agents work"], ["Review", "human decides"]] },
        { t: "img", src: "s1.webp", alt: "The AI agent greeting the researcher and asking for a data file", cap: "AI carries the context from question to evidence to execution." },
      ],
    },
    {
      id: "model", n: "04", label: "The product model", note: "This became the information architecture.",
      h: "A question goes in. [[A research engine comes alive.]]",
      blocks: [
        { t: "model", root: ["The research question", "Chat", "then I could design the screen."], items: [["Context", "Persona + intent"], ["Evidence", "Data + sources"], ["Execution", "Agents + task"], ["Judgement", "Review + decision"]] },
      ],
    },
    {
      id: "contract", n: "05", label: "The interface contract", note: "Same question, different system state.",
      h: "One system. [[Four moments.]]",
      blocks: [
        { t: "steps", items: [["01", "Prepare", "Can I start?"], ["02", "Configure", "What am I asking?"], ["03", "Execute", "What is happening?"], ["04", "Review", "What do I trust?"]] },
        { t: "note", text: "Human judgement stays in the loop." },
      ],
    },
    {
      id: "screens", n: "06", label: "The screens", note: "Same chat, same canvas. Only what the system knows changes.",
      h: "And suddenly, the screens made sense. [[Five states of one run.]]",
      blocks: [
        { t: "duo2", left: { src: "s0.webp", alt: "Entry: choose a persona, just chat or co-research", cap: "Entry" }, right: { src: "s2.webp", alt: "Ready: data file uploaded", cap: "Ready" } },
        { t: "duo2", left: { src: "s3.webp", alt: "Configure: workflow configuration with persona, task type, data source and agents", cap: "Configure" }, right: { src: "s7.webp", alt: "Run: pipeline execution with progress", cap: "Run" } },
        { t: "img", src: "s8.webp", alt: "Review: Q3 market analysis report with Refine by Prompt and Save to insights", cap: "Review" },
      ],
    },
    {
      id: "failure", n: "07", label: "The interruption", note: "The system needed a way to say “not yet.”",
      h: "A failed run shouldn’t erase the user’s work. [[Retry preserved the setup.]]",
      blocks: [
        { t: "img", src: "s4.webp", alt: "Error state with Retry and Edit setup actions", cap: "Error, with a way forward." },
        { t: "cards", cols: 3, items: [
          ["Retry", "Same setup", "For a failure that may not happen twice. The run starts again from execute."],
          ["Edit setup", "Fix the cause", "For a failure that came from the setup. Sends the researcher back to change that decision."],
          ["Before any of this", "Inline errors", "Invalid parameters raise an error at configure, so the pipeline never starts on a bad setup."],
        ] },
        { t: "p", text: "Run failed shows an error log. That is the whole contract: say what happened, and give the researcher somewhere to go." },
      ],
    },
    {
      id: "review", n: "08", label: "The review", note: "Nothing gets locked in until the researcher approves it.",
      h: "The AI generates. [[The researcher decides.]]",
      lede: "Review isn’t the last decorative screen. It is where generated output can become approved knowledge.",
      blocks: [
        { t: "cards", cols: 2, items: [
          ["", "Check sources", "The researcher looks over what the AI produced and checks its citations."],
          ["", "Re-run", "Loops back to configure, so settings can be tweaked and tried again."],
          ["", "Save to insights", "A reusable card. Duplicates and tags are checked."],
          ["", "Exit", "Saves nothing, and leaves."],
        ] },
      ],
    },
    {
      id: "scale", n: "09", label: "The scale", note: "Same intelligence, different intent.",
      h: "One engine. [[Eight ways to think.]]",
      lede: "Different questions, different agents, same product grammar and the same human judgement.",
      blocks: [
        { t: "cards", cols: 4, items: [["01", "Behavioral", "why people act"], ["02", "Brand", "how it is seen"], ["03", "Creative", "what to make"], ["04", "CX", "how it feels"], ["05", "Data", "what the numbers say"], ["06", "Segmentation", "who is who"], ["07", "Campaign", "what to launch"], ["08", "Innovation", "what comes next"]] },
      ],
    },
    {
      id: "takeaway", n: "10", label: "The takeaway", dark: true,
      h: "We didn’t design an AI chatbot. [[We designed a research system]] that can think with you, without taking the decision away from you.",
      blocks: [
        { t: "steps", items: [["01", "Intent", "what are we trying to know?"], ["02", "Context", "who and what does the system know?"], ["03", "Agents", "who does the work?"], ["04", "Evidence", "what came back?"], ["05", "Judgement", "what should we keep?"]] },
        { t: "big", lines: ["Structure before surface.", "AI states must be visible.", "Failure needs a way forward.", "Human [[judgement]] stays in the loop."] },
        { t: "p", text: "The interface was the visible layer. The thinking underneath it was the product." },
      ],
    },
  ],
};
