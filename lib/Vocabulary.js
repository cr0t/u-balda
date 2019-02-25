export default class Vocabulary {
  loadWordsData(wordsData) {
    this.wordsData = wordsData;
    this.words = new Set(this._retrieveWords());
    this.characters = this._retrieveAvailableCharacters();
    this.prefixes = new Set(this._retrieveWordPrefixes(2));
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

  _retrieveWordPrefixes(length) {
    let prefixes = [];
    this.words.forEach(word => {
      prefixes.push(word.slice(0, length));
    });
    return prefixes;
  }

  get availableCharacters() {
    return this.characters;
  }

  get availablePrefixes() {
    return this.prefixes;
  }

  exists(word) {
    return this.words.has(word);
  }

  getRandomWord(length) {
    const filteredWords = Array.from(this.words).filter(w => w.length === length);
    return filteredWords[Math.floor(Math.random() * filteredWords.length)];
  }

  getLongestWord() {
    return Array.from(this.words).reduce((a, b) => a.length < b.length ? a : b);
  }
}
