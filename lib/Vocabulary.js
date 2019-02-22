export default class Vocabulary {
  loadWordsData(wordsData) {
    this.wordsData = wordsData;
    this.words = new Set(this._retrieveWords());
    this.characters = this._retrieveAvailableCharacters();
  }

  _retrieveWords() {
    return this.wordsData.map((w) => Object.keys(w)[0]);
  }

  _retrieveAvailableCharacters() {
    let characters = [];

    this.words.forEach(word => {
      word.split('').forEach(c => {
        if (!characters.includes(c)) {
          characters.push(c);
        }
      });
    });

    return characters;
  }

  get availableCharacters() {
    return this.characters;
  }

  exists(word) {
    return this.words.has(word);
  }

  getRandomWord(length) {
    const filteredWords = this.words.filter(w => w.length === length);
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
  }
}
