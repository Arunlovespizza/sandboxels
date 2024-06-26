elements.blackhole = {
    color: "#000000",
    behavior: function(pixel) {
        // Suck in and delete surrounding particles
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue; // Skip the blackhole itself
                let x = pixel.x + dx;
                let y = pixel.y + dy;
                if (isValidCoordinate(x, y) && pixelMap[x][y]) {
                    deletePixel(pixelMap[x][y]);
                }
            }
        }
        // Detect light and create a ring of light
        if (pixelMap[pixel.x] && pixelMap[pixel.x][pixel.y]) {
            let surroundingLightCount = 0;
            for (let dx = -2; dx <= 2; dx++) {
                for (let dy = -2; dy <= 2; dy++) {
                    if (Math.abs(dx) + Math.abs(dy) === 2 && isValidCoordinate(pixel.x + dx, pixel.y + dy) && pixelMap[pixel.x + dx][pixel.y + dy]?.element === "light") {
                        surroundingLightCount++;
                    }
                }
            }
            if (surroundingLightCount > 0) {
                for (let dx = -surroundingLightCount; dx <= surroundingLightCount; dx++) {
                    for (let dy = -surroundingLightCount; dy <= surroundingLightCount; dy++) {
                        if (Math.abs(dx) + Math.abs(dy) === surroundingLightCount && isValidCoordinate(pixel.x + dx, pixel.y + dy)) {
                            createPixel("light", pixel.x + dx, pixel.y + dy);
                        }
                    }
                }
            }
        }
    },
    category: "special",
    state: "solid",
    density: 10000,
};
