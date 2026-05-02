export const predefinedTags = [
  "🌸 Unsaid Love",
  "🌧️ I Miss You",
  "🥀 It Hurt Me",
  "🕊️ Letting Go",
  "💌 Still You",
  "🙏 I'm Sorry",
  "🌻 To Family",
  "✨ To The Universe",
  "💭 General",
];

export const defaultTag = "💭 General";

export function getTagValue(tag) {
  return tag?.trim() || defaultTag;
}

export function isPredefinedTag(tag) {
  const tagValue = getTagValue(tag);

  return tagValue.toLowerCase() === "general" || predefinedTags.includes(tagValue);
}
