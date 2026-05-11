(async () => {
  const res = await fetch("http://localhost:5000/api/profile");
  const profile = await res.json();

  const answerBank = {
    minecraftUsername: profile.minecraft_username || "Vitalisyonmc868",
    discord: profile.discord || "@nexi_csn",
    age: profile.age || "18",
    timezone: profile.timezone || "United Kingdom, Europe/London",
    languages: "English",
    pastUsernames: "None",
    banned: "",
    previousApplications: "No previous applications.",
    availability: profile.availability || "Most evenings and weekends.",

    whyStaff:
      "I would like to become staff because I enjoy supporting players and helping communities stay safe, fair, and welcoming. I have previous moderation experience and understand how important it is to stay calm, professional, and respectful when handling reports, questions, or conflicts. I want to help new players, answer questions, support the staff team, and make sure everyone has a positive experience. I also understand that staff members must follow procedures, collect evidence when needed, avoid bias, and represent the server properly. I am willing to learn from senior staff, accept feedback, and improve over time.",

    experience:
      profile.experience ||
      "Previous Minecraft and forum moderation experience, plus Community Shield Network leadership.",

    asset:
      "I would be an asset to the staff team because I am reliable, mature, and serious about helping the community. I can help with reports, answer player questions, de-escalate arguments, and support fair rule enforcement. I also understand the importance of evidence, professionalism, teamwork, and not abusing permissions.",

    strengthsWeaknesses:
      "My strengths are communication, patience, fairness, and staying calm during difficult situations. I am good at listening to both sides before making a decision. My weaknesses are that I can sometimes overthink situations and may ask extra questions to make sure I understand something correctly. I am working on being more confident while still following staff procedures.",

    hacker:
      "I would gather evidence, avoid publicly accusing the player, and follow the server punishment process. If I had permission to act, I would issue the correct punishment. If not, I would report it to higher staff.",

    argument:
      "I would stay calm, avoid taking sides, listen to both players, check evidence if needed, and remind everyone of the rules. If the issue continued, I would escalate it or apply the correct action based on staff guidelines.",

    abusivePlayer:
      "I would stay professional, remind the player of the rules, and avoid escalating the situation. If the behaviour continued, I would collect evidence and follow the server punishment guidelines.",

    favorite:
      "My favorite thing is the community-focused environment, the variety of gamemodes, and the chance to meet and help different players.",

    gamemodes: "Survival / SMP / Oneblock / community gamemodes",

    anythingElse:
      "I am willing to learn, follow staff procedures, and take feedback from senior staff."
  };

  const questionMap = [
    {
      key: "minecraftUsername",
      patterns: [
        "minecraft username",
        "minecraft name",
        "ign",
        "in-game name",
        "ingame name",
        "mc username",
        "java username",
        "bedrock username"
      ]
    },
    {
      key: "pastUsernames",
      patterns: [
        "past usernames",
        "former usernames",
        "previous usernames",
        "old usernames",
        "name history",
        "past names"
      ]
    },
    {
      key: "age",
      patterns: [
        "how old are you",
        "your age",
        "age"
      ]
    },
    {
      key: "discord",
      patterns: [
        "discord username",
        "discord tag",
        "discord name",
        "discord",
        "contact discord"
      ]
    },
    {
      key: "timezone",
      patterns: [
        "timezone",
        "time zone",
        "location",
        "country",
        "where are you from",
        "state/province"
      ]
    },
    {
      key: "languages",
      patterns: [
        "languages",
        "language(s)",
        "what language",
        "fluent"
      ]
    },
    {
      key: "gamemodes",
      patterns: [
        "gamemode",
        "game mode",
        "most active on",
        "what do you play",
        "which server do you play",
        "main mode"
      ]
    },
    {
      key: "banned",
      patterns: [
        "ever been banned",
        "have you been banned",
        "punishment history",
        "mute history",
        "warn history",
        "infractions",
        "blacklisted"
      ]
    },
    {
      key: "previousApplications",
      patterns: [
        "previous applications",
        "applied before",
        "last application",
        "how many applications",
        "have you applied"
      ]
    },
    {
      key: "availability",
      patterns: [
        "availability",
        "how often",
        "hours per week",
        "active each week",
        "how active",
        "weekly activity",
        "schedule",
        "when can you be online"
      ]
    },
    {
      key: "whyStaff",
      patterns: [
        "why do you want",
        "why would you like",
        "why are you applying",
        "why helper",
        "why staff",
        "become helper",
        "become staff",
        "join the staff team",
        "join our team",
        "motivation for applying"
      ]
    },
    {
      key: "asset",
      patterns: [
        "why should we choose",
        "why should you be accepted",
        "why should we accept",
        "asset to the staff team",
        "benefit the staff team",
        "what makes you different",
        "why you over others"
      ]
    },
    {
      key: "experience",
      patterns: [
        "previous experience",
        "moderation experience",
        "staff experience",
        "leadership experience",
        "have you been staff",
        "past experience",
        "experience as staff"
      ]
    },
    {
      key: "strengthsWeaknesses",
      patterns: [
        "strengths and weaknesses",
        "strengths",
        "weaknesses",
        "pros and cons",
        "your flaws",
        "your qualities"
      ]
    },
    {
      key: "hacker",
      patterns: [
        "hacker",
        "cheater",
        "xray",
        "x-ray",
        "fly hack",
        "kill aura",
        "killaura",
        "reach",
        "anti knockback",
        "illegal client"
      ]
    },
    {
      key: "argument",
      patterns: [
        "argument",
        "conflict",
        "players arguing",
        "two players",
        "dispute",
        "drama",
        "fight between players"
      ]
    },
    {
      key: "abusivePlayer",
      patterns: [
        "toxic",
        "harassment",
        "abusive",
        "rude player",
        "insulting",
        "racism",
        "slurs",
        "bullying"
      ]
    },
    {
      key: "favorite",
      patterns: [
        "favorite thing",
        "favourite thing",
        "favorite memory",
        "favourite memory",
        "what do you like",
        "why do you like this server"
      ]
    },
    {
      key: "anythingElse",
      patterns: [
        "anything else",
        "additional information",
        "extra information",
        "anything we should know",
        "final notes",
        "other comments"
      ]
    }
  ];

  function clean(text) {
    return (text || "")
      .toLowerCase()
      .replace(/[^\w\s\-\/]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getQuestionText(field) {
    const label = field.id
      ? document.querySelector(`label[for="${field.id}"]`)?.innerText || ""
      : "";

    const aria = field.getAttribute("aria-label") || "";
    const placeholder = field.placeholder || "";
    const name = field.name || "";
    const id = field.id || "";

    const wrapper =
      field.closest("dl, li, fieldset, .formRow, .form-row, .form-group, div") ||
      field.parentElement;

    const wrapperText = wrapper?.innerText || "";

    return clean(`${label} ${aria} ${placeholder} ${name} ${id} ${wrapperText}`);
  }

  function shouldSkip(field, q) {
    const type = (field.type || "").toLowerCase();

    return (
      type === "hidden" ||
      type === "password" ||
      type === "file" ||
      type === "checkbox" ||
      type === "radio" ||
      type === "submit" ||
      type === "button" ||
      type === "date" ||
      q.includes("password") ||
      q.includes("email") ||
      q.includes("captcha") ||
      q.includes("verification code") ||
      q.includes("2fa")
    );
  }

  function scoreQuestion(q, patterns) {
    let score = 0;

    for (const pattern of patterns) {
      const p = clean(pattern);

      if (q.includes(p)) {
        score += p.length > 10 ? 10 : 6;
      }

      const words = p.split(" ").filter(Boolean);
      for (const word of words) {
        if (word.length > 3 && q.includes(word)) {
          score += 1;
        }
      }
    }

    return score;
  }

  function findBestAnswer(q) {
    let best = null;

    for (const item of questionMap) {
      const score = scoreQuestion(q, item.patterns);

      if (!best || score > best.score) {
        best = {
          key: item.key,
          score
        };
      }
    }

    if (!best || best.score < 6) return null;

    return {
      key: best.key,
      answer: answerBank[best.key],
      score: best.score
    };
  }

  function setValue(field, value) {
    if (value === undefined || value === null) return;

    field.focus();
    field.value = value;
    field.dispatchEvent(new Event("input", { bubbles: true }));
    field.dispatchEvent(new Event("change", { bubbles: true }));
    field.blur();
  }

  const fields = Array.from(document.querySelectorAll("input, textarea")).filter(
    (field) => !field.disabled && !field.readOnly
  );

  let filled = 0;
  const matched = [];

  fields.forEach((field) => {
    const q = getQuestionText(field);

    if (shouldSkip(field, q)) return;
    if (field.value.trim() !== "") return;

    const result = findBestAnswer(q);

    if (!result) return;

    setValue(field, result.answer);
    filled++;

    matched.push({
      question: q.slice(0, 80),
      answerType: result.key,
      score: result.score
    });
  });

  console.table(matched);
  alert(`StaffForge Question Finder complete. Filled ${filled} field(s). Review before submitting.`);
})();