function touch() {
  const says = ["呼嚕呼嚕～", "叮叮叮叮"];
  return says[Math.floor(Math.random() * (says.length + 1))];
}

const petSpeak = { touch: touch() };

export default petSpeak;
