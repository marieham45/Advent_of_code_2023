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

const getPairs = (arr) => {
  const seedsDataPairs = [];
  for (let i = 0; i < arr.length; i = i + 2) {
    const pair = [arr[i], arr[i] + arr[i + 1] - 1];
    seedsDataPairs.push(pair);
  }

  return seedsDataPairs;
};

const getMap = (str) => splitIntoLines(str).slice(1);

const seedToSoilMap = getMap(seedToSoil);
const soilToFertilizerMap = getMap(soilToFertilizer);
const fertilizerToWaterMap = getMap(fertilizerToWater);
const waterToLightMap = getMap(waterToLight);
const lightToTemperatureMap = getMap(lightToTemperature);
const temperatureToHumidityMap = getMap(temperatureToHumidity);
const humidityToLocationMap = getMap(humidityToLocation);

const getMapped = (input, map) => {
  const result = [];
  const getMapping = (arr, iteration) => {
    const [seed, seedEnd] = arr;

    for (let i = iteration; i < map.length; i++) {
      const [destinationStart, sourceStart, range] = map[i]
        .split(" ")
        .map(Number);

      let newStartValue = 0;
      let newEndValue = 0;

      if (seed > sourceStart + range - 1 || seedEnd < sourceStart) {
        if (i === map.length - 1) {
          result.push([seed, seedEnd]);
        }
      } else if (
        seed >= sourceStart &&
        seed <= sourceStart + range - 1 &&
        seedEnd <= sourceStart + range - 1 &&
        seedEnd >= sourceStart
      ) {
        newStartValue = destinationStart + (seed - sourceStart);
        newEndValue = destinationStart + (seedEnd - sourceStart);
        result.push([newStartValue, newEndValue]);

        break;
      } else {
        if (seed < sourceStart && seedEnd > sourceStart + range - 1) {
          newStartValue = destinationStart;
          newEndValue = destinationStart + range - 1;
          result.push([newStartValue, newEndValue]);

          getMapping([seed, sourceStart - 1], iteration + 1);
          getMapping([sourceStart + range, seedEnd], iteration + 1);
        } else if (seed >= sourceStart && seedEnd > sourceStart + range - 1) {
          newStartValue = destinationStart + (seed - sourceStart);
          newEndValue = newStartValue + range - 1;
          result.push([newStartValue, newEndValue]);

          getMapping([sourceStart + range, seedEnd], iteration + 1);
        } else {
          newStartValue = destinationStart;
          newEndValue = destinationStart + (seedEnd - sourceStart);
          result.push([newStartValue, newEndValue]);

          getMapping([seed, sourceStart - 1], iteration + 1);
        }
      }
    }
  };
  for (n = 0; n < input.length; n++) {
    getMapping(input[n], 0);
  }
  return result;
};

const pairs = getPairs(seedsData);
const mappedToSoil = getMapped(pairs, seedToSoilMap);
const mappedToFertilizer = getMapped(mappedToSoil, soilToFertilizerMap);
const mappedToWater = getMapped(mappedToFertilizer, fertilizerToWaterMap);
const mappedToLight = getMapped(mappedToWater, waterToLightMap);
const mappedToTemperature = getMapped(mappedToLight, lightToTemperatureMap);
const mappedToHumidity = getMapped(
  mappedToTemperature,
  temperatureToHumidityMap
);
const mappedToLocation = getMapped(mappedToHumidity, humidityToLocationMap);

console.log(Math.min(...mappedToLocation.map((item) => item[0])));
