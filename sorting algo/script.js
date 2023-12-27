let array = [];
let container = document.getElementById("container");

function init() {
    const arraySize = parseInt(document.getElementById("arraySize").value);
    generateArray(arraySize);
    showBars();
}

function generateArray(size) {
    array = [];
    for (let i = 0; i < size; i++) {
        array[i] = Math.random();
    }
}

function play() {
    const copy = [...array];
    const swaps = mergeSort(copy, 0, copy.length - 1);
    animate(swaps);
}

function animate(swaps) {
    if (swaps.length === 0) {
        // Sorting is complete, reset colors to black
        showBars([]);
        return;
    }

    const [i, value] = swaps.shift();
    array[i] = value;
    showBars([i]);
    setTimeout(function () {
        animate(swaps);
    }, 500); // Increased timeout for better visibility
}

function mergeSort(arr, l, r) {
    const swaps = [];
    if (l < r) {
        const m = Math.floor((l + r) / 2);

        swaps.push(...mergeSort(arr, l, m));
        swaps.push(...mergeSort(arr, m + 1, r));

        swaps.push(...merge(arr, l, m, r));
    }
    return swaps;
}

function merge(arr, l, m, r) {
    const swaps = [];
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) {
        L[i] = arr[l + i];
    }
    for (let j = 0; j < n2; j++) {
        R[j] = arr[m + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            swaps.push([k, arr[k]]);
            i++;
        } else {
            arr[k] = R[j];
            swaps.push([k, arr[k]]);
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = L[i];
        swaps.push([k, arr[k]]);
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = R[j];
        swaps.push([k, arr[k]]);
        j++;
        k++;
    }

    return swaps;
}

function showBars(indices) {
    container.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement("div");
        bar.style.height = array[i] * 100 + "%";

        // Check if the current index is in the indices array and apply red or green color
        if (indices) {
            if (indices.includes(i)) {
                bar.style.backgroundColor = i % 2 === 0 ? "red" : "green";
            }
        }

        bar.classList.add("bar");
        container.appendChild(bar);
    }
}

// Call init() initially to generate the array with the default size
init();
