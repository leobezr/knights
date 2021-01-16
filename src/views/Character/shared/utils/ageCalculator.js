export default function (birthday) {
    let ageDifMs = Date.now() - birthday;
    let ageDate = new Date(ageDifMs);

    return Math.abs(ageDate.getUTCFullYear() - 1970);
}