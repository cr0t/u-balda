export default class Vocabulary {
  loadWordsData(wordsData) {
    this.wordsData = wordsData;
    this.words = this.wordsData.map((w) => Object.keys(w)[0]);
  }

  exists(word) {
    return this.words.includes(word);
  }
}
