function touch() {
  const says = ["呼嚕呼嚕～"];
  return says[Math.floor(Math.random() * says.length)];
}

function eat() {
  const says = ["好ㄘ~", "（嚼嚼嚼", "還要還要~"];
  return says[Math.floor(Math.random() * says.length)];
}

const PetSpeak = { touch: () => touch(), eat: () => eat() };

export default PetSpeak;
