(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.MaplibreGLBasemapsControl = factory());
})(this, (function () { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */


    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    class BasemapsControl {
        constructor(options) {
            this._options = options;
            this._container = document.createElement("div");
            this._container.classList.add("maplibregl-ctrl");
            this._container.classList.add("maplibregl-ctrl-basemaps");
            this._container.classList.add("closed");
            switch (this._options.expandDirection || "right") {
                case "top":
                    this._container.classList.add("reverse");
                    break;
                case "down":
                    this._container.classList.add("column");
                    break;
                case "left":
                    this._container.classList.add("reverse");
                    break;
                case "right":
                    this._container.classList.add("row");
            }
            this._container.addEventListener("mouseenter", () => {
                this._container.classList.remove("closed");
            });
            this._container.addEventListener("mouseleave", () => {
                this._container.classList.add("closed");
            });
        }
        onAdd(map) {
            // // const thumbnailZYX = "/1/0/0"  // hawaii to greenland
            // const thumbnailZYX = "/2/0/1"     // hawaii to Hudson's Bay
            // const basemaps = {
            //     "https://demotiles.maplibre.org/style.json": {
            //         thumbnail: "https://atlas-stg.geoplatform.gov/styles/v1/atlas-user/ck72fwp2642dv07o7tbqinvz4/tiles/256/2/0/1@2x?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
            //     },
            //     "https://DOI-NPS.github.io/npmap-style/standard.json": {
            //         thumbnail: "https://atlas-stg.geoplatform.gov/styles/v1/atlas-user/ck58pyquo009v01p99xebegr9/tiles/256/2/0/1@2x?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
            //     },
            //     "https://DOI-NPS.github.io/npmap-style/boundary.json": {
            //         thumbnail: "https://atlas-stg.geoplatform.gov/styles/v1/atlas-user/ck58pyquo009v01p99xebegr9/tiles/256/2/0/1@2x?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
            //     },
            //     "https://DOI-NPS.github.io/npmap-style/data.json": {
            //         thumbnail: "https://atlas-stg.geoplatform.gov/v4/atlas-user.park-tiles-4-data/2/0/1@2x.png?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
            //     }
            // }
            const maputnikStyle = [
                {
                    "id": "Park Tiles standard",
                    "title": "Park Tiles standard",
                    "url": "https://DOI-NPS.github.io/npmap-style/standard.json",
                    "thumbnail": "https://atlas-stg.geoplatform.gov/styles/v1/atlas-user/ck58pyquo009v01p99xebegr9/tiles/256/2/0/1@2x?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
                },
                {
                    "id": "Park Tiles boundary",
                    "title": "Park Tiles boundary",
                    "url": "https://DOI-NPS.github.io/npmap-style/boundary.json",
                    "thumbnail": "https://atlas-stg.geoplatform.gov/v4/atlas-user.park-tiles-4-boundary/2/0/1@2x.png?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
                },
                {
                    "id": "Park Tiles data",
                    "title": "Park Tiles data",
                    "url": "https://DOI-NPS.github.io/npmap-style/data.json",
                    "thumbnail": "https://atlas-stg.geoplatform.gov/v4/atlas-user.park-tiles-4-data/2/0/1@2x.png?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
                },
                {
                    "id": "Park Tiles hydro",
                    "title": "Park Tiles hydro",
                    "url": "https://DOI-NPS.github.io/npmap-style/hydro.json",
                    "thumbnail": "https://atlas-stg.geoplatform.gov/v4/atlas-user.park-tiles-4-hydro/2/0/1@2x.png?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
                },
                {
                    "id": "Park Tiles label",
                    "title": "Park Tiles label",
                    "url": "https://DOI-NPS.github.io/npmap-style/label.json",
                    "thumbnail": "https://atlas-stg.geoplatform.gov/v4/atlas-user.park-tiles-4-label-point/2/0/1@2x.png?access_token=pk.eyJ1IjoiYXRsYXMtdXNlciIsImEiOiJjazFmdGx2bjQwMDAwMG5wZmYwbmJwbmE2In0.lWXK2UexpXuyVitesLdwUg"
                },
                {
                    "id": "OpenStreetMap",
                    "title": "OpenStreetMap",
                    "url": "https://roblabs.com/xyz-raster-sources/styles/openstreetmap.json",
                    "thumbnail": "https://tile.openstreetmap.org/2/0/1.png"
                },
                {
                    "id": "Natural Earth Tiles",
                    "title": "Natural Earth Tiles",
                    "url": "https://roblabs.com/xyz-raster-sources/styles/naturalearthtiles.json",
                    "thumbnail": "https://naturalearthtiles.roblabs.com/tiles/natural_earth_2.raster/2/0/1.png"
                },
                {
                    "id": "ArcGIS World Imagery",
                    "title": "ArcGIS World Imagery",
                    "url": "https://roblabs.com/xyz-raster-sources/styles/arcgis-world-imagery.json",
                    // Esri is ZXY
                    "thumbnail": "https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/2/1/0"
                },
                {
                    "id": "USDA NAIP",
                    "title": "USDA NAIP",
                    "url": "https://roblabs.com/xyz-raster-sources/styles/usda-naip.json",
                    // Esri is ZXY
                    "thumbnail": "https://gis.apfo.usda.gov/arcgis/rest/services/NAIP/USDA_CONUS_PRIME/ImageServer/tile/2/1/0"
                }
            ];
            // const initialBasemap = "https://demotiles.maplibre.org/style.json"
            const initialBasemap = "https://DOI-NPS.github.io/npmap-style/standard.json";
            map.on("load", () => {
                // Object.keys(basemaps).forEach((style) => {
                maputnikStyle.reverse().forEach((style) => {
                    //   const base = basemaps[style];
                    const base = style;
                    console.log(99, 66, "style", style);
                    console.log(99, 67, "base", base);
                    const basemapContainer = document.createElement("img");
                    basemapContainer.src = base.thumbnail;
                    basemapContainer.alt = base.title;
                    basemapContainer.title = base.title;
                    basemapContainer.classList.add("basemap");
                    //   basemapContainer.dataset.id = style;
                    basemapContainer.dataset.id = style.id;
                    basemapContainer.addEventListener("click", () => __awaiter(this, undefined, undefined, function* () {
                        const activeElement = this._container.querySelector(".active");
                        activeElement.classList.remove("active");
                        basemapContainer.classList.add("active");
                        console.log(99, 78, "ACTIVE layerId", style);
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        // await new Promise(_r => map.setStyle(style.url));
                        map.setStyle(style.url);
                        setTimeout(() => {
                            console.log("Delayed.");
                            const attrib = document.getElementsByClassName("maplibregl-ctrl-attrib-inner");
                            const innerHTML = `🐛 ${base.title} 🐛 ` + attrib[0].innerHTML;
                            attrib[0].innerHTML = innerHTML;
                        }, 1000); // 
                    }));
                    basemapContainer.classList.add("hidden");
                    this._container.appendChild(basemapContainer);
                    if (initialBasemap === style.url) {
                        basemapContainer.classList.add("active");
                    }
                });
            });
            return this._container;
        }
        onRemove() {
            var _a;
            (_a = this._container.parentNode) === null || _a === undefined ? undefined : _a.removeChild(this._container);
        }
    }

    return BasemapsControl;

}));
//# sourceMappingURL=index.js.map
