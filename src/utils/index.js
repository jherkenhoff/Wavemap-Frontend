export function formatSiPrefix(num) {
    if (num >= 1e9) { return (num/1e9).toFixed(2) + " GHz" }
    else if (num >= 1e6) { return (num/1e6).toFixed(2) + " MHz" }
    else if (num >= 1e3) { return (num/1e3).toFixed(2) + " kHz" }
    else { return num.toFixed(2) + " Hz" }
}
