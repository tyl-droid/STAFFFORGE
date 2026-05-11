function personalizeAnswer({ serverName, serverDescription, baseAnswer }) {
  const name = serverName || "this server";
  const desc = (serverDescription || "").toLowerCase();

  let focus = "community safety, fairness, and player support";

  if (desc.includes("lifesteal")) focus = "competitive fairness, rule enforcement, and handling conflict calmly";
  if (desc.includes("skyblock")) focus = "helping players with progression, economy questions, and community support";
  if (desc.includes("survival") || desc.includes("smp")) focus = "community trust, grief prevention, and welcoming new players";
  if (desc.includes("minigame")) focus = "fast support, consistency, and handling reports across active games";
  if (desc.includes("roleplay")) focus = "respectful communication, rule clarity, and protecting immersion";

  return `${baseAnswer}

For ${name}, I would especially focus on ${focus}. I would make sure to represent the server professionally, follow staff procedures, and support both new and experienced players.`;
}

module.exports = { personalizeAnswer };
