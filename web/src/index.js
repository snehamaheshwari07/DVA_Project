import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import dataFood from "./../../food/food.csv";
import data from "./AB_NYC_2019.csv";
import foodiconUrl from "./food.png";
import iconUrl from "./marker-icon.png";
//import chroma from 'chroma-js'
import { heatmaps } from "./heatmap.ts";

// console.log("mydata", data);

const map = L.map("map-root");
map.setView([40.7128, -74.006], 12);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const resultFilter = (row, neighborhood, roomType, minPrice, maxPrice) => {
    var min = Number(minPrice);
    var max = Number(maxPrice);
    return (
        (neighborhood === "All" || row[5] === neighborhood) &&
        (roomType === "All" || row[8] === roomType) &&
        row[9] >= min &&
        row[9] <= max
    );
};

function populateForm() {
    var uniqueNeighborhoods = new Set();
    uniqueNeighborhoods.add("All");
    for (var i = 1; i < data.length; i++) {
        uniqueNeighborhoods.add(data[i][5]); //neighborhoods are 222, group is 6 (1 is undefined)
    }
    uniqueNeighborhoods.delete(undefined);

    var selectElement = document.getElementById("neighborhood");
    // Clear the current options in the select element
    selectElement.innerHTML = "";
    // Add new options to the select element
    for (const item of uniqueNeighborhoods.keys()) {
        const newOption = document.createElement("option");
        newOption.value = item;
        newOption.text = item;
        selectElement.add(newOption);
    }

    var uniqueRoomTypes = new Set();
    uniqueRoomTypes.add("All");
    for (var i = 1; i < data.length; i++) {
        uniqueRoomTypes.add(data[i][8]);
    }
    uniqueRoomTypes.delete(undefined);
    selectElement = document.getElementById("roomType");
    selectElement.innerHTML = "";
    for (const item of uniqueRoomTypes.keys()) {
        const newOption = document.createElement("option");
        newOption.value = item;
        newOption.text = item;
        selectElement.add(newOption);
    }
}
populateForm();

const icon = L.icon({
    iconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 40],
    // popupAnchor: [-3, -76],
});

const food_markers = [];
const hotelMarkers = [];

// document.getElementById("airbnbFilterForm").addEventListener("submit", function (event) {
//     event.preventDefault();

const neighborhoodSelect = document.getElementById("neighborhood");
const roomTypeSelect = document.getElementById("roomType");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");

neighborhoodSelect.addEventListener("change", updateHotels);
roomTypeSelect.addEventListener("change", updateHotels);
minPriceInput.addEventListener("input", updateHotels);
maxPriceInput.addEventListener("input", updateHotels);

function updateHotels() {
    clearFoodMarkers();
    var selectedNeighborhood = neighborhoodSelect.value;
    var selectedRoomType = roomTypeSelect.value;
    var minPrice = minPriceInput.value.trim();
    var maxPrice = maxPriceInput.value.trim();

    minPrice = inputToNumber(minPrice, -Infinity);
    maxPrice = inputToNumber(maxPrice, Infinity);

    var results = data.filter(row =>
        resultFilter(row, selectedNeighborhood, selectedRoomType, minPrice, maxPrice),
    );

    for (const marker of hotelMarkers) {
        marker.remove();
    }
    hotelMarkers.length = 0;

    if (results.length === 0) {
        return;
    }

    for (var i = 0; i < Math.min(1000, results.length); i++) {
        let marker = L.marker([results[i][6], results[i][7]], {
            icon,
        });
        marker.bindPopup(
            `${results[i][1]}<br>Host: ${results[i][3]}<br>$${results[i][9]} per night`,
        );
        const j = i;
        marker.on("click", function () {
            this.openPopup();
            updateFoodMarkers(results[j][6], results[j][7]);
        });

        marker.addTo(map);
        hotelMarkers.push(marker);
    }
    var group = new L.featureGroup(hotelMarkers);
    map.fitBounds(group.getBounds());
}

updateHotels();

function inputToNumber(val, defaultValue) {
    if (val === "") {
        val = defaultValue;
    } else {
        val = +val;
        if (Number.isNaN(val)) {
            val = defaultValue;
        }
    }
    return val;
}

const icon_food = L.icon({
    iconUrl: foodiconUrl,
    iconSize: [35, 35],
    iconAnchor: [17, 34],
    // popupAnchor: [-3, -76],
});

function clearFoodMarkers() {
    for (const marker of food_markers) {
        marker.remove();
    }
    food_markers.length = 0;
}
// console.info(iconUrl);
function updateFoodMarkers(x, y) {
    clearFoodMarkers();
    const resultFilter_food = row => {
        if (row === undefined) {
            return false;
        }
        const foodX = row[1];
        const foodY = row[2];
        const maxDistance = 0.002;
        return Math.abs(foodX - x) < maxDistance && Math.abs(foodY - y) < maxDistance;
    };

    const results_food = dataFood.filter(row => resultFilter_food(row));
    // console.log(results_food);
    // console.info(L.Icon.Default.);
    for (var i = 1; i < 200; i++) {
        //showing first 10 for now, can think of other sort criteria
        // console.log(i);
        // console.log(results_food[i][18], results_food[i][19]);
        if (results_food[i] === undefined) {
            continue;
        }
        var marker_food = L.marker([results_food[i][1], results_food[i][2]], {
            icon: icon_food,
        });
        marker_food.bindPopup(`${results_food[i][0]}`);
        marker_food.on("click", function () {
            this.openPopup();
        });

        marker_food.addTo(map);
        food_markers.push(marker_food);
    }
}

// L.marker([results_food[i][19], results_food[i][20]]);

let selectedHeatMapIndex = 0;
let overlayButton = document.getElementById("overlayMode");
let cleanup = heatmaps[selectedHeatMapIndex].load();

console.info(123);

overlayButton.addEventListener("click", function (event) {
    event.preventDefault();
    selectedHeatMapIndex = (selectedHeatMapIndex + 1) % 3;
    const hm = heatmaps[selectedHeatMapIndex];
    cleanup();
    cleanup = hm.load(map);
    overlayButton.innerText = hm.name;
});
