export default class Vocabulary {
  loadWordsData(wordsData) {
    this.wordsData = wordsData;
    this.words = this.wordsData.map((w) => Object.keys(w)[0]);
  }

  exists(word) {
    return this.words.includes(word);
  }

  getRandomWord(length) {
    const filteredWords = this.words.filter(w => w.length === length);
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
  }
}
