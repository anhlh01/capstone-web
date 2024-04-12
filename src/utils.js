function formatDateUtils(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // Return a default value if the provided string is not a valid date
    }
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}-${month}-${year}`;
}

export { formatDateUtils }