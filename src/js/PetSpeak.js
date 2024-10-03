function touch() {
  const says = ["呼嚕呼嚕～"];
  return says[Math.floor(Math.random() * says.length)];
}

function feed() {
  const says = ["好ㄘ～", "（嚼嚼嚼"];
  return says[Math.floor(Math.random() * says.length)];
}

const PetSpeak = { touch: () => touch(), feed: () => feed() };

export default PetSpeak;
