require 'csv'
require 'json'

INPUT  = './freqrnc2011/freqrnc2011.csv'
OUTPUT = '../2011freq.json' # format: [{lemma => [lemma.length, lemma.freq]},...]
NOUN   = 's'

nouns_count = 0
nouns = []

CSV.foreach(INPUT, col_sep: "\t") do |row|
  lemma, pos, freq, r, d, doc = row

  if pos == NOUN
    if lemma.length >= 2 && !lemma.include?('-')
      nouns_count += 1
      nouns.push({lemma => [lemma.length, freq.to_f]})
    end
  end
end

File.write(OUTPUT, nouns.to_json)

puts "Totally prepared #{nouns_count} nouns"
