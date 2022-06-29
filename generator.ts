/*
Biomes
- aquatic
  - lake / pond (hold off on rivers)
    - Touches: grassland, forest, tundra
  - oaisis
    - Touches: desert
- grassland
  - prarie
    - Touches: aquatic_lake, grassland, forest, tundra, deser_semi-arid
  - silvopasture
    - Touches: prarie, lake, forest, tundra
- forest
  - temperate
    - Touches: lake, prarie, silvopasture, boreal
  - boreal
    - Touches: lake, temperate forest, grassland, tundra
- desert
  - dunes
    - Touches: semi-arid, oaisis
  - semi-arid
    - Touches: dunes, prarie, oaisis, silvopasture
- tundra
  - Touches: lake, prarie, boreal

*/

enum Bioms {
  aquatic = 'aquatic',
  grassland = 'grassland',
  forest = 'forest',
  desert = 'desert',
  tundra = 'tundra'
}

interface IBiomConfig {
  [key: string]: {
    touches: Bioms[]
  }
}

const biomsConfig: IBiomConfig = {
  aquatic: {
    touches: [
      Bioms.aquatic,
      Bioms.aquatic,
      Bioms.aquatic,
      Bioms.forest, Bioms.desert, Bioms.grassland, Bioms.tundra
    ]
  },
  grassland: {
    touches: [
      Bioms.grassland,
      Bioms.grassland,
      Bioms.aquatic, Bioms.forest, Bioms.desert
    ]
  },
  forest: {
    touches: [
      Bioms.forest,
      Bioms.forest,
      Bioms.grassland,
      Bioms.grassland, Bioms.aquatic, Bioms.tundra
    ]
  },
  desert: {
    touches: [
      Bioms.desert,
      Bioms.desert,
      Bioms.desert,
      Bioms.grassland, Bioms.aquatic
    ]
  },
  tundra: {
    touches: [
      Bioms.tundra,
      Bioms.tundra,
      Bioms.tundra,
      Bioms.aquatic, Bioms.forest, Bioms.grassland
    ]
  }
}

const select = (options: Bioms[]): Bioms => {
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}

const generateMap = (w: number, h: number, start: Bioms): string[][] => {
  const map: Bioms[][] = []
  let lastBiome = start;

  for (let row = 0; row < h; row++) {
    map.push([])

    for (let col = 0; col < w; col++) {
      const prevRow = map[row - 1]?.[col];
      let availableBioms = biomsConfig[lastBiome].touches;

      if (prevRow) {
        availableBioms = [...new Set(availableBioms.concat(biomsConfig[prevRow].touches))]
      }

      const biome = select(availableBioms);
      console.log('Prev', prevRow, 'BIome', biome)

      lastBiome = biome;
      map[row].push(biome)
    }
  }

  return map;
}

console.log(generateMap(5, 5, Bioms.grassland));
