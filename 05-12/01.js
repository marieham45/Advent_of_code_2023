const sampleData = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

// helpers
const splitIntoLines = (str) => str.split("\n");

const [
  seeds,
  seedToSoil,
  soilToFertilizer,
  fertilizerToWater,
  waterToLight,
  lightToTemperature,
  temperatureToHumidity,
  humidityToLocation,
] = sampleData.split("\n\n");

const seedsData = seeds.split(": ")[1].split(" ").map(Number);

const getMap = (str) => splitIntoLines(str).slice(1);

const seedToSoilMap = getMap(seedToSoil);
const soilToFertilizerMap = getMap(soilToFertilizer);
const fertilizerToWaterMap = getMap(fertilizerToWater);
const waterToLightMap = getMap(waterToLight);
const lightToTemperatureMap = getMap(lightToTemperature);
const temperatureToHumidityMap = getMap(temperatureToHumidity);
const humidityToLocationMap = getMap(humidityToLocation);

const getMapped = (input, map) => {
  let result = input;
  for (let i = 0; i < map.length; i++) {
    const [destinationStart, sourceStart, range] = map[i]
      .split(" ")
      .map(Number);

    if (input < sourceStart || input > sourceStart + range - 1) {
      continue;
    } else {
      result = destinationStart + (input - sourceStart);
    }
  }
  return result;
};

const locationData = seedsData
  .map((item) => getMapped(item, seedToSoilMap))
  .map((item) => getMapped(item, soilToFertilizerMap))
  .map((item) => getMapped(item, fertilizerToWaterMap))
  .map((item) => getMapped(item, waterToLightMap))
  .map((item) => getMapped(item, lightToTemperatureMap))
  .map((item) => getMapped(item, temperatureToHumidityMap))
  .map((item) => getMapped(item, humidityToLocationMap));

console.log(Math.min(...locationData));
